import Link from "next/link";

import { language } from "@/lib/language/dictionaries";
import { getKickCount, getKicks, sanitizeKicks } from "@/lib/punishment/kick";
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
import { PunishmentInfoButton } from "@/components/buttons/punishment-info-button";

export async function generateMetadata() {
  
  const { dictionary } = await language();
  
  return {
    title: dictionary.pages.kicks.title
  }
}

export default async function Kicks({
  searchParams
}: SearchParams) {
  let { lang, dictionary } = await language();
  dictionary = dictionary.pages.kicks;
  
  const kickCount = await getKickCount();
  const pages = Math.ceil(kickCount / 10);
  
  let page = searchParams.page ? parseInt(searchParams.page as string) : 1;
  if (isNaN(page) || page < 1) {
    page = 1;
  }

  const dbKicks = await getKicks(page);
  const kicks = await sanitizeKicks(dbKicks);

  return (
    <DefaultPage
      title={dictionary.title}
      description={p(dictionary.subtitle, {
        total: kickCount
      })}
      className="w-full lg:w-[761px]"
    >
      <ScrollArea>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center px-2">{dictionary.table.heads.player}</TableHead>
              <TableHead className="text-center px-2">{dictionary.table.heads.by}</TableHead>
              <TableHead>{dictionary.table.heads.reason}</TableHead>
              <TableHead>{dictionary.table.heads.date}</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {kicks.map((kick) => (
              <TableRow key={kick.id}>
                <TableCell className="space-y-1 w-32 text-center">
                  <Link href={`/history?player=${kick.uuid}`}>
                    <PlayerAvatar uuid={kick.uuid!} name={kick.name!} />
                    <p>{kick.name}</p>
                  </Link>
                </TableCell>
                <TableCell className="space-y-1 w-32 text-center">
                  <Link href={`/history?staff=${kick.banned_by_uuid}`}>
                    {kick.console ? 
                      <ConsoleAvatar name={kick.banned_by_name!} />
                      : 
                      <PlayerAvatar uuid={kick.banned_by_uuid!} name={kick.banned_by_name!} />
                    }
                    <p>{kick.banned_by_name}</p>
                  </Link>
                </TableCell>
                <TableCell className="w-[250px]">
                  {kick.reason}
                </TableCell>
                <TableCell className="w-[185px]">
                  <RelativeTimeTooltip lang={lang} time={kick.time} />
                </TableCell>
                <TableCell>
                  <PunishmentInfoButton type="kick" id={kick.id} />
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