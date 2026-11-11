import { useI18n } from '../i18n/locale-provider'
import Logo from './Logo'

export default function Footer() {
  const { t } = useI18n()

  return (
    <footer className="on-dark border-t border-white/6 bg-[#0a0a0b] px-6 py-10 text-center text-[0.78rem] text-white/55">
      <div className="mb-6 flex justify-center">
        <Logo />
      </div>
      <p>{t.footer.copyright}</p>
      <p className="mx-auto mt-3 max-w-[900px] leading-relaxed">{t.footer.disclaimer}</p>
    </footer>
  )
}
