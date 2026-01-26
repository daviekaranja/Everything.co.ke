export const homeSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Everything.co.ke",
  alternateName: "Everything Cyber Services",
  url: "https://everything.co.ke",
  logo: "https://everything.co.ke/logo.png", // Ensure this exists
  image: "https://everything.co.ke/og-image.jpeg",
  description:
    "Trusted online cyber services in Kenya. Expert assistance with KRA, NTSA, HELB, eCitizen, and passport applications.",
  priceRange: "KSh",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Nairobi",
    addressCountry: "KE",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "-1.286389", // Nairobi coordinates
    longitude: "36.817223",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Cyber & Government Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "KRA iTax Returns & PIN Registration",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "NTSA Tims & Driving License Services",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "eCitizen & Passport Applications",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "HELB Loan Application & Compliance",
        },
      },
    ],
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+254-783202527",
    contactType: "customer service",
    areaServed: "KE",
    availableLanguage: "English",
  },
};

export const optimizedFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Where can I find reliable online cyber services in Kenya?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Everything.co.ke is a leading provider of online cyber services in Kenya. We specialize in assisting Kenyans with government portals, document processing services, and professional application guidance to ensure fast and accurate results.",
      },
    },
    {
      "@type": "Question",
      name: "What KRA services do you offer online?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Our KRA services include individual and non-individual iTax PIN registration, filing of annual tax returns (including Nil returns), and application for Tax Compliance Certificates (TCC) to ensure you remain tax-compliant.",
      },
    },
    {
      "@type": "Question",
      name: "How can I access NTSA services through Everything.co.ke?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We provide comprehensive NTSA services including Tims account opening, Smart Driving License (DL) applications, logbook transfers, and motor vehicle inspection bookings through the eCitizen Kenya portal.",
      },
    },
    {
      "@type": "Question",
      name: "Do you provide HELB assistance for students and graduates?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, we offer expert HELB assistance for first-time and subsequent loan applications, as well as helping graduates apply for HELB clearance certificates or compliance letters for employment.",
      },
    },
    {
      "@type": "Question",
      name: "How do I start a passport application in Kenya?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A passport application in Kenya starts on the eCitizen portal. We assist you with the digital form, fee payment via M-Pesa, and scheduling of biometrics appointments at Nyayo House or other regional immigration offices.",
      },
    },
    {
      "@type": "Question",
      name: "What is required for business registration in Kenya?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For business registration in Kenya, you need a proposed business name, copies of directors' IDs, and KRA PINs. Everything.co.ke handles the entire process on the BRS portal, from name reservation to receiving your certificate of incorporation.",
      },
    },
    {
      "@type": "Question",
      name: "Can you help with a police clearance certificate application?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, we facilitate the police clearance certificate (Good Conduct) application on eCitizen. We generate the invoice and C24 fingerprint form, allowing you to simply visit the DCI offices for your biometrics.",
      },
    },
  ],
};

export const aboutSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  mainEntity: {
    "@type": "Organization",
    name: "Everything.co.ke",
    url: "https://everything.co.ke",
    logo: "https://everything.co.ke/logo.png",
    description:
      "Everything.co.ke is a specialized digital consultancy providing expert assistance with KRA, NTSA, HELB, and eCitizen services in Kenya.",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+254700000000", // Update with your actual number
      contactType: "customer support",
      areaServed: "KE",
      availableLanguage: ["English", "Swahili"],
    },
    knowsAbout: [
      "KRA iTax Returns",
      "NTSA Tims Portal",
      "Kenya eCitizen Applications",
      "Passport Application Kenya",
      "HELB Loan Processing",
      "Business Registration Kenya",
      "Police Clearance Certificates",
    ],
  },
};
