import Link from "next/link";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Now",
  description: "What Agustín Diaz is building and focusing on right now.",
};
export default function Now() {
  return (
    <div className="wrap writing-page">
      <p className="work-kind">Now</p>
      <h1>Still training.</h1>
      <p className="writing-intro">
        The projects, questions and small next steps
        <br className="desktop-break" /> on my desk right now.
      </p>
      <p className="dateline">Updated October 24, 2026</p>
      <div className="writing-body">
        <section>
          <p className="work-kind">Engineering</p>
          <h2>Engineering with AI.</h2>
          <p>
            I’m a Sr. AI Software Engineer at Mercado Libre. Outside of work, I
            build independent products and the software behind Lessio & Co, the
            business I co-founded to import and sell products online. I’m its CTO.
          </p>
        </section>
        <section>
          <p className="work-kind">The product</p>
          <h2>Making Vindue useful for other sellers.</h2>
          <p>
            Vindue started with a problem I had at Lessio & Co: creating a
            complete, consistent gallery for a marketplace listing. I’m building
            on that foundation, from the product brief to the final export.
          </p>
          <Link
            prefetch={false}
            href="/projects/vindue"
            className="inline-link"
          >
            More about Vindue
          </Link>
        </section>
        <section>
          <p className="work-kind">The business</p>
          <h2>A storefront of our own.</h2>
          <p>
            Building the Lessio & Co shopping experience mobile-first and
            moving off Tiendanube step by step. More ownership
            of the experience, the content and the data.
          </p>
          <Link
            prefetch={false}
            href="/projects/lessio-store"
            className="inline-link"
          >
            Explore the storefront project
          </Link>
        </section>
        <section>
          <p className="work-kind">The habit</p>
          <h2>Showing the work.</h2>
          <p>
            This site is a place for the products and the thinking behind them.
            Next: a build log for the decisions, experiments and things that
            change along the way.
          </p>
          <Link prefetch={false} href="/log" className="inline-link">
            The build log
          </Link>
        </section>
      </div>
    </div>
  );
}
