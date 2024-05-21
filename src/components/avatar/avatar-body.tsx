import Image from "next/image";

import { cn } from "@/lib/utils";
import { siteConfig } from "@config/site";

interface AvatarBodyProps {
  name: string;
  uuid: string;
  console?: boolean;
  className?: string;
}

export const AvatarBody = ({ name, uuid, console, className }: AvatarBodyProps) => (
  <Image 
    src={console ? siteConfig.console.body : `https://skins.mcstats.com/body/front/${uuid}`} 
    alt={name}
    width={192}
    height={192}
    className={cn("hidden md:block mx-auto transition ease-in-out", className)}
  />
)