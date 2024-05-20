import Link from "next/link";
import { FaCheck } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";

import { getWarns, sanitizeWarns } from "@/lib/punishment/warn";

import { PlayerAvatar } from "@/components/avatar/player-avatar";
import { RelativeTimeTooltip } from "@/components/punishments/relative-time-tooltip";
import { PunishmentInfoButton } from "@/components/buttons/punishment-info-button";
import { ConsoleAvatar } from "@/components/avatar/console-avatar";
import {
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table"
import { AvatarName } from "@/components/table/avatar-name";

interface WarnsBodyDataProps {
  language: string;
  page: number;
  player?: string;
  staff?: string;
}

export const WarnsBodyData = async ({
  language,
  page,
  player,
  staff
}: WarnsBodyDataProps) => {

  const dbWarns = await getWarns(page, player, staff);
  const warns = await sanitizeWarns(dbWarns);

  return (  
    <TableBody>
      {warns.map((warn) => (
        <TableRow key={warn.id}>
          <TableCell className="space-y-1 w-32 text-center">
            <AvatarName query="player" name={warn.name!} uuid={warn.uuid!} />
          </TableCell>
          <TableCell className="space-y-1 w-32 text-center">
            <AvatarName query="staff" name={warn.banned_by_name!} uuid={warn.banned_by_uuid!} console={warn.console} />
          </TableCell>
          <TableCell className="w-[250px]">
            {warn.reason}
          </TableCell>
          <TableCell className="w-[200px]">
            <RelativeTimeTooltip lang={language} time={warn.time} />
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
  )
}