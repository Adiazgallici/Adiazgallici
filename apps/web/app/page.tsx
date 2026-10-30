import Link from "next/link";
import { firstLive, formatMonth, projects, snapshotDate } from "@/lib/projects";
import { DenoiseHero } from "@/components/denoise-hero";
import { LatentMap } from "@/components/latent-map";
import { Inference } from "@/components/inference";
import { ProjectVisual } from "@/components/project-visual";
import { SupplyChain } from "@/components/supply-chain";

const HERO_LINES = ["Real problems.", "Useful software."];

export default function Home() {
  const stock = projects.find((p) => p.slug === "lessio-stock")!;
  const listed = projects.filter((p) => p !== stock);
  return (
    <>
      <section className="hero wrap" aria-labelledby="hero-title">
        <h1 id="hero-title" className="visually-hidden">
          Agustín Diaz. Real problems, useful software.
        </h1>
        <DenoiseHero lines={HERO_LINES} />
        <div className="hero-body">
          <p className="hero-intro">
            I’m Agustín. I import and sell products online with Lessio &amp; Co, and I build
            the software the business needs. Some of it becomes products for other sellers.
          </p>
          <dl className="hero-facts">
            <div>
              <dt>Role</dt>
              <dd>Sr. AI Software Engineer at Mercado Libre</dd>
            </div>
            <div>
              <dt>Business</dt>
              <dd>Co-founder &amp; CTO, Lessio &amp; Co</dd>
            </div>
            <div>
              <dt>Live</dt>
              <dd>
                {projects.length} projects in production since{" "}
                {formatMonth(firstLive.liveSince)}
              </dd>
            </div>
          </dl>
          <div className="hero-actions">
            <a className="button primary" href="#work">
              See the work
            </a>
            <Link prefetch={false} className="button" href="/now">
              What I’m building now
            </Link>
          </div>
        </div>
      </section>

      <section id="map" className="map-section wrap" aria-labelledby="map-heading">
        <div className="section-head">
          <h2 id="map-heading">Six projects, one map.</h2>
          <p>
            Further right means built for other people. Higher up means more AI inside. Bigger,
            hotter dots have been in real use for longer. Lines join each project to its nearest neighbour.
          </p>
        </div>
        <LatentMap projects={projects} />
      </section>

      <section id="lessio-stock" className="system-section wrap" aria-labelledby="system-heading">
        <div className="system-head">
          <div className="system-copy">
            <p className="work-kind">
              Built for our business <span aria-hidden="true">/</span> {stock.status}
            </p>
            <h2 id="system-heading">The system that runs Lessio &amp; Co.</h2>
            <p className="system-intro">
              Every product we import goes through Lessio Stock, from the order in China to the
              customer’s door. It has run our business every day since January 2026, connected
              directly to the Mercado Libre API.
            </p>
            <Link prefetch={false} className="text-link" href="/projects/lessio-stock">
              Read the model card
            </Link>
          </div>
          <Link
            prefetch={false}
            href="/projects/lessio-stock"
            className="work-visual system-visual"
            tabIndex={-1}
            aria-hidden="true"
          >
            <ProjectVisual project={stock} />
          </Link>
        </div>
        <SupplyChain />
      </section>

      <section id="work" className="work-section wrap" aria-labelledby="work-heading">
        <div className="section-head">
          <h2 id="work-heading">What goes in, what comes out.</h2>
          <p>The other projects, each described by one real input and the output it produces.</p>
        </div>
        <ol className="work-list">
          {listed.map((project) => (
            <li key={project.slug} className={`work-item work-${project.slug}`}>
              <div className="work-copy">
                <p className="work-kind">
                  {project.category} <span aria-hidden="true">/</span> {project.status}
                </p>
                <h3>
                  <Link prefetch={false} href={`/projects/${project.slug}`}>
                    {project.name}
                  </Link>
                </h3>
                <p className="work-description">{project.description}</p>
                <p className="work-proof">{project.proof.headline}</p>
                <Inference project={project} />
                <Link
                  prefetch={false}
                  className="text-link"
                  href={`/projects/${project.slug}`}
                  aria-label={`Read the ${project.name} model card`}
                >
                  Read the model card
                </Link>
              </div>
              <Link
                prefetch={false}
                href={`/projects/${project.slug}`}
                className="work-visual"
                tabIndex={-1}
                aria-hidden="true"
              >
                <ProjectVisual project={project} />
              </Link>
            </li>
          ))}
        </ol>
        <p className="build-footnote">
          Usage numbers as of {snapshotDate}. Most of the source is private; the products
          and screenshots are real.
        </p>
      </section>

      <section className="now-teaser wrap" aria-labelledby="now-heading">
        <h2 id="now-heading">Still training.</h2>
        <p>
          Right now: opening Vindue to more sellers and moving the Lessio &amp; Co store off
          Tiendanube, one step at a time.
        </p>
        <Link prefetch={false} href="/now" className="button">
          Read the Now page
        </Link>
      </section>
    </>
  );
}
