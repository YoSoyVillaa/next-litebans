import { Dictionary } from "@/lib/language/types"

import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface PunishmentStatusDotProps {
  dictionary: Dictionary
  status: boolean | undefined
}

export const PunishmentStatusDot = ({
  dictionary,
  status
}: PunishmentStatusDotProps) => (
  <TooltipProvider delayDuration={50}>
    <Tooltip>
      <TooltipTrigger asChild>
        <span 
          className={cn(
            status === undefined ? 
              "bg-orange-500" :
              status ? "bg-green-500" : "bg-red-500",
            "flex rounded-full p-1 mr-2"
          )} 
        /> 
      </TooltipTrigger>
      <TooltipContent>
        {status === undefined ? dictionary.table.active.temporal : (status ? dictionary.table.active.true : dictionary.table.active.false)}
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
)