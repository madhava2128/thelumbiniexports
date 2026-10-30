import { z } from "zod";

export type CredentialStatus = "active" | "revoked" | "pending";

export const internshipTaskSchema = z.object({
  id: z.string(),
  title: z.string().min(1),
  status: z.enum(["submitted_and_evaluated", "completed", "pending"]),
  description: z.string().optional(),
});

export type InternshipTask = z.infer<typeof internshipTaskSchema>;

export const authorizedSignatorySchema = z.object({
  name: z.string().min(1),
  title: z.string().min(1),
});

export type AuthorizedSignatory = z.infer<typeof authorizedSignatorySchema>;

export const documentReferenceSchema = z.object({
  filename: z.string().min(1),
  path: z.string().min(1),
  fileAvailable: z.boolean().optional(),
});

export type DocumentReference = z.infer<typeof documentReferenceSchema>;

export const credentialRecordSchema = z.object({
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

export type CredentialRecord = z.infer<typeof credentialRecordSchema>;

export type VerificationState =
  | "verified"
  | "pending"
  | "revoked"
  | "not_found"
  | "error";

export interface TaskSummary {
  totalTasks: number;
  completedTasks: number;
  percentage: number;
  summaryText: string;
}

export interface VerificationResult {
  state: VerificationState;
  statusMessage: string;
  checkedAtIso: string;
  checkedAtFormattedIst: string;
  credential?: CredentialRecord;
  maskedEmail?: string | null;
  canonicalVerificationUrl: string;
  taskSummary?: TaskSummary | null;
}

