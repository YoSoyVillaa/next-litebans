import Image from "next/image";

import { cn } from "@/lib/utils";
import { siteConfig } from "@config/site";

interface AvatarBustProps {
  name: string;
  uuid: string;
  console?: boolean;
  className?: string;
}

export const AvatarBust = ({ name, uuid, console, className }: AvatarBustProps) => (
  <Image 
    src={console ? siteConfig.console.bust : `https://skins.mcstats.com/bust/${uuid}`} 
    alt={name}
    width={192}
    height={192}
    className={cn("md:hidden mx-auto transition ease-in-out", className)}
  />
)