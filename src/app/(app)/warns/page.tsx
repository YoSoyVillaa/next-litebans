import Link from "next/link";

import { language } from "@/lib/language/dictionaries";
import { getWarnCount, getWarns, sanitizeWarns } from "@/lib/punishment/warn";
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
import { FaCheck } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";
import { PlayerAvatar } from "@/components/avatar/player-avatar";
import { ConsoleAvatar } from "@/components/avatar/console-avatar";
import { RelativeTimeTooltip } from "@/components/punishments/relative-time-tooltip";
import { PunishmentInfoButton } from "@/components/buttons/punishment-info-button";

export async function generateMetadata() {
  
  const { dictionary } = await language();
  
  return {
    title: dictionary.pages.warns.title
  }
}

export default async function Warns({
  searchParams
}: SearchParams) {
  let { lang, dictionary } = await language();
  dictionary = dictionary.pages.warns;
  
  const warnCount = await getWarnCount();
  const pages = Math.ceil(warnCount / 10);
  
  let page = searchParams.page ? parseInt(searchParams.page as string) : 1;
  if (isNaN(page) || page < 1) {
    page = 1;
  }

  const dbWarns = await getWarns(page);
  const warns = await sanitizeWarns(dbWarns);

  return (
    <DefaultPage
      title={dictionary.title}
      description={p(dictionary.subtitle, {
        total: warnCount
      })}
      className="w-full lg:w-[876px]"
    >
      <ScrollArea>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center px-2">{dictionary.table.heads.player}</TableHead>
              <TableHead className="text-center px-2">{dictionary.table.heads.by}</TableHead>
              <TableHead>{dictionary.table.heads.reason}</TableHead>
              <TableHead>{dictionary.table.heads.date}</TableHead>
              <TableHead className="text-center px-2">{dictionary.table.heads.notified}</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {warns.map((warn) => (
              <TableRow key={warn.id}>
                <TableCell className="space-y-1 w-32 text-center">
                  <Link href={`/history?player=${warn.uuid}`}>
                    <PlayerAvatar uuid={warn.uuid!} name={warn.name!} />
                    <p>{warn.name}</p>
                  </Link>
                </TableCell>
                <TableCell className="space-y-1 w-32 text-center">
                  <Link href={`/history?staff=${warn.banned_by_uuid}`}>
                    {warn.console ? 
                      <ConsoleAvatar name={warn.banned_by_name!} />
                      : 
                      <PlayerAvatar uuid={warn.banned_by_uuid!} name={warn.banned_by_name!} />
                    }
                    <p>{warn.banned_by_name}</p>
                  </Link>
                </TableCell>
                <TableCell className="w-[250px]">
                  {warn.reason}
                </TableCell>
                <TableCell className="w-[200px]">
                  <RelativeTimeTooltip lang={lang} time={warn.time} />
                </TableCell>
                <TableCell className="w-[100px]">
                  {warn.warned ?
                    <FaCheck className="mx-auto text-xl" />
                    :
                    <FaTimes className="mx-auto text-lg" />
                  }
                </TableCell>
                <TableCell>
                  <PunishmentInfoButton type="warn" id={warn.id} />
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