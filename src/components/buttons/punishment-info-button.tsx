import Link from "next/link";
import { LuExternalLink } from "react-icons/lu";

import { PunishmentType } from "@/types";

import { Button } from "@/components/ui/button";

interface PunishmentInfoButtonProps {
  type: PunishmentType,
  id: string
}

export const PunishmentInfoButton = ({
  type,
  id
}: PunishmentInfoButtonProps) => (
  <Link href={`/${type}/${id}`}>
    <Button size="icon" variant="secondary" className="transition ease-in-out hover:scale-110">
      <LuExternalLink />
    </Button>
  </Link>
)