import { TableBody } from "@/components/ui/table";
import { MutesRowSkeleton } from "@/components/punishments/mutes/mutes-row-skeleton";

export const MutesBodySkeleton = () => (
  <TableBody>
    {Array.from({ length: 10 }).map((_, index) => (
      <MutesRowSkeleton key={index} />
    ))}
  </TableBody>
)