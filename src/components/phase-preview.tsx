import Link from "next/link";

export function PhasePreview({ active }: { active: string }) {
  if (process.env.NODE_ENV !== "development") return null;

  return (
    <nav className="phase-preview" aria-label="Preview release phase">
      <span>Preview</span>
      {(["early", "presave", "released"] as const).map((phase) => (
        <Link key={phase} href={`/?phase=${phase}`} aria-current={active === phase ? "page" : undefined}>{phase}</Link>
      ))}
    </nav>
  );
}
