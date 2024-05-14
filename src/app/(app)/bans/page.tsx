import Link from "next/link";

import { language } from "@/lib/language/dictionaries";
import { getBanCount, getBans, sanitizeBans } from "@/lib/punishment/ban";
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
    title: dictionary.pages.bans.title
  }
}

export default async function Bans({
  searchParams
}: SearchParams) {
  let { lang, dictionary } = await language();
  dictionary = dictionary.pages.bans;
  
  const banCount = await getBanCount();
  const pages = Math.ceil(banCount / 10);
  
  let page = searchParams.page ? parseInt(searchParams.page as string) : 1;
  if (isNaN(page) || page < 1) {
    page = 1;
  }

  const dbBans = await getBans(page);
  const bans = await sanitizeBans(dictionary, dbBans);

  return (
    <DefaultPage
      title={dictionary.title}
      description={p(dictionary.subtitle, {
        total: banCount
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
            {bans.map((ban) => (
              <TableRow key={ban.id}>
                <TableCell className="space-y-1 w-32 text-center">
                  <Link href={`/history?player=${ban.uuid}`}>
                    <PlayerAvatar uuid={ban.uuid!} name={ban.name!} />
                    <p>{ban.name}</p>
                  </Link>
                </TableCell>
                <TableCell className="space-y-1 w-32 text-center">
                  <Link href={`/history?staff=${ban.banned_by_uuid}`}>
                    {ban.console ? 
                      <ConsoleAvatar name={ban.banned_by_name!} />
                      : 
                      <PlayerAvatar uuid={ban.banned_by_uuid!} name={ban.banned_by_name!} />
                    }
                    <p>{ban.banned_by_name}</p>
                  </Link>
                </TableCell>
                <TableCell className="w-[250px]">
                  {ban.reason}
                </TableCell>
                <TableCell className="w-[200px]">
                  <RelativeTimeTooltip lang={lang} time={ban.time} />
                </TableCell>
                <TableCell className="w-[200px]">
                  <p className="flex items-center">
                    <PunishmentStatusDot dictionary={dictionary} status={ban.status} />
                    <RelativeTimeTooltip lang={lang} time={ban.until} />
                  </p>
                </TableCell>
                <TableCell>
                  <PunishmentInfoButton type="ban" id={ban.id} />
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