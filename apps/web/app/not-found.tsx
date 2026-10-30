import Link from "next/link";
export default function NotFound() {
  return (
    <div className="wrap writing-page">
      <p className="work-kind">404</p>
      <h1>Out of distribution.</h1>
      <p className="writing-intro">
        There’s no page at this address. The projects are on the home page.
      </p>
      <Link prefetch={false} className="button" href="/">
        Go to the home page
      </Link>
    </div>
  );
}
