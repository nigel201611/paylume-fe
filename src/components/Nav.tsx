import { motion, useReducedMotion } from 'motion/react'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useI18n } from '../i18n/locale-provider'
import LanguageSwitch from './LanguageSwitch'
import Logo from './Logo'

const SECTION_IDS = ['about', 'capabilities', 'approach', 'solutions', 'use-cases', 'contact'] as const

type Indicator = { left: number; width: number; visible: boolean }

export default function Nav() {
  const { locale, t } = useI18n()
  const reduceMotion = useReducedMotion()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeId, setActiveId] = useState<string | null>(null)
  const [indicator, setIndicator] = useState<Indicator>({ left: 0, width: 0, visible: false })
  const navListRef = useRef<HTMLUListElement>(null)
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({})
  const scrollLockRef = useRef(0)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = SECTION_IDS.map((id) => ({ id, element: document.getElementById(id) })).filter(
      (section): section is { id: (typeof SECTION_IDS)[number]; element: HTMLElement } =>
        section.element !== null,
    )

    let frame = 0
    const update = () => {
      frame = 0
      if (performance.now() < scrollLockRef.current) return

      const marker = Math.min(320, window.innerHeight * 0.35)
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2
      let current: string | null = null

      if (atBottom) {
        current = sections[sections.length - 1]?.id ?? null
      } else {
        for (const section of sections) {
          if (section.element.getBoundingClientRect().top <= marker) current = section.id
        }
      }

      setActiveId(current)
    }
    const requestUpdate = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    const releaseLock = () => {
      if (scrollLockRef.current === 0) return
      scrollLockRef.current = 0
      requestUpdate()
    }

    update()
    window.addEventListener('scroll', requestUpdate, { passive: true })
    window.addEventListener('resize', requestUpdate)
    window.addEventListener('wheel', releaseLock, { passive: true })
    window.addEventListener('touchstart', releaseLock, { passive: true })
    window.addEventListener('keydown', releaseLock)

    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener('scroll', requestUpdate)
      window.removeEventListener('resize', requestUpdate)
      window.removeEventListener('wheel', releaseLock)
      window.removeEventListener('touchstart', releaseLock)
      window.removeEventListener('keydown', releaseLock)
    }
  }, [])

  // Keep one persistent underline and measure the active item instead of
  // projecting a layout animation between links; this glides without wobble.
  useLayoutEffect(() => {
    const list = navListRef.current
    if (!list) return undefined

    const updateIndicator = () => {
      const link = activeId ? linkRefs.current[activeId] : null
      if (!link) {
        setIndicator((current) => (current.visible ? { ...current, visible: false } : current))
        return
      }

      const listBox = list.getBoundingClientRect()
      const linkBox = link.getBoundingClientRect()
      setIndicator({ left: linkBox.left - listBox.left, width: linkBox.width, visible: true })
    }

    updateIndicator()
    const observer = new ResizeObserver(updateIndicator)
    observer.observe(list)
    window.addEventListener('resize', updateIndicator)
    document.fonts?.ready.then(updateIndicator).catch(() => {})

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', updateIndicator)
    }
  }, [activeId, locale])

  useEffect(() => {
    if (!open) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  const selectSection = (id: string) => {
    setActiveId(id)
    scrollLockRef.current = performance.now() + 1100
  }

  const spring = reduceMotion ? { duration: 0 } : { type: 'spring' as const, stiffness: 420, damping: 34, mass: 0.7 }

  return (
    <header
      className={`on-dark fixed inset-x-0 top-0 z-50 text-white backdrop-blur-xl transition-[background-color,box-shadow] duration-300 ${
        scrolled || open
          ? 'bg-navy/95 shadow-[0_18px_44px_-28px_rgba(0,0,0,0.75)]'
          : 'bg-navy/55'
      }`}
    >
      <div className="shell flex h-[72px] items-center justify-between gap-4">
        <Logo />

        <div className="flex items-center gap-3 md:gap-5 lg:gap-6">
          <nav className="hidden lg:block" aria-label={t.common.primaryNav}>
            <ul ref={navListRef} className="relative flex items-center gap-7">
              {t.nav.map((link) => {
                const id = link.href.slice(1)
                const active = id === activeId

                return (
                  <li key={link.href}>
                    <a
                      ref={(node) => {
                        linkRefs.current[id] = node
                      }}
                      href={link.href}
                      aria-current={active ? 'location' : undefined}
                      onClick={() => selectSection(id)}
                      className={`flex h-10 items-center text-[0.95rem] font-medium transition-colors duration-300 ${
                        active ? 'text-mint' : 'text-white/75 hover:text-white'
                      }`}
                    >
                      <span className="whitespace-nowrap">{link.label}</span>
                    </a>
                  </li>
                )
              })}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute bottom-0 left-0 h-[2px] rounded-full bg-mint shadow-[0_0_12px_rgba(110,231,199,0.5)] transition-[transform,width,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                style={{
                  width: indicator.width,
                  opacity: indicator.visible ? 1 : 0,
                  transform: `translate3d(${indicator.left}px, 0, 0)`,
                }}
              />
            </ul>
          </nav>

          <LanguageSwitch />

          <button
            type="button"
            className="relative h-10 w-10 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? t.common.menuClose : t.common.menuOpen}
            onClick={() => setOpen((value) => !value)}
          >
            <span
              className={`absolute right-2 left-2 top-[15px] h-px bg-white transition-transform duration-300 ${
                open ? 'translate-y-[4px] rotate-45' : ''
              }`}
            />
            <span
              className={`absolute right-2 left-2 top-[23px] h-px bg-white transition-transform duration-300 ${
                open ? '-translate-y-[4px] -rotate-45' : ''
              }`}
            />
          </button>
        </div>
      </div>

      {open && (
        <div
          id="mobile-nav"
          className="mobile-menu-enter bg-navy/98 shadow-[0_28px_56px_-28px_rgba(0,0,0,0.8)] backdrop-blur-xl lg:hidden"
        >
          <nav className="shell py-5" aria-label={t.common.mobileNav}>
            <ul className="flex flex-col gap-1">
              {t.nav.map((link, index) => {
                const id = link.href.slice(1)
                const active = id === activeId

                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      aria-current={active ? 'location' : undefined}
                      onClick={() => {
                        selectSection(id)
                        setOpen(false)
                      }}
                      className={`relative flex items-center justify-between rounded-xl px-3 py-4 transition-colors duration-300 ${
                        active ? 'text-mint' : 'text-white/85 hover:text-mint'
                      }`}
                    >
                      {active && (
                        <motion.span
                          aria-hidden="true"
                          layoutId="mobile-nav-active"
                          initial={false}
                          transition={spring}
                          className="pointer-events-none absolute top-1/2 left-0 h-5 w-[2px] -translate-y-1/2 rounded-full bg-mint shadow-[0_0_10px_rgba(110,231,199,0.45)]"
                        />
                      )}
                      <span className="relative z-10 font-display text-lg">{link.label}</span>
                      <span
                        className={`relative z-10 font-mono text-[0.8rem] tracking-[0.08em] ${
                          active ? 'text-mint/70' : 'text-white/30'
                        }`}
                      >
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </a>
                  </li>
                )
              })}
              <li className="pt-4">
                <a
                  href="#contact"
                  onClick={() => {
                    selectSection('contact')
                    setOpen(false)
                  }}
                  className="btn btn-primary w-full"
                >
                  {t.common.getInTouch}
                </a>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  )
}
