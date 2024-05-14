import Link from "next/link";

import { language } from "@/lib/language/dictionaries";
import { getMuteCount, getMutes, sanitizeMutes } from "@/lib/punishment/mute";
import p from "@/lib/language/utils/parse";

import { SearchParams } from "@/types";

import { DefaultPage } from "@/components/layout/default-page";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { TablePagination } from "@/components/table/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { PlayerAvatar } from "@/components/avatar/player-avatar";
import { ConsoleAvatar } from "@/components/avatar/console-avatar";
import { RelativeTimeTooltip } from "@/components/punishments/relative-time-tooltip";
import { PunishmentStatusDot } from "@/components/punishments/punishment-status-dot";
import { PunishmentInfoButton } from "@/components/buttons/punishment-info-button";

export async function generateMetadata() {
  
  const { dictionary } = await language();
  
  return {
    title: dictionary.pages.mutes.title
  }
}

export default async function Mutes({
  searchParams
}: SearchParams) {
  let { lang, dictionary } = await language();
  dictionary = dictionary.pages.mutes;
  
  const muteCount = await getMuteCount();
  const pages = Math.ceil(muteCount / 10);
  
  let page = searchParams.page ? parseInt(searchParams.page as string) : 1;
  if (isNaN(page) || page < 1) {
    page = 1;
  }

  const dbMutes = await getMutes(page);
  const mutes = await sanitizeMutes(dictionary, dbMutes);

  return (
    <DefaultPage
      title={dictionary.title}
      description={p(dictionary.subtitle, {
        total: muteCount
      })}
      className="w-full lg:w-[975px]"
    >
      <ScrollArea>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center px-2">{dictionary.table.heads.player}</TableHead>
              <TableHead className="text-center px-2">{dictionary.table.heads.by}</TableHead>
              <TableHead>{dictionary.table.heads.reason}</TableHead>
              <TableHead>{dictionary.table.heads.date}</TableHead>
              <TableHead>{dictionary.table.heads.expires}</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mutes.map((mute) => (
              <TableRow key={mute.id}>
                <TableCell className="space-y-1 w-32 text-center">
                  <Link href={`/history?player=${mute.uuid}`}>
                    <PlayerAvatar uuid={mute.uuid!} name={mute.name!} />
                    <p>{mute.name}</p>
                  </Link>
                </TableCell>
                <TableCell className="space-y-1 w-32 text-center">
                  <Link href={`/history?staff=${mute.banned_by_uuid}`}>
                    {mute.console ? 
                      <ConsoleAvatar name={mute.banned_by_name!} />
                      : 
                      <PlayerAvatar uuid={mute.banned_by_uuid!} name={mute.banned_by_name!} />
                    }
                    <p>{mute.banned_by_name}</p>
                  </Link>
                </TableCell>
                <TableCell className="w-[250px]">
                  {mute.reason}
                </TableCell>
                <TableCell className="w-[200px]">
                  <RelativeTimeTooltip lang={lang} time={mute.time} />
                </TableCell>
                <TableCell className="w-[200px]">
                  <p className="flex items-center">
                    <PunishmentStatusDot dictionary={dictionary} status={mute.status} />
                    <RelativeTimeTooltip lang={lang} time={mute.until} />
                  </p>
                </TableCell>
                <TableCell>
                  <PunishmentInfoButton type="mute" id={mute.id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <ScrollBar className="md:hidden" orientation="horizontal" />
      </ScrollArea>
      <TablePagination className="mt-4" actualPage={page} totalPages={pages} />
    </DefaultPage>
  );
}