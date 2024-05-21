import { PunishmentListItem } from "@/types";
import { db } from "../db";
import { Dictionary } from "../language/types";
import { getPlayerName } from "./punishment";

const getBanCount = async (player?: string, staff?: string) => {
  const count = await db.litebans_bans.count({
    where: {
      uuid: player,
      banned_by_uuid: staff
    }
  });
  return count;
}

const getBans = async (page: number, player?: string, staff?: string) => {
  const bans =  (await db.litebans_bans.findMany({
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
  }));

  return bans;
}

const sanitizeBans = async (dictionary: Dictionary, bans: PunishmentListItem[]) => {

  const sanitized = await Promise.all(bans.map(async (ban) => {
    const name = await getPlayerName(ban.uuid!);
    const until = ban.until.toString() === "0" ? dictionary.table.permanent : new Date(parseInt(ban.until.toString()));
    const active = typeof ban.active === "boolean" ? ban.active : ban.active === "1";
    return {
      ...ban,
      id: ban.id.toString(),
      time: new Date(parseInt(ban.time.toString())),
      status: until == dictionary.table.permanent ? 
                active : 
                until < new Date() ? false : undefined,
      console: ban.banned_by_uuid === "[Console]",
      permanent: until == dictionary.table.permanent,
      active,
      until,
      name,
    }
  }));

  return sanitized;
}

const getBan = async (id: number, dictionary: Dictionary) => {
  const ban = await db.litebans_bans.findUnique({
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
      ipban: true,
      active: true,
      server_origin: true
    }
  });

  if (!ban) {
    return null;
  }
  
  const sanitized = (await sanitizeBans(dictionary, [ban]))[0];

  return {
    ...sanitized,
    ipban: ban.ipban,
    server: ban.server_origin
  }
}

export { getBanCount, getBans, sanitizeBans, getBan }