"use server"

import { Suspense } from "react";

import { getKickCount } from "@/lib/punishment/kick";
import { language } from "@/lib/language/dictionaries";

import { Filters } from "@/components/table/filters";
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

interface KicksTableProps {
  page: number;
  player?: string;
  staff?: string;
}

export const KicksTable = async ({ 
  page,
  player,
  staff
}: KicksTableProps) => {

  const { lang, dictionary } = await language();
  const localDictionary = dictionary.pages.kicks;

  const kickCount = await getKickCount(player, staff);
  const totalPages = Math.ceil(kickCount / 10);

  return (
    <div className="space-y-2">
      <Filters player={player} staff={staff} />
      <ScrollArea className="shadow border-y lg:rounded-xl lg:border">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="text-center">{localDictionary.table.heads.player}</TableHead>
              <TableHead className="text-center">{localDictionary.table.heads.by}</TableHead>
              <TableHead>{localDictionary.table.heads.reason}</TableHead>
              <TableHead>{localDictionary.table.heads.date}</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <Suspense fallback={<KicksBodySkeleton />}>
            <KicksBodyData language={lang} page={page} player={player} staff={staff} />
          </Suspense>
        </Table>
        <ScrollBar className="md:hidden" orientation="horizontal" />
      </ScrollArea>
      <TablePagination actualPage={page} totalPages={totalPages} />
    </div>
  );
};