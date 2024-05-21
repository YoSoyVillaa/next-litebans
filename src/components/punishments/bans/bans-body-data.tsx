import { Dictionary } from "@/lib/language/types";
import { getBans, sanitizeBans } from "@/lib/punishment/ban";

import { AvatarName } from "@/components/table/avatar-name";
import { PunishmentInfoButton } from "@/components/buttons/punishment-info-button";
import { PunishmentStatusDot } from "@/components/punishments/punishment-status-dot";
import { RelativeTimeTooltip } from "@/components/punishments/relative-time-tooltip";
import {
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table"

interface BansBodyDataProps {
  language: string;
  dictionary: Dictionary;
  page: number;
  player?: string;
  staff?: string;
}

export const BansBodyData = async ({
  language,
  dictionary,
  page,
  player,
  staff
}: BansBodyDataProps) => {

  const localDictionary = dictionary.pages.bans;
  const dbBans = await getBans(page, player, staff);
  const bans = await sanitizeBans(localDictionary, dbBans);

  return (  
    <TableBody>
      {bans.map((ban) => (
        <TableRow key={ban.id}>
          <TableCell className="space-y-1 w-32 text-center">
            <AvatarName query="player" name={ban.name!} uuid={ban.uuid!} />
          </TableCell>
          <TableCell className="space-y-1 w-32 text-center">
            <AvatarName query="staff" name={ban.banned_by_name!} uuid={ban.banned_by_uuid!} console={ban.console} />
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