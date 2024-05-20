"use server"

import { Suspense } from "react";

import { language } from "@/lib/language/dictionaries";
import { getBanCount } from "@/lib/punishment/ban";

import { TablePagination } from "@/components/table/pagination";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { BansBodySkeleton } from "@/components/punishments/bans/bans-body-skeleton";
import { BansBodyData } from "@/components/punishments/bans/bans-body-data";
import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Filters } from "@/components/table/filters";

interface BansTableProps {
  page: number;
  player?: string;
  staff?: string;
}

export const BansTable = async ({ 
  page,
  player,
  staff
}: BansTableProps) => {

  const { lang, dictionary } = await language();
  const localDictionary = dictionary.pages.bans;

  const banCount = await getBanCount();
  const totalPages = Math.ceil(banCount / 10);

  return (
    <div className="space-y-2">
      <Filters player={player} staff={staff} />
      <ScrollArea className="shadow border-y lg:rounded-xl lg:border">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="text-center px-2">{localDictionary.table.heads.player}</TableHead>
              <TableHead className="text-center px-2">{localDictionary.table.heads.by}</TableHead>
              <TableHead>{localDictionary.table.heads.reason}</TableHead>
              <TableHead>{localDictionary.table.heads.date}</TableHead>
              <TableHead>{localDictionary.table.heads.expires}</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <Suspense fallback={<BansBodySkeleton />}>
            <BansBodyData language={lang} dictionary={dictionary} page={page} player={player} staff={staff} />
          </Suspense>
        </Table>
        <ScrollBar className="md:hidden" orientation="horizontal" />
      </ScrollArea>
      <TablePagination actualPage={page} totalPages={totalPages} />
    </div>
  );
};