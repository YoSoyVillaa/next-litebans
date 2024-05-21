"use server"

import { db } from "@/lib/db";

export const checkPlayer = async (name: string) => {
  const player = await db.litebans_history.findFirst({
    where: {
      name
    },
    orderBy: {
      date: 'desc'
    },
    select: {
      name: true,
      uuid: true
    }
  });

  if (player && player.uuid === "CONSOLE") return { exists: false }

  return { 
    exists: player ? true : false,
    name: player?.name
  };
}