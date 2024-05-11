"use client"

import { siteConfig } from "@config/site";
import Image from "next/image";

interface WebsiteLogoProps {
  height: number;
  width: number;
  className?: string;
}

export const WebsiteLogo = ({ height, width, className }: WebsiteLogoProps) => {
  return (
    <Image
      src={siteConfig.logo}
      alt={`${siteConfig.title} Logo`}
      height={height}
      width={width}
      className={className}
    />
  )
}