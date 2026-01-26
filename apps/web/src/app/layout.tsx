import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "../lib/components/navbar";
import { Footer } from "../lib/components/footer";
import { ClientProviders } from "@/lib/providers";
import Script from "next/script";

/* -----------------------------------------------------
   Font setup
----------------------------------------------------- */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

/* -----------------------------------------------------
   Global Metadata
----------------------------------------------------- */

export const metadata: Metadata = {
  metadataBase: new URL("https://everything.co.ke"),

  title: {
    default: "Everything.co.ke — Trusted Online Cyber Services in Kenya",
    template: "%s | Everything.co.ke",
  },

  description:
    "Kenya's reliable partner for KRA, NTSA, HELB, and eCitizen services. We provide fast, accurate assistance for passport applications and document processing.",

  // Canonical prevents duplicate content issues
  alternates: {
    canonical: "https://everything.co.ke",
  },

  authors: [{ name: "Everything.co.ke" }],
  category: "Government & Business Services",

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
    title: "Everything.co.ke — Online Cyber Services in Kenya",
    description:
      "Get professional assistance with KRA, NTSA, eCitizen, HELB, and more. Fast and reliable services across Kenya.",
    images: [
      {
        url: "/og-image.jpeg",
        width: 1200,
        height: 630,
        alt: "Everything.co.ke Online Cyber Services Kenya",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Everything.co.ke — Online Cyber Services in Kenya",
    description:
      "Fast and reliable online cyber services in Kenya: KRA, NTSA, HELB, eCitizen, and more.",
    images: ["/og-image.jpeg"],
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png", // Recommended for mobile SEO
  },
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
    <html lang="en" className={inter.variable}>
      <head>
        {/* Verification Meta Tag */}
        <meta name="google-adsense-account" content="ca-pub-7345060853696984" />

        {/* The Library: Loads the ad engine, but doesn't place ads yet */}
        {/* <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7345060853696984"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        /> */}

        {process.env.NODE_ENV === "production" && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_AD_PUBLISHER_ID}`}
            crossOrigin="anonymous"
          />
        )}
      </head>

      <body className="">
        <ClientProviders>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </ClientProviders>
      </body>
    </html>
  );
}
