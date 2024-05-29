"use server"

import {cookies} from "next/headers"

import {siteConfig} from "@config/site"

export const getLang = async (): Promise<string> => {
  const cookieStore = cookies()
  return cookieStore.get("lang")?.value ?? siteConfig.languages.default
}