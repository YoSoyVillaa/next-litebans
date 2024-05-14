"use server"

import Link from "next/link";

import { getPunishmentCount, getPunishments, sanitizePunishments } from "@/lib/punishment/punishment";
import { language } from "@/lib/language/dictionaries";

import { TablePagination } from "@/components/table/pagination";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { PlayerAvatar } from "@/components/avatar/player-avatar";
import { RelativeTimeTooltip } from "@/components/punishments/relative-time-tooltip";
import { PunishmentInfoButton } from "@/components/buttons/punishment-info-button";
import { PunishmentStatusDot } from "@/components/punishments/punishment-status-dot";
import { ConsoleAvatar } from "@/components/avatar/console-avatar";
import { Badge } from "@/components/ui/badge";

interface PunishmentHistoryTableProps {
  page: number;
}

export const PunishmentHistoryTable = async ({ 
  page 
}: PunishmentHistoryTableProps) => {

  const { lang, dictionary } = await language();
  const localDictionary = dictionary.pages.history;

  const dBPunishments = await getPunishments(page);
  const punishments = await sanitizePunishments(localDictionary, dBPunishments);
  const punishmentCount = await getPunishmentCount().then(({ bans, mutes, warns, kicks }) => bans + mutes + warns + kicks);
  const totalPages = Math.ceil(punishmentCount / 10);

  return (
    <>
      <ScrollArea>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center px-2">{localDictionary.table.heads.type}</TableHead>
              <TableHead className="text-center px-2">{localDictionary.table.heads.player}</TableHead>
              <TableHead className="text-center px-2">{localDictionary.table.heads.by}</TableHead>
              <TableHead>{localDictionary.table.heads.reason}</TableHead>
              <TableHead>{localDictionary.table.heads.date}</TableHead>
              <TableHead>{localDictionary.table.heads.expires}</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {punishments.map((punishment) => (
              <TableRow key={`${punishment.type}:${punishment.id}`}>
                <TableCell className="text-center w-20 max-w-20 px-1">
                  <Badge variant={punishment.type} className="px-1">
                    {dictionary.words[`${punishment.type!}s`].singular.toUpperCase()}
                  </Badge>
                </TableCell>
                <TableCell className="space-y-1 w-32 text-center">
                  <Link href={`/history?player=${punishment.uuid}`}>
                    <PlayerAvatar uuid={punishment.uuid!} name={punishment.name!} />
                    <p>{punishment.name}</p>
                  </Link>
                </TableCell>
                <TableCell className="space-y-1 w-32 text-center">
                    <Link href={`/history?staff=${punishment.banned_by_uuid}`}>
                      {punishment.console ? 
                        <ConsoleAvatar name={punishment.banned_by_name!} />
                        : 
                        <PlayerAvatar uuid={punishment.banned_by_uuid!} name={punishment.banned_by_name!} />
                      }
                      <p>{punishment.banned_by_name}</p>
                    </Link>
                </TableCell>
                <TableCell className="w-[200px]">
                  {punishment.reason}
                </TableCell>
                <TableCell className="w-[200px]">
                  <RelativeTimeTooltip lang={lang} time={punishment.time} />
                </TableCell>
                <TableCell className="w-[216px]">
                  { (punishment.type == "ban" || punishment.type == "mute") ?
                      <p className="flex items-center">
                        <PunishmentStatusDot dictionary={localDictionary} status={punishment.status} />
                        <RelativeTimeTooltip lang={lang} time={punishment.until} />
                      </p>
                    : <p>{localDictionary.table.expire_not_applicable}</p>
                  }
                </TableCell>
                <TableCell className="w-[70px]">
                  <PunishmentInfoButton type={punishment.type!} id={punishment.id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <ScrollBar className="md:hidden" orientation="horizontal" />
      </ScrollArea>
      <TablePagination className="mt-4" actualPage={page} totalPages={totalPages} />
    </>
  );
};