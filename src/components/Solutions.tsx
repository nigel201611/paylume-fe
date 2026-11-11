import { useI18n } from '../i18n/locale-provider'
import FadeContent from './reactbits/FadeContent/FadeContent'
import { SolutionIcon } from './icons'
import SectionHeading from './SectionHeading'

export default function Solutions() {
  const { t } = useI18n()
  const { solutions } = t

  return (
    <section id="solutions" className="section-pad surface-paper">
      <div className="shell">
        <FadeContent duration={900} threshold={0.15}>
          <SectionHeading kicker={solutions.kicker} title={solutions.title} />
        </FadeContent>

        <FadeContent
          className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6"
          stagger={120}
          duration={1000}
          threshold={0.1}
        >
          {solutions.items.map((solution, index) => (
            <div
              key={solution.title}
              className="relative isolate flex min-h-[360px] flex-col overflow-hidden rounded-[18px] border border-line bg-[#fffdf8] p-7 shadow-[0_2px_3px_rgba(20,20,20,0.03),0_30px_60px_-38px_rgba(20,20,22,0.3)] transition-transform duration-500 hover:-translate-y-1 lg:p-9"
            >
              <div className="relative z-10 flex flex-1 flex-col">
                <div className="flex items-start justify-between gap-4">
                  <small className="min-w-0 font-mono text-[1.3rem] tracking-[0.08em] break-words text-ink-mute uppercase">
                    {solution.label}
                  </small>
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-line/70 bg-white/70 text-mint-ink">
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
            </div>
          ))}
        </FadeContent>
      </div>
    </section>
  )
}
