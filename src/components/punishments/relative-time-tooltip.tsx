import { getRelativeDifference, getRelativeDifferenceText } from "@/utils/date";

import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";

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
        <span className="cursor-default">{time.toLocaleString(lang)}</span>
      </TooltipTrigger>
      <TooltipContent className={time instanceof Date ? "" : "hidden"}>
        {time instanceof Date && (
          <p>{getRelativeDifferenceText(lang, getRelativeDifference(time))}</p>
        )}
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
)