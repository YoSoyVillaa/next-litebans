"use client"

import { siteConfig } from "@config/site";
import Image from "next/image";

interface WebsiteLogoProps {
  height: number;
  width: number;
}

export const WebsiteLogo = ({ height, width }: WebsiteLogoProps) => {
  return (
    <Image
      src={siteConfig.logo}
      alt={`${siteConfig.title} Logo`}
      height={height}
      width={width}
    />
  )
}