const language = {
  info: {
    country_code: "CN",
    lang_name: "简体中文"
  },
  site: {
    description: "一个简单轻量的 Litebans 网页界面"
  },
  words: {
    bans: {
      singular: "封禁",
      plural: "封禁记录"
    },
    mutes: {
      singular: "禁言",
      plural: "禁言记录"
    },
    kicks: {
      singular: "踢出",
      plural: "踢出记录"
    },
    warns: {
      singular: "警告",
      plural: "警告记录"
    },
    yes: "是",
    no: "否",
    player: "玩家",
    staff: "执行人员",
    reason: "原因",
    date: "日期",
    expires: "过期时间",
    originServer: "来源服务器",
    notified: "已通知",
  },
  pages: {
    home: {
      title: "首页",
      subtitle: "欢迎使用 Litebans 网页界面!"
    },
    history: {
      title: "历史记录",
      subtitle: "总处罚数: {total}",
      table: {
        heads: {
          type: "类型",
          player: "玩家",
          by: "执行者",
          reason: "原因",
          date: "日期",
          expires: "过期时间"
        },
        permanent: "永久处罚",
        expire_not_applicable: "不适用",
        active: {
          true: "生效中",
          temporal: "临时",
          false: "已过期"
        }
      }
    },
    bans: {
      title: "封禁记录",
      subtitle: "封禁总数: {total}",
      table: {
        heads: {
          player: "玩家",
          by: "封禁者",
          reason: "原因",
          date: "日期",
          expires: "过期时间"
        },
        permanent: "永久封禁",
        active: {
          true: "生效中",
          temporal: "临时",
          false: "已过期"
        }
      },
      info: {
        title: "封禁记录 #{id}",
        badges: {
          ipban: "IP封禁",
          active: "生效中",
          expired: "已过期",
          permanent: "永久",
        }
      }
    },
    mutes: {
      title: "禁言记录",
      subtitle: "禁言总数: {total}",
      table: {
        heads: {
          player: "玩家",
          by: "禁言者",
          reason: "原因",
          date: "日期",
          expires: "过期时间"
        },
        permanent: "永久禁言",
        active: {
          true: "生效中",
          temporal: "临时",
          false: "已过期"
        }
      },
      info: {
        title: "禁言记录 #{id}",
        badges: {
          ipmute: "IP禁言",
          active: "生效中",
          expired: "已过期",
          permanent: "永久",
        }
      }
    },
    warns: {
      title: "警告记录",
      subtitle: "警告总数: {total}",
      table: {
        heads: {
          player: "玩家",
          by: "警告者",
          reason: "原因",
          date: "日期",
          notified: "已通知"
        },
      },
      info: {
        title: "警告记录 #{id}"
      }
    },
    kicks: {
      title: "踢出记录",
      subtitle: "踢出总数: {total}",
      table: {
        heads: {
          player: "玩家",
          by: "踢出者",
          reason: "原因",
          date: "日期"
        }
      },
      info: {
        title: "踢出记录 #{id}"
      }
    },
    playerHistory: {
      title: "{player} 的历史记录"
    },
    errors: {
      notFound: {
        title: "404",
        description: "看起来你迷路了。请返回主页。",
        button: "返回首页"
      }
    }
  },
  pagination: {
    previous: "上一页",
    next: "下一页"
  },
  notifications: {
    playerNotFound: {
      title: "错误",
      description: "数据库中不存在该玩家。",
    }
  }
}

module.exports = language;
