export const siteConfig = {
  title: "Next Litebans",
  logo: "/logo.webp",
  favicon: "/logo.webp",
  languages: {
    available: [
      "en",
      "es",
    ],
    default: "en",
  },
  console: {
    name: "Console", // Just for filter badge
    icon: "/console.webp",
    body: "/console-body.webp",
    bust: "/console-bust.webp",
  },
  defaultPlayerLookup: "YoSoyVilla",
  // When enabled, body and bust images will show a steve skin
  bedrock: {
    enabled: false,
    prefix: "BP_",
  },
}
export type SiteConfig = typeof siteConfig;