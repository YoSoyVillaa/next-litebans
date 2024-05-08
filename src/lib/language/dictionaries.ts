import "server-only"
import { langConfig } from "@config/languages"
import { getLang } from "./actions/get-lang"

const dictionaries: Record<string, any> = {}

langConfig.available.forEach(async (lang) => {
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