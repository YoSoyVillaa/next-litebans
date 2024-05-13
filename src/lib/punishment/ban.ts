import { PunishmentListItem } from "@/types";
import { db } from "../db";
import { Dictionary } from "../language/types";
import { getPlayerName } from "./punishment";

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

const sanitizeBans = async (dictionary: Dictionary, bans: PunishmentListItem[]) => {

  const sanitized = await Promise.all(bans.map(async (ban) => {
    const name = await getPlayerName(ban.uuid!);
    const until = ban.until.toString() === "0" ? dictionary.table.permanent : new Date(parseInt(ban.until.toString()));
    return {
      ...ban,
      id: ban.id.toString(),
      time: new Date(parseInt(ban.time.toString())),
      status: until == dictionary.table.permanent ? 
                (ban.active ? true : false) : 
                (until < new Date() ? false : undefined),
      console: ban.banned_by_uuid === "[Console]",
      until,
      name
    }
  }));

  return sanitized;
}

export { getBans, sanitizeBans }