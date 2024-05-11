const language = {
  info: {
    country_code: "ES",
    lang_name: "Español"
  },
  site: {
    description: "Una interfaz web simple para LiteBans."
  },
  words: {
    bans: {
      singular: "Baneo",
      plural: "Baneos"
    },
    mutes: {
      singular: "Mute",
      plural: "Muteos"
    },
    kicks: {
      singular: "Expulsión",
      plural: "Expulsiones"
    },
    warns: {
      singular: "Aviso",
      plural: "Avisos"
    }
  },
  pages: {
    home: {
      title: "Inicio",
      // Placeholders: {total}, {bans}, {mutes}, {kicks}, {warns}
      subtitle: "¡Bienvenido a la interfaz web de Litebans!"
    },
    bans: {
      title: "Baneos",
      // Placeholders: {total}
      subtitle: "Baneos totales: {total}",
      table: {
        heads: {
          player: "Jugador",
          by: "Baneado por",
          reason: "Razón",
          date: "Fecha",
          expires: "Expiración"
        },
        permanent: "Baneo permanente",
        active: {
          true: "Activo",
          temporal: "Temporal activo",
          false: "Expirado"
        }
      }
    },
    errors: {
      notFound: {
        title: "404",
        description: "Parece que te has perdido. Por favor, vuelve a la página principal",
        button: "Volver a la página de inicio"
      }
    }
  }
}

module.exports = language;