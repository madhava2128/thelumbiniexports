import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { z } from "zod";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

// Define schema directly matching src/lib/credential-types.ts
const internshipTaskSchema = z.object({
  id: z.string(),
  title: z.string().min(1),
  status: z.enum(["submitted_and_evaluated", "completed", "pending"]),
  description: z.string().optional(),
});

const authorizedSignatorySchema = z.object({
  name: z.string().min(1),
  title: z.string().min(1),
});

const documentReferenceSchema = z.object({
  filename: z.string().min(1),
  path: z.string().min(1),
  fileAvailable: z.boolean().optional(),
});

const credentialRecordSchema = z.object({
  id: z.string().min(1),
  issuerName: z.string().min(1),
  recipientName: z.string().min(1),
  recipientEmail: z.string().email().nullable().optional(),
  programme: z.string().min(1),
  internshipStartDate: z.string().min(1),
  internshipEndDate: z.string().min(1),
  certificateIssueDate: z.string().min(1),
  authorizedSignatory: authorizedSignatorySchema,
  certificateDocument: documentReferenceSchema.nullable().optional(),
  offerLetterDocument: documentReferenceSchema.nullable().optional(),
  tasks: z.array(internshipTaskSchema).nullable().optional(),
  status: z.enum(["active", "revoked", "pending"]),
  notes: z.string().optional(),
  createdAt: z.string().min(1),
  updatedAt: z.string().min(1),
});

function maskEmail(email) {
  if (!email || !email.includes("@")) return null;
  const [localPart, domain] = email.split("@");
  if (!localPart || !domain) return null;
  if (localPart.length <= 2) return `${localPart[0]}*@${domain}`;
  const firstChar = localPart[0];
  const lastChar = localPart[localPart.length - 1];
  return `${firstChar}***${lastChar}@${domain}`;
}

function calculateTaskSummary(tasks) {
  if (!tasks || !Array.isArray(tasks) || tasks.length === 0) return null;
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(
    (t) => t.status === "submitted_and_evaluated" || t.status === "completed"
  ).length;
  const percentage = Math.round((completedTasks / totalTasks) * 100);
  const summaryText = `${completedTasks} of ${totalTasks} assigned tasks submitted and evaluated`;
  return { totalTasks, completedTasks, percentage, summaryText };
}

function formatToIst(date = new Date()) {
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

function generateLinkedInCertUrl(credential, canonicalUrl) {
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

async function verifyCredentialLogic(credentialId, storeContent) {
  const trimmedId = (credentialId || "").trim();
  const siteUrl = "https://www.thelumbiniexports.in";
  const canonicalVerificationUrl = `${siteUrl}/verify/${encodeURIComponent(trimmedId || "unknown")}`;
  const checkedAtFormattedIst = formatToIst(new Date());

  if (!trimmedId) {
    return {
      state: "not_found",
      statusMessage: "Credential not found",
      canonicalVerificationUrl,
      checkedAtFormattedIst,
    };
  }

  try {
    const parsed = JSON.parse(storeContent);
    if (!Array.isArray(parsed)) throw new Error("Invalid format");
    const records = parsed.map((item) => credentialRecordSchema.parse(item));
    const record = records.find(
      (r) => r.id.toLowerCase() === trimmedId.toLowerCase()
    );

    if (!record) {
      return {
        state: "not_found",
        statusMessage: "Credential not found",
        canonicalVerificationUrl,
        checkedAtFormattedIst,
      };
    }

    const taskSummary = calculateTaskSummary(record.tasks);
    const masked = maskEmail(record.recipientEmail);

    if (record.status === "revoked") {
      return {
        state: "revoked",
        statusMessage: "Credential revoked",
        credential: record,
        maskedEmail: masked,
        canonicalVerificationUrl,
        checkedAtFormattedIst,
      };
    }

    if (record.status === "pending") {
      return {
        state: "pending",
        statusMessage: "Verification pending",
        credential: record,
        maskedEmail: masked,
        canonicalVerificationUrl,
        checkedAtFormattedIst,
      };
    }

    return {
      state: "verified",
      statusMessage: "Verified credential",
      credential: record,
      maskedEmail: masked,
      canonicalVerificationUrl,
      checkedAtFormattedIst,
      taskSummary,
    };
  } catch {
    return {
      state: "error",
      statusMessage: "Unable to verify",
      canonicalVerificationUrl,
      checkedAtFormattedIst,
    };
  }
}

test("Credential Verification System Tests", async (t) => {
  const storePath = path.join(rootDir, "data", "credentials.json");
  const storeRaw = await fs.readFile(storePath, "utf-8");

  await t.test("1. Server store schema validation (data/credentials.json)", () => {
    const parsed = JSON.parse(storeRaw);
    assert.ok(Array.isArray(parsed), "Store must be an array of records");
    assert.ok(parsed.length >= 1, "Store must contain at least 1 record");
    for (const record of parsed) {
      credentialRecordSchema.parse(record);
    }
  });

  await t.test("2. Authoritative check for K Madhava (valid active credential)", async () => {
    const result = await verifyCredentialLogic("TLE-INT-2026-001", storeRaw);
    assert.equal(result.state, "verified");
    assert.equal(result.statusMessage, "Verified credential");
    assert.ok(result.credential);
    assert.equal(result.credential.recipientName, "K Madhava");
    assert.equal(result.credential.programme, "Web Development Intern");
    assert.equal(result.credential.issuerName, "The Lumbini Exports");
    assert.equal(result.credential.internshipStartDate, "2026-08-01");
    assert.equal(result.credential.internshipEndDate, "2026-10-01");
    assert.equal(result.credential.certificateIssueDate, "2026-10-10");
    assert.equal(result.credential.authorizedSignatory.name, "Kommaraju Srinadh");
    assert.equal(result.credential.authorizedSignatory.title, "CEO");
    assert.match(result.canonicalVerificationUrl, /\/verify\/TLE-INT-2026-001$/);
    assert.match(result.checkedAtFormattedIst, /IST$/);
  });

  await t.test("3. Unknown credential ID produces clear not_found state", async () => {
    const result = await verifyCredentialLogic("UNKNOWN-RECORD-404", storeRaw);
    assert.equal(result.state, "not_found");
    assert.equal(result.statusMessage, "Credential not found");
    assert.equal(result.credential, undefined);
  });

  await t.test("4. Empty or whitespace ID produces not_found", async () => {
    const result = await verifyCredentialLogic("   ", storeRaw);
    assert.equal(result.state, "not_found");
    assert.equal(result.statusMessage, "Credential not found");
  });

  await t.test("5. Revoked credential produces revoked status", async () => {
    const revokedStore = JSON.stringify([
      {
        id: "REVOKED-001",
        issuerName: "The Lumbini Exports",
        recipientName: "Test Student",
        programme: "Web Development Intern",
        internshipStartDate: "2026-08-01",
        internshipEndDate: "2026-10-01",
        certificateIssueDate: "2026-10-10",
        authorizedSignatory: { name: "Kommaraju Srinadh", title: "CEO" },
        status: "revoked",
        createdAt: "2026-10-10T00:00:00Z",
        updatedAt: "2026-10-10T00:00:00Z",
      },
    ]);
    const result = await verifyCredentialLogic("REVOKED-001", revokedStore);
    assert.equal(result.state, "revoked");
    assert.equal(result.statusMessage, "Credential revoked");
  });

  await t.test("6. Service error produces error status (not false success)", async () => {
    const result = await verifyCredentialLogic("TLE-INT-2026-001", "INVALID_JSON{{");
    assert.equal(result.state, "error");
    assert.equal(result.statusMessage, "Unable to verify");
  });

  await t.test("7. Missing certificate handled safely and offer letter configured", async () => {
    const result = await verifyCredentialLogic("TLE-INT-2026-001", storeRaw);
    assert.equal(result.credential.certificateDocument, null);
    assert.ok(result.credential.offerLetterDocument);
    assert.equal(result.credential.offerLetterDocument.filename, "TLE-Offer-Letter-K-Madhava.pdf");
  });

  await t.test("8. Task completion summary calculation", () => {
    assert.equal(calculateTaskSummary(null), null);
    assert.equal(calculateTaskSummary([]), null);

    const fiveOfFive = [
      { id: "1", title: "Task 1", status: "submitted_and_evaluated" },
      { id: "2", title: "Task 2", status: "submitted_and_evaluated" },
      { id: "3", title: "Task 3", status: "submitted_and_evaluated" },
      { id: "4", title: "Task 4", status: "submitted_and_evaluated" },
      { id: "5", title: "Task 5", status: "submitted_and_evaluated" },
    ];
    const summary5 = calculateTaskSummary(fiveOfFive);
    assert.equal(summary5.totalTasks, 5);
    assert.equal(summary5.completedTasks, 5);
    assert.equal(summary5.percentage, 100);
    assert.equal(summary5.summaryText, "5 of 5 assigned tasks submitted and evaluated");

    const partial = [
      { id: "1", title: "Task 1", status: "completed" },
      { id: "2", title: "Task 2", status: "pending" },
    ];
    const summaryPartial = calculateTaskSummary(partial);
    assert.equal(summaryPartial.totalTasks, 2);
    assert.equal(summaryPartial.completedTasks, 1);
    assert.equal(summaryPartial.percentage, 50);
  });

  await t.test("9. Masked email display logic", () => {
    assert.equal(maskEmail("madhava@example.com"), "m***a@example.com");
    assert.equal(maskEmail("k@test.org"), "k*@test.org");
    assert.equal(maskEmail(null), null);
    assert.equal(maskEmail(undefined), null);
    assert.equal(maskEmail(""), null);
    assert.equal(maskEmail("not-an-email"), null);
  });

  await t.test("10. LinkedIn action URL generation pre-fills confirmed parameters", () => {
    const cred = {
      id: "TLE-INT-2026-001",
      issuerName: "The Lumbini Exports",
      recipientName: "K Madhava",
      programme: "Web Development Intern",
      internshipStartDate: "2026-08-01",
      internshipEndDate: "2026-10-01",
      certificateIssueDate: "2026-10-10",
      authorizedSignatory: { name: "Kommaraju Srinadh", title: "CEO" },
      status: "active",
      createdAt: "2026-10-10T00:00:00Z",
      updatedAt: "2026-10-10T00:00:00Z",
    };
    const canonical = "https://www.thelumbiniexports.in/verify/TLE-INT-2026-001";
    const linkedInUrl = generateLinkedInCertUrl(cred, canonical);

    assert.ok(linkedInUrl.startsWith("https://www.linkedin.com/profile/add?"));
    const url = new URL(linkedInUrl);
    assert.equal(url.searchParams.get("startTask"), "CERTIFICATION_NAME");
    assert.equal(url.searchParams.get("name"), "Web Development Intern");
    assert.equal(url.searchParams.get("organizationName"), "The Lumbini Exports");
    assert.equal(url.searchParams.get("issueYear"), "2026");
    assert.equal(url.searchParams.get("issueMonth"), "10");
    assert.equal(url.searchParams.get("certId"), "TLE-INT-2026-001");
    assert.equal(url.searchParams.get("certUrl"), canonical);
  });

  await t.test("11. Sitemap excludes verification routes", async () => {
    const sitemapContent = await fs.readFile(
      path.join(rootDir, "src", "app", "sitemap.ts"),
      "utf-8"
    );
    assert.equal(
      sitemapContent.includes("/verify"),
      false,
      "sitemap.ts must not contain /verify routes"
    );
  });

  await t.test("12. Public navigation excludes verification routes", async () => {
    const navContent = await fs.readFile(
      path.join(rootDir, "src", "content", "nav.ts"),
      "utf-8"
    );
    assert.equal(
      navContent.includes("/verify"),
      false,
      "nav.ts must not contain /verify links"
    );
  });

  await t.test("13. Verification page metadata enforces noindex, follow", async () => {
    const pageContent = await fs.readFile(
      path.join(rootDir, "src", "app", "verify", "[credentialId]", "page.tsx"),
      "utf-8"
    );
    assert.ok(pageContent.includes("index: false"), "Must include index: false");
    assert.ok(pageContent.includes("follow: true"), "Must include follow: true");
    assert.ok(pageContent.includes("force-dynamic"), "Must be dynamically checked");
  });

  await t.test("14. Document API route prevents directory traversal", async () => {
    const routeContent = await fs.readFile(
      path.join(rootDir, "src", "app", "api", "verify", "[credentialId]", "document", "route.ts"),
      "utf-8"
    );
    assert.ok(
      routeContent.includes("path.resolve"),
      "Must use path.resolve for secure path resolution"
    );
    assert.ok(
      routeContent.includes("startsWith(process.cwd())"),
      "Must guard against directory traversal"
    );
    assert.ok(
      routeContent.includes("X-Content-Type-Options"),
      "Must include nosniff security header"
    );
  });
});
