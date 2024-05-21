"use server"

import { cookies } from "next/headers"

import { siteConfig } from "@config/site"

export const getLang = async (): Promise<string> => {
  const cookieStore = cookies()
  let lang = cookieStore.get("lang")?.value
  
  if (!lang) {
    cookieStore.set("lang", siteConfig.languages.default)
    lang = siteConfig.languages.default
  }

  return lang
}