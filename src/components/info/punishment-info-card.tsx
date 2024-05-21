import Link from "next/link";

import { language } from "@/lib/language/dictionaries";

import { AvatarBody } from "@/components/avatar/avatar-body";
import { AvatarBust } from "@/components/avatar/avatar-bust";
import { PlayerAvatar } from "@/components/avatar/player-avatar";
import { ConsoleAvatar } from "@/components/avatar/console-avatar";

interface PunishmentInfoCardProps {
  punishment: {
    uuid: string | null;
    name: string | null | undefined;
    banned_by_uuid: string | null;
    banned_by_name: string | null;
    console: boolean;
  };
  children: React.ReactNode;
}

export const PunishmentInfoCard = async ({ punishment, children }: PunishmentInfoCardProps) => {
  const { dictionary } = await language();
  
  return (
    <div className="flex space-x-4 md:space-y-0 md:flex-row">
      <div className="order-1 space-y-8">
        <h2 className="text-3xl font-bold text-center">{dictionary.words.player}</h2>
        <Link href={`/history?player=${punishment.uuid}`} className="block">
          <AvatarBody 
            uuid={punishment.uuid!} 
            name={punishment.name!} 
            className="hover:scale-110 md:h-[312px]"
          />
          <AvatarBust 
            uuid={punishment.uuid!} 
            name={punishment.name!} 
            className="hover:scale-110"
          />
        </Link>
        <div className="flex space-x-2 justify-center">
          <PlayerAvatar uuid={punishment.uuid!} name={punishment.name!} size={28} className="!mx-0 mr-1" />
          <p className="text-xl">{punishment.name}</p>
        </div>
      </div>

      <div className="hidden md:block order-3 px-8 md:order-2 md:content-center space-y-4 w-[350px]">
        {children}
      </div>

      <div className="order-2 md:order-3 space-y-8">
        <h2 className="text-3xl font-bold text-center">{dictionary.words.staff}</h2>
        <Link href={`/history?staff=${punishment.banned_by_uuid}`} className="block">
          <AvatarBody 
            uuid={punishment.banned_by_uuid!} 
            name={punishment.banned_by_name!} 
            console={punishment.console} 
            className="scale-x-[-1] hover:scale-x-[-1.1] hover:scale-y-110 md:h-[312px]"
          />
          <AvatarBust 
            uuid={punishment.banned_by_uuid!} 
            name={punishment.banned_by_name!} 
            console={punishment.console} 
            className="scale-x-[-1] hover:scale-x-[-1.1] hover:scale-y-110"
          />
        </Link>
        <div className="flex space-x-2 justify-center">
          {punishment.console ? 
            <ConsoleAvatar name={punishment.banned_by_name!} size={28} className="!mx-0 mr-1" />
            :
            <PlayerAvatar uuid={punishment.banned_by_uuid!} name={punishment.banned_by_name!} size={28} className="!mx-0 mr-1" /> 
          }
          <p className="text-xl">{punishment.banned_by_name}</p>
        </div>
      </div>
    </div>
  )
}