import { useI18n } from '../i18n/locale-provider'
import SplitText from './reactbits/SplitText/SplitText'

type SectionHeadingProps = {
  kicker: string
  title: string | readonly string[]
  tone?: 'light' | 'dark'
  className?: string
  titleClassName?: string
}

export default function SectionHeading({
  kicker,
  title,
  tone = 'light',
  className = '',
  titleClassName = '',
}: SectionHeadingProps) {
  const { locale } = useI18n()
  const lines = Array.isArray(title) ? title : [title]

  return (
    <div className={className}>
      <p className={`kicker ${tone === 'dark' ? 'kicker-light' : ''}`}>{kicker}</p>
      <h2
        className={`section-title max-w-[700px] font-display text-[clamp(2.1rem,4.2vw,3.8rem)] leading-[1.15] font-medium tracking-[-0.04em] ${
          tone === 'dark' ? 'text-white' : 'text-ink'
        } ${titleClassName}`}
      >
        {lines.map((line) => (
          <span key={line} className="block">
            <SplitText
              tag="span"
              text={line}
              splitType={locale === 'zh' ? 'chars' : 'words'}
              effect="blur"
              delay={locale === 'zh' ? 16 : 24}
              duration={1}
              threshold={0.2}
              rootMargin="-60px"
              textAlign="left"
              className="block"
            />
          </span>
        ))}
      </h2>
    </div>
  )
}
