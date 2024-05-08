interface LanguageProviderProps extends React.PropsWithChildren {
  lang: string
  defaultLang: string
  dictionary: Record<string, any>
}

interface UseLangProps {
  lang: string
  defaultLang: string
  dictionary: Record<string, any>
  setLang: React.Dispatch<string>
}