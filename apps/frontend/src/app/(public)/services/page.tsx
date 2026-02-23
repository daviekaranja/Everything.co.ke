import { Metadata } from "next";
import ServiceGrid from "@/lib/components/services/CategoryFilter";

export const metadata: Metadata = {
  title: "Online Cyber Services Kenya | KRA, eCitizen & Business Registration",
  description:
    "The #1 platform for online cyber services in Kenya. Fast-track KRA returns, eCitizen applications, NTSA, and Business Registration. Done in 60 minutes.",
  alternates: { canonical: "https://everything.co.ke/services" },
  openGraph: {
    title: "EverythingKe | Professional Online Cyber Services",
    description:
      "Reliable assistance for all government portal services in Kenya.",
    images: ["/og-image.jpeg"], // Ensure this exists for social sharing
  },
};

export const revalidate = 3600;

export default async function ServicesPage() {
  // Enhanced Structured Data for Rich Results
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "GovernmentService", // More specific than "Service"
    name: "EverythingKe Online Cyber Services",
    description:
      "Professional assistance for eCitizen, KRA, NTSA, and Business Registration in Kenya.",
    provider: {
      "@type": "Organization",
      name: "EverythingKe",
      url: "https://everything.co.ke",
      logo: "https://everything.co.ke/logo.png",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Nairobi",
        addressCountry: "KE",
      },
    },
    areaServed: "Kenya",
    serviceType: "Government Document Processing",
  };

  return (
    <main id="main-content" className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1. SEO HERO SECTION (Crucial for H1 Ranking) */}
      <section className=" border-b border-black/5 dark:border-white/5 bg-brand-bg dark:bg-brand-dark">
        <div className="container-center ">
          <div className="max-w-3xl">
            <h1 className="text-h1 py-8">
              Online <span className="text-accent">Cyber Services</span> Kenya.
            </h1>
            <p className="text-lg text-text-muted font-medium leading-relaxed">
              Skip the queues. We provide expert facilitation for
              <span className="text-foreground"> KRA Tax Returns</span>,
              <span className="text-foreground"> eCitizen Applications</span>,
              <span className="text-foreground"> Business Registration</span>,
              and
              <span className="text-foreground"> NTSA Portal</span> management.
            </p>
          </div>
        </div>
      </section>

      {/* 2. THE SERVICE GRID */}
      {/* IMPORTANT: Ensure CategoryFilter renders the list on the server
          even before the user interacts with filters!
      */}
      <section className="py-12">
        <div className="">
          <ServiceGrid />
        </div>
      </section>

      {/* 3. SEMANTIC FOOTER CONTENT (The "Competitor Killer") */}
      {/* This section helps you rank for "How to" and "Where to" queries */}
      <section className="smooth-card mb-4 ">
        <div className="p-6">
          <div className="prose prose-sm dark:prose-invert max-w-none">
            <h2 className="text-2xl font-bold mb-4">
              Why Use EverythingKe for Cyber Services?
            </h2>
            <p className="text-text-muted mb-6">
              Navigating Kenyan government portals like{" "}
              <strong>eCitizen</strong> or the <strong>iTax KRA portal</strong>{" "}
              can be daunting. Errors in application can lead to rejected
              passports or heavy KRA penalties. Our platform connects you with
              certified agents who ensure your
              <strong> Company Registration</strong> or{" "}
              <strong>Police Clearance (Good Conduct)</strong>
              is handled accurately and fast.
            </p>

            <div className="grid md:grid-cols-2 gap-8 not-prose">
              <div>
                <h3 className="font-bold text-accent uppercase text-xs tracking-widest mb-2">
                  Popular Services
                </h3>
                <ul className="text-sm space-y-2 font-medium">
                  <li>• Individual & Non-Resident KRA PIN Registration</li>
                  <li>• Filing KRA Nil Returns & Employment Returns</li>
                  <li>• Business Name Search & Official Registration</li>
                  <li>• NTSA Logbook Transfer & Driving License Renewal</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-accent uppercase text-xs tracking-widest mb-2">
                  Coverage Area
                </h3>
                <p className="text-sm text-text-muted">
                  Providing digital cyber services across all 47 counties
                  including Nairobi, Mombasa, Kisumu, Nakuru, and Eldoret. 100%
                  online, no physical visit required.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
