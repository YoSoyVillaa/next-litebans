import { language } from "@/lib/language/dictionaries";
import { db } from "@/lib/db";
import { DefaultPage } from "@/components/layout/default-page";
import { siteConfig } from "@config/site";
import p from "@/lib/language/utils/parse";
import q from "@/lib/language/utils/quantity";
import { PunishmentTypeCard } from "@/components/punishments/punishment-type-card";
import { Icons } from "@/components/layout/icons";
import { PunishmentHistoryTable } from "@/components/punishments/punishment-history-table";
import { SearchParams } from "@/types";

export async function generateMetadata() {
  
  const { dictionary } = await language();
  
  return {
    title: dictionary.pages.home.title
  }
}

export default async function Home({
  searchParams
}: SearchParams) {
  const { dictionary } = await language();

  const banCount = await db.litebans_bans.count();
  const muteCount = await db.litebans_mutes.count();
  const warnCount = await db.litebans_warnings.count();
  const kickCount = await db.litebans_kicks.count();

  let page = searchParams.page ? parseInt(searchParams.page as string) : 1;
  if (isNaN(page) || page < 1) {
    page = 1;
  }

  return (
    <DefaultPage
      title={siteConfig.title}
      description={p(dictionary.pages.home.subtitle, {
        bans: banCount,
        mutes: muteCount,
        warns: warnCount,
        kicks: kickCount,
        total: banCount + muteCount + warnCount + kickCount
      })}
      className="w-full space-y-6"
    >
      <div className="mx-auto grid gap-4 sm:grid-cols-2 sm:w-[496px] lg:grid-cols-4 lg:w-[1008px]">
        <PunishmentTypeCard
          title={q(dictionary.words.bans, banCount)}
          count={banCount}
          href="/bans"
          punishmentIcon={Icons.ban({ color: 'red', className: "size-[8.5rem] opacity-20 absolute top-[-35px] right-[-25px]" })}
        />
        <PunishmentTypeCard
          title={q(dictionary.words.mutes, muteCount)}
          count={muteCount}
          href="/mutes"
          punishmentIcon={Icons.mute({ color: 'gray', className: "size-[8.5rem] opacity-20 absolute top-[-35px] right-[-25px]" })}
        />
        <PunishmentTypeCard
          title={q(dictionary.words.warns, warnCount)}
          count={warnCount}
          href="/warns"
          punishmentIcon={Icons.warn({ className: "size-[8.5rem] opacity-20 absolute top-[-35px] right-[-25px] text-yellow-500 ml-2" })}
        />
        <PunishmentTypeCard
          title={q(dictionary.words.kicks, kickCount)}
          count={kickCount}
          href="/kicks"
          punishmentIcon={Icons.kick({ className: "size-[8.5rem] opacity-20 absolute top-[-35px] right-[-25px] text-sky-600 ml-2" })}
        />
      </div>
      <div className="mx-auto w-full lg:w-[1022px]">
        <PunishmentHistoryTable page={page} />
      </div>
    </DefaultPage>
  );
}