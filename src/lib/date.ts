import { siteConfig } from "@config/site";
import { format, formatDistance } from "date-fns";
import * as locales from "date-fns/locale";

type Locales = typeof locales;

const formatDate = (date: Date) => {
  return format(date, siteConfig.openGraph.dateFormat);
}

const formatDuration = (start: Date, end: Date, lang: string) => {
  return formatDistance(start, end, { 
    locale: locales[lang as keyof Locales]
  });
}

export { formatDate, formatDuration }