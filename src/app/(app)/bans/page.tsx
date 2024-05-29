import { SearchParams } from "@/types";
import p from "@/lib/language/utils/parse";
import { getBanCount } from "@/lib/punishment/ban";
import { language } from "@/lib/language/dictionaries";

import { DefaultPage } from "@/components/layout/default-page";
import { getPage, getPlayer, getStaff } from "@/utils/searchParams";
import { BansTable } from "@/components/punishments/bans/bans-table";

export async function generateMetadata() {
  
  const { dictionary } = await language();
  
  return {
    title: dictionary.pages.bans.title
  }
}

export default async function Bans(searchParams: SearchParams) {
  const dictionary = await (await language()).dictionary.pages.bans;
  
  const page = getPage(searchParams);
  const player = getPlayer(searchParams);
  const staff = getStaff(searchParams);
  
  const banCount = await getBanCount(player, staff);
  
  return (
    <DefaultPage
      title={dictionary.title}
      description={p(dictionary.subtitle, {
        total: banCount
      })}
      className="w-full lg:w-[1024px]"
    >
      <BansTable page={page} player={player} staff={staff} />
    </DefaultPage>
  );
}