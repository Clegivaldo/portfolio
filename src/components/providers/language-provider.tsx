"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react"
import { dictionary, type Dict, type Lang } from "@/lib/i18n/dictionaries"

type LanguageContextValue = {
  lang: Lang
  setLang: (l: Lang) => void
  toggle: () => void
  /** Dictionary for the current language (typed, fully reactive). */
  t: Dict
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

const STORAGE_KEY = "portfolio-lang"
const LANG_ATTR: Record<Lang, string> = { pt: "pt-BR", en: "en" }

function getInitialLang(): Lang {
  if (typeof window === "undefined") return "pt"
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored === "pt" || stored === "en") return stored
  } catch {
    /* ignore */
  }
  // fall back to browser language
  const nav = navigator.language?.toLowerCase() ?? ""
  return nav.startsWith("en") ? "en" : "pt"
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Start with "pt" on SSR so the server and first client render match.
  // Use a lazy initializer so the FIRST client render already reflects the
  // persisted preference (avoids a flash + avoids setState-in-effect).
  const [lang, setLangState] = useState<Lang>(() =>
    typeof window === "undefined" ? "pt" : getInitialLang()
  )

  // Keep <html lang> in sync with the active language (external system).
  useEffect(() => {
    if (typeof document === "undefined") return
    document.documentElement.lang = LANG_ATTR[lang]
  }, [lang])

  const setLang = useCallback((l: Lang) => {
    setLangState(l)
    try {
      window.localStorage.setItem(STORAGE_KEY, l)
    } catch {
      /* ignore */
    }
  }, [])

  const toggle = useCallback(() => {
    setLang(lang === "pt" ? "en" : "pt")
  }, [lang, setLang])

  const value = useMemo<LanguageContextValue>(
    () => ({ lang, setLang, toggle, t: dictionary[lang] }),
    [lang, setLang, toggle]
  )

  return (
    <LanguageContext.Provider value={value}>
      {/* suppressHydrationWarning lets the first paint differ from SSR
          (which is always pt) without React complaining. */}
      <div suppressHydrationWarning data-lang={lang}>
        {children}
      </div>
    </LanguageContext.Provider>
  )
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext)
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return ctx
}
