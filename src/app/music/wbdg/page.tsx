import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { ReleaseExperience } from "@/components/release-experience";
import { resolveReleasePhase } from "@/content/site";
import { releaseMetadata } from "@/content/seo";

// This URL names the song, so it doesn't exist until pre-save begins.
export async function generateMetadata(): Promise<Metadata> {
  await connection();
  const phase = resolveReleasePhase();
  return phase === "early" ? {} : releaseMetadata(phase);
}

export default async function ReleasePage() {
  await connection();
  const phase = resolveReleasePhase();
  if (phase === "early") notFound();
  return <ReleaseExperience phase={phase} />;
}
