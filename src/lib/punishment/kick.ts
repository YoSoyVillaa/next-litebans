import { PunishmentListItem } from "@/types";
import { db } from "../db";
import { getPlayerName } from "./punishment";

const getKickCount = async (player?: string, staff?: string) => {
  const count = await db.litebans_kicks.count({
    where: {
      uuid: player,
      banned_by_uuid: staff
    }
  });
  return count;
}

const getKicks = async (page: number, player?: string, staff?: string) => {
  const kicks =  await db.litebans_kicks.findMany({
    where: {
      uuid: player,
      banned_by_uuid: staff
    },
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

  return kicks;
}

const sanitizeKicks = async (kicks: PunishmentListItem[]) => {

  const sanitized = await Promise.all(kicks.map(async (kick) => {
    const name = await getPlayerName(kick.uuid!);
    return {
      ...kick,
      id: kick.id.toString(),
      time: new Date(parseInt(kick.time.toString())),
      console: kick.banned_by_uuid === "[Console]",
      name
    }
  }));

  return sanitized;
}

export { getKickCount, getKicks, sanitizeKicks }