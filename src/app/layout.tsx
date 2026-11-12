import type { Metadata } from "next";
import Link from "next/link";
import { identity } from "@/content/profile";
import { assets, publicAssetUrl } from "@/lib/assets";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: identity.name, template: `%s | ${identity.name}` },
  description: `${identity.role} based in ${identity.location}. ${identity.intro}`,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col">
        <a href="#main" className="skip-link">Skip to content</a>
        <header className="border-b border-rule">
          <div className="site-container flex flex-wrap items-center justify-between gap-x-8 gap-y-2 py-5">
            <Link href="/" className="font-semibold text-ink no-underline hover:underline">{identity.name}</Link>
            <nav aria-label="Main navigation">
              <ul className="flex flex-wrap gap-x-5 gap-y-2">
                <li><Link href="/work/">Work</Link></li>
                <li><Link href="/about/">About</Link></li>
                <li><a href={publicAssetUrl(assets.cv)}>CV</a></li>
                <li><Link href="/#contact">Contact</Link></li>
              </ul>
            </nav>
          </div>
        </header>
        <main id="main" tabIndex={-1} className="grow">{children}</main>
        <footer className="bg-ink text-paper">
          <div className="site-container flex flex-wrap items-center justify-between gap-4 py-6">
            <span>{identity.name} · {identity.location}</span>
            <Link href="/#contact" className="text-paper">Get in touch</Link>
          </div>
        </footer>
      </body>
    </html>
  );
}
