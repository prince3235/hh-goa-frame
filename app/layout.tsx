import type { Metadata, Viewport } from "next";
import { Fraunces, Space_Grotesk, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap"
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap"
});

const ibmPlexMono = IBM_Plex_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap"
});

export const viewport: Viewport = {
  themeColor: "#0A3A27",
  width: "device-width",
  initialScale: 1
};

export const metadata: Metadata = {
  title: "HH Goa 2026 — Frame & Builder ID Generator",
  description:
    "Upload a photo, get your Hacker House Goa 2026 branded frame or Builder ID card in seconds. No login. Download and share to X with #FrameInGoa.",
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg"
  },
  openGraph: {
    title: "HH Goa 2026 — Frame & Builder ID Generator",
    description: "Get your Hacker House Goa 2026 identity in under 2 seconds.",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "HH Goa 2026 — Frame & Builder ID Generator",
    description: "Get your Hacker House Goa 2026 identity in under 2 seconds."
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${spaceGrotesk.variable} ${ibmPlexMono.variable}`}
      suppressHydrationWarning
    >
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}
