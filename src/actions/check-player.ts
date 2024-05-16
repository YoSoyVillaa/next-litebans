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
      name: true
    }
  });

  return { 
    exists: player ? true : false,
    name: player?.name
  };
}