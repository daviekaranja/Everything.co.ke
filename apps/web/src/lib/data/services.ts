export interface Service {
  name: string;
  slug: string;
  provider: string;
  category: "Government" | "Education" | "Business";
  subCategory: string;
  icon: string;
  description: string;
  seoTitle: string;
  seoDescription: string;
  requirements: string[];
  faqs: { q: string; a: string }[];
  pricing: {
    governmentFee: string;
    serviceFee: string;
    total: string;
  };
  estimatedTime: string;
}


export interface BlogPost {
  title: string;
  slug: string;
  category: "Guides" | "News" | "Taxes" | "Legal";
  author: {
    name: string;
    role: string; // e.g., "Senior Tax Consultant" (Boosts E-E-A-T)
  };
  publishedDate: string;
  updatedDate: string; // Critical for "Freshness" ranking factor
  image: {
    url: string;
    alt: string;
  };
  excerpt: string; // For Meta Description and "Search Results" snippet
  seoTitle: string;
  seoDescription: string;
  content: {
    introduction: string; // The "Snippet Hook" goes here
    sections: {
      heading: string;
      body: string;
      hasAdAfter?: boolean; // Programmer hint for ad placement
    }[];
  };
  relatedServices: string[]; // Slugs of services to link to for conversion
  faqs: { q: string; a: string }[]; // For FAQ Schema
}

export const services: Service[] = [
  /* -------------------- KRA SERVICES -------------------- */
  {
    name: "New KRA PIN Registration",
    slug: "new-kra-pin-registration-kenya",
    provider: "KRA",
    category: "Government",
    subCategory: "Taxation",
    icon: "💎",
    description:
      "Apply for your KRA PIN certificate online in Kenya. Our professional agents ensure your iTax registration is handled accurately, helping you avoid common errors in residency status or tax obligation settings.",
    seoTitle: "KRA PIN Registration Online Kenya | Get Your PIN Fast",
    seoDescription:
      "Need a KRA PIN for a bank account or job? Get your KRA PIN certificate online in minutes. We handle the iTax registration process for Kenyan citizens and residents.",
    requirements: [
      "National ID Card / Passport",
      "Valid Email Address",
      "Active Kenyan Phone Number",
      "Physical Address details",
    ],
    faqs: [
      {
        q: "Can I get a KRA PIN without an ID?",
        a: "No, a valid National ID or Passport is required for the registration process.",
      },
      {
        q: "How long does it take?",
        a: "Most registrations are completed within 30 minutes to 2 hours.",
      },
    ],
    pricing: { governmentFee: "0", serviceFee: "0", total: "200" },
    estimatedTime: "30 mins – 2 hours",
  },
  {
    name: "Lost KRA PIN Recovery",
    slug: "recover-lost-kra-pin-kenya",
    provider: "KRA",
    category: "Government",
    subCategory: "Taxation",
    icon: "🔑",
    description:
      "Lost your KRA PIN or forgot your iTax login credentials? We recover forgotten KRA PINs through the official iTax system.",
    seoTitle: "Recover Lost KRA PIN & Password | iTax Recovery Kenya",
    seoDescription:
      "Lost your KRA PIN certificate or iTax password? We help you recover your tax details and reset your iTax email access quickly and securely.",
    requirements: ["National ID Number", "Full Name as per ID"],
    faqs: [
      {
        q: "What if I don't have access to my registered email?",
        a: "We assist in the email change process through KRA to restore your account access.",
      },
    ],
    pricing: { governmentFee: "0", serviceFee: "5", total: "5" },
    estimatedTime: "30 – 60 minutes",
  },
  {
    name: "File KRA Returns",
    slug: "file-kra-returns-kenya",
    provider: "KRA",
    category: "Government",
    subCategory: "Taxation",
    icon: "📝",
    description:
      "Ensure your KRA Nil returns or Employment returns are filed accurately and on time to avoid heavy KRA penalties.",
    seoTitle: "File KRA Returns Online 2026 | Nil & Employment Returns",
    seoDescription:
      "Avoid KRA penalties by filing your 2026 tax returns today. We handle Nil returns, P9 employment returns, and business tax filing accurately.",
    requirements: ["KRA PIN", "iTax Password", "P9 Form (if employed)"],
    faqs: [
      {
        q: "What is the penalty for late filing?",
        a: "The penalty for late filing for individuals is KES 2,000 per year.",
      },
    ],
    pricing: { governmentFee: "0", serviceFee: "100", total: "100" },
    estimatedTime: "Same day",
  },

  /* -------------------- NTSA SERVICES -------------------- */
  {
    name: "Driving Licence Renewal",
    slug: "ntsa-driving-licence-renewal",
    provider: "NTSA",
    category: "Government",
    subCategory: "Transport",
    icon: "🚗",
    description:
      "Stay legal on Kenyan roads with our fast NTSA Driving Licence renewal service via the eCitizen portal.",
    seoTitle: "NTSA Driving License Renewal Kenya | 1 & 3 Year Renewal",
    seoDescription:
      "Renew your Kenyan Driving License online. Fast eCitizen NTSA processing for 1-year and 3-year DL renewals. Get your renewal slip instantly.",
    requirements: [
      "Original Driving Licence",
      "eCitizen Account Access",
      "National ID",
    ],
    faqs: [
      {
        q: "How much does NTSA charge for 3 years?",
        a: "The government fee for a 3-year renewal is KES 3,050.",
      },
    ],
    pricing: { governmentFee: "650", serviceFee: "150", total: "850" },
    estimatedTime: "Same day – 2 days",
  },
  {
    name: "Motor Vehicle Transfer",
    slug: "ntsa-motor-vehicle-transfer-kenya",
    provider: "NTSA",
    category: "Government",
    subCategory: "Transport",
    icon: "🔄",
    description:
      "End-to-end assistance with NTSA motor vehicle ownership transfer through the TIMS/eCitizen portal.",
    seoTitle: "Logbook Transfer Kenya | NTSA Motor Vehicle Transfer",
    seoDescription:
      "Professional assistance for NTSA logbook transfers. We ensure both buyer and seller complete the TIMS/eCitizen requirements correctly.",
    requirements: [
      "Logbook (Scan/Copy)",
      "Buyer/Seller ID & KRA PIN",
      "Sales Agreement",
    ],
    faqs: [
      {
        q: "Do both parties need eCitizen?",
        a: "Yes, both the buyer and seller must have active eCitizen accounts to accept the transfer.",
      },
    ],
    pricing: {
      governmentFee: "Varies (by CC)",
      serviceFee: "3,000",
      total: "3,000+",
    },
    estimatedTime: "2 – 5 business days",
  },

  /* -------------------- ECITIZEN / POLICE -------------------- */
  {
    name: "Good Conduct (Police Clearance)",
    slug: "good-conduct-police-clearance-kenya",
    provider: "eCitizen",
    category: "Government",
    subCategory: "Legal",
    icon: "📜",
    description:
      "Apply for your Certificate of Good Conduct for employment or travel. We handle application and booking.",
    seoTitle: "Apply for Certificate of Good Conduct Kenya | DCI Clearance",
    seoDescription:
      "Get your Police Clearance Certificate (Good Conduct) easily. We assist with eCitizen application, payment, and DCI fingerprint booking.",
    requirements: [
      "National ID Card",
      "Original Fingerprint processing",
      "eCitizen Login",
    ],
    faqs: [
      {
        q: "Where do I take fingerprints?",
        a: "You can choose your nearest DCI headquarters or Huduma Center during the booking process.",
      },
    ],
    pricing: { governmentFee: "1,050", serviceFee: "1,450", total: "2,500" },
    estimatedTime: "2 – 4 weeks",
  },

  /* -------------------- EDUCATION / HELB -------------------- */
  {
    name: "HELB Loan Application",
    slug: "helb-loan-application-assistance",
    provider: "HELB",
    category: "Education",
    subCategory: "Financing",
    icon: "🎓",
    description:
      "Professional guidance for first-time or subsequent HELB loan applications to maximize success.",
    seoTitle: "HELB Loan Application Help | University Funding Kenya",
    seoDescription:
      "Need help applying for HELB? We guide you through the student portal, guarantor details, and document uploads for a successful loan application.",
    requirements: [
      "HELB Smart Card/Account",
      "Guarantors' IDs",
      "Admission Letter",
    ],
    faqs: [
      {
        q: "Is HELB only for University students?",
        a: "No, HELB also provides loans for TVET and College students.",
      },
    ],
    pricing: { governmentFee: "0", serviceFee: "2,000", total: "2,000" },
    estimatedTime: "1 – 2 hours",
  },
];
