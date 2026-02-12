// import { MetadataRoute } from "next";
// import { services } from "@/lib/data/services";
// import { blogPosts } from "@/lib/data/blogs";
// // import { getAllBlogPosts } from "@/lib/api/blog"; // Future placeholder
// import axiosClient from "@/lib/axios-client";

// export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
//   const baseUrl =
//     process.env.NEXT_PUBLIC_SERVER_URL || "https://everything.co.ke";

//   // 1. Static Pages (Manually defined)
//   const staticPages = [
//     "",
//     "/about",
//     "/contact",
//     "/services",
//     "/privacy-policy",
//     "/blog",
//   ].map((route) => ({
//     url: `${baseUrl}${route}`,
//     lastModified: new Date(),
//     changeFrequency: "monthly" as const,
//     priority: route === "" ? 1.0 : 0.5, // Home is 1.0, others are lower
//   }));

//   // 2. Dynamic Service Pages (From your local data)
// const serviceUrls = axiosClient
//   .get("/services/published-slugs") // Assuming this returns the list of services
//   .then((response) => {
//     const services = response.data; // Adjust based on your API response structure
//     console.log(services)
//     return services.map((service: string) => ({
//       url: `${baseUrl}/services/${service}`,
//       lastModified: new Date(),
//       changeFrequency: "weekly" as const, // Services change more than generic about pages
//       priority: 0.8,
//     }));
//   })
//   .catch((error) => {
//     console.error("Error fetching services for sitemap:", error);
//     return []; // Return empty array on error to avoid breaking sitemap generation
//   });

//   // const serviceUrls = services.map((service) => ({
//   //   url: `${baseUrl}/services/${service.slug}`,
//   //   lastModified: new Date(),
//   //   changeFrequency: "weekly" as const, // Services change more than generic about pages
//   //   priority: 0.8,
//   // }));

//   const blogUrls = blogPosts.map((post) => ({
//     url: `${baseUrl}/blog/${post.slug}`,
//     lastModified: new Date(post.updatedDate),
//     changeFrequency: "weekly" as const,
//     priority: 0.9,
//   }));

//   return [...staticPages, ...serviceUrls, ...blogUrls];
// }

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
