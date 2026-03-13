import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const today = new Date().toISOString().split("T")[0];
  return [
    {
      url: "https://getdawnbrief.com",
      lastModified: today,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://getdawnbrief.com/blog",
      lastModified: today,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: "https://getdawnbrief.com/blog/saas-metrics-morning-routine",
      lastModified: "2026-03-13",
      changeFrequency: "monthly",
      priority: 0.9,
    },
  ];
}
