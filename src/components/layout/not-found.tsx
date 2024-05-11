"use client";

import { DefaultPage } from "@/components/layout/default-page";
import { Button } from "@/components/ui/button"
import { useLang } from "@/lib/language/components/LanguageProvider";
import { useRouter } from "next/navigation";

export const NotFound = () => {
  const router = useRouter();
  const { dictionary } = useLang();

  const handleBack = () => {
    router.push("/");
  }


  return (
    <DefaultPage
      title={dictionary.pages.errors.notFound.title}
      description={dictionary.pages.errors.notFound.description}
    >
      <Button onClick={handleBack}>
        {dictionary.pages.errors.notFound.button}
      </Button>
    </DefaultPage>
  )
}