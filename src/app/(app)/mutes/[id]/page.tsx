import { notFound } from "next/navigation";

import { IoCalendar } from "react-icons/io5";
import { PiScrollFill } from "react-icons/pi";
import { FaEarthEurope } from "react-icons/fa6";
import { PiClockCountdownBold } from "react-icons/pi";

import p from "@/lib/language/utils/parse";
import { getMute } from "@/lib/punishment/mute";
import { language } from "@/lib/language/dictionaries";

import { Badge } from "@/components/ui/badge";
import { PunishmentInfoCard } from "@/components/info/punishment-info-card";
import { RelativeTimeTooltip } from "@/components/punishments/relative-time-tooltip";
import { PunishmentStatusDot } from "@/components/punishments/punishment-status-dot";

export async function generateMetadata({ params }: { params: { id: string } }) {
  
  const { dictionary } = await language();

  if (isNaN(parseInt(params.id))) {
    return {
      title: dictionary.pages.errors.notFound.title
    }
  }
  
  return {
    title: p(dictionary.pages.mutes.info.title, {
      id: params.id
    })
  }
}

export default async function Mute({
  params
}: {
  params: { id: string }
}) {

  const { lang, dictionary } = await language();
  const localDictionary = dictionary.pages.mutes;

  if (isNaN(parseInt(params.id))) {
    return notFound();
  }

  const mute = await getMute(parseInt(params.id), localDictionary);

  if (!mute) {
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
          {mute.ipban && (
            <Badge variant="secondary">{localDictionary.info.badges.ipmute}</Badge>
          )}
          {mute.active && (
            <Badge variant="secondary">{localDictionary.info.badges.active}</Badge>
          )}
          {(!mute.status) && (
            <Badge variant="secondary">{localDictionary.info.badges.expired}</Badge>
          )}
          {(mute.permanent && mute.status) && (
            <Badge variant="secondary">{localDictionary.info.badges.permanent}</Badge>
          )}
        </div>
      </div>

      <section className="space-y-4 text-center md:text-left">
        <PunishmentInfoCard punishment={mute}>
          <div className="space-y-1">
            <h3 className="inline-flex items-center text-lg font-medium"><PiScrollFill className="mr-2"/>{dictionary.words.reason}</h3>
            <p>{mute.reason}</p>
          </div>
          <div className="space-y-1">
            <h3 className="inline-flex items-center text-lg font-medium"><IoCalendar className="mr-2"/>{dictionary.words.date}</h3>
            <p><RelativeTimeTooltip lang={lang} time={mute.time}/></p>
          </div>
          <div className="space-y-1 inline-flex flex-col">
            <h3 className="inline-flex items-center text-lg font-medium"><PiClockCountdownBold className="mr-2"/>{dictionary.words.expires}</h3>
            <p className="flex items-center">
              <PunishmentStatusDot dictionary={localDictionary} status={mute.status} />
              <RelativeTimeTooltip lang={lang} time={mute.until}/>
            </p>
          </div>
          <div className="space-y-1">
            <h3 className="inline-flex items-center text-lg font-medium"><FaEarthEurope className="mr-2"/>{dictionary.words.originServer}</h3>
            <p>{mute.server}</p>
          </div>
        </PunishmentInfoCard>

        <div className="block md:hidden order-3 mx-auto space-y-4 w-[350px]">
          <div className="space-y-1">
            <h3 className="inline-flex items-center text-lg font-medium"><PiScrollFill className="mr-2"/>{dictionary.words.reason}</h3>
            <p>{mute.reason}</p>
          </div>
          <div className="space-y-1">
            <h3 className="inline-flex items-center text-lg font-medium"><IoCalendar className="mr-2"/>{dictionary.words.date}</h3>
            <p><RelativeTimeTooltip lang={lang} time={mute.time}/></p>
          </div>
          <div className="space-y-1 inline-flex flex-col w-full">
            <h3 className="inline-flex items-center text-lg font-medium mx-auto"><PiClockCountdownBold className="mr-2"/>{dictionary.words.expires}</h3>
            <p className="flex items-center mx-auto">
              <PunishmentStatusDot dictionary={localDictionary} status={mute.status} />
              <RelativeTimeTooltip lang={lang} time={mute.until}/>
            </p>
          </div>
          <div className="space-y-1">
            <h3 className="inline-flex items-center text-lg font-medium"><FaEarthEurope className="mr-2"/>{dictionary.words.originServer}</h3>
            <p>{mute.server}</p>
          </div>
        </div>
      </section>
    </div>
  )
}