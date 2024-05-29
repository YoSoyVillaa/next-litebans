"use server"

import { cookies } from "next/headers"

export const changeLang = async (lang: string) => {
  const cookieStore = cookies()
  cookieStore.set({
    name: "lang",
    value: lang,
    httpOnly: true,
    path: "/",
  })
}