import { PunishmentListItem } from "@/types";
import { db } from "../db";
import { getPlayerName } from "./punishment";

const getWarnCount = async () => {
  const count = await db.litebans_warnings.count();
  return count;
}

const getWarns = async (page: number, player?: string, staff?: string) => {
  const warns =  await db.litebans_warnings.findMany({
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
      active: true,
      warned: true
    },
    orderBy: {
      time: "desc"
    }
  });

  return warns;
}

const sanitizeWarns = async (warns: (PunishmentListItem & { warned: boolean})[]) => {

  const sanitized = await Promise.all(warns.map(async (warn) => {
    const name = await getPlayerName(warn.uuid!);
    return {
      ...warn,
      id: warn.id.toString(),
      time: new Date(parseInt(warn.time.toString())),
      console: warn.banned_by_uuid === "[Console]",
      name
    }
  }));

  return sanitized;
}

export { getWarnCount, getWarns, sanitizeWarns }