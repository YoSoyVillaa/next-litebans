import { PunishmentListItem } from "@/types";
import { db } from "../db";
import { Dictionary } from "../language/types";
import { getPlayerName } from "./punishment";

const getMuteCount = async (player?: string, staff?: string) => {
  const count = await db.litebans_mutes.count({
    where: {
      uuid: player,
      banned_by_uuid: staff
    }
  });
  return count;
}

const getMutes = async (page: number, player?: string, staff?: string) => {
  const mutes =  await db.litebans_mutes.findMany({
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
      permanent: until == dictionary.table.permanent,
      active: Boolean(mute.active),
      until,
      name
    }
  }));

  return sanitized;
}

const getMute = async (id: number, dictionary: Dictionary) => {
  const mute = await db.litebans_mutes.findUnique({
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

  if (!mute) {
    return null;
  }
  
  const sanitized = (await sanitizeMutes(dictionary, [mute]))[0];

  return {
    ...sanitized,
    ipban: mute.ipban,
    server: mute.server_origin
  }
}

export { getMuteCount, getMutes, sanitizeMutes, getMute }