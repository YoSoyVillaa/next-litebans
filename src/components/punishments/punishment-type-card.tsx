import { Card, CardContent, CardTitle } from "@/components/ui/card";
import Link from "next/link";

interface PunishmentTypeCardProps {
  title: string;
  count: number;
  href: string;
  punishmentIcon: JSX.Element;
}

export const PunishmentTypeCard = ({
  title,
  count,
  href,
  punishmentIcon,
}: PunishmentTypeCardProps) => {
  return (
    <Link
      href={href}
    >
      <Card className="overflow-hidden mx-auto w-60 h-36 flex-col flex items-center relative transition ease-in-out hover:scale-110">
        {punishmentIcon}
        <CardContent className="text-center mt-auto z-[1]">
          <p className="text-[3.5rem] leading-none font-bold">{count}</p>
          <CardTitle className="text-2xl font-medium">{title}</CardTitle>
        </CardContent>
      </Card>
    </Link>
  )
};