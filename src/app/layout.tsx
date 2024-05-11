import { Inter } from "next/font/google";
import "./globals.css";
import { language } from "@/lib/language/dictionaries";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { SiteHeader } from "@/components/layout/header/site-header";
import { siteConfig } from "@config/site";
import { LanguageProvider } from "@/lib/language/components/LanguageProvider";

const inter = Inter({ subsets: ["latin"] });

export async function generateMetadata() {
  
  const { dictionary } = await language();
  
  return {
    title: {
      template: `%s | ${siteConfig.title}`,
      default: siteConfig.title,
    },
    description: dictionary.site.description,
  }
}

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  const { lang, dictionary} = await language();

  return (
    <LanguageProvider lang={lang} dictionary={dictionary} defaultLang={siteConfig.languages.default}>
      <html lang={lang}>
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div vaul-drawer-wrapper="" className="h-full">
              <div className="relative flex h-full flex-col bg-background">
                <SiteHeader />  
                <main className="flex-1">{children}</main>
              </div>
            </div>
          </ThemeProvider>
        </body>
      </html>
    </LanguageProvider>
  );
}
