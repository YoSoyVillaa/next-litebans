import { cache } from "react";

import { PunishmentListItem } from "@/types";

import { db } from "../db";
import { getPlayerName } from "./punishment";
import { Dictionary } from "../language/types";

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
    const active = typeof mute.active === "boolean" ? mute.active : mute.active === "1";
    return {
      ...mute,
      id: mute.id.toString(),
      time: new Date(parseInt(mute.time.toString())),
      status: until == dictionary.table.permanent ? 
                (active ? true : false) : 
                (until < new Date() ? false : undefined),
      console: mute.banned_by_uuid === "[Console]",
      permanent: until == dictionary.table.permanent,
      active,
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

const getCachedMute = cache(
  async (id: number, dictionary: Dictionary) => getMute(id, dictionary)
);

export { getMuteCount, getMutes, sanitizeMutes, getMute, getCachedMute }