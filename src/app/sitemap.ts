import type { MetadataRoute } from "next";
import { isIndexableDeployment, siteOrigin } from "@/content/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  // The release route mirrors the homepage, so both point to the same canonical.
  return isIndexableDeployment ? [{ url: `${siteOrigin}/` }] : [];
}
