// @ts-nocheck
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { IMG } from "@/assets";
import { conditions, PHOTO, site, stats } from "@/data/content";
import { Button, Eyebrow, Icon, Reveal, SectionHead } from "@/components/ui";
import { CTASection } from "@/components/cards";

export default function About() {
  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/pages/about')
      .then(res => res.json())
      .then(data => {
        setContent(data.content);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center py-44 text-forest-700 font-medium">Loading...</div>;
  if (!content) return <div className="text-center py-44 text-red-500 font-medium">Error loading content</div>;

  return (
    <>
      {/* ---------- hero ---------- */}
      <section className="relative overflow-hidden pb-20 pt-32 md:pt-44">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-40 -top-40 h-[40rem] w-[40rem] text-botanical-400/12"
        >
          <svg viewBox="0 0 600 600" fill="currentColor" className="h-full w-full">
            <path d="M600 60C480 80 380 160 350 290c-12 52-8 102 12 146 46-18 94-20 146-12C638 400 668 240 600 60z" />
          </svg>
        </div>
        <div className="container-x relative">
          <div className="grid items-center gap-14 lg:grid-cols-[1fr_0.9fr]">
            <div>
              <Reveal>
                <Eyebrow>About The Doctor</Eyebrow>
              </Reveal>
              <Reveal delay={90}>
                <h1 className="mt-6 text-balance text-5xl font-bold tracking-tight text-forest-900 md:text-6xl">
                  {site.doctor}
                </h1>
              </Reveal>
              <Reveal delay={170}>
                <p className="mt-4 font-display text-[13px] font-bold uppercase tracking-[0.2em] text-gold-600">
                  {site.qualification} · {site.experience} · {site.role}
                </p>
              </Reveal>
              <Reveal delay={250}>
                <p className="mt-7 max-w-xl text-[15.5px] leading-relaxed text-ink-500 md:text-base">
                  {content.heroText}
                </p>
              </Reveal>
              <Reveal delay={330}>
                <div className="mt-9 flex flex-wrap gap-4">
                  <Button href="/free-assessment">
                    Take Free Assessment
                    <Icon name="arrow-right" className="h-4 w-4" strokeWidth={2} />
                  </Button>
                  <Button href="/conditions" variant="outline">
                    Explore Conditions
                  </Button>
                </div>
              </Reveal>
            </div>
            <Reveal delay={200} scale className="relative mx-auto w-full max-w-md">
              <div
                aria-hidden="true"
                className="absolute -left-5 -top-5 bottom-[-1.25rem] right-[1.5rem] rounded-t-full bg-sage-200/80"
              />
              <div className="relative overflow-hidden rounded-t-full rounded-b-[2rem] border border-forest-900/10 shadow-soft">
                <img
                  src={content.heroImage}
                  alt={`${site.doctor} — ${site.qualification} Urologist`}
                  width={800}
                  height={1000}
                  className="aspect-[4/5] w-full object-cover"
                />
              </div>
              <div className="absolute -right-2 bottom-12 flex items-center gap-3 rounded-2xl border border-forest-900/10 bg-white/95 px-5 py-4 shadow-lift backdrop-blur-sm">
                <Icon name="pin" className="h-6 w-6 text-forest-700" />
                <div>
                  <p className="font-display text-[13px] font-bold text-forest-900">
                    {site.location}
                  </p>
                  <p className="text-[12px] text-ink-500">
                    Sarai Sattar Khan, Laheriasarai
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- professional profile ---------- */}
      <section className="bg-white py-20 md:py-28">
        <div className="container-x">
          <div className="grid items-center gap-14 lg:grid-cols-2">
            <Reveal scale className="relative mb-8 lg:mb-0">
              <div className="img-reveal overflow-hidden rounded-[2rem] border border-forest-900/10 shadow-soft">
                <img
                  src={content.profileImage}
                  alt="The consultation room at ZivRA HEALTH"
                  loading="lazy"
                  width={1000}
                  height={750}
                  className="aspect-[4/3] w-full object-cover"
                />
              </div>
            </Reveal>
            <div>
              <SectionHead
                eyebrow="Professional Profile"
                title="A Practice Built On Listening"
              />
              <Reveal delay={140}>
                <p className="mt-6 text-[15px] leading-relaxed text-ink-500">
                  {content.profileP1}
                </p>
                <p className="mt-4 text-[15px] leading-relaxed text-ink-500">
                  {content.profileP2}
                </p>
              </Reveal>
              <Reveal delay={220}>
                <div className="mt-8 grid grid-cols-3 gap-4">
                  {stats.map((s) => (
                    <div
                      key={s.label}
                      className="rounded-2xl border border-forest-900/10 bg-ivory-50 p-4 text-center"
                    >
                      <p className="font-display text-xl font-extrabold text-forest-800 md:text-2xl">
                        {s.value}
                      </p>
                      <p className="mt-1 text-[11px] font-semibold uppercase tracking-wide text-ink-500">
                        {s.label}
                      </p>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- experience band ---------- */}
      <section className="bg-forest-900 py-16 md:py-20">
        <div className="container-x">
          <div className="grid items-center gap-10 md:grid-cols-[auto_1fr]">
            <Reveal>
              <p className="font-display text-7xl font-extrabold tracking-tight text-ivory-50 md:text-8xl">
                {content.experienceYears}
              </p>
            </Reveal>
            <Reveal delay={120}>
              <h2 className="text-balance text-2xl font-bold tracking-tight text-ivory-50 md:text-3xl">
                Years of Urological Practice
              </h2>
              <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-ivory-100/70">
                {content.experienceText}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- areas of care ---------- */}
      <section className="py-20 md:py-28">
        <div className="container-x">
          <SectionHead
            center
            eyebrow="Areas of Care"
            title="What Dr. Adeel Cares For"
            text="Each area has its own page with honest, plain-language information."
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {conditions.map((c, i) => (
              <Reveal key={c.slug} delay={(i % 3) * 100}>
                <Link
                  href={`/conditions/${c.slug}`}
                  className="group flex h-full items-center gap-4 rounded-2xl border border-forest-900/10 bg-white p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-forest-700/40 hover:shadow-card"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-sage-100 text-forest-700">
                    <Icon name="leaf" className="h-5 w-5" strokeWidth={2} />
                  </span>
                  <div className="flex-1">
                    <h3 className="font-display text-[15px] font-bold text-forest-900">
                      {c.title}
                    </h3>
                    <p className="mt-0.5 line-clamp-1 text-[12.5px] text-ink-500">
                      {c.short}
                    </p>
                  </div>
                  <Icon
                    name="arrow-right"
                    className="h-4 w-4 shrink-0 text-forest-700 transition-transform duration-300 group-hover:translate-x-1"
                    strokeWidth={2}
                  />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- consultation approach ---------- */}
      <section className="bg-white py-20 md:py-28">
        <div className="container-x">
          <div className="grid items-center gap-14 lg:grid-cols-2">
            <div>
              <SectionHead
                eyebrow="Consultation Approach"
                title="How a Consultation Actually Feels"
                text="No rushed timelines. No jargon. Just a proper professional conversation."
              />
              <div className="mt-10 space-y-4">
                {[
                  {
                    n: "01",
                    t: "You're heard first",
                    d: "Your symptoms, your history and your questions come before anything else — taken at your pace.",
                  },
                  {
                    n: "02",
                    t: "Findings, explained",
                    d: "Whatever is found — or not found — is explained in plain language you can act on.",
                  },
                  {
                    n: "03",
                    t: "Next steps, agreed",
                    d: "You leave knowing exactly what happens next, and why. No pressure, no confusion.",
                  },
                ].map((item, i) => (
                  <Reveal
                    key={item.n}
                    delay={i * 120}
                    className="flex items-start gap-5 rounded-2xl border border-forest-900/10 bg-ivory-50 p-6"
                  >
                    <span className="font-display text-2xl font-extrabold text-gold-500">
                      {item.n}
                    </span>
                    <div>
                      <h3 className="font-display text-base font-bold text-forest-900">
                        {item.t}
                      </h3>
                      <p className="mt-1 text-[14px] leading-relaxed text-ink-500">
                        {item.d}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
            <Reveal scale className="relative">
              <div className="img-reveal overflow-hidden rounded-[2rem] border border-forest-900/10 shadow-soft">
                <img
                  src={content.consultationImage}
                  alt="Dr. Adeel consulting with a patient"
                  loading="lazy"
                  width={1000}
                  height={1100}
                  className="aspect-[10/11] w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 left-6 rounded-2xl border border-forest-900/10 bg-white px-5 py-4 shadow-lift">
                <p className="font-display text-[13px] font-bold text-forest-900">
                  {content.consultationQuoteLine1}
                  <br />
                  <span className="font-medium text-ink-500">
                    {content.consultationQuoteLine2}
                  </span>
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- patient-centred care ---------- */}
      <section className="py-20 md:py-28">
        <div className="container-x">
          <div className="grid items-center gap-14 lg:grid-cols-2">
            <Reveal scale className="order-2 mb-8 lg:order-1 lg:mb-0">
              <div className="img-reveal overflow-hidden rounded-[2rem] border border-forest-900/10 shadow-soft">
                <img
                  src={content.patientCareImage}
                  alt="A respectful, unhurried clinical examination"
                  loading="lazy"
                  width={1200}
                  height={900}
                  className="aspect-[4/3] w-full object-cover"
                />
              </div>
            </Reveal>
            <div className="order-1 lg:order-2">
              <SectionHead
                eyebrow="Patient-Centred Care"
                title="Comfort Is Part Of The Treatment"
              />
              <Reveal delay={140}>
                <p className="mt-6 text-[15px] leading-relaxed text-ink-500">
                  {content.patientCareText}
                </p>
              </Reveal>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {[
                  { icon: "shield", t: "Privacy", d: "One-to-one, confidential, always." },
                  { icon: "heart", t: "Respect", d: "No judgement, no rushed glances." },
                  { icon: "chat", t: "Clarity", d: "Answers you can actually use." },
                  { icon: "user", t: "Comfort", d: "A calm space to talk freely." },
                ].map((v, i) => (
                  <Reveal
                    key={v.t}
                    delay={i * 100}
                    className="rounded-2xl border border-forest-900/10 bg-white p-5"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-botanical-100 text-forest-700">
                      <Icon name={v.icon} className="h-5 w-5" strokeWidth={2} />
                    </span>
                    <h3 className="mt-3 font-display text-[15px] font-bold text-forest-900">
                      {v.t}
                    </h3>
                    <p className="mt-1 text-[13px] text-ink-500">{v.d}</p>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="Meet Dr. Adeel In Person."
        text="Book a consultation and experience the difference that patience makes."
      />
    </>
  );
}
