import { language } from "@/lib/language/dictionaries";
import { getBanCount } from "@/lib/punishment/ban";
import p from "@/lib/language/utils/parse";

import { SearchParams } from "@/types";

import { DefaultPage } from "@/components/layout/default-page";
import { BansTable } from "@/components/punishments/bans/bans-table";
import { getPage, getPlayer, getStaff } from "@/utils/searchParams";

export async function generateMetadata() {
  
  const { dictionary } = await language();
  
  return {
    title: dictionary.pages.bans.title
  }
}

export default async function Bans(searchParams: SearchParams) {
  const dictionary = await (await language()).dictionary.pages.bans;
  
  const banCount = await getBanCount();
  
  const page = getPage(searchParams);
  const player = getPlayer(searchParams);
  const staff = getStaff(searchParams);

  return (
    <DefaultPage
      title={dictionary.title}
      description={p(dictionary.subtitle, {
        total: banCount
      })}
      className="w-full lg:w-[975px]"
    >
      <BansTable page={page} player={player} staff={staff} />
    </DefaultPage>
  );
}