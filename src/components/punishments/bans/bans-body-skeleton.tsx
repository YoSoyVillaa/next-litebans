import { TableBody } from "@/components/ui/table";
import { BansRowSkeleton } from "@/components/punishments/bans/bans-row-skeleton";

export const BansBodySkeleton = () => (
  <TableBody>
    {Array.from({ length: 10 }).map((_, index) => (
      <BansRowSkeleton key={index} />
    ))}
  </TableBody>
)