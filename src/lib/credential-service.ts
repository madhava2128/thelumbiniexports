import fs from "fs/promises";
import path from "path";
import bundledCredentials from "../../data/credentials.json";
import {
  type CredentialRecord,
  type VerificationResult,
  type TaskSummary,
  credentialRecordSchema,
} from "./credential-types";

/**
 * Format a Date object into India Standard Time (IST) display format.
 * Example output: "29 October 2026, 08:35:12 PM IST"
 */
export function formatToIst(date: Date = new Date()): string {
  try {
    const formatter = new Intl.DateTimeFormat("en-IN", {
      timeZone: "Asia/Kolkata",
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
    return `${formatter.format(date)} IST`;
  } catch {
    return `${date.toUTCString()} (UTC)`;
  }
}

/**
 * Safely mask an email address on the server before transmitting to client components.
 * Example: "madhava@example.com" -> "m***a@example.com"
 */
export function maskEmail(email?: string | null): string | null {
  if (!email || !email.includes("@")) return null;
  const [localPart, domain] = email.split("@");
  if (!localPart || !domain) return null;

  if (localPart.length <= 2) {
    return `${localPart[0]}*@${domain}`;
  }

  const firstChar = localPart[0];
  const lastChar = localPart[localPart.length - 1];
  return `${firstChar}***${lastChar}@${domain}`;
}

/**
 * Calculate dynamic task completion summary from stored records.
 */
export function calculateTaskSummary(tasks?: CredentialRecord["tasks"]): TaskSummary | null {
  if (!tasks || !Array.isArray(tasks) || tasks.length === 0) {
    return null;
  }

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(
    (t) => t.status === "submitted_and_evaluated" || t.status === "completed"
  ).length;

  const percentage = Math.round((completedTasks / totalTasks) * 100);
  const summaryText = `${completedTasks} of ${totalTasks} assigned tasks submitted and evaluated`;

  return {
    totalTasks,
    completedTasks,
    percentage,
    summaryText,
  };
}

/**
 * Resolves the path to the credentials JSON file.
 */
export function getCredentialsStorePath(): string {
  return (
    process.env.CREDENTIALS_STORE_PATH ||
    path.join(process.cwd(), "data", "credentials.json")
  );
}

/**
 * Check if a document file physically exists in the documents directory.
 */
export async function checkFileAvailable(relativeOrAbsolutePath?: string | null): Promise<boolean> {
  if (!relativeOrAbsolutePath) return false;
  try {
    const fullPath = path.isAbsolute(relativeOrAbsolutePath)
      ? relativeOrAbsolutePath
      : path.join(/*turbopackIgnore: true*/ process.cwd(), relativeOrAbsolutePath);
    await fs.access(/*turbopackIgnore: true*/ fullPath);
    return true;
  } catch {
    try {
      const publicPath = path.join(/*turbopackIgnore: true*/ process.cwd(), "public", "docs", path.basename(relativeOrAbsolutePath));
      await fs.access(/*turbopackIgnore: true*/ publicPath);
      return true;
    } catch {
      return false;
    }
  }
}

/**
 * Read and validate all credential records from the server-side store.
 */
export async function getAllCredentials(): Promise<CredentialRecord[]> {
  try {
    const storePath = getCredentialsStorePath();
    const rawData = await fs.readFile(/*turbopackIgnore: true*/ storePath, "utf-8");
    const parsed = JSON.parse(rawData);

    if (Array.isArray(parsed)) {
      return parsed.map((item) => credentialRecordSchema.parse(item));
    }
  } catch {
    // Fall back safely to bundled dataset on serverless environments where local file reads might fail
  }

  return (bundledCredentials as unknown[]).map((item) => credentialRecordSchema.parse(item));
}

/**
 * Authoritative verification function executed on each page request.
 */
export async function verifyCredential(
  rawCredentialId: string,
  now: Date = new Date()
): Promise<VerificationResult> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.thelumbiniexports.in";
  const checkedAtIso = now.toISOString();
  const checkedAtFormattedIst = formatToIst(now);
  const trimmedId = (rawCredentialId || "").trim();

  const canonicalVerificationUrl = `${siteUrl.replace(/\/$/, "")}/verify/${encodeURIComponent(
    trimmedId || "unknown"
  )}`;

  if (!trimmedId) {
    return {
      state: "not_found",
      statusMessage: "Credential not found",
      checkedAtIso,
      checkedAtFormattedIst,
      canonicalVerificationUrl,
    };
  }

  try {
    const records = await getAllCredentials();
    const record = records.find(
      (r) => r.id.toLowerCase() === trimmedId.toLowerCase()
    );

    if (!record) {
      return {
        state: "not_found",
        statusMessage: "Credential not found",
        checkedAtIso,
        checkedAtFormattedIst,
        canonicalVerificationUrl,
      };
    }

    // Check document availability: either verified in store, or confirmed physically on disk
    const certAvailable = Boolean(
      record.certificateDocument?.fileAvailable ??
        (record.certificateDocument?.path
          ? await checkFileAvailable(record.certificateDocument.path)
          : false)
    );

    const offerAvailable = Boolean(
      record.offerLetterDocument?.fileAvailable ??
        (record.offerLetterDocument?.path
          ? await checkFileAvailable(record.offerLetterDocument.path)
          : false)
    );

    const updatedRecord: CredentialRecord = {
      ...record,
      certificateDocument: record.certificateDocument
        ? { ...record.certificateDocument, fileAvailable: certAvailable }
        : null,
      offerLetterDocument: record.offerLetterDocument
        ? { ...record.offerLetterDocument, fileAvailable: offerAvailable }
        : null,
    };

    const taskSummary = calculateTaskSummary(record.tasks);
    const maskedEmail = maskEmail(record.recipientEmail);

    if (record.status === "revoked") {
      return {
        state: "revoked",
        statusMessage: "Credential revoked",
        checkedAtIso,
        checkedAtFormattedIst,
        credential: updatedRecord,
        maskedEmail,
        canonicalVerificationUrl,
        taskSummary,
      };
    }

    if (record.status === "pending") {
      return {
        state: "pending",
        statusMessage: "Verification pending",
        checkedAtIso,
        checkedAtFormattedIst,
        credential: updatedRecord,
        maskedEmail,
        canonicalVerificationUrl,
        taskSummary,
      };
    }

    // Active & verified
    return {
      state: "verified",
      statusMessage: "Verified credential",
      checkedAtIso,
      checkedAtFormattedIst,
      credential: updatedRecord,
      maskedEmail,
      canonicalVerificationUrl,
      taskSummary,
    };
  } catch (error) {
    // Distinguish storage/network error from invalid credential
    console.error(`[Credential Verification Error] Failed to verify ID "${trimmedId}":`, error);
    return {
      state: "error",
      statusMessage: "Unable to verify",
      checkedAtIso,
      checkedAtFormattedIst,
      canonicalVerificationUrl,
    };
  }
}

/**
 * Generate LinkedIn "Add to Profile" URL for this verified credential.
 */
export function generateLinkedInCertUrl(
  credential: CredentialRecord,
  canonicalUrl: string
): string {
  // Extract month and year from certificateIssueDate (e.g. "2026-10-10")
  let issueYear = "2026";
  let issueMonth = "10";

  if (credential.certificateIssueDate) {
    const parts = credential.certificateIssueDate.split("-");
    if (parts.length >= 2 && parts[0] && parts[1]) {
      issueYear = parts[0];
      issueMonth = parseInt(parts[1], 10).toString();
    }
  }

  const params = new URLSearchParams({
    startTask: "CERTIFICATION_NAME",
    name: credential.programme,
    organizationName: credential.issuerName,
    issueYear,
    issueMonth,
    certUrl: canonicalUrl,
    certId: credential.id,
  });

  return `https://www.linkedin.com/profile/add?${params.toString()}`;
}
