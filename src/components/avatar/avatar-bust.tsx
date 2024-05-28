import { cn } from "@/lib/utils";
import { siteConfig } from "@config/site";
import { getSkinUUID } from "@/utils/bedrock";

interface AvatarBustProps {
  name: string;
  uuid: string;
  console?: boolean;
  className?: string;
}

export const AvatarBust = ({ name, uuid, console, className }: AvatarBustProps) => (
  // eslint-disable-next-line @next/next/no-img-element
  <img 
    src={console ? siteConfig.console.bust : `https://skins.mcstats.com/bust/${getSkinUUID(name, uuid)}`} 
    alt={name}
    width={192}
    height={192}
    className={cn("md:hidden mx-auto transition ease-in-out", className)}
  />
)