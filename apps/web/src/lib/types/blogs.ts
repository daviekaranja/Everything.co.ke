export interface BlogPost {
  title: string;
  slug: string;
  category: "Guides" | "News" | "Taxes" | "Legal";
  author: {
    name: string;
    role: string;
    avatarUrl?: string; // Enhanced E-E-A-T
  };
  publishedDate: string;
  updatedDate: string;
  image: {
    url: string;
    alt: string;
  };
  excerpt: string;
  seoTitle: string;
  seoDescription: string;
  // NEW: Primary Conversion Target
  primaryCTA?: {
    title: string;
    description: string;
    buttonText: string;
    link: string;
  };
  content: {
    introduction: string;
    sections: {
      heading: string;
      body: string;
      hasAdAfter?: boolean;
    }[];
  };
  // ENHANCED: Full objects instead of slugs
  relatedServices: {
    name: string;
    slug: string;
    description: string;
    priceHint?: string; // e.g., "From KES 1,500"
    icon?: string; // Lucide icon name string
  }[];
  faqs: { q: string; a: string }[];
}