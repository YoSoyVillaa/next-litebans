import { Skeleton } from "@/components/ui/skeleton";
import { TableCell, TableRow } from "@/components/ui/table";

export const WarnsRowSkeleton = () => (
  <TableRow>
    <TableCell className="space-y-1 w-40">
      <Skeleton className="mx-auto rounded-sm size-8" />
      <Skeleton className="mx-auto w-16 h-4 mt-1" />
    </TableCell>
    <TableCell className="space-y-1 w-40">
      <Skeleton className="mx-auto rounded-sm size-8" />
      <Skeleton className="mx-auto w-16 h-4 mt-1" />
    </TableCell>
    <TableCell className="w-[292px]">
      <Skeleton className="w-20 md:w-40 h-4" />
    </TableCell>
    <TableCell className="w-[215px]">
      <Skeleton className="w-20 md:w-[132px] h-4" />
    </TableCell>
    <TableCell className="w-[150px]">
      <Skeleton className="mx-auto size-3 rounded-sm" />
    </TableCell>
    <TableCell className="!pl-0 !pr-3">
      <Skeleton className="size-8 rounded-md" />
    </TableCell>
  </TableRow>
)