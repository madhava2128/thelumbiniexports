import React from "react";
import { CheckCircle2, Clock, AlertCircle } from "lucide-react";
import { Heading } from "@/components/ui";
import { InternshipTask, TaskSummary } from "@/lib/credential-types";

interface CompletedWorkProps {
  tasks?: InternshipTask[] | null;
  taskSummary?: TaskSummary | null;
}

export function CompletedWork({ tasks, taskSummary }: CompletedWorkProps) {
  const hasTasks = Boolean(tasks && tasks.length > 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Heading variant="section" as="h2" className="text-obsidian text-2xl sm:text-3xl">
            Work completed during the internship
          </Heading>
          <p className="text-stone-grey-text text-sm sm:text-base mt-1">
            Assigned tasks, technical milestones, and formal evaluation records.
          </p>
        </div>

        {hasTasks && taskSummary && (
          <div className="bg-emerald-50 border border-emerald-600/30 px-4 py-2 rounded-lg flex items-center gap-3">
            <span className="text-2xl font-serif font-bold text-emerald-900">
              {taskSummary.percentage}%
            </span>
            <div className="text-xs text-emerald-800 font-medium">
              <p className="font-semibold">{taskSummary.summaryText}</p>
              <p className="text-emerald-700">Programme Completion</p>
            </div>
          </div>
        )}
      </div>

      {hasTasks ? (
        <div className="bg-ivory-surface rounded-lg border border-stone/25 shadow-xs overflow-hidden">
          <ul className="divide-y divide-stone/15">
            {tasks!.map((task, index) => {
              const isCompleted =
                task.status === "submitted_and_evaluated" || task.status === "completed";
              return (
                <li
                  key={task.id || index}
                  className="p-5 sm:p-6 flex items-start justify-between gap-4"
                >
                  <div className="space-y-1">
                    <span className="text-xs uppercase tracking-wider font-semibold text-stone-grey-text">
                      Task {index + 1}
                    </span>
                    <h3 className="text-obsidian font-medium text-base sm:text-lg">
                      {task.title}
                    </h3>
                    {task.description && (
                      <p className="text-stone-grey-text text-sm leading-relaxed mt-1">
                        {task.description}
                      </p>
                    )}
                  </div>

                  <div className="shrink-0 mt-1">
                    {isCompleted ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100/70 text-emerald-900 border border-emerald-600/30">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" aria-hidden="true" />
                        Submitted &amp; Evaluated
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-100/70 text-amber-900 border border-amber-600/30">
                        <Clock className="w-3.5 h-3.5 text-amber-700" aria-hidden="true" />
                        Pending Review
                      </span>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <div className="rounded-lg border border-amber-600/30 bg-amber-50/50 p-6 sm:p-8 flex items-start gap-4 text-left">
          <AlertCircle className="w-6 h-6 text-amber-700 shrink-0 mt-0.5" aria-hidden="true" />
          <div className="space-y-2">
            <h3 className="font-sans font-semibold text-amber-900 text-base">
              Internship Task Records Pending Client Confirmation
            </h3>
            <p className="text-stone-grey-text text-sm leading-relaxed max-w-2xl">
              Specific project task titles, milestones, and formal evaluation outcomes are pending confirmation from the employer. In accordance with credential integrity protocols, no placeholder or fabricated tasks are displayed. Records will be updated upon official submission.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

