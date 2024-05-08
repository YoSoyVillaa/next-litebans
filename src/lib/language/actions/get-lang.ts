"use server"

import { siteConfig } from "@config/site"
import { cookies } from "next/headers"

export const getLang = async (): Promise<string> => {
  const cookieStore = cookies()
  let lang = cookieStore.get("lang")?.value
  
  if (!lang) {
    cookieStore.set("lang", siteConfig.languages.default)
    lang = siteConfig.languages.default
  }

  return lang
}