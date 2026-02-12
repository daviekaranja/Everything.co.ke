import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/lib/components/navbar/Navbar";
import { Footer } from "../lib/components/footer";
import { ClientProviders } from "@/lib/providers";
import Script from "next/script";

/* -----------------------------------------------------
   Font setup
----------------------------------------------------- */
// 1. Initialize the font and assign it to a CSS variable
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter", // Must match var(--font-inter) in your globals.css
});

/* -----------------------------------------------------
   Global Metadata
----------------------------------------------------- */

export const metadata: Metadata = {
  metadataBase: new URL("https://everything.co.ke"),
  title: {
    template: "%s | Everything.co.ke",
    default:
      "Everything.co.ke | Professional Online Cyber & Portal Assistance Kenya",
  },
  description:
    "Independent professional assistance for eCitizen, KRA, NTSA, and HELB portals. Fast, reliable online cyber services for Kenyans.",
  alternates: {
    canonical: "https://everything.co.ke",
  },
  authors: [{ name: "Everything.co.ke" }],
  category: "Business Services", // Changed from Government to Business
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_KE",
    url: "https://everything.co.ke",
    siteName: "Everything.co.ke",
    title: "Everything.co.ke | Professional Online Cyber Services Kenya",
    description:
      "Get expert help with your KRA, NTSA, and eCitizen applications. We are an independent service provider helping you navigate digital portals.",
    images: [
      {
        url: "/og-image.jpeg",
        width: 1200,
        height: 630,
        alt: "Everything.co.ke - Digital Assistant Services Kenya",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Everything.co.ke | Online Cyber Services Kenya",
    description:
      "Fast and reliable assistance for KRA, NTSA, HELB, and eCitizen portals.",
    images: ["/og-image.jpeg"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

/* -----------------------------------------------------
   Root Layout
----------------------------------------------------- */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <head>
        {/* Verification Meta Tag */}
        <meta name="google-adsense-account" content="ca-pub-7345060853696984" />

        {process.env.NODE_ENV === "production" && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_AD_PUBLISHER_ID}`}
            crossOrigin="anonymous"
          />
        )}
      </head>

      <body className="min-h-screen flex flex-col bg-brand-bg dark:bg-brand-dark text-text-main">
        <ClientProviders>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </ClientProviders>
      </body>
    </html>
  );
}
