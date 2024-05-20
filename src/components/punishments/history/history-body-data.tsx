import Link from "next/link";

import { Dictionary } from "@/lib/language/types";
import { getPunishments, sanitizePunishments } from "@/lib/punishment/punishment";

import { PlayerAvatar } from "@/components/avatar/player-avatar";
import { RelativeTimeTooltip } from "@/components/punishments/relative-time-tooltip";
import { PunishmentInfoButton } from "@/components/buttons/punishment-info-button";
import { PunishmentStatusDot } from "@/components/punishments/punishment-status-dot";
import { ConsoleAvatar } from "@/components/avatar/console-avatar";
import { Badge } from "@/components/ui/badge";
import {
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table"
import { AvatarName } from "@/components/table/avatar-name";

interface HistoryBodyDataProps {
  language: string;
  dictionary: Dictionary;
  page: number;
  player?: string;
  staff?: string;
}

export const HistoryBodyData = async ({
  language,
  dictionary,
  page,
  player,
  staff
}: HistoryBodyDataProps) => {

  const localDictionary = dictionary.pages.history;
  const dBPunishments = await getPunishments(page, player, staff);
  const punishments = await sanitizePunishments(localDictionary, dBPunishments);

  return (  
    <TableBody>
      {punishments.map((punishment) => (
        <TableRow key={`${punishment.type}:${punishment.id}`}>
          <TableCell className="text-center w-24 px-0.5">
            <Badge variant={punishment.type} className="px-1">
              {dictionary.words[`${punishment.type!}s`].singular.toUpperCase()}
            </Badge>
          </TableCell>
          <TableCell className="space-y-1 w-[7.5rem] text-center">
            <AvatarName query="player" name={punishment.name!} uuid={punishment.uuid!} />
          </TableCell>
          <TableCell className="space-y-1 w-[122px] text-center">
            <AvatarName query="staff" name={punishment.banned_by_name!} uuid={punishment.banned_by_uuid!} console={punishment.console} />
          </TableCell>
          <TableCell className="w-[200px]">
            {punishment.reason}
          </TableCell>
          <TableCell className="w-[200px]">
            <RelativeTimeTooltip lang={language} time={punishment.time} />
          </TableCell>
          <TableCell className="w-[216px]">
            { (punishment.type == "ban" || punishment.type == "mute") ?
                <p className="flex items-center">
                  <PunishmentStatusDot dictionary={localDictionary} status={punishment.status} />
                  <RelativeTimeTooltip lang={language} time={punishment.until} />
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
  )
}