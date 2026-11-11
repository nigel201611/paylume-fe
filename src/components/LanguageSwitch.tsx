import { motion, useReducedMotion } from 'motion/react'
import type { Locale } from '../i18n/messages'
import { useI18n } from '../i18n/locale-provider'
import LanguageIcon from './LanguageIcon'

const languages: { value: Locale; label: string; name: string }[] = [
  { value: 'en', label: 'EN', name: 'English' },
  { value: 'zh', label: '中文', name: '中文' },
]

export default function LanguageSwitch({ className = '' }: { className?: string }) {
  const { locale, setLocale, t } = useI18n()
  const reduceMotion = useReducedMotion()
  const spring = reduceMotion ? { duration: 0 } : { type: 'spring' as const, stiffness: 420, damping: 34, mass: 0.7 }

  return (
    <div
      role="group"
      aria-label={t.common.languageLabel}
      className={`flex h-9 shrink-0 items-center rounded-full border border-white/8 bg-white/[0.02] p-1 ${className}`}
    >
      {languages.map(({ value, label, name }) => {
        const active = locale === value

        return (
          <button
            key={value}
            type="button"
            onClick={() => setLocale(value)}
            aria-pressed={active}
            aria-label={name}
            className={`relative inline-flex h-7 items-center justify-center rounded-full px-2 text-[0.72rem] font-semibold tracking-[0.04em] whitespace-nowrap transition-colors duration-300 sm:px-2.5 ${
              active ? 'text-mint' : 'text-white/50 hover:text-white/80'
            }`}
          >
            {active && (
              <motion.span
                aria-hidden="true"
                layoutId="language-active"
                initial={false}
                transition={spring}
                className="pointer-events-none absolute inset-0 rounded-full bg-white/[0.08] ring-1 ring-white/10"
              />
            )}
            <span className="relative z-10 flex items-center gap-1.5">
              <span className={`shrink-0 transition-opacity ${active ? 'opacity-100' : 'opacity-60'}`}>
                <LanguageIcon locale={value} />
              </span>
              <span>{label}</span>
            </span>
          </button>
        )
      })}
    </div>
  )
}
