import { SearchParams } from "@/types";

const getPage = ({ searchParams }: SearchParams) => {
  let page = searchParams.page ? parseInt(searchParams.page as string) : 1;

  if (isNaN(page) || page < 1) {
    page = 1;
  }

  return page;
}

export { getPage }