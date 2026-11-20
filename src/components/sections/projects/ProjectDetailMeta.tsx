import type { ProjectType } from "@/lib/types/components";

/**
 * The facts of a project in one row across the page: role, client, dates and stack, each in its
 * own cell with room around it. Cells without a value are left out.
 */
export function ProjectDetailMeta({ project }: { project: ProjectType }) {
  const details = [
    { label: "role", value: project.role },
    { label: "client", value: project.client },
    { label: "dates", value: project.duration },
    { label: "stack", value: project.tags.join(", ") },
  ].filter((detail) => detail.value);

  return (
    <dl className="grid grid-cols-2 border-y border-foreground/10 md:grid-cols-4">
      {details.map((detail) => (
        <div
          key={detail.label}
          className="flex flex-col gap-1.5 border-foreground/10 py-5 pr-5 md:border-l md:pl-5 md:first:border-l-0 md:first:pl-0"
        >
          <dt className="font-mono text-[11px] text-foreground/60">{detail.label}</dt>
          <dd className="text-sm font-light leading-relaxed text-foreground/85">{detail.value}</dd>
        </div>
      ))}
    </dl>
  );
}
