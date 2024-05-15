"use server"

import { Suspense } from "react";

import { language } from "@/lib/language/dictionaries";
import { getWarnCount } from "@/lib/punishment/warn";

import { TablePagination } from "@/components/table/pagination";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { WarnsBodySkeleton } from "@/components/punishments/warns/warns-body-skeleton";
import { WarnsBodyData } from "@/components/punishments/warns/warns-body-data";
import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface WarnsTableProps {
  page: number;
}

export const WarnsTable = async ({ 
  page 
}: WarnsTableProps) => {

  const { lang, dictionary } = await language();
  const localDictionary = dictionary.pages.warns;

  const warnCount = await getWarnCount();
  const totalPages = Math.ceil(warnCount / 10);

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
              <TableHead className="text-center px-2">{localDictionary.table.heads.notified}</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <Suspense fallback={<WarnsBodySkeleton />}>
            <WarnsBodyData language={lang} page={page} />
          </Suspense>
        </Table>
        <ScrollBar className="md:hidden" orientation="horizontal" />
      </ScrollArea>
      <TablePagination className="mt-4" actualPage={page} totalPages={totalPages} />
    </>
  );
};