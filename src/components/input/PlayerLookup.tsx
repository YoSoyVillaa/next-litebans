"use client"

import { useState, useTransition } from "react"
import { Input } from "../ui/input"
import { PlayerAvatar } from "../avatar/player-avatar"
import { useRouter } from "next/navigation"
import { checkPlayer } from "@/actions/check-player"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import { useLang } from "@/lib/language/components/LanguageProvider"
import { siteConfig } from "@config/site"

export const PlayerInput = () => {
  const [playerName, setPlayerName] = useState("")
  const [isPending, startTransition] = useTransition()
  const [isError, setError] = useState(false)
  const router = useRouter()

  const { dictionary } = useLang()

  const handlePlayerNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setError(false)
    setPlayerName(event.target.value)
  }

  const handleEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (playerName === "") return
    
    if (event.key === "Enter") {
      startTransition(() => {
        checkPlayer(playerName).then(({ exists, name }) => {
          setPlayerName("")
          if (exists) {
            router.push(`/history/@${name}`)
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
      <PlayerAvatar className="absolute right-1 top-1/2 transform -translate-y-1/2 z-10" name={playerName != "" ? playerName : siteConfig.defaultPlayerLookup}/>
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