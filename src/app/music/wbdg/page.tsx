import type { Metadata } from "next";
import { PhasePreview } from "@/components/phase-preview";
import { ReleaseExperience } from "@/components/release-experience";
import { resolveReleasePhase } from "@/content/site";
export const metadata: Metadata = { title: "Who Be Dat Girl?" };
export default async function ReleasePage({ searchParams }: PageProps<"/music/wbdg">) {
  const phaseParam = (await searchParams).phase;
  const phase = resolveReleasePhase(typeof phaseParam === "string" ? phaseParam : undefined);
  return <><ReleaseExperience phase={phase} /><PhasePreview active={phase} /></>;
}
