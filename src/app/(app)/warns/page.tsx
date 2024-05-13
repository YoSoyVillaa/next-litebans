import { LuExternalLink } from "react-icons/lu";
import Image from "next/image";
import Link from "next/link";

import { language } from "@/lib/language/dictionaries";
import { cn } from "@/lib/utils";
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
import { getWarnCount, getWarns, sanitizeWarns } from "@/lib/punishment/warn";
import { FaCheck } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";

export async function generateMetadata() {
  
  const { dictionary } = await language();
  
  return {
    title: dictionary.pages.warns.title
  }
}

export default async function Warns({
  searchParams
}: SearchParams) {
  let { lang, dictionary } = await language();
  dictionary = dictionary.pages.warns;
  
  const warnCount = await getWarnCount();
  const pages = Math.ceil(warnCount / 10);
  
  let page = searchParams.page ? parseInt(searchParams.page as string) : 1;
  if (isNaN(page) || page < 1) {
    page = 1;
  }

  const dbWarns = await getWarns(page);
  const warns = await sanitizeWarns(dbWarns);

  return (
    <PunishmentListPage
      title={dictionary.title}
      description={p(dictionary.subtitle, {
        total: warnCount
      })}
      className="w-full lg:w-[876px]"
    >
      <ScrollArea>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center px-2">{dictionary.table.heads.player}</TableHead>
              <TableHead className="text-center px-2">{dictionary.table.heads.by}</TableHead>
              <TableHead>{dictionary.table.heads.reason}</TableHead>
              <TableHead>{dictionary.table.heads.date}</TableHead>
              <TableHead className="text-center px-2">{dictionary.table.heads.notified}</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {warns.map((warn) => (
              <TableRow key={warn.id}>
                <TableCell className="space-y-1 w-32 text-center">
                  <Link href={`/history?player=${warn.uuid}`}>
                    <Image 
                      src={`https://crafatar.com/avatars/${warn.uuid}`}
                      alt={`${warn.name}'s avatar`}
                      width={32}
                      height={32}
                      className="mx-auto rounded-sm"
                    />
                    <p>{warn.name}</p>
                  </Link>
                </TableCell>
                <TableCell className="space-y-1 w-32 text-center">
                  <Link href={`/history?staff=${warn.banned_by_uuid}`}>
                    {warn.console ? 
                      <Image 
                        src={siteConfig.consoleIcon}
                        alt={`${warn.banned_by_name}'s avatar`}
                        width={32}
                        height={32}
                        className="mx-auto rounded-sm"
                      /> : 
                      <Image 
                        src={`https://crafatar.com/avatars/${warn.banned_by_uuid}`}
                        alt={`${warn.banned_by_name}'s avatar`}
                        width={32}
                        height={32}
                        className="mx-auto rounded-sm"
                      />
                    }
                    <p>{warn.banned_by_name}</p>
                  </Link>
                </TableCell>
                <TableCell className="w-[250px]">{warn.reason}</TableCell>
                <TableCell className="w-[200px]">
                  <TooltipProvider delayDuration={50}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="cursor-default">{warn.time.toLocaleString()}</span>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{getRelativeDifferenceText(lang, getRelativeDifference(warn.time))}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                </TableCell>
                <TableCell className="w-[100px]">
                  {warn.warned ?
                    <FaCheck className="mx-auto text-xl" />
                    :
                    <FaTimes className="mx-auto text-lg" />
                  }
                </TableCell>
                <TableCell>
                  <Link href={`/warns/${warn.id}`}>
                    <Button size="icon" variant="secondary" className="ml-auto transition ease-in-out hover:scale-110">
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