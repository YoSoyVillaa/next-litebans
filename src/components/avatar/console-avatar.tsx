import Image from "next/image";

import { siteConfig } from "@config/site";

interface ConsoleAvatarProps {
  name: string;
}

export const ConsoleAvatar = ({
  name
}: ConsoleAvatarProps) => (
  <Image 
    src={siteConfig.consoleIcon}
    alt={`${name}'s avatar`}
    width={32}
    height={32}
    className="mx-auto rounded-sm"
  />
)