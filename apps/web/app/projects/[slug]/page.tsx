import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { formatMonth, projects, snapshotDate } from "@/lib/projects";
import { ProjectVisual } from "@/components/project-visual";
import { Inference } from "@/components/inference";
import { SupplyChain } from "@/components/supply-chain";
export const dynamicParams = false;
export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((p) => p.slug === slug);
  return { title: p?.name ?? "Project not found", description: p?.description };
}
export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();
  const next = projects[(projects.indexOf(project) + 1) % projects.length];
  return (
    <article className="wrap project-page">
      <Link prefetch={false} className="back-link" href="/#work">
        All projects
      </Link>
      <header className="project-header">
        <p className="work-kind">
          Model card <span aria-hidden="true">/</span> {project.category}
        </p>
        <h1>{project.name}</h1>
        <p className="project-deck">{project.headline}</p>
        <p className="project-summary">{project.description}</p>
        <a className="button primary" href={project.url}>
          {project.urlLabel}
        </a>
      </header>

      <dl className="card-meta">
        <div>
          <dt>Status</dt>
          <dd>{project.status}</dd>
        </div>
        <div>
          <dt>Built</dt>
          <dd>{project.year}</dd>
        </div>
        <div>
          <dt>Live since</dt>
          <dd>{formatMonth(project.liveSince)}</dd>
        </div>
        <div>
          <dt>In use</dt>
          <dd>{project.proof.headline}</dd>
        </div>
      </dl>

      <figure className="project-figure">
        <ProjectVisual project={project} priority />
        <figcaption>{project.caption}</figcaption>
      </figure>

      {project.slug === "lessio-stock" && (
        <section className="card-section card-system" aria-labelledby="system-heading">
          <h2 id="system-heading">From China to the customer</h2>
          <SupplyChain />
        </section>
      )}

      <section className="card-section card-example" aria-labelledby="example-heading">
        <h2 id="example-heading">Example inference</h2>
        <Inference project={project} />
      </section>

      <div className="card-grid">
        <section className="card-section" aria-labelledby="use-heading">
          <h2 id="use-heading">Intended use</h2>
          <p>{project.problem}</p>
        </section>
        <section className="card-section" aria-labelledby="cap-heading">
          <h2 id="cap-heading">What it does</h2>
          <ul>
            {project.built.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
        <section className="card-section" aria-labelledby="arch-heading">
          <h2 id="arch-heading">Architecture</h2>
          <ul className="stack-list">
            {project.stack.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </section>
        <section className="card-section" aria-labelledby="eval-heading">
          <h2 id="eval-heading">In the real world</h2>
          <ul>
            {project.proof.detail.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="card-note">Numbers as of {snapshotDate}.</p>
          {project.slug === "isclaude-2x" && (
            <p>
              <a className="text-link" href="https://github.com/Adiazgallici/isclaude-2x">
                Read the source
              </a>
            </p>
          )}
        </section>
        <section className="card-section card-limits" aria-labelledby="limits-heading">
          <h2 id="limits-heading">Limitations and context</h2>
          <p>{project.context}</p>
        </section>
        {project.slug === "isclaude-2x" && (
          <section className="card-section" aria-labelledby="install-heading">
            <h2 id="install-heading">Install</h2>
            <pre>
              <code>npx isclaude-2x</code>
            </pre>
          </section>
        )}
      </div>

      <nav className="next-project" aria-label="Next project">
        <span>Next model card</span>
        <Link prefetch={false} href={`/projects/${next.slug}`}>
          {next.name}
        </Link>
      </nav>
    </article>
  );
}
