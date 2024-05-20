import { getPlayerName } from "@/lib/punishment/punishment";
import { PlayerFilter } from "./player-filter";

interface FiltersProps {
  player?: string;
  staff?: string;
}

export const Filters = async ({ player, staff }: FiltersProps) => {

  let playerName;
  if (player) {
    playerName = await getPlayerName(player);
  }

  let staffName;
  if (staff) {
    staffName = await getPlayerName(staff);
  }
  
  return (
    <>
      {(player || staff) && (
        <div className="space-y-2 lg:space-y-0 lg:flex lg:space-x-2">
          {player && (
            <PlayerFilter
              type="player"
              name={playerName!}
              uuid={player}
            />
          )}
          {staff && (
            <PlayerFilter
              type="staff"
              name={staffName!}
              uuid={staff}
              console={staff === "[Console]"}
            />
          )}
        </div>
      )}
    </>
  )
}