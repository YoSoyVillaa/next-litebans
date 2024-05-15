"use server"

import { Suspense } from "react";

import { language } from "@/lib/language/dictionaries";
import { getMuteCount } from "@/lib/punishment/mute";

import { TablePagination } from "@/components/table/pagination";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { MutesBodySkeleton } from "@/components/punishments/mutes/mutes-body-skeleton";
import { MutesBodyData } from "@/components/punishments/mutes/mutes-body-data";
import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface MutesTableProps {
  page: number;
}

export const MutesTable = async ({ 
  page 
}: MutesTableProps) => {

  const { lang, dictionary } = await language();
  const localDictionary = dictionary.pages.mutes;

  const muteCount = await getMuteCount();
  const totalPages = Math.ceil(muteCount / 10);

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
          <Suspense fallback={<MutesBodySkeleton />}>
            <MutesBodyData language={lang} dictionary={dictionary} page={page} />
          </Suspense>
        </Table>
        <ScrollBar className="md:hidden" orientation="horizontal" />
      </ScrollArea>
      <TablePagination className="mt-4" actualPage={page} totalPages={totalPages} />
    </>
  );
};