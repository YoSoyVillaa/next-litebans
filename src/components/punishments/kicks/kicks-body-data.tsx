import Link from "next/link";

import { getKicks, sanitizeKicks } from "@/lib/punishment/kick";

import { PlayerAvatar } from "@/components/avatar/player-avatar";
import { RelativeTimeTooltip } from "@/components/punishments/relative-time-tooltip";
import { PunishmentInfoButton } from "@/components/buttons/punishment-info-button";
import { ConsoleAvatar } from "@/components/avatar/console-avatar";
import {
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table"

interface KicksBodyDataProps {
  language: string;
  page: number;
}

export const KicksBodyData = async ({
  language,
  page
}: KicksBodyDataProps) => {

  const dbKicks = await getKicks(page);
  const kicks = await sanitizeKicks(dbKicks);

  return (  
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
            <RelativeTimeTooltip lang={language} time={kick.time} />
          </TableCell>
          <TableCell>
            <PunishmentInfoButton type="kick" id={kick.id} />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  )
}