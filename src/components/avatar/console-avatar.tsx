import Image from "next/image";

import { siteConfig } from "@config/site";
import { cn } from "@/lib/utils";

interface ConsoleAvatarProps {
  name: string;
  size?: number;
  className?: string;
}

export const ConsoleAvatar = ({
  name,
  size,
  className
}: ConsoleAvatarProps) => (
  <Image 
    src={siteConfig.consoleIcon}
    alt={`${name}'s avatar`}
    width={size ?? 32}
    height={size ?? 32}
    className={cn("mx-auto rounded-sm", className)}
  />
)