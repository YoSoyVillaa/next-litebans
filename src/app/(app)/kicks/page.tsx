import Link from "next/link";

import { language } from "@/lib/language/dictionaries";
import { getKickCount, getKicks, sanitizeKicks } from "@/lib/punishment/kick";
import p from "@/lib/language/utils/parse";

import { SearchParams } from "@/types";

import { DefaultPage } from "@/components/layout/default-page";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { TablePagination } from "@/components/table/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { PlayerAvatar } from "@/components/avatar/player-avatar";
import { ConsoleAvatar } from "@/components/avatar/console-avatar";
import { RelativeTimeTooltip } from "@/components/punishments/relative-time-tooltip";
import { PunishmentInfoButton } from "@/components/buttons/punishment-info-button";
import { KicksTable } from "@/components/punishments/kicks/kicks-table";

export async function generateMetadata() {
  
  const { dictionary } = await language();
  
  return {
    title: dictionary.pages.kicks.title
  }
}

export default async function Kicks({
  searchParams
}: SearchParams) {
  const dictionary = (await language()).dictionary.pages.kicks;
  
  const kickCount = await getKickCount();
  
  let page = searchParams.page ? parseInt(searchParams.page as string) : 1;
  if (isNaN(page) || page < 1) {
    page = 1;
  }

  return (
    <DefaultPage
      title={dictionary.title}
      description={p(dictionary.subtitle, {
        total: kickCount
      })}
      className="w-full lg:w-[761px]"
    >
      <KicksTable page={page} />
    </DefaultPage>
  );
}