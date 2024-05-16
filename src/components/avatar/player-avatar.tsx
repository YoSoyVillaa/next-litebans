import Image from "next/image";

interface PlayerAvatarProps {
  uuid: string;
  name: string;
}

export const PlayerAvatar = ({
  uuid,
  name
}: PlayerAvatarProps) => (
  <Image 
    src={`https://minotar.net/helm/${uuid}`}
    alt={`${name}'s avatar`}
    width={32}
    height={32}
    className="mx-auto rounded-sm"
  />
)