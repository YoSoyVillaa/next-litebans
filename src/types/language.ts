export type UseLangProps = {
  lang: string
  defaultLang: string
  setLang: React.Dispatch<React.SetStateAction<string>>
}

export interface LanguageProviderProps extends React.PropsWithChildren {
  langs?: string[] | undefined
  defaultLang?: string
}