import "server-only"

import { getLang } from "./actions/get-lang"
import { siteConfig } from "@config/site"
import { Dictionary } from "./types"

const dictionaries: Record<string, Dictionary> = {}

siteConfig.languages.available.forEach(async (lang) => {
  const dictionary = await import(`../../../language/${lang}.js`)
  dictionaries[lang] = dictionary.default
})

const getDictionary = (lang: string) => dictionaries[lang]

const getDictionaries = () => dictionaries

const language = async () => {
  const lang = await getLang()
  const dictionary = getDictionary(lang)

  return {
    lang,
    dictionary
  }
}

export { getDictionary, getDictionaries,  language }