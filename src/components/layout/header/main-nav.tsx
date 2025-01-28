"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { siteConfig } from "@config/site"

import { Badge } from "@/components/ui/badge"
import { WebsiteLogo } from "@/components/images/website-logo"
import { useLang } from "@/lib/language/components/language-provider"

interface MainNavProps {
  bans: number;
  mutes: number;
  warns: number;
  kicks: number;
}

export const MainNav = ({ bans, mutes, warns, kicks}: MainNavProps) => {
  const pathname = usePathname()
  const { dictionary } = useLang()

  return (
    <div className="mr-4 hidden md:flex">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <WebsiteLogo 
          width={24}
          height={24}
        />
        <span className="hidden font-bold sm:inline-block">
          {siteConfig.title}
        </span>
      </Link>
      <nav className="flex items-center gap-6 text-sm">
        <Link 
          href="/bans"
          className={cn("transition-colors", pathname.startsWith("/bans") ? "hover:text-foreground text-foreground/80" : "hover:text-foreground/80 text-foreground/60")}
        >
          {dictionary.words.bans.plural} <Badge variant={pathname.startsWith("/bans") ? "default" : "secondary"} className="!px-1 !py-0 hidden lg:inline-flex">{bans}</Badge>
        </Link>

        <Link 
          href="/mutes"
          className={cn("transition-colors", pathname.startsWith("/mutes") ? "hover:text-foreground text-foreground/80" : "hover:text-foreground/80 text-foreground/60")}
        >
          {dictionary.words.mutes.plural} <Badge variant={pathname.startsWith("/mutes") ? "default" : "secondary"} className="!px-1 !py-0 hidden lg:inline-flex">{mutes}</Badge>
        </Link>
        
        <Link 
          href="/warns"
          className={cn("transition-colors", pathname.startsWith("/warns") ? "hover:text-foreground text-foreground/80" : "hover:text-foreground/80 text-foreground/60")}
        >
          {dictionary.words.warns.plural} <Badge variant={pathname.startsWith("/warns") ? "default" : "secondary"} className="!px-1 !py-0 hidden lg:inline-flex">{warns}</Badge>
        </Link>
        
        <Link 
          href="/kicks"
          className={cn("transition-colors", pathname.startsWith("/kicks") ? "hover:text-foreground text-foreground/80" : "hover:text-foreground/80 text-foreground/60")}
        >
          {dictionary.words.kicks.plural} <Badge variant={pathname.startsWith("/kicks") ? "default" : "secondary"} className="!px-1 !py-0 hidden lg:inline-flex">{kicks}</Badge>
        </Link>
      </nav>
    </div>
  )
}
