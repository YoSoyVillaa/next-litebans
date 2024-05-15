"use server"

import { Suspense } from "react";

import { language } from "@/lib/language/dictionaries";
import { getMuteCount } from "@/lib/punishment/mute";

import { TablePagination } from "@/components/table/pagination";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { KicksBodySkeleton } from "@/components/punishments/kicks/kicks-body-skeleton";
import { KicksBodyData } from "@/components/punishments/kicks/kicks-body-data";
import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { getKickCount } from "@/lib/punishment/kick";

interface KicksTableProps {
  page: number;
}

export const KicksTable = async ({ 
  page 
}: KicksTableProps) => {

  const { lang, dictionary } = await language();
  const localDictionary = dictionary.pages.kicks;

  const kickCount = await getKickCount();
  const totalPages = Math.ceil(kickCount / 10);

  return (
    <>
      <ScrollArea>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center px-2">{localDictionary.table.heads.player}</TableHead>
              <TableHead className="text-center px-2">{localDictionary.table.heads.by}</TableHead>
              <TableHead>{localDictionary.table.heads.reason}</TableHead>
              <TableHead>{localDictionary.table.heads.date}</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <Suspense fallback={<KicksBodySkeleton />}>
            <KicksBodyData language={lang} page={page} />
          </Suspense>
        </Table>
        <ScrollBar className="md:hidden" orientation="horizontal" />
      </ScrollArea>
      <TablePagination className="mt-4" actualPage={page} totalPages={totalPages} />
    </>
  );
};