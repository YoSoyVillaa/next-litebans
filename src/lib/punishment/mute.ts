import { PunishmentListItem } from "@/types";
import { db } from "../db";
import { Dictionary } from "../language/types";
import { getPlayerName } from "./punishment";

const getMuteCount = async () => {
  const count = await db.litebans_mutes.count();
  return count;
}

const getMutes = async (page: number) => {
  const mutes =  await db.litebans_mutes.findMany({
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

  return mutes;
}

const sanitizeMutes = async (dictionary: Dictionary, mutes: PunishmentListItem[]) => {

  const sanitized = await Promise.all(mutes.map(async (mute) => {
    const name = await getPlayerName(mute.uuid!);
    const until = mute.until.toString() === "0" ? dictionary.table.permanent : new Date(parseInt(mute.until.toString()));
    return {
      ...mute,
      id: mute.id.toString(),
      time: new Date(parseInt(mute.time.toString())),
      status: until == dictionary.table.permanent ? 
                (mute.active ? true : false) : 
                (until < new Date() ? false : undefined),
      console: mute.banned_by_uuid === "[Console]",
      until,
      name
    }
  }));

  return sanitized;
}

export { getMuteCount, getMutes, sanitizeMutes }