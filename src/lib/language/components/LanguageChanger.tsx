"use client"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useLang } from "./LanguageProvider";
import { Button } from "@/components/ui/button";
import ReactCountryFlag from "react-country-flag";
import { siteConfig } from "@config/site";
import { Dictionary } from "../types";

export const LanguageChanger = ({dictionaries} : {dictionaries: Record<string, Dictionary>}) => {
  const { lang, dictionary, setLang } = useLang();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="space-x-1">
          <ReactCountryFlag 
            countryCode={dictionary.info.country_code} 
            svg 
            cdnUrl="https://flagcdn.com/128x96/" 
            cdnSuffix="webp"
            style={{
              width: "",
            }}
          />
          <span>{dictionary.info.lang_name}</span>
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {siteConfig.languages.available.map((newLang) => (
          <DropdownMenuItem key={newLang} className="space-x-1" onClick={() => {
            if (lang != newLang) setLang(newLang);
          }}>
            <ReactCountryFlag 
            countryCode={dictionaries[newLang].info.country_code} 
            svg 
            cdnUrl="https://flagcdn.com/128x96/" 
            cdnSuffix="webp"
            style={{
              width: "",
            }}
          />
          <span>{dictionaries[newLang].info.lang_name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}