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
import { getKickCount, getKicks, sanitizeKicks } from "@/lib/punishment/kick";
import { FaCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { FaTimes } from "react-icons/fa";

export async function generateMetadata() {
  
  const { dictionary } = await language();
  
  return {
    title: dictionary.pages.kicks.title
  }
}

export default async function Kicks({
  searchParams
}: SearchParams) {
  let { lang, dictionary } = await language();
  dictionary = dictionary.pages.kicks;
  
  const kickCount = await getKickCount();
  const pages = Math.ceil(kickCount / 10);
  
  let page = searchParams.page ? parseInt(searchParams.page as string) : 1;
  if (isNaN(page) || page < 1) {
    page = 1;
  }

  const dbKicks = await getKicks(page);
  const kicks = await sanitizeKicks(dbKicks);

  return (
    <PunishmentListPage
      title={dictionary.title}
      description={p(dictionary.subtitle, {
        total: kickCount
      })}
      className="w-full lg:w-[761px]"
    >
      <ScrollArea>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center px-2">{dictionary.table.heads.player}</TableHead>
              <TableHead className="text-center px-2">{dictionary.table.heads.by}</TableHead>
              <TableHead>{dictionary.table.heads.reason}</TableHead>
              <TableHead>{dictionary.table.heads.date}</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {kicks.map((kick) => (
              <TableRow key={kick.id}>
                <TableCell className="space-y-1 w-32 text-center">
                  <Link href={`/history?player=${kick.uuid}`}>
                    <Image 
                      src={`https://crafatar.com/avatars/${kick.uuid}`}
                      alt={`${kick.name}'s avatar`}
                      width={32}
                      height={32}
                      className="mx-auto rounded-sm"
                    />
                    <p>{kick.name}</p>
                  </Link>
                </TableCell>
                <TableCell className="space-y-1 w-32 text-center">
                  <Link href={`/history?staff=${kick.banned_by_uuid}`}>
                    {kick.console ? 
                      <Image 
                        src={siteConfig.consoleIcon}
                        alt={`${kick.banned_by_name}'s avatar`}
                        width={32}
                        height={32}
                        className="mx-auto rounded-sm"
                      /> : 
                      <Image 
                        src={`https://crafatar.com/avatars/${kick.banned_by_uuid}`}
                        alt={`${kick.banned_by_name}'s avatar`}
                        width={32}
                        height={32}
                        className="mx-auto rounded-sm"
                      />
                    }
                    <p>{kick.banned_by_name}</p>
                  </Link>
                </TableCell>
                <TableCell className="w-[250px]">{kick.reason}</TableCell>
                <TableCell className="w-[185px]">
                  <TooltipProvider delayDuration={50}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="cursor-default">{kick.time.toLocaleString()}</span>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{getRelativeDifferenceText(lang, getRelativeDifference(kick.time))}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                </TableCell>
                <TableCell>
                  <Link href={`/kicks/${kick.id}`}>
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