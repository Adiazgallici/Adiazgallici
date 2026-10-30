import Link from "next/link";
import type { Metadata } from "next";
import { entries } from "@/lib/log";
export const metadata: Metadata = {
  title: "Build log",
  description:
    "Notes from building independent products. The build log is coming soon.",
};
export default function Log() {
  return (
    <div className="wrap writing-page">
      <p className="work-kind">Build log</p>
      <h1>Training notes.</h1>
      <p className="writing-intro">
        Decisions, experiments, and the occasional wrong turn.
      </p>
      <div className="writing-body">
        {entries.length ? (
          entries.map((entry) => (
            <article className="log-entry" key={`${entry.date}-${entry.title}`}>
              <time dateTime={entry.date}>{entry.date}</time>
              <h2>{entry.title}</h2>
              <p>{entry.body}</p>
              {entry.project && (
                <Link
                  prefetch={false}
                  className="inline-link"
                  href={`/projects/${entry.project}`}
                >
                  The project
                </Link>
              )}
            </article>
          ))
        ) : (
          <div className="empty-log">
            <h2>
              Building first.
              <br />
              Notes to follow.
            </h2>
            <p>
              No posts yet. In the meantime, the project stories are a good
              place to start.
            </p>
            <Link prefetch={false} className="button" href="/#work">
              Explore the projects
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
