import { notFound } from "next/navigation";

import { IoCalendar } from "react-icons/io5";
import { PiScrollFill } from "react-icons/pi";
import { FaEarthEurope } from "react-icons/fa6";
import { PiClockCountdownBold } from "react-icons/pi";

import { siteConfig } from "@config/site";
import p from "@/lib/language/utils/parse";
import { language } from "@/lib/language/dictionaries";
import { formatDate, formatDuration } from "@/lib/date";
import { getCachedBan as getBan } from "@/lib/punishment/ban";

import { Badge } from "@/components/ui/badge";
import { PunishmentInfoCard } from "@/components/info/punishment-info-card";
import { RelativeTimeTooltip } from "@/components/punishments/relative-time-tooltip";
import { PunishmentStatusDot } from "@/components/punishments/punishment-status-dot";

export async function generateMetadata({ params }: { params: { id: string } }) {
  
  const { lang, dictionary } = await language();
  const localDictionary = dictionary.pages.bans;

  if (isNaN(parseInt(params.id))) {
    return notFound();
  }

  const ban = await getBan(parseInt(params.id), localDictionary);

  if (!ban) {
    return notFound();
  }
  
  return {
    title: p(dictionary.pages.bans.info.title, {
      id: params.id
    }),
    openGraph: {
      images: `https://minotar.net/helm/${ban?.uuid ?? ban?.name}`,
      description: p(siteConfig.openGraph.punishments.ban.description, {
        name: ban.name,
        staff: ban.banned_by_name,
        reason: ban.reason,
        time: formatDate(ban.time),
        duration: ban.until instanceof Date ? formatDuration(ban.time, ban.until, lang) : ban.until,
        server: ban.server
      })
    }
  }
}

export default async function Ban({
  params
}: {
  params: { id: string }
}) {

  const { lang, dictionary } = await language();
  const localDictionary = dictionary.pages.bans;

  if (isNaN(parseInt(params.id))) {
    return notFound();
  }

  const ban = await getBan(parseInt(params.id), localDictionary);

  if (!ban) {
    return notFound();
  }

  return (
    <div className="flex h-full flex-col items-center gap-4 py-8 md:py-12 md:pb-8 lg:py-18 px-8">
      <div className="space-y-2 mx-auto">
        <h1 className="text-center text-5xl font-bold leading-tight tracking-tighter sm:text-6xl lg:leading-[1.1]">
          {p(localDictionary.info.title, {
            id: params.id
          })}
        </h1>
        <div className="flex space-x-2 justify-center">
          {ban.ipban && (
            <Badge variant="secondary">{localDictionary.info.badges.ipban}</Badge>
          )}
          {ban.active && (
            <Badge variant="secondary">{localDictionary.info.badges.active}</Badge>
          )}
          {(ban.status !== undefined && !ban.status) && (
            <Badge variant="secondary">{localDictionary.info.badges.expired}</Badge>
          )}
          {(ban.permanent && ban.status) && (
            <Badge variant="secondary">{localDictionary.info.badges.permanent}</Badge>
          )}
        </div>
      </div>

      <section className="space-y-4 text-center md:text-left">
        <PunishmentInfoCard punishment={ban}>
          <div className="space-y-1">
            <h3 className="inline-flex items-center text-lg font-medium"><PiScrollFill className="mr-2"/>{dictionary.words.reason}</h3>
            <p>{ban.reason}</p>
          </div>
          <div className="space-y-1">
            <h3 className="inline-flex items-center text-lg font-medium"><IoCalendar className="mr-2"/>{dictionary.words.date}</h3>
            <p><RelativeTimeTooltip lang={lang} time={ban.time}/></p>
          </div>
          <div className="space-y-1 inline-flex flex-col">
            <h3 className="inline-flex items-center text-lg font-medium"><PiClockCountdownBold className="mr-2"/>{dictionary.words.expires}</h3>
            <p className="flex items-center">
              <PunishmentStatusDot dictionary={localDictionary} status={ban.status} />
              <RelativeTimeTooltip lang={lang} time={ban.until}/>
            </p>
          </div>
          <div className="space-y-1">
            <h3 className="inline-flex items-center text-lg font-medium"><FaEarthEurope className="mr-2"/>{dictionary.words.originServer}</h3>
            <p>{ban.server}</p>
          </div>
        </PunishmentInfoCard>

        <div className="block md:hidden order-3 mx-auto space-y-4 w-[350px]">
          <div className="space-y-1">
            <h3 className="inline-flex items-center text-lg font-medium"><PiScrollFill className="mr-2"/>{dictionary.words.reason}</h3>
            <p>{ban.reason}</p>
          </div>
          <div className="space-y-1">
            <h3 className="inline-flex items-center text-lg font-medium"><IoCalendar className="mr-2"/>{dictionary.words.date}</h3>
            <p><RelativeTimeTooltip lang={lang} time={ban.time}/></p>
          </div>
          <div className="space-y-1 inline-flex flex-col w-full">
            <h3 className="inline-flex items-center text-lg font-medium mx-auto"><PiClockCountdownBold className="mr-2"/>{dictionary.words.expires}</h3>
            <p className="flex items-center mx-auto">
              <PunishmentStatusDot dictionary={localDictionary} status={ban.status} />
              <RelativeTimeTooltip lang={lang} time={ban.until}/>
            </p>
          </div>
          <div className="space-y-1">
            <h3 className="inline-flex items-center text-lg font-medium"><FaEarthEurope className="mr-2"/>{dictionary.words.originServer}</h3>
            <p>{ban.server}</p>
          </div>
        </div>
      </section>
    </div>
  )
}