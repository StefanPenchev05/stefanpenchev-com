import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Stefan Penchev | Engineering Operations Portfolio",
  description:
    "Immersive 3D portfolio prototype for Stefan Penchev, full-stack web developer and cybersecurity engineer."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
