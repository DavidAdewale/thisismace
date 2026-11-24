import type { Metadata } from "next";
import { currentRelease, phasePhotos, site, type ReleasePhase } from "@/content/site";

export const siteOrigin = "https://www.thisismace.com";
export const isIndexableDeployment = process.env.NODE_ENV === "production" &&
  (!process.env.VERCEL_ENV || process.env.VERCEL_ENV === "production");

export function releaseMetadata(phase: ReleasePhase): Metadata {
  const title = "Mace | Official Artist Website";
  const sharingTitle = phase === "early" ? title : `${currentRelease.title} | Mace`;
  const description = {
    early: site.description,
    presave: `${currentRelease.title} by Mace arrives 12 February 2027. Find pre-save and release updates on the official Mace website.`,
    released: `${currentRelease.title} by Mace is out now. Find official listening links and keep up with Mace.`,
  }[phase];
  const photo = phase === "released" ? currentRelease.artwork : phasePhotos[phase];
  const image = {
    url: photo.src,
    alt: photo.alt,
    width: phase === "released" ? 2400 : 1600,
    height: phase === "released" ? 2400 : 1999,
  };

  return {
    title: { absolute: title },
    description,
    robots: { index: isIndexableDeployment, follow: isIndexableDeployment },
    alternates: { canonical: "/" },
    openGraph: { type: "website", siteName: site.name, url: "/", title: sharingTitle, description, images: [image] },
    twitter: { card: "summary_large_image", title: sharingTitle, description, images: [image] },
  };
}
