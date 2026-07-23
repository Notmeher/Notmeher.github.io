import type { Metadata } from "next";
import "@fontsource/cormorant-garamond/500.css";
import "@fontsource/cormorant-garamond/600.css";
import "@fontsource/dm-sans/400.css";
import "@fontsource/dm-sans/500.css";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://notmeher.github.io"),
  title: "Mehedi Hasan Nipu | AI Application Developer",
  description:
    "Portfolio of Mehedi Hasan Nipu, an application developer and AI researcher building production-grade agentic systems, LLM applications, and trustworthy machine learning tools.",
  keywords: [
    "Mehedi Hasan Nipu",
    "AI application developer",
    "LLM agents",
    "multi-agent systems",
    "machine learning researcher",
  ],
  authors: [{ name: "Mehedi Hasan Nipu" }],
  openGraph: {
    title: "Mehedi Hasan Nipu | AI Application Developer",
    description:
      "Production AI systems, multi-agent workflows, and applied machine learning research.",
    type: "website",
    images: ["/images/avatar.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
