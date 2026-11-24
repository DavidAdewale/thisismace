import type { MetadataRoute } from "next";
import { isIndexableDeployment, siteOrigin } from "@/content/seo";

export default function robots(): MetadataRoute.Robots {
  if (!isIndexableDeployment) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/", "/_next/webpack-hmr"] },
    sitemap: `${siteOrigin}/sitemap.xml`,
  };
}
