import { TableBody } from "@/components/ui/table";
import { WarnsRowSkeleton } from "@/components/punishments/warns/warns-row-skeleton";

export const WarnsBodySkeleton = () => (
  <TableBody>
    {Array.from({ length: 10 }).map((_, index) => (
      <WarnsRowSkeleton key={index} />
    ))}
  </TableBody>
)