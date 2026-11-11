import AboutSection from './components/AboutSection'
import Approach from './components/Approach'
import Capabilities from './components/Capabilities'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Nav from './components/Nav'
import Solutions from './components/Solutions'
import TrustStrip from './components/TrustStrip'
import UseCases from './components/UseCases'
import ClickSpark from './components/reactbits/ClickSpark/ClickSpark'
import { useI18n } from './i18n/locale-provider'

export default function App() {
  const { t } = useI18n()

  return (
    <ClickSpark
      sparkColor="#7fe3c5"
      sparkSize={9}
      sparkRadius={26}
      sparkCount={7}
      sparkWidth={1.5}
      duration={480}
      easing="ease-out"
      shape="line"
      glow={0.7}
    >
      <a className="skip-link" href="#main">
        {t.common.skipToContent}
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <TrustStrip />
        <AboutSection />
        <Capabilities />
        <Approach />
        <Solutions />
        <UseCases />
        <Contact />
      </main>
      <Footer />
    </ClickSpark>
  )
}
