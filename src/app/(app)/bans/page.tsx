import { LuExternalLink } from "react-icons/lu";
import Image from "next/image";
import Link from "next/link";

import { language } from "@/lib/language/dictionaries";
import { cn } from "@/lib/utils";
import { getBanCount, getBans, sanitizeBans } from "@/lib/punishment/ban";
import p from "@/lib/language/utils/parse";

import { SearchParams } from "@/types";
import { getRelativeDifference, getRelativeDifferenceText } from "@/utils/date";
import { siteConfig } from "@config/site";

import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { PunishmentListPage } from "@/components/layout/punishment-list-page";
import { TablePagination } from "@/components/table/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

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
  
  const banCount = await getBanCount();
  const pages = Math.ceil(banCount / 10);
  
  let page = searchParams.page ? parseInt(searchParams.page as string) : 1;
  if (isNaN(page) || page < 1) {
    page = 1;
  }

  const dbBans = await getBans(page);
  const bans = await sanitizeBans(dictionary, dbBans);

  return (
    <PunishmentListPage
      title={dictionary.title}
      description={p(dictionary.subtitle, {
        total: banCount
      })}
      className="w-full lg:w-[975px]"
    >
      <ScrollArea>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center px-2">{dictionary.table.heads.player}</TableHead>
              <TableHead className="text-center px-2">{dictionary.table.heads.by}</TableHead>
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
                  <Link href={`/history?player=${ban.uuid}`}>
                    <Image 
                      src={`https://crafatar.com/avatars/${ban.uuid}`}
                      alt={`${ban.name}'s avatar`}
                      width={32}
                      height={32}
                      className="mx-auto rounded-sm"
                    />
                    <p>{ban.name}</p>
                  </Link>
                </TableCell>
                <TableCell className="space-y-1 w-32 text-center">
                  <Link href={`/history?staff=${ban.banned_by_uuid}`}>
                    {ban.console ? 
                      <Image 
                        src={siteConfig.consoleIcon}
                        alt={`${ban.banned_by_name}'s avatar`}
                        width={32}
                        height={32}
                        className="mx-auto rounded-sm"
                      /> : 
                      <Image 
                        src={`https://crafatar.com/avatars/${ban.banned_by_uuid}`}
                        alt={`${ban.banned_by_name}'s avatar`}
                        width={32}
                        height={32}
                        className="mx-auto rounded-sm"
                      />
                    }
                    <p>{ban.banned_by_name}</p>
                  </Link>
                </TableCell>
                <TableCell className="w-[250px]">{ban.reason}</TableCell>
                <TableCell className="w-[200px]">
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
                <TableCell className="w-[200px]">
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
                    <Button size="icon" variant="secondary" className="transition ease-in-out hover:scale-110">
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
      <TablePagination className="mt-4" actualPage={page} totalPages={pages} />
    </PunishmentListPage>
  );
}