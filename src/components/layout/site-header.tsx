import { ThemeToggle } from "@/components/theme/theme-toggle";
import { LanguageChanger } from "@/lib/language/components/LanguageChanger";
import { getDictionaries } from "@/lib/language/dictionaries";

export const SiteHeader = () => {
  const dictionaries = getDictionaries();

  return(
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center space-x-2 justify-end">
        <nav className="flex items-center">
          <LanguageChanger dictionaries={dictionaries} />
          <ThemeToggle />
        </nav>
      </div>
    </header>
  )
}