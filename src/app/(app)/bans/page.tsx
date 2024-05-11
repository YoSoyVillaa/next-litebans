import { LuExternalLink } from "react-icons/lu";
import Image from "next/image";

import { language } from "@/lib/language/dictionaries";
import { db } from "@/lib/db";
import p from "@/lib/language/utils/parse";
import { getPlayerName } from "@/lib/punishment";

import { SearchParams } from "@/types";

import { DefaultPage } from "@/components/layout/default-page";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export async function generateMetadata() {
  
  const { dictionary } = await language();
  
  return {
    title: dictionary.pages.bans.title
  }
}

export default async function Bans({
  searchParams
}: SearchParams) {
  const dictionary = (await language()).dictionary.pages.bans;
  const banCount = await db.litebans_bans.count();
  
  const page = searchParams.page ? parseInt(searchParams.page as string) : 1;

  const databaseBans = await db.litebans_bans.findMany({
    take: 10,
    skip: (page - 1) * 10,
    select: {
      id: true,
      uuid: true,
      banned_by_name: true,
      banned_by_uuid: true,
      reason: true,
      time: true,
      until: true,
      active: true
    },
    orderBy: {
      time: "desc"
    }
  });
  
  const bans = await Promise.all(databaseBans.map(async (ban) => {
    let name = await getPlayerName(ban.uuid!);
    return {
      ...ban,
      id: ban.id.toString(),
      time: new Date(parseInt(ban.time.toString())),
      until: ban.until.toString() === "0" ? dictionary.table.permanent : new Date(parseInt(ban.until.toString())),
      name
    }
  }));

  return (
    <DefaultPage
      title={dictionary.title}
      description={p(dictionary.subtitle, {
        total: banCount
      })}
    >
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">{dictionary.table.heads.player}</TableHead>
            <TableHead className="text-center">{dictionary.table.heads.by}</TableHead>
            <TableHead>{dictionary.table.heads.reason}</TableHead>
            <TableHead>{dictionary.table.heads.date}</TableHead>
            <TableHead>{dictionary.table.heads.expires}</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bans.map((ban) => (
            <TableRow key={ban.id}>
              <TableCell className="space-y-1 w-32 text-center">
                <Image 
                  src={`https://crafatar.com/avatars/${ban.uuid}`}
                  alt={`${ban.name}'s avatar`}
                  width={32}
                  height={32}
                  className="mx-auto rounded-sm"
                />
                <p>{ban.name}</p>
              </TableCell>
              <TableCell className="space-y-1 w-32 text-center">
                <Image 
                  src={`https://crafatar.com/avatars/${ban.banned_by_uuid}`}
                  alt={`${ban.banned_by_name}'s avatar`}
                  width={32}
                  height={32}
                  className="mx-auto rounded-sm"
                />
                <p>{ban.banned_by_name}</p>
              </TableCell>
              <TableCell className="w-[250px]">{ban.reason}</TableCell>
              <TableCell>{ban.time.toLocaleString()}</TableCell>
              <TableCell>
                <p className="flex items-center">
                  <TooltipProvider delayDuration={50}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span 
                          className={cn(
                            ban.active ? (ban.until == dictionary.table.permanent ? "bg-green-500" : "bg-orange-500") : "bg-red-500",
                            "flex h-2 w-2 rounded-full mr-2"
                          )} 
                        /> 
                      </TooltipTrigger>
                      <TooltipContent>
                        {ban.active ? (ban.until == dictionary.table.permanent ? dictionary.table.active.true : dictionary.table.active.temporal) : dictionary.table.active.false}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  {ban.until.toLocaleString()}
                </p>
              </TableCell>
              <TableCell>
                <Link href={`/bans/${ban.id}`}>
                  <Button size="icon" variant="secondary">
                    <LuExternalLink />
                  </Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </DefaultPage>
  );
}