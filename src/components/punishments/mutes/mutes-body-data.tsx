import { Dictionary } from "@/lib/language/types";
import { getMutes, sanitizeMutes } from "@/lib/punishment/mute";

import { AvatarName } from "@/components/table/avatar-name";
import { PunishmentInfoButton } from "@/components/buttons/punishment-info-button";
import { PunishmentStatusDot } from "@/components/punishments/punishment-status-dot";
import { RelativeTimeTooltip } from "@/components/punishments/relative-time-tooltip";
import {
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table"

interface MutesBodyDataProps {
  language: string;
  dictionary: Dictionary;
  page: number;
  player?: string;
  staff?: string;
}

export const MutesBodyData = async ({
  language,
  dictionary,
  page,
  player,
  staff
}: MutesBodyDataProps) => {

  const localDictionary = dictionary.pages.mutes;
  const dbMutes = await getMutes(page, player, staff);
  const mutes = await sanitizeMutes(localDictionary, dbMutes);

  return (  
    <TableBody>
      {mutes.map((mute) => (
        <TableRow key={mute.id}>
          <TableCell className="space-y-1 w-32 text-center">
            <AvatarName query="player" name={mute.name!} uuid={mute.uuid!} />
          </TableCell>
          <TableCell className="space-y-1 w-32 text-center">
            <AvatarName query="staff" name={mute.banned_by_name!} uuid={mute.banned_by_uuid!} console={mute.console} />
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