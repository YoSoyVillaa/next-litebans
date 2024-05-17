import { language } from "@/lib/language/dictionaries";
import { getKickCount } from "@/lib/punishment/kick";
import p from "@/lib/language/utils/parse";

import { SearchParams } from "@/types";

import { DefaultPage } from "@/components/layout/default-page";
import { HistoryTable } from "@/components/punishments/history/history-table";
import { getPage } from "@/utils/searchParams";
import { getPunishmentCount } from "@/lib/punishment/punishment";

export async function generateMetadata() {
  
  const { dictionary } = await language();
  
  return {
    title: dictionary.pages.history.title
  }
}

export default async function History(searchParams: SearchParams) {
  const dictionary = (await language()).dictionary.pages.history;
  
  const punishmentCount = await getPunishmentCount().then(({ bans, mutes, warns, kicks }) => bans + mutes + warns + kicks);
  
  const page = getPage(searchParams);

  return (
    <DefaultPage
      title={dictionary.title}
      description={p(dictionary.subtitle, {
        total: punishmentCount
      })}
      className="w-full lg:w-[1024px]"
    >
      <HistoryTable page={page} />
    </DefaultPage>
  );
}