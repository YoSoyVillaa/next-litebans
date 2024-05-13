/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { siteConfig } from "@config/site";
import { changeLang } from "../actions/change-lang";

import React from "react";
import { useRouter } from "next/navigation";
import { LanguageProviderProps, UseLangProps } from "../interfaces";

const LanguageContext = React.createContext<UseLangProps | undefined>(undefined);
const defaultContext = { lang: siteConfig.languages.default, defaultLang: siteConfig.languages.default, dictionary: {} as Record<string, any>, setLang: () => {} };

export const useLang = () => React.useContext(LanguageContext) ?? defaultContext;

export const LanguageProvider = (props: LanguageProviderProps) => {
  const context = React.useContext(LanguageContext);

  if (context) return props.children;
  return <Lang {...props} />
}

const Lang = (props: LanguageProviderProps) => {

  const [lang, setLangState] = React.useState(props.lang);

  const router = useRouter();

  React.useEffect(() => {
    try {
      const localLang = localStorage.getItem("lang")

      if (!localLang) {
        localStorage.setItem("lang", props.lang)
      }

      if (localLang && localLang != props.lang) {
        setLocalLang(props.lang)
        setLangState(props.lang)
      }
    } catch (e) {
      // Unsupported
    }
  }, [])

  const setLocalLang = React.useCallback((newLang: string) => {
    try {
      localStorage.setItem("lang", newLang)
    } catch (e) {
      // Unsupported
    }
  }, [])

  const setLang = React.useCallback((newLang: string) => {
    React.startTransition(() => {
      changeLang(newLang).then(() => {
        setLangState(newLang);
        setLocalLang(newLang);
        router.refresh();
      })
    })
  }, [lang]);

  // localStorage event handling
  React.useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key !== "lang") {
        return
      }

      if (e.newValue === lang) {
        return
      }

      const newLang = e.newValue || props.lang
      setLang(newLang)
    }

    window.addEventListener('storage', handleStorage)
    return () => window.removeEventListener('storage', handleStorage)
  }, [setLang, props.lang])

  const providerValue = React.useMemo(() => ({
    lang,
    defaultLang: props.defaultLang,
    dictionary: props.dictionary,
    setLang
  }), [lang, props.defaultLang, props.dictionary, setLang])

  return (
    <LanguageContext.Provider value={providerValue} >
      {props.children}
    </LanguageContext.Provider>
  )
}