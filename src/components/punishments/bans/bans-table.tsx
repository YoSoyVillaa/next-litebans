"use server"

import { Suspense } from "react";

import { db } from "@/lib/db";
import { language } from "@/lib/language/dictionaries";

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

interface BansTableProps {
  page: number;
}

export const BansTable = async ({ 
  page 
}: BansTableProps) => {

  const { lang, dictionary } = await language();
  const localDictionary = dictionary.pages.bans;

  const banCount = await db.litebans_bans.count();
  const totalPages = Math.ceil(banCount / 10);

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
              <TableHead>{localDictionary.table.heads.expires}</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <Suspense fallback={<BansBodySkeleton />}>
            <BansBodyData language={lang} dictionary={dictionary} page={page} />
          </Suspense>
        </Table>
        <ScrollBar className="md:hidden" orientation="horizontal" />
      </ScrollArea>
      <TablePagination className="mt-4" actualPage={page} totalPages={totalPages} />
    </>
  );
};