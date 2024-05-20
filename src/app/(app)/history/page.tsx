import { language } from "@/lib/language/dictionaries";
import p from "@/lib/language/utils/parse";

import { SearchParams } from "@/types";

import { DefaultPage } from "@/components/layout/default-page";
import { HistoryTable } from "@/components/punishments/history/history-table";
import { getPage, getPlayer, getStaff } from "@/utils/searchParams";
import { getPunishmentCount } from "@/lib/punishment/punishment";

export async function generateMetadata() {
  
  const { dictionary } = await language();
  
  return {
    title: dictionary.pages.history.title
  }
}

export default async function History(searchParams: SearchParams) {
  const dictionary = (await language()).dictionary.pages.history;
  
  
  const page = getPage(searchParams);
  const player = getPlayer(searchParams);
  const staff = getStaff(searchParams);

  const punishmentCount = await getPunishmentCount(player, staff).then(({ bans, mutes, warns, kicks }) => bans + mutes + warns + kicks);

  return (
    <DefaultPage
      title={dictionary.title}
      description={p(dictionary.subtitle, {
        total: punishmentCount
      })}
      className="w-full lg:w-[1024px]"
    >
      <HistoryTable page={page} player={player} staff={staff} />
    </DefaultPage>
  );
}