export const siteConfig = {
  title: "Next Litebans",
  logo: "/logo.svg",
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
}
export type SiteConfig = typeof siteConfig;