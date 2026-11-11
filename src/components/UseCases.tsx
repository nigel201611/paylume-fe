import { useI18n } from '../i18n/locale-provider'
import FadeContent from './reactbits/FadeContent/FadeContent'
import SectionHeading from './SectionHeading'

export default function UseCases() {
  const { t } = useI18n()
  const { useCases } = t

  return (
    <section id="use-cases" className="section-pad surface-mist">
      <FadeContent
        className="shell grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-[8vw]"
        stagger={120}
        duration={1000}
        threshold={0.12}
      >
        <div>
          <SectionHeading kicker={useCases.kicker} title={useCases.title} />
          <p className="mt-6 max-w-[540px] text-[1rem] font-normal text-ink-soft">{useCases.intro}</p>
        </div>

        <FadeContent className="divide-y divide-line/60" stagger={90} duration={900} threshold={0.12}>
          {useCases.items.map((useCase, index) => (
            <article
              key={useCase.title}
              className="group grid grid-cols-[56px_1fr] gap-5 rounded-2xl px-4 py-7 transition-colors duration-300 hover:bg-white/60"
            >
              <span className="pt-1 font-mono text-[0.9rem] font-medium text-mint-deep">
                {String(index + 1).padStart(2, '0')}
              </span>
              <div>
                <h3 className="font-display text-[1.15rem] font-medium text-ink transition-transform duration-300 group-hover:translate-x-1">
                  {useCase.title}
                </h3>
                <p className="mt-1.5 text-[0.92rem] font-normal text-ink-soft">{useCase.copy}</p>
              </div>
            </article>
          ))}
        </FadeContent>
      </FadeContent>
    </section>
  )
}
