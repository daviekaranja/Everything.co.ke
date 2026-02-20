import { de } from "zod/v4/locales";
import axiosClient from "../axios-client";

// Module-level cache to prevent re-fetching on every component mount
let servicesCache: any[] | null = null;

export async function getPopularServices() {
  if (servicesCache) return servicesCache;

  try {
    const response = await axiosClient.get("/services/trending?limit=3");

    // Map the short keys (n, s, c) to readable properties
    const mappedData = response.data.map((item: any) => ({
      name: item.n,
      slug: item.s,
      category: item.c,
      price: item.p,
      icon: getIconForCategory(item.c),
      description: item.d,
    }));

    servicesCache = mappedData;
    return mappedData;
  } catch (error) {
    console.error("Failed to fetch trending services:", error);
    // Fallback to empty array to prevent UI crash
    return [];
  }
}

function getIconForCategory(category: string) {
  if (category.includes("Taxation")) return "⚖️";
  if (category.includes("Transport")) return "🚗";
  if (category.includes("Civil")) return "📜";
  return "⚡";
}
