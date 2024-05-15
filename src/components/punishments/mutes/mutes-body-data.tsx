import Link from "next/link";

import { Dictionary } from "@/lib/language/types";
import { getMutes, sanitizeMutes } from "@/lib/punishment/mute";

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

interface MutesBodyDataProps {
  language: string;
  dictionary: Dictionary;
  page: number;
}

export const MutesBodyData = async ({
  language,
  dictionary,
  page
}: MutesBodyDataProps) => {

  const localDictionary = dictionary.pages.mutes;
  const dbMutes = await getMutes(page);
  const mutes = await sanitizeMutes(localDictionary, dbMutes);

  return (  
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
            <RelativeTimeTooltip lang={language} time={mute.time} />
          </TableCell>
          <TableCell className="w-[200px]">
            <p className="flex items-center">
              <PunishmentStatusDot dictionary={localDictionary} status={mute.status} />
              <RelativeTimeTooltip lang={language} time={mute.until} />
            </p>
          </TableCell>
          <TableCell>
            <PunishmentInfoButton type="mute" id={mute.id} />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  )
}