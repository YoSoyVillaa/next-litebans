import { SearchParams } from "@/types";
import { siteConfig } from "@config/site";
import p from "@/lib/language/utils/parse";
import { getKickCount } from "@/lib/punishment/kick";
import { language } from "@/lib/language/dictionaries";

import { DefaultPage } from "@/components/layout/default-page";
import { getPage, getPlayer, getStaff } from "@/utils/searchParams";
import { KicksTable } from "@/components/punishments/kicks/kicks-table";

export async function generateMetadata() {
  
  const { dictionary } = await language();
  
  const kickCount = await getKickCount();
  
  return {
    title: dictionary.pages.kicks.title,
    openGraph: {
      images: process.env.SITE_URL + siteConfig.logo,
      description: p(siteConfig.openGraph.pages.kicks.description, {
        total: kickCount
      })
    }
  }
}

export default async function Kicks(searchParams: SearchParams) {
  const dictionary = (await language()).dictionary.pages.kicks;
  
  const page = getPage(searchParams);
  const player = getPlayer(searchParams);
  const staff = getStaff(searchParams);
  
  const kickCount = await getKickCount(player, staff);

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