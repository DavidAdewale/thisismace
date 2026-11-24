import { connection } from "next/server";
import { ReleaseExperience } from "@/components/release-experience";
import { resolveReleasePhase } from "@/content/site";

export default async function Home() {
  await connection();
  return <ReleaseExperience phase={resolveReleasePhase()} />;
}
