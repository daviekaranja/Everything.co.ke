import { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About Us | Everything.co.ke - Trusted Online Cyber Services in Kenya",
  description:
    "Learn how Everything.co.ke bridges the gap between government portals (KRA, NTSA, eCitizen) and Kenyan citizens with fast, secure document processing.",
  alternates: {
    canonical: "https://everything.co.ke/about",
  },
};

export default function AboutPage() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Everything.co.ke",
    url: "https://everything.co.ke",
    logo: "https://everything.co.ke/logo.png",
    description:
      "Nairobi’s leading online platform for fast-tracking eCitizen, KRA, and NTSA services.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Nairobi",
      addressCountry: "KE",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: "support@everything.co.ke",
      availableLanguage: ["English", "Swahili"],
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What services does Everything.co.ke provide?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We provide fast-tracking for Kenyan government services including KRA returns, NTSA driving license renewals, eCitizen applications (Birth Certificates, Good Conduct), and business registrations.",
        },
      },
      {
        "@type": "Question",
        name: "Is Everything.co.ke secure?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. We use bank-grade encryption and comply with Kenyan data protection laws to ensure your sensitive documents and personal information remain private.",
        },
      },
    ],
  };

  return (
    <>
      {/* Injecting multiple schemas in one script block is valid,
        but separating them into an array makes it cleaner for Google's parser.
      */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([organizationSchema, faqSchema]),
        }}
      />
      <AboutClient />
    </>
  );
}
