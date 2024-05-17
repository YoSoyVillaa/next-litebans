import { language } from "@/lib/language/dictionaries";
import { getKickCount } from "@/lib/punishment/kick";
import p from "@/lib/language/utils/parse";

import { SearchParams } from "@/types";

import { DefaultPage } from "@/components/layout/default-page";
import { KicksTable } from "@/components/punishments/kicks/kicks-table";
import { getPage } from "@/utils/searchParams";

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

  return (
    <DefaultPage
      title={dictionary.title}
      description={p(dictionary.subtitle, {
        total: kickCount
      })}
      className="w-full lg:w-[761px]"
    >
      <KicksTable page={page} />
    </DefaultPage>
  );
}