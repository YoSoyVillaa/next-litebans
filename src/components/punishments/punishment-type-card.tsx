"use client"

import Link from "next/link";
import { useEffect, useState } from "react";
import MotionNumber, { DEFAULT_TRANSITION } from 'motion-number'

import { cn } from "@/lib/utils";

import { 
  Card, 
  CardContent, 
  CardTitle 
} from "@/components/ui/card";

interface PunishmentTypeCardProps {
  title: string;
  fromGradient: string;
  count: number;
  href: string;
  punishmentIcon: JSX.Element;
}

export const PunishmentTypeCard = ({
  title,
  fromGradient,
  count,
  href,
  punishmentIcon,
}: PunishmentTypeCardProps) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    setValue(count);
  }, [count]);

  return (
    <Link
      href={href}
    >
      <Card 
        className={cn("overflow-hidden mx-auto w-60 h-36 flex-col flex items-center relative transition ease-in-out hover:scale-110 hover:bg-gradient-to-tr to-transparent group", fromGradient)}
      >
        {punishmentIcon}
        <CardContent className="text-center mt-auto z-[1]">
          <MotionNumber
            value={value}
            format={{ notation: 'standard', useGrouping: false, minimumIntegerDigits: count.toString().length }}
            className="text-[3.5rem] leading-none font-bold"
            transition={DEFAULT_TRANSITION}
          />
          <CardTitle className="text-2xl font-medium">{title}</CardTitle>
        </CardContent>
        <div className="hover-bg"></div>
      </Card>
    </Link>
  )
};