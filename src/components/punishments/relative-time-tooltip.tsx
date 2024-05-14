
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";
import { getRelativeDifference, getRelativeDifferenceText } from "@/utils/date";

interface RelativeTimeTooltipProps {
  lang: string
  time: Date | string
}

export const RelativeTimeTooltip = ({
  lang,
  time
}: RelativeTimeTooltipProps) => (
  <TooltipProvider delayDuration={50}>
    <Tooltip>
      <TooltipTrigger asChild>
        <span className="cursor-default">{time.toLocaleString()}</span>
      </TooltipTrigger>
      <TooltipContent className={time instanceof Date ? "" : "hidden"}>
        {time instanceof Date && (
          <p>{getRelativeDifferenceText(lang, getRelativeDifference(time))}</p>
        )}
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
)