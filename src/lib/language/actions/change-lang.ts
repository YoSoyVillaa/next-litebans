"use server"

import { cookies } from "next/headers"

export const changeLang = async (lang: string) => {
  const cookieStore = cookies()
  cookieStore.set("lang", lang)
}