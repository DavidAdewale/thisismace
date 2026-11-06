import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/content/site";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Mace — The beginning", template: "%s | Mace" },
  description: site.description,
  robots: { index: false, follow: false }, // Remove when the public launch is ready.
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>
    <a className="skip-link" href="#main">Skip to content</a>
    <div className="site-shell">
      <header className="site-header"><Link className="wordmark" href="/" aria-label="Mace home">MACE<span aria-hidden="true">.</span></Link>
        <nav aria-label="Main navigation"><Link href="/music/wbdg">The music</Link><Link href="/circle">The Circle</Link></nav>
      </header>
      <main id="main">{children}</main>
      <footer className="site-footer"><Link className="wordmark" href="/">MACE.</Link><span>The beginning of something.</span><span>© {new Date().getFullYear()} Mace</span></footer>
    </div>
  </body></html>;
}
