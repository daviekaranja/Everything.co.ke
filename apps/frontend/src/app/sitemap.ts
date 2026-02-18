import { MetadataRoute } from "next";
import { blogPosts } from "@/lib/data/blogs";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://everything.co.ke";

  const apiBaseUrl = process.env.API_BASE_URL || "http://localhost:8000/api/v1";

  // 1. Static Pages
  const staticPages: MetadataRoute.Sitemap = [
    "",
    "/about",
    "/contact",
    "/services",
    "/privacy-policy",
    "/blog",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  // 2. Dynamic Service Pages
  let serviceUrls: MetadataRoute.Sitemap = [];

  try {
    const response = await fetch(`${apiBaseUrl}/services/published-slugs`, {
      // next: { revalidate: 3600 },
    });

    if (response.ok) {
      const slugs = await response.json();

      if (Array.isArray(slugs)) {
        serviceUrls = slugs.map((slug: string) => ({
          url: `${baseUrl}/services/${slug}`,
          lastModified: new Date(),
          changeFrequency: "weekly" as const,
          priority: 0.8,
        }));
      }
    }
  } catch (error) {
    console.error("Error fetching services for sitemap:", error);
    serviceUrls = [];
  }

  // 3. Blog Pages
  const blogUrls: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updatedDate),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...serviceUrls, ...blogUrls];
}
