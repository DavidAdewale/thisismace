import { PhasePreview } from "@/components/phase-preview";
import { ReleaseExperience } from "@/components/release-experience";
import { resolveReleasePhase } from "@/content/site";

export default async function Home({ searchParams }: PageProps<"/">) {
  const phaseParam = (await searchParams).phase;
  const phase = resolveReleasePhase(typeof phaseParam === "string" ? phaseParam : undefined);
  return <><ReleaseExperience phase={phase} /><PhasePreview active={phase} /></>;
}
