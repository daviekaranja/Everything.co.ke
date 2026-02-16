import { Metadata } from "next";
import ServiceGrid from "@/lib/components/services/CategoryFilter"; // assuming this is your renamed component

export const metadata: Metadata = {
  title: "Government & Professional Services | EverythingKe",
  description:
    "Fast-track your KRA returns, business registrations, and legal documentation with EverythingKe. Secure and efficient.",
  alternates: { canonical: "/services" },
};

// Optional: control how long the page / data is cached (ISR style)
// Revalidate every 1 hour (3600 seconds) — adjust based on how often services change
export const revalidate = 3600;

// Or force dynamic rendering if you want fresh data every request (rare for this page)
// export const dynamic = 'force-dynamic';

export default async function ServicesPage() {
  let initialServices = [];

  try {
    const res = await fetch(
      `${process.env.API_BASE_URL}/services/filtered?limit=50`,
      {
        // Default = force-cache → persists across requests & deployments (like getStaticProps)
        // Good default for a mostly-static services list
        cache: "force-cache",

        // Alternative options you can swap to:
        // cache: "no-store",               // always fresh (like SSR)
        // next: { revalidate: 3600 },      // ISR: re-generate every hour
        // next: { tags: ["services"] },    // on-demand revalidate via revalidateTag("services")
      },
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch services: ${res.status}`);
    }

    initialServices = await res.json();
  } catch (error) {
    console.error("Failed to fetch services for RSC:", error);
    // You could return a fallback UI or trigger an error boundary here
  }

  // Structured Data (JSON-LD) – good for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "EverythingKe Fast-Track Services",
    description:
      "Professional assistance for Kenyan government and civil services.",
    provider: {
      "@type": "Organization",
      name: "EverythingKe",
    },
  };

  return (
    <main
      id="main-content"
      className="max-w-7xl mx-auto py-12 bg-brand-bg min-h-screen"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <ServiceGrid initialServices={initialServices} />
    </main>
  );
}
