import { Skeleton } from "@/components/ui/skeleton";
import { TableCell, TableRow } from "@/components/ui/table";

export const BansRowSkeleton = () => (
  <TableRow>
    <TableCell className="space-y-1 w-32">
      <Skeleton className="mx-auto rounded-sm size-8" />
      <Skeleton className="mx-auto w-16 h-5 mt-1" />
    </TableCell>
    <TableCell className="space-y-1 w-32">
      <Skeleton className="mx-auto rounded-sm size-8" />
      <Skeleton className="mx-auto w-16 h-5 mt-1" />
    </TableCell>
    <TableCell className="w-[250px]">
      <Skeleton className="w-20 md:w-40 h-5" />
    </TableCell>
    <TableCell className="w-[200px]">
      <Skeleton className="w-20 md:w-[132px] h-5" />
    </TableCell>
    <TableCell className="w-[200px]">
      <div className="flex items-center">
        <Skeleton className="flex rounded-full p-1 mr-2" />
        <Skeleton className="w-20 md:w-36 h-5" />
      </div>
    </TableCell>
    <TableCell>
      <Skeleton className="size-9 rounded-md" />
    </TableCell>
  </TableRow>
)