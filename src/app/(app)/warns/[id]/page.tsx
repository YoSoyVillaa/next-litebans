import { notFound } from "next/navigation";

import { PiScrollFill } from "react-icons/pi";
import { IoCalendar } from "react-icons/io5";
import { MdOutlineNotificationsActive } from "react-icons/md";
import { FaEarthEurope } from "react-icons/fa6";

import { language } from "@/lib/language/dictionaries";
import { getWarn } from "@/lib/punishment/warn";
import p from "@/lib/language/utils/parse";

import { RelativeTimeTooltip } from "@/components/punishments/relative-time-tooltip";
import { PunishmentInfoCard } from "@/components/info/punishment-info-card";

export async function generateMetadata({ params }: { params: { id: string } }) {
  
  const { dictionary } = await language();

  if (isNaN(parseInt(params.id))) {
    return {
      title: dictionary.pages.errors.notFound.title
    }
  }
  
  return {
    title: p(dictionary.pages.warns.info.title, {
      id: params.id
    })
  }
}

export default async function Warn({
  params
}: {
  params: { id: string }
}) {

  const { lang, dictionary } = await language();
  const localDictionary = dictionary.pages.warns;

  if (isNaN(parseInt(params.id))) {
    return notFound();
  }

  const warn = await getWarn(parseInt(params.id));

  if (!warn) {
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
      </div>

      <section className="space-y-4 text-center md:text-left">
        <PunishmentInfoCard punishment={warn}>
          <div className="space-y-1">
            <h3 className="inline-flex items-center text-lg font-medium"><PiScrollFill className="mr-2"/>{dictionary.words.reason}</h3>
            <p>{warn.reason}</p>
          </div>
          <div className="space-y-1">
            <h3 className="inline-flex items-center text-lg font-medium"><IoCalendar className="mr-2"/>{dictionary.words.date}</h3>
            <p><RelativeTimeTooltip lang={lang} time={warn.time}/></p>
          </div>
          <div className="space-y-1">
            <h3 className="inline-flex items-center text-lg font-medium"><MdOutlineNotificationsActive className="mr-2"/>{dictionary.words.notified}</h3>
            <p>{warn.warned ? dictionary.words.yes : dictionary.words.no}</p>
          </div>
          <div className="space-y-1">
            <h3 className="inline-flex items-center text-lg font-medium"><FaEarthEurope className="mr-2"/>{dictionary.words.originServer}</h3>
            <p>{warn.server}</p>
          </div>
        </PunishmentInfoCard>

        <div className="block md:hidden order-3 mx-auto space-y-4 w-[350px]">
          <div className="space-y-1">
            <h3 className="inline-flex items-center text-lg font-medium"><PiScrollFill className="mr-2"/>{dictionary.words.reason}</h3>
            <p>{warn.reason}</p>
          </div>
          <div className="space-y-1">
            <h3 className="inline-flex items-center text-lg font-medium"><IoCalendar className="mr-2"/>{dictionary.words.date}</h3>
            <p><RelativeTimeTooltip lang={lang} time={warn.time}/></p>
          </div>
          <div className="space-y-1">
            <h3 className="inline-flex items-center text-lg font-medium"><MdOutlineNotificationsActive className="mr-2"/>{dictionary.words.notified}</h3>
            <p>{warn.warned ? dictionary.words.yes : dictionary.words.no}</p>
          </div>
          <div className="space-y-1">
            <h3 className="inline-flex items-center text-lg font-medium"><FaEarthEurope className="mr-2"/>{dictionary.words.originServer}</h3>
            <p>{warn.server}</p>
          </div>
        </div>
      </section>
    </div>
  )
}