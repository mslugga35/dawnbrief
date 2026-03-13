import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "DawnBrief",
    short_name: "DawnBrief",
    description:
      "AI daily business briefing. Connect Stripe, wake up to clarity.",
    start_url: "/",
    display: "standalone",
    background_color: "#050810",
    theme_color: "#10b981",
    icons: [
      {
        src: "/icon.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
