import { getKicks, sanitizeKicks } from "@/lib/punishment/kick";

import { RelativeTimeTooltip } from "@/components/punishments/relative-time-tooltip";
import { PunishmentInfoButton } from "@/components/buttons/punishment-info-button";
import {
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table"
import { AvatarName } from "@/components/table/avatar-name";

interface KicksBodyDataProps {
  language: string;
  page: number;
  player?: string;
  staff?: string;
}

export const KicksBodyData = async ({
  language,
  page,
  player,
  staff
}: KicksBodyDataProps) => {

  const dbKicks = await getKicks(page, player, staff);
  const kicks = await sanitizeKicks(dbKicks);

  return (  
    <TableBody>
      {kicks.map((kick) => (
        <TableRow key={kick.id}>
          <TableCell className="space-y-1 w-32 text-center">
            <AvatarName query="player" name={kick.name!} uuid={kick.uuid!} />
          </TableCell>
          <TableCell className="space-y-1 w-32 text-center">
            <AvatarName query="staff" name={kick.banned_by_name!} uuid={kick.banned_by_uuid!} console={kick.console} />
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