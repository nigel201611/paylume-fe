import type { CSSProperties } from 'react'
import { useI18n } from '../i18n/locale-provider'
import FadeContent from './reactbits/FadeContent/FadeContent'
import GradientText from './reactbits/GradientText/GradientText'
import Magnet from './reactbits/Magnet/Magnet'
import Noise from './reactbits/Noise/Noise'
import ShapeGrid from './reactbits/ShapeGrid/ShapeGrid'
import SpotlightCard from './reactbits/SpotlightCard/SpotlightCard'
import SplitText from './reactbits/SplitText/SplitText'
import StarBorder from './reactbits/StarBorder/StarBorder'

const panelStyle = {
  borderRadius: 20,
  '--spotlight-card-surface': 'rgba(16, 17, 19, 0.97)',
  '--spotlight-card-border': 'transparent',
  '--spotlight-card-shadow': '0 2px 4px rgba(0, 0, 0, 0.35), 0 48px 100px -32px rgba(0, 0, 0, 0.85)',
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
          lineColor="rgba(255, 255, 255, 0.07)"
          hoverColor="rgba(255, 255, 255, 0.55)"
          hoverFillColor="rgba(255, 255, 255, 0.06)"
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
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_55%_at_18%_100%,rgba(255,255,255,0.06),transparent_70%),radial-gradient(ellipse_52%_46%_at_84%_6%,rgba(255,255,255,0.04),transparent_65%),radial-gradient(ellipse_130%_120%_at_50%_42%,transparent_38%,rgba(0,0,0,0.55))]"
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

          <h1 className="hero-title font-display text-[clamp(2.75rem,6.5vw,5.8rem)] leading-[1.03] font-medium tracking-[-0.055em] text-white">
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
              <StarBorder
                as="a"
                href={hero.primaryCta.href}
                color="#69FFCE"
                trailColor="#0A4A34"
                backgroundColor="transparent"
                textColor="#FFFFFF"
                borderColor="rgba(105, 255, 206, 0.55)"
                radius={999}
                thickness={1.8}
                duration={5}
                glow={0.55}
                sparkle
                className="font-body font-semibold"
                style={{
                  padding: '0.95rem 1.7rem',
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  backgroundImage: 'linear-gradient(90deg, #36CDCA 0%, #00DD95 100%)',
                }}
              >
                <span aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden rounded-full">
                  <span className="absolute inset-y-[-40%] left-0 w-1/3 animate-[cta-shine_4.2s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                </span>
                <span className="relative z-10 inline-flex items-center gap-2">
                  {hero.primaryCta.label}
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                    aria-hidden="true"
                  >
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </span>
              </StarBorder>
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
            className="pointer-events-none absolute inset-x-8 top-12 h-3/4 rounded-full bg-white/[0.07] blur-3xl"
            aria-hidden="true"
          />
          <div className="relative lg:rotate-[1.5deg] lg:transition-transform lg:duration-500 lg:hover:rotate-0">
            <div className="hero-panel-float relative">
              <div
                className="absolute inset-x-5 -bottom-2 h-full rounded-[22px] border border-white/6 bg-[#141416]/70"
                aria-hidden="true"
              />
              <div
                className="absolute inset-x-10 -bottom-4 h-full rounded-[22px] border border-white/5 bg-[#101012]/45"
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
                className="border border-white/12 p-0!"
                style={panelStyle}
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-6 top-0 z-[1] h-px bg-gradient-to-r from-transparent via-mint/40 to-transparent"
                />
                <div
                  className="flex items-center justify-between border-b border-white/10 px-5 py-4 font-mono text-[0.7rem] tracking-[0.06em] text-white/55 uppercase"
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

                  <div className="mt-5 rounded-2xl border border-white/15 bg-[linear-gradient(135deg,rgba(255,255,255,0.07),rgba(255,255,255,0.02))] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_22px_44px_-34px_rgba(0,0,0,0.9)] sm:p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-mono text-[0.68rem] tracking-[0.06em] text-white/55 uppercase">
                          {hero.panel.amountLabel}
                        </p>
                        <p className="mt-1.5 font-display text-[1.55rem] leading-none font-medium tracking-[-0.03em] text-white sm:text-[1.9rem]">
                          {hero.panel.amountValue}
                        </p>
                        <p className="mt-2 text-[0.78rem] text-white/60">{hero.panel.amountNote}</p>
                      </div>
                      <span
                        className="hidden h-9 w-9 shrink-0 place-items-center rounded-full border border-mint/20 bg-mint/[0.08] text-[0.9rem] text-mint sm:grid"
                        aria-hidden="true"
                      >
                        ↗
                      </span>
                    </div>

                    <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/[0.12]">
                      <span className="block h-full w-2/3 rounded-full bg-gradient-to-r from-mint-deep to-mint" />
                    </div>
                    <div className="mt-2 flex items-center justify-between font-mono text-[0.74rem] tracking-[0.06em] text-white/55 uppercase">
                      <span>{hero.panel.progressLabel}</span>
                      <span>{hero.panel.progressValue}</span>
                    </div>
                  </div>

                  <div className="mt-3 grid grid-cols-2 gap-3">
                    <div className="rounded-xl border border-white/16 bg-white/[0.055] p-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.07)]">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="font-mono text-[0.68rem] tracking-[0.06em] text-white/50 uppercase">
                            {hero.panel.referenceLabel}
                          </p>
                          <p className="mt-1.5 font-mono text-[0.9rem] text-white/90">{hero.panel.referenceValue}</p>
                        </div>
                        <span
                          className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-mint/15 bg-mint/[0.06] text-mint"
                          aria-hidden="true"
                        >
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-4 w-4"
                          >
                            <path d="M4 9h16M4 15h16M10 3 8 21M16 3l-2 18" />
                          </svg>
                        </span>
                      </div>
                    </div>
                    <div className="rounded-xl border border-white/16 bg-white/[0.055] p-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.07)]">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="font-mono text-[0.68rem] tracking-[0.06em] text-white/50 uppercase">
                            {hero.panel.routeLabel}
                          </p>
                          <p className="mt-1.5 font-mono text-[0.9rem] text-white/90">
                            {hero.panel.route.originCode}
                            <span className="mx-1 text-mint/70">→</span>
                            {hero.panel.route.destinationCode}
                          </p>
                        </div>
                        <span
                          className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-mint/15 bg-mint/[0.06] text-mint"
                          aria-hidden="true"
                        >
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-4 w-4"
                          >
                            <circle cx="12" cy="12" r="9" />
                            <path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" />
                          </svg>
                        </span>
                      </div>
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

                  <p className="mt-5 font-mono text-[0.7rem] tracking-[0.04em] text-white/55">{hero.panel.note}</p>
                </div>
              </SpotlightCard>

              <div className="absolute -bottom-4 left-6 hidden items-center gap-2 rounded-full border border-mint/15 bg-[#141416]/95 px-3.5 py-2 shadow-[0_16px_32px_-20px_rgba(0,0,0,0.8)] sm:flex">
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
