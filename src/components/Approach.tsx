import { useI18n } from '../i18n/locale-provider'
import BlurText from './reactbits/BlurText/BlurText'
import CountUp from './reactbits/CountUp/CountUp'
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
          className="grid gap-4 md:grid-cols-3 md:gap-5"
          stagger={130}
          duration={1000}
          threshold={0.1}
        >
          {approach.steps.map((step, index) => (
            <article
              key={step.title}
              className="relative min-h-[240px] overflow-hidden rounded-2xl border border-line/60 bg-[#fffdf9]/70 p-7 shadow-[0_20px_50px_-44px_rgba(16,36,44,0.4)] transition-colors duration-300 hover:bg-[#fffdf9] [background-image:radial-gradient(circle_at_100%_0%,rgba(31,157,128,0.05),transparent_55%)]"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -right-2 -bottom-6 z-0 font-display text-[6rem] leading-none font-semibold tracking-[-0.06em] text-ink/[0.035]"
              >
                0{index + 1}
              </span>

              <div className="relative z-10 flex h-full flex-col">
                <span className="font-mono text-[0.88rem] tracking-[0.08em] text-mint-deep">
                  <CountUp to={index + 1} prefix="0" duration={1} className="text-[0.88rem]" /> · {step.label}
                </span>
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
