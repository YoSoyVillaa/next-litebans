"use client"

import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { useState, useTransition } from "react"

import { cn } from "@/lib/utils"
import { siteConfig } from "@config/site"
import { checkPlayer } from "@/actions/check-player"
import { useLang } from "@/lib/language/components/language-provider"

import { Input } from "@/components/ui/input"
import { PlayerAvatar } from "@/components/avatar/player-avatar"
import { bedrockPrefixRegex } from "@/utils/bedrock"

export const PlayerInput = () => {
  const [playerName, setPlayerName] = useState("")
  const [iconPlayer, setIconPlayer] = useState("")
  const [isPending, startTransition] = useTransition()
  const [isError, setError] = useState(false)
  const router = useRouter()

  const { dictionary } = useLang()

  const handlePlayerNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setError(false)
    setPlayerName(event.target.value)

    if (siteConfig.bedrock.enabled) {
      if (event.target.value.startsWith(siteConfig.bedrock.prefix)) {
        setIconPlayer(event.target.value.replace(bedrockPrefixRegex, ""))
      } else {
        setIconPlayer(event.target.value)
      }
    } else {
      setIconPlayer(event.target.value)
    }
  }

  const handleEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (playerName === "") return
    
    if (event.key === "Enter") {
      startTransition(() => {
        checkPlayer(playerName).then(({ exists, name }) => {
          setPlayerName("")
          if (exists) {
            router.push(`/@${name}`)
          } else {
            setError(true)
            toast.error(dictionary.notifications.playerNotFound.title, {
              description: dictionary.notifications.playerNotFound.description
            })
          }
        })
      })
    }
  }

  return (
    <div className={cn("relative h-10", isError ? "animate-shake" : "")}>
      <PlayerAvatar className="absolute right-1 top-1/2 transform -translate-y-1/2 z-10" name={iconPlayer != "" ? iconPlayer : siteConfig.defaultPlayerLookup}/>
      <Input 
        type="text" 
        value={playerName} 
        placeholder={siteConfig.defaultPlayerLookup}
        onChange={handlePlayerNameChange} 
        onKeyDown={handleEnter} 
        disabled={isPending}
      />
    </div>
  )
}