import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { messages, type Locale, type Messages } from './messages'

const STORAGE_KEY = 'paylume-locale'

function readLocale(): Locale {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored === 'en' || stored === 'zh') return stored
    return window.navigator.language?.toLowerCase().startsWith('zh') ? 'zh' : 'en'
  } catch {
    return 'en'
  }
}

type LocaleContextValue = {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: Messages
}

const LocaleContext = createContext<LocaleContextValue | null>(null)

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>(readLocale)

  useEffect(() => {
    const text = messages[locale]

    document.documentElement.lang = locale === 'zh' ? 'zh-CN' : 'en'
    document.title = text.meta.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', text.meta.description)

    try {
      window.localStorage.setItem(STORAGE_KEY, locale)
    } catch {
      // Storage can be unavailable in private browsing; the switch still works for this session.
    }
  }, [locale])

  const value = useMemo<LocaleContextValue>(
    () => ({ locale, setLocale, t: messages[locale] }),
    [locale],
  )

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
}

export function useI18n(): LocaleContextValue {
  const context = useContext(LocaleContext)
  if (context) return context

  // Fallback keeps components usable in isolated tests/previews without a provider.
  return { locale: 'en', setLocale: () => {}, t: messages.en }
}
