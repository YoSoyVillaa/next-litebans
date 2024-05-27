import { SearchParams } from "@/types";
import p from "@/lib/language/utils/parse";
import { getKickCount } from "@/lib/punishment/kick";
import { language } from "@/lib/language/dictionaries";

import { DefaultPage } from "@/components/layout/default-page";
import { getPage, getPlayer, getStaff } from "@/utils/searchParams";
import { KicksTable } from "@/components/punishments/kicks/kicks-table";

export async function generateMetadata() {
  
  const { dictionary } = await language();
  
  return {
    title: dictionary.pages.kicks.title
  }
}

export default async function Kicks(searchParams: SearchParams) {
  const dictionary = (await language()).dictionary.pages.kicks;
  
  const kickCount = await getKickCount();
  
  const page = getPage(searchParams);
  const player = getPlayer(searchParams);
  const staff = getStaff(searchParams);

  return (
    <DefaultPage
      title={dictionary.title}
      description={p(dictionary.subtitle, {
        total: kickCount
      })}
      className="w-full lg:w-[1024px]"
    >
      <KicksTable page={page} player={player} staff={staff} />
    </DefaultPage>
  );
}