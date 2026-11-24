import type { Metadata, Viewport } from "next";
import { Corben, Questrial } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import { resolveReleasePhase, site } from "@/content/site";
import { Tracking } from "@/components/tracking";
import { ProfileLinks } from "@/components/profile-links";
import { ProfileDialog } from "@/components/profile-dialog";
import "./globals.css";

const corben = Corben({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-corben" });
const questrial = Questrial({ subsets: ["latin"], weight: "400", variable: "--font-questrial" });

export const metadata: Metadata = {
  title: { default: "Mace", template: "%s | Mace" },
  description: site.description,
  robots: { index: false, follow: false },
};

export const viewport: Viewport = { themeColor: "#120a0f" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={`${corben.variable} ${questrial.variable}`}><body data-phase={resolveReleasePhase()}>
    <a className="skip-link" href="#main">Skip to content</a>
    <div className="site-shell">
      <header className="site-header">
        <Link className="header-avatar" href="/" aria-label="Mace home">
          <Image src="/images/mace-avatar.png" width={48} height={48} alt="" unoptimized />
        </Link>
        <ProfileDialog />
      </header>
      <main id="main">{children}</main>
      <footer className="site-footer"><ProfileLinks /><Tracking /><span className="copyright">© {new Date().getFullYear()} Mace</span></footer>
    </div>
  </body></html>;
}
