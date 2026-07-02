import type { MetadataRoute } from "next";
import { articles } from "../content/articles";

const baseUrl = "https://www.cxodex.com";
const routes = ["/", "/about", "/services", "/methodology", "/cases", "/insights", "/contact"];
const articleRoutes = articles.map((article) => `/insights/${article.slug}`);

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [...routes, ...articleRoutes].map((route) => ({
    url: `${baseUrl}${route === "/" ? "" : route}`,
    lastModified: route.startsWith("/insights/") ? new Date("2026-06-11") : new Date("2026-06-09"),
    changeFrequency: route.startsWith("/insights") ? "weekly" : "monthly",
    priority: route === "/" ? 1 : 0.8
  }));
}
