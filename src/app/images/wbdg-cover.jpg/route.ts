import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { resolveReleasePhase } from "@/content/site";

export async function GET() {
  if (resolveReleasePhase() !== "released") {
    return new Response(null, { status: 404, headers: { "Cache-Control": "no-store" } });
  }

  const artwork = await readFile(join(process.cwd(), "src", "assets", "wbdg-cover.jpg"));
  return new Response(new Uint8Array(artwork), {
    headers: { "Content-Type": "image/jpeg", "Cache-Control": "public, max-age=3600" },
  });
}
