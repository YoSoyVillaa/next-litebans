import { SearchParams } from "@/types";
import { siteConfig } from "@config/site";
import p from "@/lib/language/utils/parse";
import { getMuteCount } from "@/lib/punishment/mute";
import { language } from "@/lib/language/dictionaries";
import { getPage, getPlayer, getStaff } from "@/utils/searchParams";

import { DefaultPage } from "@/components/layout/default-page";
import { MutesTable } from "@/components/punishments/mutes/mutes-table";

export async function generateMetadata() {
  
  const { dictionary } = await language();
  
  const muteCount = await getMuteCount();
  
  return {
    title: dictionary.pages.mutes.title,
    openGraph: {
      images: process.env.SITE_URL + siteConfig.logo,
      description: p(siteConfig.openGraph.pages.mutes.description, {
        total: muteCount
      })
    }
  }
}

export default async function Mutes(searchParams: SearchParams) {
  const dictionary = (await language()).dictionary.pages.mutes;
  
  const page = getPage(searchParams);
  const player = getPlayer(searchParams);
  const staff = getStaff(searchParams);
  
  const muteCount = await getMuteCount(player, staff);

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