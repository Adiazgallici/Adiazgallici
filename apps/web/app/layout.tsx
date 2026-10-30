import type { Metadata } from "next";
import { Doto, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import { Header, Footer } from "@/components/site-shell";
import "./globals.css";
const dots = Doto({
  subsets: ["latin"],
  axes: ["ROND"],
  variable: "--font-dots",
});
const sans = IBM_Plex_Sans({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-sans",
});
const mono = IBM_Plex_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-mono",
});
const origin =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.adiazgallici.dev";
export const metadata: Metadata = {
  metadataBase: new URL(origin),
  title: {
    default: "Agustín Diaz: real problems, useful software",
    template: "%s · Agustín Diaz",
  },
  description:
    "Sr. AI Software Engineer at Mercado Libre and co-founder & CTO of Lessio & Co, a business that imports and sells physical products. Here are the products and tools I’ve built to solve real problems.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Agustín Diaz",
    title: "Agustín Diaz: real problems, useful software",
    description:
      "AI engineer and e-commerce founder. Building software from real problems.",
  },
  twitter: { card: "summary_large_image" },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-theme="dark"
      suppressHydrationWarning
      className={`${dots.variable} ${sans.variable} ${mono.variable}`}
    >
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{document.documentElement.dataset.theme=localStorage.getItem('portfolio-theme')==='light'?'light':'dark'}catch{}",
          }}
        />
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Header />
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
