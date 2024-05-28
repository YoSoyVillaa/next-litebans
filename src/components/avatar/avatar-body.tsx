import { cn } from "@/lib/utils";
import { siteConfig } from "@config/site";
import { getSkinUUID } from "@/utils/bedrock";

interface AvatarBodyProps {
  name: string;
  uuid: string;
  console?: boolean;
  className?: string;
}

export const AvatarBody = ({ name, uuid, console, className }: AvatarBodyProps) => (
  // eslint-disable-next-line @next/next/no-img-element
  <img 
    src={console ? siteConfig.console.body : `https://skins.mcstats.com/body/front/${getSkinUUID(name, uuid)}`} 
    alt={name}
    width={192}
    height={192}
    className={cn("hidden md:block mx-auto transition ease-in-out", className)}
  />
)