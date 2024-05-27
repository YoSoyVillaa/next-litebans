import { SearchParams } from "@/types";
import p from "@/lib/language/utils/parse";
import { getMuteCount } from "@/lib/punishment/mute";
import { language } from "@/lib/language/dictionaries";
import { getPage, getPlayer, getStaff } from "@/utils/searchParams";

import { DefaultPage } from "@/components/layout/default-page";
import { MutesTable } from "@/components/punishments/mutes/mutes-table";

export async function generateMetadata() {
  
  const { dictionary } = await language();
  
  return {
    title: dictionary.pages.mutes.title
  }
}

export default async function Mutes(searchParams: SearchParams) {
  const dictionary = (await language()).dictionary.pages.mutes;
  
  const muteCount = await getMuteCount();
  
  const page = getPage(searchParams);
  const player = getPlayer(searchParams);
  const staff = getStaff(searchParams);

  return (
    <DefaultPage
      title={dictionary.title}
      description={p(dictionary.subtitle, {
        total: muteCount
      })}
      className="w-full lg:w-[1024px]"
    >
      <MutesTable page={page} player={player} staff={staff} />
    </DefaultPage>
  );
}