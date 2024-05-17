import { db } from "../db";

const getPlayerByName = async (name: string) => {
  const player = await db.litebans_history.findFirst({
    where: {
      name
    },
    orderBy: {
      date: 'desc'
    },
    select: {
      uuid: true,
      name: true
    }
  });

  return player;
}

const getPlayerBanCount = async (uuid: string) => {
  const count = await db.litebans_bans.count({
    where: {
      uuid
    }
  });

  return count;
}

const getPlayerMuteCount = async (uuid: string) => {
  const count = await db.litebans_mutes.count({
    where: {
      uuid
    }
  });

  return count;
}

const getPlayerWarnCount = async (uuid: string) => {
  const count = await db.litebans_warnings.count({
    where: {
      uuid
    }
  });

  return count;
}

const getPlayerKickCount = async (uuid: string) => {
  const count = await db.litebans_kicks.count({
    where: {
      uuid
    }
  });

  return count;
}

export { getPlayerByName, getPlayerBanCount, getPlayerMuteCount, getPlayerWarnCount, getPlayerKickCount}