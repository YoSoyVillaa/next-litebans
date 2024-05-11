const { sign } = require("crypto");

const language = {
  info: {
    country_code: "GB",
    lang_name: "English"
  },
  site: {
    description: "A simple and lightweight Litebans web interface."
  },
  words: {
    bans: {
      singular: "Ban",
      plural: "Bans"
    },
    mutes: {
      singular: "Mute",
      plural: "Mutes"
    },
    kicks: {
      singular: "Kick",
      plural: "Kicks"
    },
    warns: {
      singular: "Warn",
      plural: "Warns"
    }
  },
  pages: {
    home: {
      title: "Home",
      // Placeholders: {total}, {bans}, {mutes}, {kicks}, {warns}
      subtitle: "Welcome to Litebans Web Interface!"
    },
    bans: {
      title: "Bans",
      // Placeholders: {total}
      subtitle: "Ban count: {total}",
      table: {
        heads: {
          player: "Player",
          by: "Banned by",
          reason: "Reason",
          date: "Date",
          expires: "Expires"
        },
        permanent: "Permanent ban",
        active: {
          true: "Active",
          temporal: "Temporal",
          false: "Expired"
        }
      }
    },
    errors: {
      notFound: {
        title: "404",
        description: "Seems like you are lost. Please go back to the main page.",
        button: "Back to home page"
      }
    }
  }
}

module.exports = language;