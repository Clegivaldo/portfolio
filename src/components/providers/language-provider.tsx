"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react"
import { dictionary, type Dict, type Lang } from "@/lib/i18n/dictionaries"

type LanguageContextValue = {
  lang: Lang
  setLang: (l: Lang) => void
  toggle: () => void
  t: Dict
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

const STORAGE_KEY = "portfolio-lang"
const LANG_ATTR: Record<Lang, string> = { pt: "pt-BR", en: "en" }
const CHANGE_EVENT = "portfolio-lang-change"

// ---------------------------------------------------------------------------
// External store backed by localStorage + navigator.language.
// useSyncExternalStore uses getServerSnapshot ("pt") for SSR AND the initial
// client hydration render, so they always match → no hydration error.
// After hydration, React immediately re-renders with getSnapshot (persisted).
// ---------------------------------------------------------------------------

function readClientLang(): Lang {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored === "pt" || stored === "en") return stored
  } catch {
    /* ignore */
  }
  const nav = navigator.language?.toLowerCase() ?? ""
  return nav.startsWith("en") ? "en" : "pt"
}

function subscribe(callback: () => void): () => void {
  if (typeof window === "undefined") return () => {}
  // custom event → same-tab updates from setLang()
  window.addEventListener(CHANGE_EVENT, callback)
  // storage event → cross-tab sync
  window.addEventListener("storage", callback)
  return () => {
    window.removeEventListener(CHANGE_EVENT, callback)
    window.removeEventListener("storage", callback)
  }
}

function getSnapshot(): Lang {
  return readClientLang()
}

function getServerSnapshot(): Lang {
  return "pt"
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const lang = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  const setLang = useCallback((l: Lang) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, l)
    } catch {
      /* ignore */
    }
    window.dispatchEvent(new Event(CHANGE_EVENT))
  }, [])

  const toggle = useCallback(() => {
    setLang(lang === "pt" ? "en" : "pt")
  }, [lang, setLang])

  // Keep <html lang> in sync with the active language.
  useEffect(() => {
    if (typeof document === "undefined") return
    document.documentElement.lang = LANG_ATTR[lang]
  }, [lang])

  const value = useMemo<LanguageContextValue>(
    () => ({ lang, setLang, toggle, t: dictionary[lang] as unknown as Dict }),
    [lang, setLang, toggle]
  )

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  )
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext)
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return ctx
}
