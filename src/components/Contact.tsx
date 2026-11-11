import { useI18n } from '../i18n/locale-provider'
import FadeContent from './reactbits/FadeContent/FadeContent'
import StarBorder from './reactbits/StarBorder/StarBorder'
import SectionHeading from './SectionHeading'

export default function Contact() {
  const { t } = useI18n()
  const { contact } = t

  return (
    <section id="contact" className="on-dark section-pad surface-dark overflow-hidden text-white">
      <FadeContent
        className="shell grid gap-12 lg:grid-cols-2 lg:items-end lg:gap-[8vw]"
        stagger={120}
        duration={1000}
        threshold={0.12}
      >
        <div>
          <SectionHeading tone="dark" kicker={contact.kicker} title={contact.title} />
          <p className="mt-6 max-w-[580px] text-[1rem] font-normal text-white/60">{contact.copy}</p>
          <a
            href="mailto:bd@vtransfer.io"
            className="mt-8 inline-flex items-center gap-3 font-mono text-[0.78rem] tracking-[0.08em] text-mint no-underline underline-offset-4 hover:underline"
          >
            <span className="h-px w-8 bg-mint/50" aria-hidden="true" />
            bd@vtransfer.io
          </a>
        </div>

        <StarBorder
          as="div"
          theme="dark"
          color="#7fe3c5"
          trailColor="#1f9d80"
          duration={9000}
          thickness={1}
          radius={20}
          stars={2}
          glow={0.6}
          sparkle={false}
          hover="brighten"
          backgroundColor="#081a15"
          borderColor="rgba(127, 227, 197, 0.14)"
          textColor="#ffffff"
          className="w-full p-0!"
        >
          <div className="w-full divide-y divide-white/8 p-2.5">
            {contact.rows.map((row) => (
              <div
                key={row.key}
                className="grid gap-1 rounded-xl px-4 py-4 transition-colors hover:bg-white/[0.03] sm:grid-cols-[130px_1fr] sm:items-baseline sm:gap-6"
              >
                <span className="font-mono text-[0.72rem] tracking-[0.08em] text-mint uppercase">{row.key}</span>
                <span className="text-[0.92rem] text-white/75">
                  {row.href ? (
                    <a
                      href={row.href}
                      className="underline decoration-mint/40 underline-offset-4 transition-colors hover:text-mint"
                    >
                      {row.value}
                    </a>
                  ) : (
                    row.value
                  )}
                </span>
              </div>
            ))}
          </div>
        </StarBorder>
      </FadeContent>
    </section>
  )
}
