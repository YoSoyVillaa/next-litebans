"use client"

import { usePathname, useSearchParams } from "next/navigation";

import { 
  Pagination, 
  PaginationContent, 
  PaginationEllipsis, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";
import { act, useEffect } from "react";
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
    if (searchParams.get("page") === actualPage.toString()) return;

    const params = new URLSearchParams(searchParams.toString());
    params.set("page", actualPage.toString());
    window.history.replaceState({}, "", `${pathname}?${params.toString()}`);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const leftNumber = actualPage == 1 || totalPages == 2 ? 1 : actualPage == totalPages ? totalPages - 2 : actualPage - 1;

  return (
    <Pagination className={className}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious 
            text={dictionary.previous}
            href={`${pathname}?page=${totalPages == 2 ? 1 : actualPage - 1}`} 
            className={actualPage <= 1 ? "hover:!cursor-default" : ""}
            disabled={actualPage == 1}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href={`${pathname}?page=${leftNumber}`} isActive={actualPage == 1}>{leftNumber}</PaginationLink>
        </PaginationItem>
        { totalPages > 1 &&
          <PaginationItem>
            <PaginationLink href={`${pathname}?page=${leftNumber + 1}`} isActive={actualPage == leftNumber + 1}>{leftNumber + 1}</PaginationLink>
          </PaginationItem>
        }
        { totalPages > 2 &&
          <PaginationItem>
            <PaginationLink href={`${pathname}?page=${leftNumber + 2}`} isActive={actualPage == leftNumber + 2}>{leftNumber + 2}</PaginationLink>
          </PaginationItem>
        }
        <PaginationItem>
          <PaginationNext 
            text={dictionary.next}
            href={`${pathname}?page=${totalPages == 2 ? 2 : actualPage + 1}`} 
            className={actualPage >= totalPages ? "hover:!cursor-default" : "" }
            disabled={actualPage >= totalPages}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}