import type { MetadataRoute } from "next";
import { projects } from "@/lib/projects";
export default function sitemap(): MetadataRoute.Sitemap {
  const origin =
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.adiazgallici.dev";
  return [
    "",
    "/now",
    "/log",
    ...projects.map((p) => `/projects/${p.slug}`),
  ].map((path) => ({ url: `${origin}${path}` }));
}
