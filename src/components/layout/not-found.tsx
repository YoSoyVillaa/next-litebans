"use client";

import { useRouter } from "next/navigation";

import { useLang } from "@/lib/language/components/language-provider";

import { Button } from "@/components/ui/button"
import { DefaultPage } from "@/components/layout/default-page";

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