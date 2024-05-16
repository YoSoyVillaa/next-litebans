import { ThemeToggle } from "@/components/theme/theme-toggle";
import { LanguageChanger } from "@/lib/language/components/LanguageChanger";
import { getDictionaries } from "@/lib/language/dictionaries";
import { MainNav } from "./main-nav";
import { getPunishmentCount } from "@/lib/punishment/punishment";
import { MobileNav } from "./mobile-nav";
import { PlayerInput } from "@/components/input/PlayerInput";

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
          </nav>
        </div>
      </div>
    </header>
  )
}