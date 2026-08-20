import { Link } from "react-router-dom";
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
  usePageMeta,
} from "../components/ui";
import { ConditionCard, CTASection, ProcessStep } from "../components/cards";

/* ================================================================== */
/*  1 — Hero                                                          */
/* ================================================================== */

function Hero() {
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
                Better Urological Health Starts With The Right Care.
              </h1>
            </Reveal>
            <Reveal delay={180}>
              <p className="mt-6 max-w-xl text-[15.5px] leading-relaxed text-ink-500 md:text-lg">
                Consult with {site.doctor}, {site.qualification}, with{" "}
                {site.experience}, for personalised and patient-centred
                urological care in {site.location}.
              </p>
            </Reveal>
            <Reveal delay={270}>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <Button to="/book-consultation" size="lg">
                  Book Consultation
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
                {[
                  "15+ Years Experience",
                  "Doctor-Led Care",
                  "Patient-Centred Approach",
                ].map((point) => (
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
                  src={IMG.drAdeel}
                  alt={`${site.doctor} — ${site.qualification} Urologist with 15+ years of experience`}
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
              to="/conditions"
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

function DoctorIntro() {
  return (
    <section className="py-20 md:py-28">
      <div className="container-x">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <Reveal scale className="relative mx-auto mb-10 w-full max-w-lg lg:mb-0 lg:max-w-none">
            <div className="img-reveal overflow-hidden rounded-[2rem] border border-forest-900/10 shadow-soft">
              <img
                src={IMG.drAdeel}
                alt={`${site.doctor} at ZivRA HEALTH`}
                loading="lazy"
                width={800}
                height={1000}
                className="aspect-[4/5] w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-8 -right-2 w-48 overflow-hidden rounded-2xl border-[6px] border-ivory-50 shadow-lift sm:-right-6 sm:w-60">
              <img
                src={IMG.doctorConsultation}
                alt="A calm, respectful consultation at ZivRA HEALTH"
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
              title="Experience That Puts Patients First"
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
                Dr. Adeel is a urologist with a {site.qualification}
                qualification and more than 15 years of professional
                experience in urological practice. His approach is simple —
                listen carefully, explain clearly, and guide each patient with
                respect.
              </p>
              <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-ink-500">
                From urinary concerns to kidney and prostate health, every
                consultation at ZivRA HEALTH is built around your comfort,
                your questions, and a clear path forward.
              </p>
            </Reveal>
            <Reveal delay={280}>
              <div className="mt-9">
                <Button to="/about-doctor" variant="outline">
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

function Why() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="container-x">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <Reveal scale className="relative mx-auto mb-10 w-full max-w-lg lg:mb-0 lg:max-w-none">
            <div className="img-reveal overflow-hidden rounded-[2rem] border border-forest-900/10 shadow-soft">
              <img
                src={IMG.doctorClinic}
                alt="The calm, plant-filled consultation space at ZivRA HEALTH"
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
              title="Healthcare Built Around You"
            />
            <div className="mt-10 space-y-2">
              {whyPoints.map((point, i) => (
                <Reveal
                  key={point.title}
                  delay={i * 110}
                  className="flex items-start gap-5 border-b border-forest-900/10 py-6 first:pt-0"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-sage-100 text-forest-700">
                    <Icon name={point.icon} className="h-5 w-5" strokeWidth={1.9} />
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
          <Button to="/how-it-works" variant="outline">
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

function Education() {
  return (
    <section className="py-20 md:py-28">
      <div className="container-x">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <Reveal scale className="relative">
            <div className="img-reveal overflow-hidden rounded-[2rem] border border-forest-900/10 shadow-soft">
              <img
                src={PHOTO.education}
                alt="Calm, mindful wellbeing at home"
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
              title="Small Symptoms Shouldn't Always Be Ignored"
            />
            <Reveal delay={140}>
              <p className="mt-6 text-[15px] leading-relaxed text-ink-500">
                Many urological concerns begin quietly — a change in urinary
                habits, an occasional ache, a symptom that seems to come and go.
                None of these, on their own, tells you what is happening. A
                professional evaluation does.
              </p>
              <p className="mt-4 text-[15px] leading-relaxed text-ink-500">
                If something has been on your mind, bringing it to a urologist
                early gives you the advantage: clearer answers sooner, simpler
                paths forward, and less time spent worrying.
              </p>
              <ul className="mt-7 space-y-3">
                {[
                  "Persistent symptoms deserve an evaluation, not more waiting",
                  "Many concerns are far easier to manage when caught early",
                  "A consultation is simply a professional conversation",
                ].map((line) => (
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
                <Button to="/conditions">
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
                to={`/conditions/${c.slug}`}
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

function Trust() {
  return (
    <section className="bg-sage-50 py-20 md:py-28">
      <div className="container-x">
        <div className="grid items-center gap-16 lg:grid-cols-[1fr_0.85fr]">
          <div>
            <SectionHead
              eyebrow="Trust & Experience"
              title="Care You Can Count On"
              text="Only the facts that matter — experience, qualification and a clear area of practice."
            />
            <div className="mt-10">
              {stats.map((s, i) => (
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
                Practicing in {site.location}, Dr. Adeel built his practice on
                one belief: that urological care works best when the patient
                feels heard, respected and informed at every step.
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
                src={IMG.drAdeel}
                alt={`${site.doctor}, urologist with 15+ years of experience`}
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

function Stories() {
  return (
    <section className="py-20 md:py-28">
      <div className="container-x">
        <Reveal scale>
          <div className="relative mx-auto max-w-3xl overflow-hidden rounded-[2.5rem] border border-forest-900/10 bg-sage-50 px-8 py-16 text-center md:px-16">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
              className="mx-auto h-10 w-10 text-gold-500"
            >
              <path
                d="M10 8c-3 1-5 3.2-5 7v1h5v-6H7.5C8 9 9 8.4 10 8zm9 0c-3 1-5 3.2-5 7v1h5v-6h-2.5c.5-1 1.5-1.6 2.5-2z"
                fill="currentColor"
              />
            </svg>
            <h2 className="mt-6 text-balance text-3xl font-bold tracking-tight text-forest-900 md:text-4xl">
              Real Experiences From Patients Will Appear Here
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-ink-500">
              When patients are comfortable sharing, their genuine stories will
              be published on this page — with their first name and concern
              category only. Your trust and privacy always come first.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              <Button to="/patient-stories" variant="outline">
                Visit Patient Stories
              </Button>
              <Button href={site.phoneHref}>
                <Icon name="phone" className="h-4 w-4" strokeWidth={2} />
                Call {site.phone}
              </Button>
            </div>
          </div>
        </Reveal>
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

export default function Home() {
  usePageMeta(
    "ZivRA HEALTH | Urologist in Darbhanga — Dr. Adeel, BUMS · 15+ Years",
    "Personalised, patient-centred urological care in Darbhanga, Bihar. Consult Dr. Adeel, BUMS — urologist with 15+ years of experience. Book: 7004553815."
  );
  return (
    <>
      <Hero />
      <Concerns />
      <DoctorIntro />
      <Why />
      <Journey />
      <Education />
      <ConditionsGrid />
      <Trust />
      <Stories />
      <FaqSection />
      <CTASection className="pt-4" />
    </>
  );
}
