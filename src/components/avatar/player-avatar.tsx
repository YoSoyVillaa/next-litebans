import Image from "next/image";

import { cn } from "@/lib/utils";

interface PlayerAvatarProps {
  name: string;
  uuid?: string;
  size?: number;
  className?: string;
}

export const PlayerAvatar = ({
  name,
  uuid,
  size,
  className
}: PlayerAvatarProps) => (
  <Image 
    src={`https://minotar.net/helm/${uuid ?? name}`}
    alt={`${name}'s avatar`}
    width={size ?? 32}
    height={size ?? 32}
    className={cn("mx-auto rounded-sm", className)}
  />
)