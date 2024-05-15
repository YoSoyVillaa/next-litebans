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

interface WarnsBodyDataProps {
  language: string;
  page: number;
}

export const WarnsBodyData = async ({
  language,
  page
}: WarnsBodyDataProps) => {

  const dbWarns = await getWarns(page);
  const warns = await sanitizeWarns(dbWarns);

  return (  
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