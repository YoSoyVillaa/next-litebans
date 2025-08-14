const language = {
  info: {
    country_code: "JP",
    lang_name: "日本語"
  },
  site: {
    description: "シンプルで軽量なLiteBansのウェブインターフェース"
  },
  words: {
    bans: {
      singular: "BAN",
      plural: "BAN"
    },
    mutes: {
      singular: "ミュート",
      plural: "ミュート"
    },
    kicks: {
      singular: "キック",
      plural: "キック"
    },
    warns: {
      singular: "警告",
      plural: "警告"
    },
    yes: "はい",
    no: "いいえ",
    player: "プレイヤー",
    staff: "スタッフ",
    reason: "理由",
    date: "日付",
    expires: "期限",
    originServer: "実行したサーバー",
    notified: "通知済み",
  },
  pages: {
    home: {
      title: "ホーム",
      // Placeholders: {total}, {bans}, {mutes}, {kicks}, {warns}
      subtitle: "畳サーバーで発行された全てのペナルティを確認できます。"
    },
    history: {
      title: "履歴",
      // Placeholders: {total}
      subtitle: "合計発行数: {total}件",
      table: {
        heads: {
          type: "種別",
          player: "対象者",
          by: "発行者",
          reason: "理由",
          date: "日付",
          expires: "期限"
        },
        permanent: "永久",
        expire_not_applicable: "N/A",
        active: {
          true: "有効",
          temporal: "一時的",
          false: "期限切れ"
        }
      }
    },
    bans: {
      title: "BAN",
      // Placeholders: {total}
      subtitle: "発行されたBAN: {total}件",
      table: {
        heads: {
          player: "プレイヤー",
          by: "発行者",
          reason: "理由",
          date: "日付",
          expires: "期限"
        },
        permanent: "永久BAN",
        active: {
          true: "有効",
          temporal: "一時的",
          false: "期限切れ"
        }
      },
      info: {
        title: "BAN #{id}",
        badges: {
          ipban: "IP BAN",
          active: "有効",
          expired: "期限",
          permanent: "永久",
        }
      }
    },
    mutes: {
      title: "ミュート",
      // Placeholders: {total}
      subtitle: "発行されたミュート: {total}件",
      table: {
        heads: {
          player: "プレイヤー",
          by: "発行者",
          reason: "理由",
          date: "日付",
          expires: "期限"
        },
        permanent: "永久BAN",
        active: {
          true: "有効",
          temporal: "一時的",
          false: "期限切れ"
        }
      },
      info: {
        title: "ミュート #{id}",
        badges: {
          ipmute: "IP ミュート",
          active: "有効",
          expired: "期限",
          permanent: "永久",
        }
      }
    },
    warns: {
      title: "警告",
      // Placeholders: {total}
      subtitle: "発行された警告: {total}件",
      table: {
        heads: {
          player: "対象者",
          by: "発行者",
          reason: "理由",
          date: "日付",
          notified: "通知済み"
        },
      },
      info: {
        title: "警告 #{id}"
      }
    },
    kicks: {
      title: "キック",
      // Placeholders: {total}
      subtitle: "Kick count: {total}",
      table: {
        heads: {
          player: "対象者",
          by: "発行者",
          reason: "理由",
          date: "日付"
        }
      },
      info: {
        title: "キック #{id}"
      }
    },
    playerHistory: {
      // Placeholders: {player}
      title: "{player}"
    },
    errors: {
      notFound: {
        title: "404",
        description: "ページが見つかりませんでした...",
        button: "ホームに戻る"
      }
    }
  },
  pagination: {
    previous: "前",
    next: "次"
  },
  notifications: {
    playerNotFound: {
      title: "エラー",
      description: "そのプレイヤーはデータベースに保存されていません。",
    }
  }
}

module.exports = language;
