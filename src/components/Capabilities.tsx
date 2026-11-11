import type { CSSProperties } from 'react'
import { useI18n } from '../i18n/locale-provider'
import FadeContent from './reactbits/FadeContent/FadeContent'
import SpotlightCard from './reactbits/SpotlightCard/SpotlightCard'
import { CapabilityIcon } from './icons'
import SectionHeading from './SectionHeading'

const cardStyle = {
  borderRadius: 18,
  '--spotlight-card-surface': '#0b1c18',
  '--spotlight-card-border': 'rgba(127, 227, 197, 0.10)',
  '--spotlight-card-shadow': '0 28px 60px -40px rgba(0, 0, 0, 0.7)',
} as CSSProperties

export default function Capabilities() {
  const { t } = useI18n()
  const { capabilities } = t

  return (
    <section id="capabilities" className="on-dark section-pad surface-dark relative overflow-hidden text-white">
      <div className="shell">
        <FadeContent duration={900} threshold={0.15}>
          <SectionHeading tone="dark" kicker={capabilities.kicker} title={capabilities.title} />
        </FadeContent>

        <FadeContent
          className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5"
          stagger={110}
          duration={1000}
          threshold={0.1}
        >
          {capabilities.items.map((capability, index) => (
            <SpotlightCard
              key={capability.title}
              theme="dark"
              spotlightColor="#7fe3c5"
              intensity={0.16}
              spotlightSize={300}
              softness={0.85}
              borderGlow={0.55}
              proximity={110}
              grain={0.14}
              flare={false}
              className="flex min-h-[330px] flex-col overflow-hidden p-8 transition-transform duration-500 hover:-translate-y-1 [background-image:radial-gradient(circle_at_100%_0%,rgba(127,227,197,0.08),transparent_55%)]"
              style={cardStyle}
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -right-3 -bottom-7 z-0 font-display text-[7rem] leading-none font-semibold tracking-[-0.06em] text-white/[0.035]"
              >
                {String(index + 1).padStart(2, '0')}
              </span>

              <div className="relative z-10 flex flex-1 flex-col">
                <div className="flex items-start justify-between gap-4">
                  <span className="font-mono text-[1.1rem] font-medium tracking-[0.04em] text-mint">
                    {String(index + 1).padStart(2, '0')} / 04
                  </span>
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-mint/15 bg-mint/[0.06] text-mint">
                    <CapabilityIcon index={index} />
                  </span>
                </div>

                <h3 className="mt-8 font-display text-[1.35rem] leading-[1.2] font-medium tracking-[-0.02em] text-white">
                  {capability.title}
                </h3>
                <p className="mt-3 text-[0.95rem] font-normal text-white/60">{capability.copy}</p>

                <div className="mt-auto flex items-center justify-between gap-3 border-t border-white/8 pt-5">
                  <span className="flex items-center gap-2 font-mono text-[0.7rem] tracking-[0.06em] text-white/50 uppercase">
                    <i className="h-1 w-1 rounded-full bg-mint" aria-hidden="true" />
                    {capability.tag}
                  </span>
                  <span className="text-[0.9rem] text-mint/60" aria-hidden="true">
                    ↗
                  </span>
                </div>
              </div>
            </SpotlightCard>
          ))}
        </FadeContent>
      </div>
    </section>
  )
}
