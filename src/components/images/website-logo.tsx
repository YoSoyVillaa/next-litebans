"use client"

import Image from "next/image";

import { siteConfig } from "@config/site";

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