import { MetadataRoute } from "next";
import { blogPosts } from "@/lib/data/blogs";
import axiosClient from "@/lib/axios-client";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl =
    process.env.NEXT_PUBLIC_SERVER_URL || "https://everything.co.ke";

  // 1. Static Pages
  const staticPages = [
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
    priority: route === "" ? 1.0 : 0.5,
  }));

  // 2. Dynamic Service Pages (AWAITED)
  let serviceUrls: MetadataRoute.Sitemap = [];

  try {
    // We 'await' here so serviceUrls becomes a real array before the 'return'
    const response = await axiosClient.get("/services/published-slugs");
    const slugs = response.data; // Ensure this is an array like ["k-ra", "e-citizen"]

    if (Array.isArray(slugs)) {
      serviceUrls = slugs.map((slug: string) => ({
        url: `${baseUrl}/services/${slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.8,
      }));
    }
  } catch (error) {
    // This catches the 'ERR_INVALID_URL' or network errors
    console.error("Error fetching services for sitemap:", error);
    // Return empty array on error so the sitemap doesn't crash the whole site build
    serviceUrls = [];
  }

  // 3. Blog Pages
  const blogUrls = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updatedDate),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  // Now spreading works because they are all arrays!
  return [...staticPages, ...serviceUrls, ...blogUrls];
}
