export type PageProps = {
  params: { lang: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export type PageLangProps = {
  params: { lang: string }
}

export type SearchParams = {
  searchParams: { [key: string]: string | string[] | undefined }
}