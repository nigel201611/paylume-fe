import type { CSSProperties } from 'react'
import { useI18n } from '../i18n/locale-provider'
import FadeContent from './reactbits/FadeContent/FadeContent'
import GradientText from './reactbits/GradientText/GradientText'
import Magnet from './reactbits/Magnet/Magnet'
import Noise from './reactbits/Noise/Noise'
import ShapeGrid from './reactbits/ShapeGrid/ShapeGrid'
import SpotlightCard from './reactbits/SpotlightCard/SpotlightCard'
import SplitText from './reactbits/SplitText/SplitText'

const panelStyle = {
  borderRadius: 20,
  '--spotlight-card-surface': 'rgba(9, 26, 21, 0.94)',
  '--spotlight-card-border': 'rgba(255, 255, 255, 0.10)',
  '--spotlight-card-shadow': '0 40px 90px -30px rgba(0, 0, 0, 0.7)',
} as CSSProperties

export default function Hero() {
  const { t } = useI18n()
  const { hero } = t

  return (
    <section
      id="home"
      className="on-dark relative isolate flex min-h-[100svh] items-center overflow-hidden bg-navy px-6 pt-[130px] pb-24 text-white md:px-10"
    >
      <div className="pointer-events-none absolute inset-0 -z-20">
        <ShapeGrid
          shape="square"
          cellSize={64}
          lineWidth={1}
          direction="diagonal"
          speed={0.12}
          lineColor="rgba(127, 227, 197, 0.10)"
          hoverColor="#7fe3c5"
          hoverFillColor="rgba(127, 227, 197, 0.10)"
          fillOpacity={0.18}
          glow={0.5}
          trail={0.55}
          twinkle={0.08}
          fade={0.9}
          clickCascade={false}
          opacity={0.9}
          intro
        />
      </div>
      <div className="hero-orbit" aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_55%_at_18%_100%,rgba(31,157,128,0.14),transparent_70%)]"
        aria-hidden="true"
      />
      <Noise
        opacity={0.05}
        size={1}
        fps={12}
        blendMode="soft-light"
        contrast={0.5}
        dust={0}
        scratches={0}
        scanlines={0}
        flicker={0}
        className="-z-10"
      />

      <div className="relative z-10 mx-auto grid w-full max-w-[1440px] items-center gap-16 lg:grid-cols-[1.08fr_0.92fr] lg:gap-[6vw]">
        <div>
          <p className="mb-8 flex items-center gap-3 font-mono text-[0.75rem] tracking-[0.14em] uppercase">
            <span className="h-px w-8 bg-mint" aria-hidden="true" />
            <GradientText
              colors={['#7fe3c5', '#ffffff', '#1f9d80']}
              animationSpeed={6}
              variant="flow"
              direction="horizontal"
              yoyo
              className="font-mono! text-[0.75rem]! tracking-[0.14em] uppercase"
            >
              {hero.eyebrow}
            </GradientText>
          </p>

          <h1 className="hero-title font-display text-[clamp(3rem,7vw,6.5rem)] leading-[1.03] font-medium tracking-[-0.055em] text-white">
            {hero.titleLines.map((line) => (
              <span key={line.text} className={`block ${line.accent ? 'hero-accent-line' : ''}`}>
                <SplitText
                  tag="span"
                  text={line.text}
                  splitType="words, chars"
                  effect="blur"
                  delay={26}
                  duration={1.15}
                  threshold={0.1}
                  rootMargin="-40px"
                  staggerFrom="start"
                  textAlign="left"
                  className="block"
                />
              </span>
            ))}
          </h1>

          <FadeContent className="mt-7 max-w-[620px]" duration={1100} delay={0.25} trigger="mount" effect="fade">
            <p className="text-[1.08rem] leading-[1.8] font-normal text-white/65">
              {hero.copy.lead}
              <strong className="font-medium text-white">{hero.copy.emphasis}</strong>
            </p>
          </FadeContent>

          <div className="mt-10 flex flex-wrap gap-4">
            <Magnet padding={45} magnetStrength={3} wrapperClassName="inline-flex">
              <a href={hero.primaryCta.href} className="btn btn-primary">
                {hero.primaryCta.label}
                <span aria-hidden="true">→</span>
              </a>
            </Magnet>
            <Magnet padding={45} magnetStrength={3} wrapperClassName="inline-flex">
              <a href={hero.secondaryCta.href} className="btn btn-secondary">
                {hero.secondaryCta.label}
              </a>
            </Magnet>
          </div>
        </div>

        <div className="relative w-full max-w-[640px] lg:justify-self-end">
          <div
            className="pointer-events-none absolute inset-x-8 top-12 h-3/4 rounded-full bg-mint/12 blur-3xl"
            aria-hidden="true"
          />
          <div className="relative lg:rotate-[1.5deg] lg:transition-transform lg:duration-500 lg:hover:rotate-0">
            <div className="hero-panel-float relative">
              <div
                className="absolute inset-x-5 -bottom-2 h-full rounded-[22px] border border-white/6 bg-[#0a1b16]/70"
                aria-hidden="true"
              />
              <div
                className="absolute inset-x-10 -bottom-4 h-full rounded-[22px] border border-white/5 bg-[#0a1b16]/45"
                aria-hidden="true"
              />

              <SpotlightCard
                theme="dark"
                spotlightColor="#7fe3c5"
                intensity={0.14}
                spotlightSize={420}
                softness={0.95}
                borderGlow={0.5}
                proximity={120}
                grain={0.14}
                flare={false}
                ambient
                className="p-0!"
                style={panelStyle}
              >
                <div
                  className="flex items-center justify-between border-b border-white/8 px-5 py-4 font-mono text-[0.7rem] tracking-[0.06em] text-white/55 uppercase"
                  aria-hidden="true"
                >
                  <span>{hero.panel.label}</span>
                  <span className="flex gap-1.5">
                    <i className="h-1.5 w-1.5 rounded-full bg-white/25" />
                    <i className="h-1.5 w-1.5 rounded-full bg-white/25" />
                    <i className="h-1.5 w-1.5 rounded-full bg-white/25" />
                  </span>
                </div>

                <div className="p-5 sm:p-7">
                  <div className="flex items-center justify-between gap-3">
                    <p className="min-w-0 pr-2 text-[0.78rem] text-white/50">{hero.panel.caption}</p>
                    <span className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border border-mint/15 bg-mint/[0.06] px-2.5 py-1 font-mono text-[0.68rem] tracking-[0.06em] text-mint uppercase">
                      <i className="live-dot h-1.5 w-1.5 rounded-full bg-mint" aria-hidden="true" />
                      {hero.panel.status}
                    </span>
                  </div>
                  <p className="mt-2 font-display text-[1.4rem] leading-[1.25] font-medium">
                    {hero.panel.title}
                  </p>

                  <div className="mt-5 rounded-2xl border border-white/8 bg-[linear-gradient(135deg,rgba(127,227,197,0.06),rgba(255,255,255,0.02))] p-4 sm:p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-mono text-[0.68rem] tracking-[0.06em] text-white/45 uppercase">
                          {hero.panel.amountLabel}
                        </p>
                        <p className="mt-1.5 font-display text-[1.55rem] leading-none font-medium tracking-[-0.03em] text-white sm:text-[1.9rem]">
                          {hero.panel.amountValue}
                        </p>
                        <p className="mt-2 text-[0.78rem] text-white/50">{hero.panel.amountNote}</p>
                      </div>
                      <span
                        className="hidden h-9 w-9 shrink-0 place-items-center rounded-full border border-mint/20 bg-mint/[0.08] text-[0.9rem] text-mint sm:grid"
                        aria-hidden="true"
                      >
                        ↗
                      </span>
                    </div>

                    <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                      <span className="block h-full w-2/3 rounded-full bg-gradient-to-r from-mint-deep to-mint" />
                    </div>
                    <div className="mt-2 flex items-center justify-between font-mono text-[0.74rem] tracking-[0.06em] text-white/45 uppercase">
                      <span>{hero.panel.progressLabel}</span>
                      <span>{hero.panel.progressValue}</span>
                    </div>
                  </div>

                  <div className="mt-3 grid grid-cols-2 gap-3">
                    <div className="rounded-xl border border-white/6 bg-white/[0.025] p-3.5">
                      <p className="font-mono text-[0.68rem] tracking-[0.06em] text-white/40 uppercase">
                        {hero.panel.referenceLabel}
                      </p>
                      <p className="mt-1.5 font-mono text-[0.8rem] text-white/80">{hero.panel.referenceValue}</p>
                    </div>
                    <div className="rounded-xl border border-white/6 bg-white/[0.025] p-3.5">
                      <p className="font-mono text-[0.68rem] tracking-[0.06em] text-white/40 uppercase">
                        {hero.panel.routeLabel}
                      </p>
                      <p className="mt-1.5 font-mono text-[0.8rem] text-white/80">
                        {hero.panel.route.originCode}
                        <span className="mx-1 text-mint/70">→</span>
                        {hero.panel.route.destinationCode}
                      </p>
                    </div>
                  </div>

                  <div className="relative mt-5 grid gap-3">
                    <span
                      className="absolute top-4 bottom-4 left-[12.5px] w-px bg-gradient-to-b from-mint/35 via-white/8 to-transparent"
                      aria-hidden="true"
                    />
                    {hero.panel.steps.map((step) => (
                      <div key={step.name} className="relative grid grid-cols-[26px_1fr_auto] items-center gap-3">
                        <span
                          className={`relative z-10 grid h-[26px] w-[26px] place-items-center rounded-full text-[0.7rem] font-semibold ${
                            step.done
                              ? 'bg-mint text-navy'
                              : 'border border-mint/40 bg-[#0a1b16] text-mint'
                          }`}
                        >
                          {step.icon}
                        </span>
                        <span className={`text-[0.8rem] ${step.done ? 'text-white/80' : 'text-white/95'}`}>
                          {step.name}
                        </span>
                        <span
                          className={`flex items-center gap-1.5 font-mono text-[0.7rem] uppercase ${
                            step.done ? 'text-white/45' : 'text-mint'
                          }`}
                        >
                          {!step.done && <i className="live-dot h-1.5 w-1.5 rounded-full bg-mint" aria-hidden="true" />}
                          {step.status}
                        </span>
                      </div>
                    ))}
                  </div>

                  <p className="mt-5 font-mono text-[0.7rem] tracking-[0.04em] text-white/42">{hero.panel.note}</p>
                </div>
              </SpotlightCard>

              <div className="absolute -bottom-4 left-6 hidden items-center gap-2 rounded-full border border-mint/15 bg-[#0b1c18]/95 px-3.5 py-2 shadow-[0_16px_32px_-20px_rgba(0,0,0,0.8)] sm:flex">
                <span
                  className="grid h-5 w-5 place-items-center rounded-full bg-mint text-[0.6rem] font-semibold text-navy"
                  aria-hidden="true"
                >
                  ✓
                </span>
                <span className="font-mono text-[0.68rem] tracking-[0.06em] text-white/75 uppercase">
                  {hero.panel.badge}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
