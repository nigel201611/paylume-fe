import { lazy, Suspense, useEffect, useRef, useState, type ReactNode } from 'react'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Nav from './components/Nav'
import TrustStrip from './components/TrustStrip'
import ClickSpark from './components/reactbits/ClickSpark/ClickSpark'
import { useI18n } from './i18n/locale-provider'

const AboutSection = lazy(() => import('./components/AboutSection'))
const Capabilities = lazy(() => import('./components/Capabilities'))
const Approach = lazy(() => import('./components/Approach'))
const Solutions = lazy(() => import('./components/Solutions'))
const UseCases = lazy(() => import('./components/UseCases'))
const Contact = lazy(() => import('./components/Contact'))

const REVEAL_EVENT = 'paylume:reveal-section'

type DeferredSectionProps = {
  id: string
  children: ReactNode
}

/**
 * Mounts a below-the-fold section (and fetches its chunk) only when it is near
 * the viewport, or immediately when a nav link / deep link targets it.
 */
function DeferredSection({ id, children }: DeferredSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (show) return undefined

    const node = ref.current
    if (!node) return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) setShow(true)
      },
      { rootMargin: '900px 0px' },
    )
    observer.observe(node)

    const reveal = (event: Event) => {
      if ((event as CustomEvent<string>).detail === id) setShow(true)
    }
    window.addEventListener(REVEAL_EVENT, reveal)

    return () => {
      observer.disconnect()
      window.removeEventListener(REVEAL_EVENT, reveal)
    }
  }, [id, show])

  return (
    <div ref={ref} className={show ? undefined : 'min-h-[70vh]'}>
      {show ? (
        <Suspense fallback={<div className="min-h-[70vh]" aria-hidden="true" />}>{children}</Suspense>
      ) : null}
    </div>
  )
}

export default function App() {
  const { t } = useI18n()

  return (
    <ClickSpark
      sparkColor="#7fe3c5"
      sparkSize={9}
      sparkRadius={26}
      sparkCount={7}
      sparkWidth={1.5}
      duration={480}
      easing="ease-out"
      shape="line"
      glow={0.7}
    >
      <a className="skip-link" href="#main">
        {t.common.skipToContent}
      </a>
      <Nav />
      <main id="main" tabIndex={-1}>
        <Hero />
        <TrustStrip />
        <DeferredSection id="about">
          <AboutSection />
        </DeferredSection>
        <DeferredSection id="capabilities">
          <Capabilities />
        </DeferredSection>
        <DeferredSection id="approach">
          <Approach />
        </DeferredSection>
        <DeferredSection id="solutions">
          <Solutions />
        </DeferredSection>
        <DeferredSection id="use-cases">
          <UseCases />
        </DeferredSection>
        <DeferredSection id="contact">
          <Contact />
        </DeferredSection>
      </main>
      <Footer />
    </ClickSpark>
  )
}
