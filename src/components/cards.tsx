"use client";
import Link from "next/link";
import { cn } from "@/utils/cn";
import { Botanical, Button, Icon, Reveal } from "./ui";
import { site, type Condition, type ProcessStep, type Treatment } from "@/data/content";

/* ------------------------------------------------------------------ */
/*  Condition card — image-led with gradient overlay                   */
/* ------------------------------------------------------------------ */

export function ConditionCard({
  c,
  delay = 0,
  tall = false,
}: {
  c: Condition;
  delay?: number;
  tall?: boolean;
}) {
  return (
    <Reveal delay={delay} className="h-full">
      <Link
        href={`/conditions/${c.slug}`}
        className={cn(
          "group relative block h-full w-full overflow-hidden rounded-3xl border border-forest-900/10 transition-colors duration-500 hover:border-forest-700/50",
          tall ? "min-h-[24rem]" : "min-h-[20rem]"
        )}
      >
        <img
          src={c.image}
          alt={c.title}
          loading="lazy"
          width={800}
          height={600}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-950/90 via-forest-950/35 to-forest-950/5" />
        <div className="absolute inset-x-0 bottom-0 p-6">
          <h3 className="font-display text-xl font-bold text-ivory-50">
            {c.title}
          </h3>
          <p className="mt-2 line-clamp-2 max-w-md text-[13.5px] leading-relaxed text-ivory-100/80">
            {c.short}
          </p>
          <div className="mt-4 flex items-center gap-3">
            <span className="font-display text-[12px] font-bold uppercase tracking-[0.18em] text-gold-300">
              Learn More
            </span>
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-ivory-50/40 text-ivory-50 transition-all duration-300 group-hover:border-gold-400 group-hover:bg-gold-400 group-hover:text-forest-950">
              <Icon
                name="arrow-right"
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                strokeWidth={2}
              />
            </span>
          </div>
        </div>
      </Link>
    </Reveal>
  );
}

/* ------------------------------------------------------------------ */
/*  Treatment card — image top, text below                             */
/* ------------------------------------------------------------------ */

export function TreatmentCard({
  t,
  delay = 0,
}: {
  t: Treatment;
  delay?: number;
}) {
  return (
    <Reveal delay={delay} className="h-full">
      <Link
        href={`/treatments/${t.slug}`}
        className="group flex h-full flex-col overflow-hidden rounded-3xl border border-forest-900/10 bg-white shadow-card transition-all duration-500 hover:-translate-y-1 hover:border-forest-700/40 hover:shadow-soft"
      >
        <div className="img-reveal relative aspect-[16/10] overflow-hidden">
          <img
            src={t.image}
            alt={t.title}
            loading="lazy"
            width={800}
            height={500}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex flex-1 flex-col p-6">
          <h3 className="font-display text-lg font-bold text-forest-900">
            {t.title}
          </h3>
          <p className="mt-2 flex-1 text-[13.5px] leading-relaxed text-ink-500">
            {t.short}
          </p>
          <span className="mt-5 inline-flex items-center gap-2 font-display text-[12px] font-bold uppercase tracking-[0.18em] text-forest-700 transition-colors group-hover:text-forest-800">
            Learn More
            <Icon
              name="arrow-right"
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              strokeWidth={2}
            />
          </span>
        </div>
      </Link>
    </Reveal>
  );
}

/* ------------------------------------------------------------------ */
/*  Process step                                                       */
/* ------------------------------------------------------------------ */

export function ProcessStep({
  step,
  index,
  total,
  line = false,
}: {
  step: ProcessStep;
  index: number;
  total: number;
  line?: boolean;
}) {
  return (
    <Reveal delay={index * 130} className="relative">
      {line && (
        <div
          className={cn(
            "journey-line absolute -top-1 hidden h-px w-full bg-forest-900/15 md:block",
            index === total - 1 && "w-0"
          )}
        />
      )}
      <div className="relative">
        <span className="inline-flex items-center gap-2 rounded-full border border-forest-800/15 bg-ivory-50 px-4 py-1.5 font-display text-[11px] font-bold uppercase tracking-[0.22em] text-forest-700">
          <span className="text-gold-500">Step</span> {step.no}
        </span>
        <div className="img-reveal mt-4 aspect-[4/3] overflow-hidden rounded-2xl border border-forest-900/10">
          <img
            src={step.image}
            alt={step.title}
            loading="lazy"
            width={800}
            height={600}
            className="h-full w-full object-cover"
          />
        </div>
        <h3 className="mt-5 font-display text-lg font-bold text-forest-900">
          {step.title}
        </h3>
        <p className="mt-2 text-[14px] leading-relaxed text-ink-500">
          {step.text}
        </p>
      </div>
    </Reveal>
  );
}

/* ------------------------------------------------------------------ */
/*  Page hero (banner over image)                                      */
/* ------------------------------------------------------------------ */

export function ImageHero({
  eyebrow,
  title,
  text,
  image,
  children,
}: {
  eyebrow: string;
  title: string;
  text?: string;
  image: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden">
      <img
        src={image}
        alt=""
        width={1600}
        height={700}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-forest-950/92 via-forest-950/78 to-forest-900/55" />
      <Botanical className="absolute -right-16 -top-20 h-[28rem] w-[28rem] text-botanical-400/15" />
      <div className="container-x relative pb-16 pt-32 md:pb-24 md:pt-40">
        <Reveal className="max-w-2xl">
          <span className="inline-flex items-center gap-2 font-display text-[11px] font-bold uppercase tracking-[0.24em] text-gold-300">
            <Icon name="leaf" className="h-3.5 w-3.5" strokeWidth={2.2} />
            {eyebrow}
          </span>
          <h1 className="mt-5 text-balance text-4xl font-bold leading-[1.08] tracking-tight text-ivory-50 md:text-5xl">
            {title}
          </h1>
          {text && (
            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-ivory-100/75 md:text-base">
              {text}
            </p>
          )}
          {children && <div className="mt-8">{children}</div>}
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Final CTA section                                                  */
/* ------------------------------------------------------------------ */

export function CTASection({
  title = "Your Health Deserves The Right Conversation.",
  text = "Take the first step toward understanding your urological health.",
  className,
}: {
  title?: string;
  text?: string;
  className?: string;
}) {
  return (
    <section className={cn("container-x pb-20 pt-8 md:pb-28", className)}>
      <Reveal scale>
        <div className="relative overflow-hidden rounded-[2.5rem] bg-forest-900 px-6 py-16 text-center md:px-16 md:py-24">
          <Botanical className="absolute -left-24 -top-24 h-96 w-96 rotate-180 text-botanical-500/15" />
          <Botanical className="absolute -bottom-28 -right-20 h-[26rem] w-[26rem] text-gold-400/10" />
          <div className="relative mx-auto max-w-2xl">
            <h2 className="text-balance text-3xl font-bold leading-[1.12] tracking-tight text-ivory-50 md:text-[2.7rem]">
              {title}
            </h2>
            <p className="mt-5 text-[15px] leading-relaxed text-ivory-100/70 md:text-base">
              {text}
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              <Button href="/free-assessment" variant="light" size="lg">
                Take Free Assessment
              </Button>
              <Button href={site.phoneHref} variant="lightOutline" size="lg">
                <Icon name="phone" className="h-4.5 w-4.5" strokeWidth={2} />
                Call {site.phone}
              </Button>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Breadcrumbs                                                        */
/* ------------------------------------------------------------------ */

export function Breadcrumbs({
  items,
  dark = false,
}: {
  items: { label: string; to?: string }[];
  dark?: boolean;
}) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cn(
        "flex flex-wrap items-center gap-2 text-[12.5px] font-medium",
        dark ? "text-ivory-100/60" : "text-ink-400"
      )}
    >
      {items.map((item, i) => (
        <span key={item.label} className="flex items-center gap-2">
          {i > 0 && <span className="opacity-50">/</span>}
          {item.to ? (
            <Link
              href={item.to}
              className={cn(
                "transition-colors",
                dark ? "hover:text-ivory-50" : "hover:text-forest-800"
              )}
            >
              {item.label}
            </Link>
          ) : (
            <span className={dark ? "text-ivory-100/90" : "text-forest-800"}>
              {item.label}
            </span>
          )}
        </span>
      ))}
    </nav>
  );
}
