import { Dictionary } from "../types"

export interface LanguageProviderProps extends React.PropsWithChildren {
  lang: string
  defaultLang: string
  dictionary: Dictionary
}

export interface UseLangProps {
  lang: string
  defaultLang: string
  dictionary: Dictionary
  setLang: React.Dispatch<string>
}