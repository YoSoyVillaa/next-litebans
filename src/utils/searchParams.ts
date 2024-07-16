import { SearchParams } from "@/types";
import { siteConfig } from "@config/site";

const getPage = ({ searchParams }: SearchParams) => {
  let page = searchParams.page ? parseInt(searchParams.page as string) : 1;

  if (isNaN(page) || page < 1) {
    page = 1;
  }

  return page;
}

const getPlayer = ({ searchParams }: SearchParams) => {
  const player = searchParams.player as string;
  if (!/^[a-f\d]{8}-[a-f\d]{4}-[1-5][a-f\d]{3}-[89ab][a-f\d]{3}-[a-f\d]{12}$/i.test(player)) {
    return undefined;
  }

  return player;
}

const getStaff = ({ searchParams }: SearchParams) => {
  const staff = searchParams.staff as string;
  if (!/^[a-f\d]{8}-[a-f\d]{4}-[1-5][a-f\d]{3}-[89ab][a-f\d]{3}-[a-f\d]{12}$/i.test(staff) && staff !== siteConfig.console.uuid) {
    return undefined;
  }

  return staff;
}

export { getPage, getPlayer, getStaff }