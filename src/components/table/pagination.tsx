"use client"

import { usePathname, useSearchParams } from "next/navigation";

import { 
  Pagination, 
  PaginationContent,
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";
import { useCallback, useEffect } from "react";
import { useLang } from "@/lib/language/components/LanguageProvider";

interface TablePaginationProps {
  actualPage: number;
  totalPages: number;
  className?: string;
}

export const TablePagination = ({ 
  actualPage,
  totalPages,
  className
}: TablePaginationProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const dictionary = useLang().dictionary.pagination;

  useEffect(() => {
    const param = searchParams.get("page"); 
    if (param === actualPage.toString() || (actualPage == 1 && !param)) return;

    const params = new URLSearchParams(searchParams.toString());
    params.set("page", actualPage.toString());
    window.history.replaceState({}, "", `${pathname}?${params.toString()}`);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const createQueryString = useCallback(
    (page: number) => {
      const newParams = new URLSearchParams(searchParams.toString())
      newParams.set('page', page.toString())
 
      return newParams.toString()
    },
    [searchParams]
  )

  const leftNumber = actualPage == 1 || totalPages == 2 ? 1 : actualPage == totalPages ? totalPages - 2 : actualPage - 1;

  return (
    <Pagination className={className}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious 
            text={dictionary.previous}
            href={`${pathname}?${createQueryString(totalPages == 2 ? 1 : actualPage - 1)}`} 
            className={actualPage <= 1 ? "hover:!cursor-default" : ""}
            disabled={actualPage == 1}
            scroll={false}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink 
            href={`${pathname}?${createQueryString(leftNumber)}`} 
            isActive={actualPage == 1}
            scroll={false}
          >
            {leftNumber}
          </PaginationLink>
        </PaginationItem>
        { totalPages > 1 &&
          <PaginationItem>
            <PaginationLink 
              href={`${pathname}?${createQueryString(leftNumber + 1)}`} 
              isActive={actualPage == leftNumber + 1}
              scroll={false}
            >
              {leftNumber + 1}
            </PaginationLink>
          </PaginationItem>
        }
        { totalPages > 2 &&
          <PaginationItem>
            <PaginationLink 
              href={`${pathname}?${createQueryString(leftNumber + 2)}`} 
              isActive={actualPage == leftNumber + 2}
              scroll={false}
            >
              {leftNumber + 2}
            </PaginationLink>
          </PaginationItem>
        }
        <PaginationItem>
          <PaginationNext 
            text={dictionary.next}
            href={`${pathname}?${createQueryString(totalPages == 2 ? 2 : actualPage + 1)}`} 
            className={actualPage >= totalPages ? "hover:!cursor-default" : "" }
            disabled={actualPage >= totalPages}
            scroll={false}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}