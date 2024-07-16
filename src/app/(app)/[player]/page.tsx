import Link from "next/link";
import { notFound } from "next/navigation";

import { siteConfig } from "@config/site";
import p from "@/lib/language/utils/parse";
import q from "@/lib/language/utils/quantity";
import { getSkinUUID } from "@/utils/bedrock";
import { language } from "@/lib/language/dictionaries";
import { getPage, getStaff } from "@/utils/searchParams";
import { 
  getPlayerBanCount, 
  getPlayerByName, 
  getPlayerKickCount, 
  getPlayerMuteCount, 
  getPlayerWarnCount 
} from "@/lib/punishment/player";

import { Badge } from "@/components/ui/badge";
import { Icons } from "@/components/layout/icons";
import { HistoryTable } from "@/components/punishments/history/history-table";

export async function generateMetadata({ params }: { params: { player: string } }) {
  
  const { dictionary } = await language();

  const playerName = params.player.replace("%40", '');
  const player = await getPlayerByName(playerName);

  if (!player || player.uuid === "CONSOLE") {
    return {
      title: dictionary.pages.errors.notFound.title
    }
  }

  const banCount = await getPlayerBanCount(player.uuid!);
  const muteCount = await getPlayerMuteCount(player.uuid!);
  const warnCount = await getPlayerWarnCount(player.uuid!);
  const kickCount = await getPlayerKickCount(player.uuid!);
  
  return {
    title: p(dictionary.pages.playerHistory.title, {
      player: params.player.replace("%40", '')
    }),
    openGraph: {
      images: `https://minotar.net/helm/${player.uuid}`,
      description: p(siteConfig.openGraph.pages.player.description, {
        name: player.name,
        bans: banCount,
        mutes: muteCount,
        warns: warnCount,
        kicks: kickCount,
        total: banCount + muteCount + warnCount + kickCount
      })
    }
  }
}

export default async function History({
  searchParams,
  params
}: {
  searchParams: { [key: string]: string | string[] | undefined },
  params: { player: string }
}) {
  const { dictionary } = await language();
  const localDictionary = dictionary.pages.playerHistory;

  const page = getPage({searchParams});

  const playerName = params.player.replace("%40", '');
  const player = await getPlayerByName(playerName);

  if (!player || player.uuid === "CONSOLE") {
    notFound();
  }

  const staff = getStaff({searchParams});

  const banCount = await getPlayerBanCount(player.uuid!);
  const muteCount = await getPlayerMuteCount(player.uuid!);
  const warnCount = await getPlayerWarnCount(player.uuid!);
  const kickCount = await getPlayerKickCount(player.uuid!);

  return (
    <div className="flex h-full flex-col items-center gap-4 py-8 md:py-12 md:pb-8 lg:py-18">
      <div className="space-y-2 md:flex md:space-x-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src={`https://visage.surgeplay.com/bust/512/${getSkinUUID(playerName, player.uuid!)}`} 
          alt={playerName}
          width={192}
          height={192}
          className="mx-auto"
        />
        <div className="md:w-[350px] md:py-4 space-y-1">
          <h1 className="text-center md:text-left text-4xl font-bold leading-tight tracking-tighter sm:text-5xl lg:leading-[1.1]">
            {p(localDictionary.title, {
              player: params.player.replace("%40", '')
            })}
          </h1>
          <div className="flex space-x-2 whitespace-nowrap">
            {banCount > 0 && 
              <Link href={`/@${playerName}/bans`}>
                <Badge variant="secondary" className="px-1 text-secondary-foreground/50">
                  <Icons.ban className="w-4 h-4 mr-1" /> {banCount} {q(dictionary.words.bans, banCount).toUpperCase()}
                </Badge>
              </Link>
            }
            {muteCount > 0 && 
              <Link href={`/@${playerName}/mutes`}>
                <Badge variant="secondary" className="px-1 text-secondary-foreground/50">
                  <Icons.mute className="w-4 h-[0.9rem] mr-1" /> {muteCount} {q(dictionary.words.mutes, muteCount).toUpperCase()}
                </Badge>
              </Link>
            }
            {warnCount > 0 && 
              <Link href={`/@${playerName}/warns`}>
                <Badge variant="secondary" className="px-1 text-secondary-foreground/50">
                  <Icons.warn className="w-4 h-4 mr-1" /> {warnCount} {q(dictionary.words.warns, warnCount).toUpperCase()}
                </Badge>
              </Link>
            }
            {kickCount > 0 && 
              <Link href={`/@${playerName}/kicks`}>
                <Badge variant="secondary" className="px-1 text-secondary-foreground/50">
                  <Icons.kick className="w-4 h-4 mr-1" /> {kickCount} {q(dictionary.words.kicks, kickCount).toUpperCase()}
                </Badge>
              </Link>
            }
          </div>
        </div>
      </div>

      <section className="w-full lg:w-[1024px]">
        <HistoryTable page={page} player={player.uuid!} staff={staff} />
      </section>
    </div>
  );
}