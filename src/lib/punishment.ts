import { db } from "./db";

const getPunishmentCount = async () => {
  const bans = await db.litebans_bans.count();
  const mutes = await db.litebans_mutes.count();
  const warns = await db.litebans_warnings.count();
  const kicks = await db.litebans_kicks.count();

  return { bans, mutes, warns, kicks }
}

const getPlayerName = async (uuid: string) => {
  const player = await db.litebans_history.findFirst({
    where: {
      uuid
    },
    orderBy: {
      date: 'desc'
    },
    select: {
      name: true
    }
  });

  return player?.name;
}

const getBans = async (page: number) => {
  const bans =  await db.litebans_bans.findMany({
    take: 10,
    skip: (page - 1) * 10,
    select: {
      id: true,
      uuid: true,
      banned_by_name: true,
      banned_by_uuid: true,
      reason: true,
      time: true,
      until: true,
      active: true
    },
    orderBy: {
      time: "desc"
    }
  });

  return bans;
}

export { getPunishmentCount, getPlayerName, getBans }