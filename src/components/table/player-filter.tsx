"use client"

import { useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { CrossCircledIcon } from "@radix-ui/react-icons";

import { useLang } from "@/lib/language/components/language-provider";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { PlayerAvatar } from "@/components/avatar/player-avatar";
import { ConsoleAvatar } from "@/components/avatar/console-avatar";

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
      router.refresh();
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