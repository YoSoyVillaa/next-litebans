import { language } from "@/lib/language/dictionaries";
import { db } from "@/lib/db";
import { DefaultPage } from "@/components/layout/default-page";
import { siteConfig } from "@config/site";
import p from "@/lib/language/utils/parse";

export async function generateMetadata() {
  
  const { dictionary } = await language();
  
  return {
    title: dictionary.pages.home.title
  }
}

export default async function Home() {
  const { dictionary } = await language();

  const banCount = await db.litebans_bans.count();
  const muteCount = await db.litebans_mutes.count();
  const warnCount = await db.litebans_warnings.count();
  const kickCount = await db.litebans_kicks.count();

  return (
    <DefaultPage
      title={siteConfig.title}
      description={p(dictionary.pages.home.subtitle, {
        bans: banCount,
        mutes: muteCount,
        warns: warnCount,
        kicks: kickCount,
        total: banCount + muteCount + warnCount + kickCount
      })}
    >
      <>
        <ul>
          <li>{dictionary.words.bans}: {banCount}</li>
          <li>{dictionary.words.mutes}: {muteCount}</li>
          <li>{dictionary.words.warns}: {warnCount}</li>
          <li>{dictionary.words.kicks}: {kickCount}</li>
        </ul>
      </>
    </DefaultPage>
  );
}