import Image from "next/image";
import type { Project } from "@/lib/projects";

const ALT: Record<string, string> = {
  vindue: "app showing a ten-image gallery it generated for a kids’ activity table",
  partidito: "app setting up a match with sixteen invented players, before the AI picks the teams",
  "lessio-stock": "inventory screen, shown with invented demo data",
};

export function ProjectVisual({
  project,
  priority = false,
}: {
  project: Project;
  priority?: boolean;
}) {
  return (
    <div
      className={`project-visual visual-${project.slug}`}
      style={{ "--project-color": project.color } as React.CSSProperties}
    >
      <div className="browser-frame">
        <div className="browser-bar">
          <span className="browser-dots" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <span>
            {project.slug === "isclaude-2x"
              ? "github.com/Adiazgallici/isclaude-2x"
              : (project.screenHost ?? new URL(project.url).hostname)}
          </span>
          <span aria-hidden="true">↗</span>
        </div>
        <Image
          src={`/screenshots/${project.slug}-desktop.png`}
          alt={`${project.name} ${ALT[project.slug] ?? "public website on desktop"}`}
          width={1440}
          height={1000}
          sizes="(max-width: 760px) 90vw, 60vw"
          priority={priority}
        />
      </div>
      {project.slug !== "isclaude-2x" && (
        <div className="phone-frame">
          <Image
            src={`/screenshots/${project.slug}-mobile.png`}
            alt={`${project.name} on a mobile viewport`}
            width={390}
            height={844}
            sizes="(max-width: 760px) 22vw, 160px"
          />
        </div>
      )}
    </div>
  );
}
