import { PunishmentListItem } from "@/types";
import { db } from "../db";
import { getPlayerName } from "./punishment";

const getWarnCount = async (player?: string, staff?: string) => {
  const count = await db.litebans_warnings.count({
    where: {
      uuid: player,
      banned_by_uuid: staff
    }
  });
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

const sanitizeWarns = async (warns: (PunishmentListItem & { warned: boolean | string})[]) => {

  const sanitized = await Promise.all(warns.map(async (warn) => {
    const name = await getPlayerName(warn.uuid!);
    return {
      ...warn,
      id: warn.id.toString(),
      time: new Date(parseInt(warn.time.toString())),
      console: warn.banned_by_uuid === "[Console]",
      active: typeof warn.active === "boolean" ? warn.active : warn.active === "1",
      warned: typeof warn.warned === "boolean" ? warn.warned : warn.warned === "1",
      name
    }
  }));

  return sanitized;
}

const getWarn = async (id: number) => {
  const warn = await db.litebans_warnings.findUnique({
    where: {
      id
    },
    select: {
      id: true,
      uuid: true,
      banned_by_name: true,
      banned_by_uuid: true,
      reason: true,
      time: true,
      until: true,
      active: true,
      server_origin: true,
      warned: true
    }
  });

  if (!warn) {
    return null;
  }
  
  const sanitized = (await sanitizeWarns([warn]))[0];

  return {
    ...sanitized,
    server: warn.server_origin
  }
}

export { getWarnCount, getWarns, sanitizeWarns, getWarn }