import { Skeleton } from "@/components/ui/skeleton";
import { TableCell, TableRow } from "@/components/ui/table";

export const WarnsRowSkeleton = () => (
  <TableRow>
    <TableCell className="space-y-1 w-32">
      <Skeleton className="mx-auto rounded-sm size-8" />
      <Skeleton className="mx-auto w-16 h-4 mt-1" />
    </TableCell>
    <TableCell className="space-y-1 w-32">
      <Skeleton className="mx-auto rounded-sm size-8" />
      <Skeleton className="mx-auto w-16 h-4 mt-1" />
    </TableCell>
    <TableCell className="w-[250px]">
      <Skeleton className="w-20 md:w-40 h-4" />
    </TableCell>
    <TableCell className="w-[200px]">
      <Skeleton className="w-20 md:w-[132px] h-4" />
    </TableCell>
    <TableCell className="w-[100px]">
      <Skeleton className="mx-auto size-3 rounded-sm" />
    </TableCell>
    <TableCell>
      <Skeleton className="size-9 rounded-md" />
    </TableCell>
  </TableRow>
)