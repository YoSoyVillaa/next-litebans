import { LanguageChanger } from "@/lib/language/components/language-changer";
import { getDictionaries } from "@/lib/language/dictionaries";
import { getPunishmentCount } from "@/lib/punishment/punishment";

import { ThemeToggle } from "@/components/theme/theme-toggle";
import { PlayerInput } from "@/components/input/player-lookup";

import { MainNav } from "./main-nav";
import { MobileNav } from "./mobile-nav";
import { GithubButton } from "@/components/buttons/github-button";

export const SiteHeader = async () => {
  const dictionaries = getDictionaries();
  const { bans, mutes, warns, kicks } = await getPunishmentCount();

  return(
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center space-x-1 px-4">
        <MobileNav bans={bans} mutes={mutes} warns={warns} kicks={kicks} dictionaries={dictionaries} />
        <MainNav bans={bans} mutes={mutes} warns={warns} kicks={kicks} />
        <div className="flex flex-1 justify-end">
          <nav className="flex items-center space-x-1">
            <PlayerInput />
            <LanguageChanger dictionaries={dictionaries} />
            <ThemeToggle />
            <GithubButton />
          </nav>
        </div>
      </div>
    </header>
  )
}