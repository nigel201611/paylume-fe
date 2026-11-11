import { useI18n } from '../i18n/locale-provider'
import FadeContent from './reactbits/FadeContent/FadeContent'
import SectionHeading from './SectionHeading'

export default function AboutSection() {
  const { t } = useI18n()
  const { about } = t

  return (
    <section id="about" className="section-pad surface-paper">
      <FadeContent
        className="shell grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-[10vw]"
        stagger={110}
        duration={1000}
        threshold={0.15}
      >
        <SectionHeading kicker={about.kicker} title={about.title} />

        <div className="grid gap-6">
          {about.paragraphs.map((paragraph, index) => (
            <p
              key={paragraph}
              className={
                index === 0
                  ? 'max-w-[660px] text-[1.08rem] leading-[1.8] font-normal text-ink'
                  : 'max-w-[660px] text-[1rem] leading-[1.8] font-normal text-ink-soft'
              }
            >
              {paragraph}
            </p>
          ))}

          <div className="mt-2 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {about.meta.map((item) => (
              <div
                key={item.key}
                className="group rounded-2xl border border-line bg-[#fffdf9] p-5 shadow-[0_16px_40px_-36px_rgba(20,20,22,0.35)] transition-colors duration-200 hover:bg-[#fffdf9]"
              >
                <span className="mb-1.5 flex items-center gap-2 font-mono text-[0.7rem] tracking-[0.08em] text-ink-mute uppercase">
                  <span
                    className="h-1 w-1 rounded-full bg-mint-ink/40 transition-colors group-hover:bg-mint-ink"
                    aria-hidden="true"
                  />
                  {item.key}
                </span>
                <span className="text-[0.92rem] font-medium text-ink">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </FadeContent>
    </section>
  )
}
