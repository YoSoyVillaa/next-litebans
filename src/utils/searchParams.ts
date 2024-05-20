import { SearchParams } from "@/types";

const getPage = ({ searchParams }: SearchParams) => {
  let page = searchParams.page ? parseInt(searchParams.page as string) : 1;

  if (isNaN(page) || page < 1) {
    page = 1;
  }

  return page;
}

const getPlayer = ({ searchParams }: SearchParams) => {
  const player = searchParams.player as string;
  if (!/^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i.test(player)) {
    return undefined;
  }

  return player;
}

const getStaff = ({ searchParams }: SearchParams) => {
  const staff = searchParams.staff as string;
  if (!/^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i.test(staff) && staff !== '[Console]') {
    return undefined;
  }

  return staff;
}

export { getPage, getPlayer, getStaff }