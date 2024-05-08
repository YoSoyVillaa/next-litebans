import { langConfig } from "@config/languages";
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  let lang = request.cookies.get("lang")?.value

  if (!lang || !langConfig.available.includes(lang)) {
    lang = langConfig.default
    const response = NextResponse.redirect(request.url)
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