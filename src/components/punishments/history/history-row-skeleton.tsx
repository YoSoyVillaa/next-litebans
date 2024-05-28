import { Skeleton } from "@/components/ui/skeleton";
import { TableCell, TableRow } from "@/components/ui/table";

export const HistoryRowSkeleton = () => (
  <TableRow>
    <TableCell className="w-24 px-0.5">
      <Skeleton className="mx-auto w-11 h-[22px]" />
    </TableCell>
    <TableCell className="space-y-1 w-[148px]">
      <Skeleton className="mx-auto rounded-sm size-8" />
      <Skeleton className="mx-auto w-16 h-4 mt-1" />
    </TableCell>
    <TableCell className="space-y-1 w-[148px]">
      <Skeleton className="mx-auto rounded-sm size-8" />
      <Skeleton className="mx-auto w-16 h-4 mt-1" />
    </TableCell>
    <TableCell className="w-[180px]">
      <Skeleton className="w-20 md:w-36 h-4" />
    </TableCell>
    <TableCell className="w-[200px]">
      <Skeleton className="w-20 md:w-[132px] h-4" />
    </TableCell>
    <TableCell className="w-[205px]">
      <div className="flex items-center">
        <Skeleton className="flex rounded-full p-1 mr-2" />
        <Skeleton className="w-20 md:w-36 h-4" />
      </div>
    </TableCell>
    <TableCell className="!pl-0 !pr-3">
      <Skeleton className="size-8 rounded-md" />
    </TableCell>
  </TableRow>
)