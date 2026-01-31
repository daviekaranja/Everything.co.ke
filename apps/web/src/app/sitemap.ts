import { MetadataRoute } from "next";
import { services } from "@/lib/data/services";
import { blogPosts } from "@/lib/data/blogs";
// import { getAllBlogPosts } from "@/lib/api/blog"; // Future placeholder

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl =
    process.env.NEXT_PUBLIC_SERVER_URL || "https://everything.co.ke";

  // 1. Static Pages (Manually defined)
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
    priority: route === "" ? 1.0 : 0.5, // Home is 1.0, others are lower
  }));

  // 2. Dynamic Service Pages (From your local data)
  const serviceUrls = services.map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const, // Services change more than generic about pages
    priority: 0.8,
  }));

  const blogUrls = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updatedDate),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  return [...staticPages, ...serviceUrls, ...blogUrls];
}
