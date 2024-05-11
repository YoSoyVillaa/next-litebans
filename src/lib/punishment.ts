import { db } from "./db";

const getPunishmentCount = async () => {
  const bans = await db.litebans_bans.count();
  const mutes = await db.litebans_mutes.count();
  const warns = await db.litebans_warnings.count();
  const kicks = await db.litebans_kicks.count();

  return { bans, mutes, warns, kicks }
}

export { getPunishmentCount }