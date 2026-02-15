export const siteConfig = {
  title: "MineBolt",
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
    uuid: "[Console]", // Use for filter url and to check if a punishment is made from the Console. In some versions of Litebans, the console uuid is "CONSOLE".
    icon: "/console.webp",
    body: "/console-body.webp",
    bust: "/console-bust.webp",
  },
  defaultPlayerLookup: "J4im3x0",
  // When enabled, body and bust images will show a steve skin
  bedrock: {
    enabled: false,
    prefix: "BP_",
  },
  openGraph: {
    dateFormat: "yyyy-MM-dd hh:mm:ss",
    pages: {
      main: {
        // Placeholders: {total}, {bans}, {mutes}, {kicks}, {warns}
        description: `
        next-litebans punishment web interface.

        Total punishments: {total}

          🚫 Bans: {bans}
          🔇 Mutes: {mutes}
          ⚠️ Warns: {warns}
          ❌ Kicks: {kicks}
        `
      },
      history: {
        // Placeholders: {total}, {bans}, {mutes}, {kicks}, {warns}
        description: `
        Total punishments: {total}

          🚫 Bans: {bans}
          🔇 Mutes: {mutes}
          ⚠️ Warns: {warns}
          ❌ Kicks: {kicks}
        `
      },
      player: {
        // Placeholders: {name}, {total}, {bans}, {mutes}, {kicks}, {warns}
        description: `
        {name}'s punishments.

        Total punishments: {total}

          🚫 Bans: {bans}
          🔇 Mutes: {mutes}
          ⚠️ Warns: {warns}
          ❌ Kicks: {kicks}
        `,
        bans: {
          description: `
          {name}'s bans.

          Total bans: {total}
          `,
        },
        mutes: {
          description: `
          {name}'s mutes.

          Total mutes: {total}
          `,
        },
        warns: {
          description: `
          {name}'s warns.

          Total warns: {total}
          `,
        },
        kicks: {
          description: `
          {name}'s kicks.

          Total kicks: {total}
          `,
        },
      },
      bans: {
        // Placeholders: {total}
        description: "Total bans: {total}"
      },
      mutes: {
        // Placeholders: {total}
        description: "Total mutes: {total}"
      },
      warns: {
        // Placeholders: {total}
        description: "Total warns: {total}"
      },
      kicks: {
        // Placeholders: {total}
        description: "Total kicks: {total}"
      },
    },
    punishments: {
      ban: {
        // Placeholders: {name}, {staff}, {reason}, {time}, {duration}, {server}
        description: `
        👤 User: {name}
        👮 Staff: {staff}

        📜 Reason: {reason}
        🕒 Date: {time}
        ⌛ Duration: {duration}
        `
      },
      mute: {
        // Placeholders: {name}, {staff}, {reason}, {time}, {duration}, {server}
        description: `
        👤 User: {name}
        👮 Staff: {staff}

        📜 Reason: {reason}
        🕒 Date: {time}
        ⌛ Duration: {duration}
        `
      },
      warn: {
        // Placeholders: {name}, {staff}, {reason}, {time}, {server}
        description: `
        👤 User: {name}
        👮 Staff: {staff}

        📜 Reason: {reason}
        🕒 Date: {time}
        `
      },
      kick: {
        // Placeholders: {name}, {staff}, {reason}, {time}, {server}
        description: `
        👤 User: {name}
        👮 Staff: {staff}

        📜 Reason: {reason}
        🕒 Date: {time}
        `
      }
    }
  }
}
export type SiteConfig = typeof siteConfig;