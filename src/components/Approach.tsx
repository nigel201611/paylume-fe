import { useI18n } from '../i18n/locale-provider'
import BlurText from './reactbits/BlurText/BlurText'
import FadeContent from './reactbits/FadeContent/FadeContent'
import SectionHeading from './SectionHeading'

export default function Approach() {
  const { t } = useI18n()
  const { approach } = t

  return (
    <section id="approach" className="section-pad surface-mist">
      <div className="shell">
        <FadeContent
          className="mb-14 flex flex-col justify-between gap-8 lg:flex-row lg:items-end"
          stagger={120}
          duration={1000}
          threshold={0.15}
        >
          <SectionHeading kicker={approach.kicker} title={approach.titleLines} />
          <BlurText
            text={approach.intro}
            animateBy="words"
            direction="bottom"
            delay={18}
            stepDuration={0.25}
            className="max-w-[460px] text-[1.02rem] font-normal text-ink-soft"
          />
        </FadeContent>

        <FadeContent
          className="grid gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-3"
          stagger={130}
          duration={1000}
          threshold={0.1}
        >
          {approach.steps.map((step) => (
            <article
              key={step.title}
              className="relative min-h-[240px] overflow-hidden rounded-2xl border border-line bg-[#fffdf9] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_2px_6px_rgba(20,20,20,0.03),0_26px_54px_-38px_rgba(20,20,22,0.42)] transition-colors duration-300 hover:bg-[#fffdf9] lg:p-7"
            >
              <div className="relative z-10 flex h-full flex-col">
                <span className="font-mono text-[1.1rem] tracking-[0.08em] text-mint-ink">{step.label}</span>
                <h3 className="mt-5 mb-2 font-display text-[1.25rem] font-medium text-ink">{step.title}</h3>
                <p className="text-[0.95rem] font-normal text-ink-soft">{step.copy}</p>
              </div>
            </article>
          ))}
        </FadeContent>
      </div>
    </section>
  )
}
