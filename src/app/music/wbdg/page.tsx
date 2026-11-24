import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { ReleaseExperience } from "@/components/release-experience";
import { currentRelease, resolveReleasePhase } from "@/content/site";

// This URL names the song, so it doesn't exist until pre-save begins.
// Rendered per request so it appears on schedule, without a rebuild.
export async function generateMetadata(): Promise<Metadata> {
  await connection();
  return resolveReleasePhase() === "early" ? {} : { title: currentRelease.title };
}

export default async function ReleasePage() {
  await connection();
  const phase = resolveReleasePhase();
  if (phase === "early") notFound();
  return <ReleaseExperience phase={phase} />;
}
