import type { Metadata } from "next";
import { QuietPage } from "@/components/quiet-page";
import { quietPhotos } from "@/content/site";

export const metadata: Metadata = { title: "The Circle" };

export default function CirclePage() {
  return <QuietPage eyebrow="The Listening Circle" lines={[{ text: "Not quite" }, { text: "yet.", em: true }]} photo={quietPhotos.circle} />;
}
