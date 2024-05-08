import { siteConfig } from "@config/site"
import Link from "next/link"

export const NavBar = () => {
  return (
    <div className="mr-4 hidden md:flex">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <span className="hidden font-bold sm:inline-block">
          {siteConfig.title}
        </span>
      </Link>
    </div>
  )
}