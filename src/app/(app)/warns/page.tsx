import { language } from "@/lib/language/dictionaries";
import { getWarnCount } from "@/lib/punishment/warn";
import p from "@/lib/language/utils/parse";

import { SearchParams } from "@/types";

import { DefaultPage } from "@/components/layout/default-page";
import { WarnsTable } from "@/components/punishments/warns/warns-table";

export async function generateMetadata() {
  
  const { dictionary } = await language();
  
  return {
    title: dictionary.pages.warns.title
  }
}

export default async function Warns({
  searchParams
}: SearchParams) {
  const dictionary = (await language()).dictionary.pages.warns;
  
  const warnCount = await getWarnCount();
  
  let page = searchParams.page ? parseInt(searchParams.page as string) : 1;
  if (isNaN(page) || page < 1) {
    page = 1;
  }

  return (
    <DefaultPage
      title={dictionary.title}
      description={p(dictionary.subtitle, {
        total: warnCount
      })}
      className="w-full lg:w-[876px]"
    >
      <WarnsTable page={page} />
    </DefaultPage>
  );
}