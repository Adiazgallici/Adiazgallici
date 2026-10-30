import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";

export function Header() {
  return (
    <header className="site-header">
      <div className="wrap header-inner">
        <Link prefetch={false} className="wordmark" href="/" aria-label="Agustín Diaz, home">
          <span className="monogram" aria-hidden="true">
            ad
          </span>
          <span className="wordmark-name">Agustín Diaz</span>
        </Link>
        <nav aria-label="Main navigation">
          <Link prefetch={false} href="/#map">
            Map
          </Link>
          <Link prefetch={false} href="/#work">
            Work
          </Link>
          <Link prefetch={false} href="/now">
            Now
          </Link>
          <a href="https://github.com/Adiazgallici" className="github-link">
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.87c-2.78.6-3.37-1.18-3.37-1.18-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.35 1.09 2.93.83.09-.65.35-1.09.64-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.67-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02A9.6 9.6 0 0 1 12 6.82c.85 0 1.71.11 2.51.34 1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.69 1.03 1.58 1.03 2.67 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85v2.76c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
            </svg>
            <span>GitHub</span>
          </a>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-inner">
        <p className="footer-line">Made in Argentina.</p>
        <div className="footer-links">
          <Link prefetch={false} href="/now">
            Now
          </Link>
          <Link prefetch={false} href="/log">
            Build log
          </Link>
          <a href="https://github.com/Adiazgallici">GitHub</a>
        </div>
        <span className="footer-copyright">© {new Date().getFullYear()} Agustín Diaz</span>
      </div>
    </footer>
  );
}
