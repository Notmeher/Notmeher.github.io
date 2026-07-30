import type { Metadata } from "next";
import "@fontsource/cormorant-garamond/500.css";
import "@fontsource/cormorant-garamond/600.css";
import "@fontsource/cormorant-garamond/700.css";
import "@fontsource/dm-sans/400.css";
import "@fontsource/dm-sans/500.css";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";
import { PointerTrail } from "@/components/pointer-trail";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://lifeasmeher.vercel.app";
const metadataBase = new URL(siteUrl.endsWith("/") ? siteUrl : `${siteUrl}/`);

export const metadata: Metadata = {
  metadataBase,
  title: "Mehedi Hasan Nipu | AI Engineer",
  description:
    "Portfolio of Mehedi Hasan Nipu, an AI engineer and researcher building production-grade agentic systems, LLM applications, and trustworthy machine learning tools.",
  keywords: [
    "Mehedi Hasan Nipu",
    "AI engineer",
    "LLM agents",
    "multi-agent systems",
    "machine learning researcher",
  ],
  authors: [{ name: "Mehedi Hasan Nipu" }],
  openGraph: {
    title: "Mehedi Hasan Nipu | AI Engineer",
    description:
      "Production AI systems, multi-agent workflows, and applied machine learning research.",
    type: "website",
    images: [new URL("images/avatar.png", metadataBase).toString()],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <PointerTrail />
        {children}
      </body>
    </html>
  );
}
