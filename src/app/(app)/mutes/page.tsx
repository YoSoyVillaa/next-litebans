import { language } from "@/lib/language/dictionaries";
import { getMuteCount } from "@/lib/punishment/mute";
import p from "@/lib/language/utils/parse";

import { SearchParams } from "@/types";

import { DefaultPage } from "@/components/layout/default-page";
import { MutesTable } from "@/components/punishments/mutes/mutes-table";

export async function generateMetadata() {
  
  const { dictionary } = await language();
  
  return {
    title: dictionary.pages.mutes.title
  }
}

export default async function Mutes({
  searchParams
}: SearchParams) {
  const dictionary = (await language()).dictionary.pages.mutes;
  
  const muteCount = await getMuteCount();
  
  let page = searchParams.page ? parseInt(searchParams.page as string) : 1;
  if (isNaN(page) || page < 1) {
    page = 1;
  }

  return (
    <DefaultPage
      title={dictionary.title}
      description={p(dictionary.subtitle, {
        total: muteCount
      })}
      className="w-full lg:w-[975px]"
    >
      <MutesTable page={page} />
    </DefaultPage>
  );
}