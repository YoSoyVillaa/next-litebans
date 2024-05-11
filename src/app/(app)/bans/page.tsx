import { LuExternalLink } from "react-icons/lu";
import Image from "next/image";
import Link from "next/link";

import { language } from "@/lib/language/dictionaries";
import { db } from "@/lib/db";
import { cn } from "@/lib/utils";
import { getPlayerName } from "@/lib/punishment";
import p from "@/lib/language/utils/parse";

import { SearchParams } from "@/types";
import { getRelativeDifference, getRelativeDifferenceText } from "@/utils/date";

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { PunishmentListPage } from "@/components/layout/punishment-list-page";

export async function generateMetadata() {
  
  const { dictionary } = await language();
  
  return {
    title: dictionary.pages.bans.title
  }
}

export default async function Bans({
  searchParams
}: SearchParams) {
  let { lang, dictionary } = await language();
  dictionary = dictionary.pages.bans;
  const banCount = await db.litebans_bans.count();
  
  const page = searchParams.page ? parseInt(searchParams.page as string) : 1;

  const databaseBans = await db.litebans_bans.findMany({
    take: 10,
    skip: (page - 1) * 10,
    select: {
      id: true,
      uuid: true,
      banned_by_name: true,
      banned_by_uuid: true,
      reason: true,
      time: true,
      until: true,
      active: true
    },
    orderBy: {
      time: "desc"
    }
  });
  
  const bans = await Promise.all(databaseBans.map(async (ban) => {
    const name = await getPlayerName(ban.uuid!);
    const until = ban.until.toString() === "0" ? dictionary.table.permanent : new Date(parseInt(ban.until.toString()));
    return {
      ...ban,
      id: ban.id.toString(),
      time: new Date(parseInt(ban.time.toString())),
      status: until == dictionary.table.permanent ? 
                (ban.active ? true : false) : 
                (until < new Date() ? false : undefined),
      until,
      name
    }
  }));

  return (
    <PunishmentListPage
      title={dictionary.title}
      description={p(dictionary.subtitle, {
        total: banCount
      })}
      className="w-full lg:px-8"
    >
      <ScrollArea>
        <Table className="lg:w-[925px] mx-auto">
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">{dictionary.table.heads.player}</TableHead>
              <TableHead className="text-center">{dictionary.table.heads.by}</TableHead>
              <TableHead>{dictionary.table.heads.reason}</TableHead>
              <TableHead>{dictionary.table.heads.date}</TableHead>
              <TableHead>{dictionary.table.heads.expires}</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bans.map((ban) => (
              <TableRow key={ban.id}>
                <TableCell className="space-y-1 w-32 text-center">
                  <Image 
                    src={`https://crafatar.com/avatars/${ban.uuid}`}
                    alt={`${ban.name}'s avatar`}
                    width={32}
                    height={32}
                    className="mx-auto rounded-sm"
                  />
                  <p>{ban.name}</p>
                </TableCell>
                <TableCell className="space-y-1 w-32 text-center">
                  <Image 
                    src={`https://crafatar.com/avatars/${ban.banned_by_uuid}`}
                    alt={`${ban.banned_by_name}'s avatar`}
                    width={32}
                    height={32}
                    className="mx-auto rounded-sm"
                  />
                  <p>{ban.banned_by_name}</p>
                </TableCell>
                <TableCell className="w-[250px]">{ban.reason}</TableCell>
                <TableCell className="w-[165px]">
                  <TooltipProvider delayDuration={50}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="cursor-default">{ban.time.toLocaleString()}</span>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{getRelativeDifferenceText(lang, getRelativeDifference(ban.time))}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                </TableCell>
                <TableCell className="w-[185px]">
                  <p className="flex items-center">
                    <TooltipProvider delayDuration={50}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span 
                            className={cn(
                              ban.status === undefined ? 
                                "bg-orange-500" :
                                ban.status ? "bg-green-500" : "bg-red-500",
                              "flex rounded-full p-1 mr-2"
                            )} 
                          /> 
                        </TooltipTrigger>
                        <TooltipContent>
                          {ban.status === undefined ? dictionary.table.active.temporal : (ban.status ? dictionary.table.active.true : dictionary.table.active.false)}
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider delayDuration={50}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="cursor-default">{ban.until.toLocaleString()}</span>
                        </TooltipTrigger>
                        <TooltipContent className={ban.until instanceof Date ? "" : "hidden"}>
                          {ban.until instanceof Date && (
                            <p>{getRelativeDifferenceText(lang, getRelativeDifference(ban.until))}</p>
                          )}
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </p>
                </TableCell>
                <TableCell>
                  <Link href={`/bans/${ban.id}`}>
                    <Button size="icon" variant="secondary">
                      <LuExternalLink />
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <ScrollBar className="md:hidden" orientation="horizontal" />
      </ScrollArea>
    </PunishmentListPage>
  );
}