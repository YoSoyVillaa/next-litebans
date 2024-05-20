"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { Button } from "../ui/button";
import { CrossCircledIcon } from "@radix-ui/react-icons";
import { useLang } from "@/lib/language/components/LanguageProvider";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { PlayerAvatar } from "../avatar/player-avatar";
import { ConsoleAvatar } from "../avatar/console-avatar";

interface PlayerFilter {
  type: "player" | "staff";
  name: string;
  uuid?: string;
  console?: boolean;
}

export const PlayerFilter = ({ type, name, uuid, console }: PlayerFilter) => {
  const { dictionary } = useLang();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  
  const createRemovedQueryString = useCallback(
    (name: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.delete(name)
      params.delete("page")
 
      return params.toString()
    },
    [searchParams])

  const handleClick = () => {
    const query = createRemovedQueryString(type);
    if (query === "") {
      router.push(pathname);
    } else {
      router.push(`${pathname}?${query}`);
    }
  }

  return (
    <Button onClick={handleClick} variant="outline" size="sm" className="h-8 border-dashed flex mx-auto lg:mx-0">
      {dictionary.words[type]}
      <Separator orientation="vertical" className="mx-2 h-4" />
      <Badge variant="secondary" className="rounded-sm px-1 font-normal">
        {console ? <ConsoleAvatar name={name} size={16} className="mr-1" /> : <PlayerAvatar uuid={uuid} name={name} size={16} className="mr-1" />}
        {name}
      </Badge>
      <CrossCircledIcon className="ml-2 h-4 w-4" />
    </Button>
  )
}