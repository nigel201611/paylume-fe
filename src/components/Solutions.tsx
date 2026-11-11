import type { CSSProperties } from 'react'
import { useI18n } from '../i18n/locale-provider'
import FadeContent from './reactbits/FadeContent/FadeContent'
import SpotlightCard from './reactbits/SpotlightCard/SpotlightCard'
import { SolutionIcon } from './icons'
import SectionHeading from './SectionHeading'

const cardStyle = {
  borderRadius: 18,
  '--spotlight-card-surface': '#fffdf8',
  '--spotlight-card-border': 'transparent',
  '--spotlight-card-shadow': '0 2px 3px rgba(15, 29, 24, 0.03), 0 30px 60px -38px rgba(16, 36, 44, 0.3)',
} as CSSProperties

export default function Solutions() {
  const { t } = useI18n()
  const { solutions } = t

  return (
    <section id="solutions" className="section-pad surface-paper">
      <div className="shell">
        <FadeContent duration={900} threshold={0.15}>
          <SectionHeading kicker={solutions.kicker} title={solutions.title} />
        </FadeContent>

        <FadeContent className="mt-14 grid gap-5 md:grid-cols-3 lg:gap-6" stagger={120} duration={1000} threshold={0.1}>
          {solutions.items.map((solution, index) => (
            <SpotlightCard
              key={solution.title}
              theme="light"
              spotlightColor="#1f9d80"
              intensity={0.4}
              spotlightSize={320}
              softness={0.9}
              borderGlow={0.55}
              proximity={90}
              grain={0.08}
              flare={false}
              className="flex min-h-[360px] flex-col overflow-hidden border border-line p-9 transition-transform duration-500 hover:-translate-y-1 [background-image:radial-gradient(circle_at_100%_0%,rgba(31,157,128,0.06),transparent_55%)]"
              style={cardStyle}
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-8 top-0 z-0 h-px bg-gradient-to-r from-transparent via-mint-deep/35 to-transparent"
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -right-2 -bottom-8 z-0 font-display text-[7rem] leading-none font-semibold tracking-[-0.06em] text-ink/[0.06]"
              >
                {String(index + 1).padStart(2, '0')}
              </span>

              <div className="relative z-10 flex flex-1 flex-col">
                <div className="flex items-start justify-between gap-4">
                  <small className="font-mono text-[1.3rem] tracking-[0.08em] text-mint-deep uppercase">
                    {solution.label}
                  </small>
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-line/70 bg-white/70 text-mint-deep">
                    <SolutionIcon index={index} />
                  </span>
                </div>

                <h3 className="mt-8 mb-3 font-display text-[1.4rem] font-medium text-ink">{solution.title}</h3>
                <p className="text-[1rem] font-normal text-ink-soft">{solution.copy}</p>

                <ul className="solution-list mt-auto">
                  {solution.list.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </SpotlightCard>
          ))}
        </FadeContent>
      </div>
    </section>
  )
}
