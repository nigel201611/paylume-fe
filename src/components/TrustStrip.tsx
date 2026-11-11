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
        {trust.items.map((item, index) => (
          <div
            key={item.title}
            className={`px-6 py-7 text-center ${
              index < trust.items.length - 1 ? 'border-b border-white/6 md:border-r md:border-b-0' : ''
            }`}
          >
            <strong className="block font-mono text-[0.7rem] font-medium tracking-[0.1em] text-mint uppercase">
              {item.title}
            </strong>
            <span className="mt-1.5 block text-[0.85rem] text-white/55">{item.copy}</span>
          </div>
        ))}
      </FadeContent>
    </section>
  )
}
