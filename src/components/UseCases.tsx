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

        <FadeContent className="divide-y divide-line" stagger={90} duration={900} threshold={0.12}>
          {useCases.items.map((useCase) => (
            <article
              key={useCase.title}
              className="group rounded-2xl px-5 py-7 transition-colors duration-300 hover:bg-white/60"
            >
              <h3 className="font-display text-[1.3rem] font-medium text-ink transition-transform duration-300 group-hover:translate-x-1">
                {useCase.title}
              </h3>
              <p className="mt-1.5 max-w-[560px] text-[1rem] font-normal text-ink-soft">{useCase.copy}</p>
            </article>
          ))}
        </FadeContent>
      </FadeContent>
    </section>
  )
}
