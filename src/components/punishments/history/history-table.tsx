"use server"

import { Suspense } from "react";

import { getPunishmentCount } from "@/lib/punishment/punishment";
import { language } from "@/lib/language/dictionaries";

import { TablePagination } from "@/components/table/pagination";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { HistoryBodySkeleton } from "@/components/punishments/history/history-body-skeleton";
import { HistoryBodyData } from "@/components/punishments/history/history-body-data";
import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface HistoryTableProps {
  page: number;
}

export const HistoryTable = async ({ 
  page 
}: HistoryTableProps) => {

  const { lang, dictionary } = await language();
  const localDictionary = dictionary.pages.history;

  const punishmentCount = await getPunishmentCount().then(({ bans, mutes, warns, kicks }) => bans + mutes + warns + kicks);
  const totalPages = Math.ceil(punishmentCount / 10);

  return (
    <>
      <ScrollArea>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center px-2">{localDictionary.table.heads.type}</TableHead>
              <TableHead className="text-center px-1">{localDictionary.table.heads.player}</TableHead>
              <TableHead className="text-center px-1">{localDictionary.table.heads.by}</TableHead>
              <TableHead>{localDictionary.table.heads.reason}</TableHead>
              <TableHead>{localDictionary.table.heads.date}</TableHead>
              <TableHead>{localDictionary.table.heads.expires}</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <Suspense fallback={<HistoryBodySkeleton />}>
            <HistoryBodyData language={lang} dictionary={dictionary} page={page} />
          </Suspense>
        </Table>
        <ScrollBar className="md:hidden" orientation="horizontal" />
      </ScrollArea>
      <TablePagination className="mt-4" actualPage={page} totalPages={totalPages} />
    </>
  );
};