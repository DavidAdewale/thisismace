import { connection } from "next/server";
import { ReleaseExperience } from "@/components/release-experience";
import { resolveReleasePhase } from "@/content/site";
import { releaseMetadata } from "@/content/seo";
import { ArtistSchema } from "@/components/artist-schema";

export function generateMetadata() {
  return releaseMetadata(resolveReleasePhase());
}

export default async function Home() {
  await connection();
  const phase = resolveReleasePhase();
  return (
    <>
      <ArtistSchema phase={phase} />
      <ReleaseExperience phase={phase} />
    </>
  );
}
