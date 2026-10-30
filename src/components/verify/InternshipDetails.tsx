import React from "react";
import { Heading } from "@/components/ui";
import { CredentialRecord } from "@/lib/credential-types";

interface InternshipDetailsProps {
  credential: CredentialRecord;
  maskedEmail?: string | null;
}

export function InternshipDetails({
  credential,
  maskedEmail,
}: InternshipDetailsProps) {
  const details = [
    { label: "Issuing Organization", value: credential.issuerName },
    { label: "Recipient Name", value: credential.recipientName },
    { label: "Internship Programme", value: credential.programme },
    {
      label: "Duration",
      value: `${credential.internshipStartDate} – ${credential.internshipEndDate}`,
    },
    { label: "Certificate Issue Date", value: credential.certificateIssueDate },
    { label: "Credential ID", value: credential.id, isMono: true },
    ...(maskedEmail ? [{ label: "Recipient Email", value: maskedEmail }] : []),
    {
      label: "Authorized Signatory",
      value: `${credential.authorizedSignatory.name}, ${credential.authorizedSignatory.title}`,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <Heading variant="section" as="h2" className="text-obsidian text-2xl sm:text-3xl">
          Internship Details
        </Heading>
        <p className="text-stone-grey-text text-sm sm:text-base mt-1">
          Confirmed administrative records held in The Lumbini Exports registry.
        </p>
      </div>

      <div className="bg-ivory-surface rounded-lg border border-stone/25 shadow-xs overflow-hidden">
        <dl className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x border-stone/15">
          {details.map((item, index) => (
            <div
              key={item.label}
              className={`p-5 sm:p-6 ${
                index % 2 === 0 ? "border-b border-stone/15" : "border-b border-stone/15"
              }`}
            >
              <dt className="text-xs uppercase tracking-wider font-semibold text-stone-grey-text mb-1">
                {item.label}
              </dt>
              <dd
                className={`text-obsidian text-base sm:text-lg font-medium ${
                  item.isMono ? "font-mono text-sm sm:text-base text-gold-hover font-semibold" : ""
                }`}
              >
                {item.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}

