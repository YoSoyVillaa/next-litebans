"use client"

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { PlayerAvatar } from "../avatar/player-avatar";
import { ConsoleAvatar } from "../avatar/console-avatar";

interface AvatarName {
  query: "player" | "staff";
  name: string;
  uuid: string;
  console?: boolean;
}

export const AvatarName = ({ query, name, uuid, console }: AvatarName) => {

  const searchParams = useSearchParams();
  const pathname = usePathname();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)
      params.delete("page")
 
      return params.toString()
    },
    [searchParams]
  )
  
  return (
    <Link href={`${pathname}?${createQueryString(query, uuid)}`}>
      {console ? 
        <ConsoleAvatar name={name!} />
        : 
        <PlayerAvatar uuid={uuid!} name={name!} />
      }
      <p>{name}</p>
    </Link>
  );
}