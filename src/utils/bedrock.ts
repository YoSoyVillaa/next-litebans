import { siteConfig } from "@config/site"

const getSkinUUID = (playername: string, uuid: string) => {
  if (!siteConfig.bedrock.enabled) return uuid;

  if (playername.startsWith(siteConfig.bedrock.prefix)) {
    return "2bc90ee6-7b81-3a66-a268-f89d4472e8ec";
  }

  return uuid;
}

export { getSkinUUID }