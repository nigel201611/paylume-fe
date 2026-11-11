import { useI18n } from '../i18n/locale-provider'
import FadeContent from './reactbits/FadeContent/FadeContent'

export default function TrustStrip() {
  const { t } = useI18n()
  const { trust } = t

  return (
    <section aria-label={trust.ariaLabel} className="bg-navy-soft text-white">
      <FadeContent
        className="mx-auto grid max-w-[1440px] md:grid-cols-3"
        stagger={110}
        duration={900}
        effect="fade"
        threshold={0.2}
      >
        {trust.items.map((item) => (
          <div key={item.title} className="px-6 py-9 text-center md:py-10">
            <strong className="inline-flex items-center gap-2 font-mono text-[0.85rem] font-medium tracking-[0.1em] text-mint uppercase">
              <span className="h-1.5 w-1.5 rounded-full border border-mint/60" aria-hidden="true" />
              {item.title}
            </strong>
            <span className="mt-2 block text-[1rem] text-white/60">{item.copy}</span>
          </div>
        ))}
      </FadeContent>
    </section>
  )
}
