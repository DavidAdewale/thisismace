import { QuietPage } from "@/components/quiet-page";
import { quietPhotos } from "@/content/site";

export default function NotFound() {
  return <QuietPage eyebrow="404" lines={[{ text: "This page" }, { text: "isn’t here.", em: true }]} photo={quietPhotos.notFound} />;
}
