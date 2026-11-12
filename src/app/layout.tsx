import type { Metadata } from "next";
import localFont from "next/font/local";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { identity } from "@/content/profile";
import { assets, publicAssetUrl } from "@/lib/assets";
import "./globals.css";

const manrope = localFont({
  src: "./fonts/manrope-latin.woff2",
  variable: "--font-manrope",
  weight: "200 800",
  display: "swap",
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  title: { default: identity.name, template: `%s | ${identity.name}` },
  description: `${identity.role} based in ${identity.location}. ${identity.intro}`,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={manrope.variable}>
      <body className="flex min-h-screen flex-col">
        <a href="#main" className="skip-link">Skip to content</a>
        <SiteHeader name={identity.name} cvUrl={publicAssetUrl(assets.cv)} />
        <main id="main" tabIndex={-1} className="grow">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
