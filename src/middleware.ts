import { siteConfig } from "@config/site";
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  let lang = request.cookies.get("lang")?.value

  if (!lang || !siteConfig.languages.available.includes(lang)) {
    lang = siteConfig.languages.default
    const response = NextResponse.rewrite(request.url)
    response.cookies.set({
      name: "lang",
      value: lang,
      httpOnly: true,
      path: "/",
    })
    return response
  }
  
  return
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}