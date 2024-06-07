import { notFound } from "next/navigation";

import { IoCalendar } from "react-icons/io5";
import { PiScrollFill } from "react-icons/pi";
import { FaEarthEurope } from "react-icons/fa6";

import { formatDate } from "@/lib/date";
import { siteConfig } from "@config/site";
import p from "@/lib/language/utils/parse";
import { language } from "@/lib/language/dictionaries";
import { getCachedKick as getKick } from "@/lib/punishment/kick";

import { PunishmentInfoCard } from "@/components/info/punishment-info-card";
import { RelativeTimeTooltip } from "@/components/punishments/relative-time-tooltip";

export async function generateMetadata({ params }: { params: { id: string } }) {
  
  const { dictionary } = await language();

  if (isNaN(parseInt(params.id))) {
    return {
      title: dictionary.pages.errors.notFound.title
    }
  }

  const kick = await getKick(parseInt(params.id));

  if (!kick) {
    return notFound();
  }
  
  return {
    title: p(dictionary.pages.kicks.info.title, {
      id: params.id
    }),
    openGraph: {
      images: `https://minotar.net/helm/${kick?.uuid ?? kick?.name}`,
      description: p(siteConfig.openGraph.punishments.kick.description, {
        name: kick.name,
        staff: kick.banned_by_name,
        reason: kick.reason,
        time: formatDate(kick.time),
        server: kick.server
      })
    }
  }
}

export default async function Kick({
  params
}: {
  params: { id: string }
}) {

  const { lang, dictionary } = await language();
  const localDictionary = dictionary.pages.kicks;

  if (isNaN(parseInt(params.id))) {
    return notFound();
  }

  const kick = await getKick(parseInt(params.id));

  if (!kick) {
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
        <PunishmentInfoCard punishment={kick}>
          <div className="space-y-1">
            <h3 className="inline-flex items-center text-lg font-medium"><PiScrollFill className="mr-2"/>{dictionary.words.reason}</h3>
            <p>{kick.reason}</p>
          </div>
          <div className="space-y-1">
            <h3 className="inline-flex items-center text-lg font-medium"><IoCalendar className="mr-2"/>{dictionary.words.date}</h3>
            <p><RelativeTimeTooltip lang={lang} time={kick.time}/></p>
          </div>
          <div className="space-y-1">
            <h3 className="inline-flex items-center text-lg font-medium"><FaEarthEurope className="mr-2"/>{dictionary.words.originServer}</h3>
            <p>{kick.server}</p>
          </div>
        </PunishmentInfoCard>

        <div className="block md:hidden order-3 mx-auto space-y-4 w-[350px]">
          <div className="space-y-1">
            <h3 className="inline-flex items-center text-lg font-medium"><PiScrollFill className="mr-2"/>{dictionary.words.reason}</h3>
            <p>{kick.reason}</p>
          </div>
          <div className="space-y-1">
            <h3 className="inline-flex items-center text-lg font-medium"><IoCalendar className="mr-2"/>{dictionary.words.date}</h3>
            <p><RelativeTimeTooltip lang={lang} time={kick.time}/></p>
          </div>
          <div className="space-y-1">
            <h3 className="inline-flex items-center text-lg font-medium"><FaEarthEurope className="mr-2"/>{dictionary.words.originServer}</h3>
            <p>{kick.server}</p>
          </div>
        </div>
      </section>
    </div>
  )
}