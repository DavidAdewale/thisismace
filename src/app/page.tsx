import { connection } from "next/server";
import { ReleaseExperience } from "@/components/release-experience";
import { resolveReleasePhase } from "@/content/site";

export default async function Home() {
  // Render per request so the page switches phase on schedule, without a rebuild.
  await connection();
  return <ReleaseExperience phase={resolveReleasePhase()} />;
}
