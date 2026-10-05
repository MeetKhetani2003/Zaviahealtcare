// @ts-nocheck
import clientPromise from "../lib/mongodb";
import { patientStories } from "../data/content";
import { Stories } from "../components/home-stories";
import { VideoTestimonialsSection } from "../components/home-video-testimonials";
import Link from "next/link";
import React from "react";
import { IMG } from "../assets";
import {
  conditions,
  homeFaqs,
  PHOTO,
  processSteps,
  site,
  stats,
  whyPoints,
} from "../data/content";
import {
  Accordion,
  Button,
  Eyebrow,
  Icon,
  Reveal,
  SectionHead,
} from "../components/ui";
import { ConditionCard, CTASection, ProcessStep } from "../components/cards";

/* ================================================================== */
/*  1 — Hero                                                          */
/* ================================================================== */

function Hero({ data }: { data: any }) {
  if (!data) return null;
  return (
    <section className="relative overflow-hidden pb-20 pt-32 md:pb-28 md:pt-44">
      {/* subtle botanical backdrop */}
      <svg
        viewBox="0 0 600 600"
        fill="none"
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 h-[42rem] w-[42rem] text-botanical-400/15"
      >
        <path
          d="M600 60C480 80 380 160 350 290c-12 52-8 102 12 146 46-18 94-20 146-12C638 400 668 240 600 60z"
          fill="currentColor"
        />
        <path
          d="M600 340c-84 6-156 52-186 138-10 30-8 62 4 92 30-12 62-14 92-4 56-44 92-120 90-226z"
          fill="currentColor"
          opacity="0.7"
        />
        <path
          d="M368 442c-56 12-100 52-114 114"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
      <div className="pointer-events-none absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-sage-100/70 blur-3xl" />

      <div className="container-x relative">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
          {/* left */}
          <div>
            <Reveal>
              <Eyebrow>Personalised Urology Care</Eyebrow>
            </Reveal>
            <Reveal delay={90}>
              <h1 className="mt-6 text-balance text-[2.5rem] font-bold leading-[1.06] tracking-tight text-forest-900 sm:text-5xl md:text-[3.5rem]">
                {data.title}
              </h1>
            </Reveal>
            <Reveal delay={180}>
              <p className="mt-6 max-w-xl text-[15.5px] leading-relaxed text-ink-500 md:text-lg">
                {data.text}
              </p>
            </Reveal>
            <Reveal delay={270}>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <Button href="/secure-assessment" size="lg">
                  Free Assessment
                  <Icon name="arrow-right" className="h-4.5 w-4.5" strokeWidth={2} />
                </Button>
                <Button href={site.phoneHref} variant="outline" size="lg">
                  <Icon name="phone" className="h-4.5 w-4.5" strokeWidth={2} />
                  Call {site.phone}
                </Button>
              </div>
            </Reveal>
            <Reveal delay={360}>
              <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3">
                {data.points?.map((point: string) => (
                  <span
                    key={point}
                    className="flex items-center gap-2 font-display text-[13px] font-semibold text-ink-700"
                  >
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-botanical-100 text-forest-700">
                      <Icon name="check" className="h-3.5 w-3.5" strokeWidth={2.4} />
                    </span>
                    {point}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>

          {/* right — portrait composition */}
          <Reveal delay={200} scale className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute -right-5 -top-5 bottom-[-1.25rem] left-[1.5rem] rounded-t-full rounded-b-[2rem] bg-sage-200/80"
              />
              <div className="relative mx-auto aspect-[4/5] max-w-[26rem] overflow-hidden rounded-t-full rounded-b-[2rem] border border-forest-900/10 shadow-soft">
                <img
                  src={data.image}
                  alt={`${site.doctor} — ${site.qualification}`}
                  width={800}
                  height={1000}
                  fetchPriority="high"
                  className="h-full w-full object-cover"
                />
              </div>

              {/* floating credential card */}
              <div className="absolute -left-3 bottom-10 w-60 rounded-2xl border border-forest-900/10 bg-white/95 p-5 shadow-lift backdrop-blur-sm sm:-left-8">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-forest-800 text-ivory-50">
                    <Icon name="leaf" className="h-5 w-5" strokeWidth={2} />
                  </span>
                  <div>
                    <p className="font-display text-[15px] font-bold text-forest-900">
                      {site.doctor}
                    </p>
                    <p className="text-[12px] font-medium text-ink-500">
                      {site.qualification} · Urologist
                    </p>
                  </div>
                </div>
                <div className="mt-3 border-t border-forest-900/10 pt-3">
                  <p className="font-display text-[13px] font-bold text-gold-600">
                    {site.experience}
                  </p>
                </div>
              </div>

              {/* small badge */}
              <div className="absolute -right-2 top-16 hidden rounded-full border border-forest-900/10 bg-white/95 px-4 py-2 shadow-card sm:block">
                <p className="font-display text-[11px] font-bold uppercase tracking-[0.16em] text-forest-700">
                  Darbhanga · Bihar
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  2 — Health concerns                                               */
/* ================================================================== */

function Concerns() {
  return (
    <section className="bg-sage-50 py-20 md:py-28">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHead
            eyebrow="What Brings You Here"
            title="What Brings You Here Today?"
            text="Understanding your concern is the first step toward finding the right care."
          />
          <Reveal delay={150}>
            <Link
              href="/conditions"
              className="group inline-flex items-center gap-2 font-display text-[13px] font-bold uppercase tracking-[0.18em] text-forest-700 transition-colors hover:text-forest-900"
            >
              View All Conditions
              <Icon
                name="arrow-right"
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                strokeWidth={2}
              />
            </Link>
          </Reveal>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {conditions.slice(0, 6).map((c, i) => (
            <ConditionCard key={c.slug} c={c} delay={(i % 3) * 110} tall />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  3 — Doctor introduction                                          */
/* ================================================================== */

function DoctorIntro({ data }: { data: any }) {
  if (!data) return null;
  return (
    <section className="py-20 md:py-28">
      <div className="container-x">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <Reveal scale className="relative mx-auto mb-10 w-full max-w-lg lg:mb-0 lg:max-w-none">
            <div className="img-reveal overflow-hidden rounded-[2rem] border border-forest-900/10 shadow-soft">
              <img
                src={data.imageMain}
                alt="Doctor Main"
                loading="lazy"
                width={800}
                height={1000}
                className="aspect-[4/5] w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-8 -right-2 w-48 overflow-hidden rounded-2xl border-[6px] border-ivory-50 shadow-lift sm:-right-6 sm:w-60">
              <img
                src={data.imageSecondary}
                alt="Secondary"
                loading="lazy"
                width={500}
                height={380}
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
            <div
              aria-hidden="true"
              className="absolute -left-8 -top-8 -z-10 h-40 w-40 rounded-t-full bg-sage-100"
            />
          </Reveal>

          <div>
            <SectionHead
              eyebrow="Meet Your Doctor"
              title={data.title}
            />
            <Reveal delay={120}>
              <p className="mt-6 font-display text-2xl font-bold text-forest-900">
                {site.doctor}
              </p>
              <p className="mt-2 font-display text-[13px] font-semibold uppercase tracking-[0.18em] text-gold-600">
                {site.qualification} · {site.experience} · {site.role}
              </p>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-ink-500">
                {data.p1}
              </p>
              <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-ink-500">
                {data.p2}
              </p>
            </Reveal>
            <Reveal delay={280}>
              <div className="mt-9">
                <Button href="/about-doctor" variant="outline">
                  Know More About Dr. Adeel
                  <Icon name="arrow-right" className="h-4 w-4" strokeWidth={2} />
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  4 — Why ZivRA HEALTH                                             */
/* ================================================================== */

function Why({ data }: { data: any }) {
  if (!data) return null;
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="container-x">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <Reveal scale className="relative mx-auto mb-10 w-full max-w-lg lg:mb-0 lg:max-w-none">
            <div className="img-reveal overflow-hidden rounded-[2rem] border border-forest-900/10 shadow-soft">
              <img
                src={data.image}
                alt="Why ZivRA HEALTH"
                loading="lazy"
                width={1000}
                height={800}
                className="aspect-[5/4] w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-7 left-6 flex items-center gap-3 rounded-2xl border border-forest-900/10 bg-ivory-50/95 px-5 py-4 shadow-lift backdrop-blur-sm">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-botanical-100 text-forest-700">
                <Icon name="leaf" className="h-5 w-5" strokeWidth={2} />
              </span>
              <p className="font-display text-[13px] font-bold leading-snug text-forest-900">
                A calm, comfortable space
                <br />
                <span className="font-medium text-ink-500">to talk freely.</span>
              </p>
            </div>
          </Reveal>

          <div>
            <SectionHead
              eyebrow="Why ZivRA HEALTH"
              title={data.title}
            />
            <div className="mt-10 space-y-2">
              {data.points?.map((point: any, i: number) => (
                <Reveal
                  key={point.title}
                  delay={i * 110}
                  className="flex items-start gap-5 border-b border-forest-900/10 py-6 first:pt-0"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-sage-100 text-forest-700">
                    <Icon name={point.icon as any} className="h-5 w-5" strokeWidth={1.9} />
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-bold text-forest-900">
                      {point.title}
                    </h3>
                    <p className="mt-1.5 text-[14.5px] leading-relaxed text-ink-500">
                      {point.text}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  5 — How it works                                                  */
/* ================================================================== */

function Journey() {
  return (
    <section className="bg-sage-50 py-20 md:py-28">
      <div className="container-x">
        <SectionHead
          center
          eyebrow="How It Works"
          title="Your Journey From Concern To Care"
          text="A calm, four-step path — designed so you always know what happens next."
        />
        <Reveal className="relative mt-14">
          {/* connecting line (desktop) */}
          <div className="absolute left-0 right-0 top-[1.15rem] hidden h-px bg-forest-900/15 md:block">
            <div className="journey-line h-full w-full" />
          </div>
          <div className="relative grid gap-12 md:grid-cols-4 md:gap-6">
            {processSteps.map((step, i) => (
              <ProcessStep
                key={step.no}
                step={step}
                index={i}
                total={processSteps.length}
              />
            ))}
          </div>
        </Reveal>
        <Reveal delay={200} className="mt-14 text-center">
          <Button href="/how-it-works" variant="outline">
            See The Full Journey
            <Icon name="arrow-right" className="h-4 w-4" strokeWidth={2} />
          </Button>
        </Reveal>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  6 — Urology education                                             */
/* ================================================================== */

function Education({ data }: { data: any }) {
  if (!data) return null;
  return (
    <section className="py-20 md:py-28">
      <div className="container-x">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <Reveal scale className="relative">
            <div className="img-reveal overflow-hidden rounded-[2rem] border border-forest-900/10 shadow-soft">
              <img
                src={data.image}
                alt="Education"
                loading="lazy"
                width={1200}
                height={900}
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-2 hidden rounded-2xl border border-forest-900/10 bg-ivory-50 px-5 py-4 shadow-lift sm:block">
              <p className="font-display text-[12px] font-bold uppercase tracking-[0.18em] text-gold-600">
                Remember
              </p>
              <p className="mt-1 font-display text-[14px] font-semibold text-forest-900">
                Early conversation is the best care.
              </p>
            </div>
          </Reveal>

          <div>
            <SectionHead
              eyebrow="Understand Your Health"
              title={data.title}
            />
            <Reveal delay={140}>
              <p className="mt-6 text-[15px] leading-relaxed text-ink-500">
                {data.p1}
              </p>
              <p className="mt-4 text-[15px] leading-relaxed text-ink-500">
                {data.p2}
              </p>
              <ul className="mt-7 space-y-3">
                {data.points?.map((line: string) => (
                  <li
                    key={line}
                    className="flex items-start gap-3 text-[14.5px] font-medium text-ink-700"
                  >
                    <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-botanical-100 text-forest-700">
                      <Icon name="check" className="h-3 w-3" strokeWidth={2.6} />
                    </span>
                    {line}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={240}>
              <div className="mt-9">
                <Button href="/conditions">
                  Explore Urological Conditions
                  <Icon name="arrow-right" className="h-4 w-4" strokeWidth={2} />
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  7 — Conditions grid (editorial)                                   */
/* ================================================================== */

function ConditionsGrid() {
  const featured = [conditions[1], conditions[2], conditions[0], conditions[4]];
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="container-x">
        <SectionHead
          eyebrow="Areas of Care"
          title="Concerns We Care For"
          text="Every concern gets a dedicated page — so you can understand it before you walk in."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {featured.map((c, i) => (
            <Reveal key={c.slug} delay={(i % 2) * 120}>
              <Link
                href={`/conditions/${c.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-3xl border border-forest-900/10 bg-ivory-50 transition-all duration-500 hover:-translate-y-1 hover:shadow-soft"
              >
                <div className="img-reveal relative aspect-[16/9] overflow-hidden">
                  <img
                    src={c.image}
                    alt={c.title}
                    loading="lazy"
                    width={1000}
                    height={563}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-950/50 to-transparent" />
                  <span className="absolute bottom-4 left-4 rounded-full bg-ivory-50/95 px-4 py-1.5 font-display text-[11px] font-bold uppercase tracking-[0.18em] text-forest-800">
                    {c.title}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-4 p-6">
                  <p className="text-[14px] leading-relaxed text-ink-500">
                    {c.short}
                  </p>
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-forest-900/15 text-forest-800 transition-all duration-300 group-hover:border-forest-800 group-hover:bg-forest-800 group-hover:text-ivory-50">
                    <Icon name="arrow-right" className="h-4 w-4" strokeWidth={2} />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  8 — Trust / experience                                            */
/* ================================================================== */

function Trust({ data }: { data: any }) {
  if (!data) return null;
  return (
    <section className="bg-sage-50 py-20 md:py-28">
      <div className="container-x">
        <div className="grid items-center gap-16 lg:grid-cols-[1fr_0.85fr]">
          <div>
            <SectionHead
              eyebrow="Trust & Experience"
              title={data.title}
              text="Only the facts that matter — experience, qualification and a clear area of practice."
            />
            <div className="mt-10">
              {data.stats?.map((s: any, i: number) => (
                <Reveal
                  key={s.label}
                  delay={i * 120}
                  className="flex items-baseline justify-between gap-6 border-b border-forest-900/10 py-6 first:pt-0"
                >
                  <span className="font-display text-4xl font-extrabold tracking-tight text-forest-800 md:text-5xl">
                    {s.value}
                  </span>
                  <span className="max-w-[13rem] text-right font-display text-[13px] font-semibold uppercase tracking-[0.14em] text-ink-500">
                    {s.label}
                  </span>
                </Reveal>
              ))}
            </div>
            <Reveal delay={360}>
              <p className="mt-8 max-w-lg text-[14.5px] leading-relaxed text-ink-500">
                {data.text}
              </p>
            </Reveal>
          </div>
          <Reveal scale className="relative mx-auto w-full max-w-sm lg:max-w-none">
            <div
              aria-hidden="true"
              className="absolute -left-6 -top-6 h-full w-full rounded-t-full bg-botanical-200/60"
            />
            <div className="relative overflow-hidden rounded-t-full rounded-b-[2rem] border border-forest-900/10 shadow-soft">
              <img
                src={data.image}
                alt="Trust & Experience"
                loading="lazy"
                width={700}
                height={875}
                className="aspect-[4/5] w-full object-cover"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  9 — Patient stories (polished empty / editable state)             */
/* ================================================================== */

/* ================================================================== */
/*  10 — FAQ                                                           */
/* ================================================================== */

function FaqSection() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="container-x">
        <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal scale>
            <div className="img-reveal hidden overflow-hidden rounded-[2rem] border border-forest-900/10 shadow-soft lg:block">
              <img
                src={IMG.doctorConsultation}
                alt="A private, one-to-one consultation"
                loading="lazy"
                width={800}
                height={1000}
                className="aspect-[4/5] w-full object-cover"
              />
            </div>
            <div className="flex items-center gap-4 rounded-2xl border border-forest-900/10 bg-ivory-50 p-5 lg:hidden">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-forest-800 text-ivory-50">
                <Icon name="phone" className="h-5 w-5" strokeWidth={2} />
              </span>
              <div>
                <p className="text-[13px] text-ink-500">Still have a question?</p>
                <a
                  href={site.phoneHref}
                  className="font-display text-lg font-bold text-forest-900"
                >
                  {site.phone}
                </a>
              </div>
            </div>
          </Reveal>

          <div>
            <SectionHead
              eyebrow="FAQ"
              title="Questions You May Have"
              text="If your question isn't here, we're a phone call away."
            />
            <Reveal delay={140} className="mt-8">
              <Accordion items={homeFaqs} />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  1.5 — Research Backed                                             */
/* ================================================================== */
/* ================================================================== */
/*  1.5 — Research Backed                                             */
/* ================================================================== */

function ResearchBacked({ items }: { items: any[] }) {
  return (
    <section className="bg-[#416850] py-16 md:py-24 text-white overflow-hidden">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr] items-center">
          {/* Left Side */}
          <div>
            <p className="font-display text-[13px] font-bold uppercase tracking-[0.18em] text-[#8BB284] mb-4">
              RESEARCH BACKED
            </p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-8">
              93% saw results*
            </h2>
            
            <div className="flex flex-wrap gap-3 mb-8">
              <span className="flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm">
                <Icon name="users" className="h-4 w-4 text-[#8BB284]" strokeWidth={2} />
                300 Participants
              </span>
              <span className="flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm">
                <Icon name="file-text" className="h-4 w-4 text-[#8BB284]" strokeWidth={2} />
                Users across Stage 1-5
              </span>
              <span className="flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm">
                <Icon name="calendar" className="h-4 w-4 text-[#8BB284]" strokeWidth={2} />
                Tracked for 5+ months
              </span>
            </div>
            
            <Link href="/patient-stories" className="inline-flex items-center gap-2 font-display text-[13px] font-bold text-white hover:text-[#8BB284] transition-colors border-b border-white hover:border-[#8BB284] pb-0.5">
              View Results
              <Icon name="arrow-right" className="h-4 w-4" strokeWidth={2} />
            </Link>
          </div>

          {/* Right Side — Dynamic Before/After Cards */}
          <div className="flex flex-col sm:flex-row gap-6 lg:gap-8 justify-center lg:justify-end mt-8 lg:mt-0 overflow-x-auto hide-scrollbar pt-8" style={{ scrollbarWidth: 'none' }}>
            {items && items.length > 0 ? items.slice(0, 3).map((item, idx) => (
              <div key={item._id?.toString() || idx} className={`relative bg-[#F9F7EF] rounded-3xl p-4 sm:p-5 text-forest-900 w-full sm:w-auto shadow-lg max-w-[280px] mx-auto shrink-0 ${idx > 0 ? 'mt-8 sm:mt-0' : ''}`}>
                {/* Avatar */}
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full overflow-hidden border-[3px] border-[#416850] bg-forest-800 z-10 shadow-md">
                  {item.avatarUrl ? (
                    <img src={item.avatarUrl} alt={item.patientName} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-white font-bold text-base">
                        {item.patientName?.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase() || '?'}
                      </span>
                    </div>
                  )}
                </div>
                {/* Before / After Images */}
                <div className="flex gap-3 sm:gap-4 mt-8">
                  <div className="flex-1 text-center">
                    <p className="text-[11px] font-bold uppercase tracking-wider mb-2 text-forest-800">BEFORE</p>
                    <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-gray-200">
                      <img src={item.beforeImageUrl} alt="Before treatment" className="w-full h-full object-cover" />
                    </div>
                  </div>
                  <div className="flex-1 text-center">
                    <p className="text-[11px] font-bold uppercase tracking-wider mb-2 text-forest-800">AFTER</p>
                    <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-gray-200">
                      <img src={item.afterImageUrl} alt="After treatment" className="w-full h-full object-cover" />
                    </div>
                  </div>
                </div>
                {item.caption && (
                  <p className="text-center text-[11px] text-ink-500 mt-3 font-medium">{item.caption}</p>
                )}
              </div>
            )) : (
              /* Fallback placeholder when no items uploaded yet */
              <div className="bg-[#F9F7EF]/20 rounded-3xl p-8 text-center border border-white/10 max-w-sm">
                <p className="text-white/70 text-sm">Before & After results will appear here once uploaded from the admin dashboard.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  1.5 — Research Backed                                             */
/* ================================================================== */

function ResearchBacked({ items }: { items: any[] }) {
  if (!items || items.length === 0) return null;
  return (
    <section className="bg-[#416850] py-16 md:py-24 text-white overflow-hidden">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr] items-center">
          {/* Left Side */}
          <div>
            <p className="font-display text-[13px] font-bold uppercase tracking-[0.18em] text-[#8BB284] mb-4">
              RESEARCH BACKED
            </p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-8">
              93% saw results*
            </h2>
            
            <div className="flex flex-wrap gap-3 mb-8">
              <span className="flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm">
                <Icon name="users" className="h-4 w-4 text-[#8BB284]" strokeWidth={2} />
                1000+ Treated
              </span>
              <span className="flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm">
                <Icon name="check" className="h-4 w-4 text-[#8BB284]" strokeWidth={2} />
                Clinically Proven
              </span>
            </div>

            <p className="text-white/80 text-lg leading-relaxed mb-8">
              Experience the difference with our evidence-based urological treatments. We combine advanced medical knowledge with personalized care.
            </p>

            <Link 
              href="/patient-stories" 
              className="inline-flex items-center gap-2 bg-white text-[#416850] px-6 py-3 rounded-full font-bold hover:bg-white/90 transition-colors"
            >
              View Results
              <Icon name="arrow-right" className="h-4 w-4" strokeWidth={2} />
            </Link>
          </div>

          {/* Right Side - Before/After Cards */}
          <div className="relative">
            <div className="grid gap-4 sm:grid-cols-2">
              {items.slice(0, 2).map((item, i) => (
                <div key={i} className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm border border-white/20">
                  <div className="aspect-[4/3] rounded-xl bg-black/20 mb-4 overflow-hidden relative">
                    {item.afterImage && (
                      <img src={item.afterImage} alt="After" className="w-full h-full object-cover" />
                    )}
                  </div>
                  <p className="font-bold text-lg mb-1">{item.title || "Treatment Result"}</p>
                  <p className="text-sm text-white/70">{item.description || "Patient achieved significant improvement."}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  10 — FAQ                                                           */
/* ================================================================== */

function FaqSection() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="container-x">
        <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal scale>
            <div className="img-reveal hidden overflow-hidden rounded-[2rem] border border-forest-900/10 shadow-soft lg:block">
              <img
                src={IMG.doctorConsultation}
                alt="A private, one-to-one consultation"
                loading="lazy"
                width={800}
                height={1000}
                className="aspect-[4/5] w-full object-cover"
              />
            </div>
            <div className="flex items-center gap-4 rounded-2xl border border-forest-900/10 bg-ivory-50 p-5 lg:hidden">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-forest-800 text-ivory-50">
                <Icon name="phone" className="h-5 w-5" strokeWidth={2} />
              </span>
              <div>
                <p className="text-[13px] text-ink-500">Still have a question?</p>
                <a
                  href={site.phoneHref}
                  className="font-display text-lg font-bold text-forest-900"
                >
                  {site.phone}
                </a>
              </div>
            </div>
          </Reveal>

          <div>
            <SectionHead
              eyebrow="FAQ"
              title="Questions You May Have"
              text="If your question isn't here, we're a phone call away."
            />
            <Reveal delay={140} className="mt-8">
              <Accordion items={homeFaqs} />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  Page                                                              */
/* ================================================================== */

export default async function Home() {
  const client = await clientPromise;
  const db = client.db();

  // Fetch all required data concurrently
  const [homeDoc, storiesDoc, beforeAfterItems, testimonials] = await Promise.all([
    db.collection("pages").findOne({ _id: "home_content" }),
    db.collection("pages").findOne({ _id: "patient_stories_content" }),
    db.collection("before_after").find({}).sort({ createdAt: -1 }).toArray(),
    db.collection("video_testimonials").find({}).sort({ createdAt: -1 }).toArray()
  ]);

  const data = homeDoc || {
    hero: {
      title: "Better Urological Health Starts With The Right Care.",
      text: "Consult with Dr. Adeel for personalised and patient-centred urological care.",
      points: ["15+ Years Experience", "Doctor-Led Care", "Patient-Centred Approach"],
    },
    doctorIntro: {
      title: "Experience That Puts Patients First",
      p1: "Dr. Adeel is a urologist...",
      p2: "From urinary concerns to kidney and prostate health...",
    },
    why: {
      title: "Healthcare Built Around You",
      points: [
        { icon: "clock", title: "No Rushed Appointments", text: "..." },
        { icon: "shield", title: "Transparent Care Plans", text: "..." },
        { icon: "heart", title: "Comfortable Environment", text: "..." },
      ],
    },
    education: {
      title: "Small Symptoms Shouldn't Always Be Ignored",
      p1: "Many urological concerns begin quietly...",
      p2: "If something has been on your mind...",
      points: ["Persistent symptoms deserve an evaluation", "Many concerns are far easier to manage when caught early"],
    },
    trust: {
      title: "Care You Can Count On",
      text: "Practicing in Darbhanga...",
      stats: [{ value: "15+", label: "Years of Practice" }],
    }
  };

  const initialStories = storiesDoc?.stories || patientStories || [];

  // Before passing MongoDB documents to Client Components, serialize them
  const serializedBeforeAfter = JSON.parse(JSON.stringify(beforeAfterItems || []));
  const serializedTestimonials = JSON.parse(JSON.stringify(testimonials || []));

  return (
    <>
      <Hero data={data.hero} />
      <ResearchBacked items={serializedBeforeAfter} />
      <Concerns />
      <DoctorIntro data={data.doctorIntro} />
      <Why data={data.why} />
      <Journey />
      <Education data={data.education} />
      <ConditionsGrid />
      <Trust data={data.trust} />
      <VideoTestimonialsSection initialVideos={serializedTestimonials} />
      <Stories initialStories={initialStories} />
      <FaqSection />
      <CTASection className="pt-4" />
    </>
  );
}
