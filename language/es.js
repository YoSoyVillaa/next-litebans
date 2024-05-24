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
    },
    yes: "Sí",
    no: "No",
    player: "Jugador",
    staff: "Staff",
    reason: "Razón",
    date: "Fecha",
    expires: "Expiración",
    originServer: "Servidor de origen",
    notified: "Notificado",
  },
  pages: {
    home: {
      title: "Inicio",
      // Placeholders: {total}, {bans}, {mutes}, {kicks}, {warns}
      subtitle: "¡Bienvenido a la interfaz web de Litebans!"
    },
    history: {
      title: "Historial",
      // Placeholders: {total}
      subtitle: "Sanciones totales: {total}",
      table: {
        heads: {
          type: "Tipo",
          player: "Juagador",
          by: "Sancionado por",
          reason: "Razón",
          date: "Fecha",
          expires: "Expiración"
        },
        permanent: "Sanción permanente",
        expire_not_applicable: "N/A",
        active: {
          true: "Activo",
          temporal: "Temporal",
          false: "Expirado"
        }
      }
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
          temporal: "Temporal",
          false: "Expirado"
        }
      },
      info: {
        title: "Baneo #{id}",
        badges: {
          ipban: "Baneo de IP",
          active: "Activo",
          expired: "Expirado",
          permanent: "Permanente",
        }
      }
    },
    mutes: {
      title: "Muteos",
      // Placeholders: {total}
      subtitle: "Muteos totales: {total}",
      table: {
        heads: {
          player: "Jugador",
          by: "Silenciado por",
          reason: "Razón",
          date: "Fecha",
          expires: "Expiración"
        },
        permanent: "Muteo permanente",
        active: {
          true: "Activo",
          temporal: "Temporal",
          false: "Expirado"
        }
      },
      info: {
        title: "Muteo #{id}",
        badges: {
          ipmute: "Muteo de IP",
          active: "Activo",
          expired: "Expirado",
          permanent: "Permanente",
        }
      }
    },
    warns: {
      title: "Avisos",
      // Placeholders: {total}
      subtitle: "Avisos totales: {total}",
      table: {
        heads: {
          player: "Jugador",
          by: "Avisado por",
          reason: "Razón",
          date: "Fecha",
          notified: "Notificado"
        }
      },
      info: {
        title: "Aviso #{id}"
      }
    },
    kicks: {
      title: "Expulsiones",
      // Placeholders: {total}
      subtitle: "Expulsiones totales: {total}",
      table: {
        heads: {
          player: "Jugador",
          by: "Expulsado por",
          reason: "Razón",
          date: "Fecha"
        }
      },
      info: {
        title: "Expulsión #{id}"
      }
    },
    playerHistory: {
      // Placeholders: {player}
      title: "{player}"
    },
    errors: {
      notFound: {
        title: "404",
        description: "Parece que te has perdido. Por favor, vuelve a la página principal",
        button: "Volver a la página de inicio"
      }
    }
  },
  pagination: {
    previous: "Anterior",
    next: "Siguiente"
  },
  notifications: {
    playerNotFound: {
      title: "Error",
      description: "El jugador no existe en la base de datos.",
    }
  }
}

module.exports = language;