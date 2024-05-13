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

const PUNISMENT_TYPES = {
  BAN: "ban",
  MUTE: "mute",
  WARN: "warn",
  KICK: "kick"
} as const

export type PunishmentListItem = {
  id: bigint
  uuid: string | null
  reason: string | null
  banned_by_uuid: string
  banned_by_name: string | null
  time: bigint
  until: bigint
  active: boolean
  type?: typeof PUNISMENT_TYPES[keyof typeof PUNISMENT_TYPES]
}