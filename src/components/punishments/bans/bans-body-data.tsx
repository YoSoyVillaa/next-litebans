import Link from "next/link";

import { Dictionary } from "@/lib/language/types";
import { getBans, sanitizeBans } from "@/lib/punishment/ban";

import { PlayerAvatar } from "@/components/avatar/player-avatar";
import { RelativeTimeTooltip } from "@/components/punishments/relative-time-tooltip";
import { PunishmentInfoButton } from "@/components/buttons/punishment-info-button";
import { PunishmentStatusDot } from "@/components/punishments/punishment-status-dot";
import { ConsoleAvatar } from "@/components/avatar/console-avatar";
import {
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table"

interface BansBodyDataProps {
  language: string;
  dictionary: Dictionary;
  page: number;
}

export const BansBodyData = async ({
  language,
  dictionary,
  page
}: BansBodyDataProps) => {

  const localDictionary = dictionary.pages.bans;
  const dbBans = await getBans(page);
  const bans = await sanitizeBans(localDictionary, dbBans);

  return (  
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
            <RelativeTimeTooltip lang={language} time={ban.time} />
          </TableCell>
          <TableCell className="w-[200px]">
            <p className="flex items-center">
              <PunishmentStatusDot dictionary={localDictionary} status={ban.status} />
              <RelativeTimeTooltip lang={language} time={ban.until} />
            </p>
          </TableCell>
          <TableCell>
            <PunishmentInfoButton type="ban" id={ban.id} />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  )
}