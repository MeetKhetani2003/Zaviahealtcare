// @ts-nocheck
"use client";
import Link from "next/link";
import { useParams, redirect } from "next/navigation";
import { useState, useEffect } from "react";
import { disclaimer, site } from "@/data/content";
import {
  Accordion,
  Button,
  Icon,
  Reveal,
  SectionHead
} from "@/components/ui";
import { Breadcrumbs, CTASection, ImageHero } from "@/components/cards";
import { IMG } from "@/assets";

export default function ConditionDetail() {
  const { slug } = useParams() as { slug: string };
  const [c, setC] = useState<any>(null);
  const [related, setRelated] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/conditions')
      .then(res => res.json())
      .then(data => {
        const conds = data.conditions || [];
        const found = conds.find((x: any) => x.slug === slug);
        setC(found);
        setRelated(conds.filter((x: any) => x.slug !== slug).slice(0, 3));
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [slug]);

  if (loading) return <div className="text-center py-32 text-forest-700 font-medium">Loading condition details...</div>;
  if (!c) return redirect("/conditions");

  return (
    <>
      <ImageHero
        eyebrow="Urological Condition"
        title={c.title}
        text={c.short}
        image={c.image}
      >
        <Breadcrumbs
          dark
          items={[
            { label: "Home", to: "/" },
            { label: "Conditions", to: "/conditions" },
            { label: c.title },
          ]}
        />
      </ImageHero>

      <article className="py-16 md:py-24">
        <div className="container-x">
          <div className="grid gap-14 lg:grid-cols-[1fr_18rem]">
            <div className="space-y-20">
              {/* understanding */}
              <section>
                <SectionHead eyebrow="Overview" title="Understanding The Condition" />
                <div className="mt-6 space-y-4">
                  {c.understanding.map((p, i) => (
                    <Reveal key={i} delay={i * 100}>
                      <p className="max-w-2xl text-[15px] leading-relaxed text-ink-500 md:text-base">
                        {p}
                      </p>
                    </Reveal>
                  ))}
                </div>
              </section>

              {/* symptoms + seek advice */}
              <section className="grid gap-6 md:grid-cols-2">
                <Reveal className="rounded-3xl border border-forest-900/10 bg-white p-7">
                  <h3 className="font-display text-lg font-bold text-forest-900">
                    Common Symptoms
                  </h3>
                  <p className="mt-2 text-[13px] text-ink-400">
                    Symptom lists are not a diagnosis — they're a reason to talk.
                  </p>
                  <ul className="mt-5 space-y-3">
                    {c.symptoms && c.symptoms.map((s: string) => (
                      <li
                        key={s}
                        className="flex items-start gap-3 text-[14px] leading-relaxed text-ink-700"
                      >
                        <Icon
                          name="leaf"
                          className="mt-0.5 h-4 w-4 shrink-0 text-botanical-500"
                          strokeWidth={2}
                        />
                        {s}
                      </li>
                    ))}
                  </ul>
                </Reveal>

                <Reveal delay={120} className="rounded-3xl bg-forest-900 p-7">
                  <h3 className="font-display text-lg font-bold text-ivory-50">
                    When To Seek Medical Advice
                  </h3>
                  <p className="mt-2 text-[13px] text-ivory-100/60">
                    Any of these is a sensible reason to book a consultation.
                  </p>
                  <ul className="mt-5 space-y-3">
                    {c.seekAdvice && c.seekAdvice.map((s: string) => (
                      <li
                        key={s}
                        className="flex items-start gap-3 text-[14px] leading-relaxed text-ivory-100/85"
                      >
                        <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold-400/20 text-gold-300">
                          <Icon name="check" className="h-3 w-3" strokeWidth={2.6} />
                        </span>
                        {s}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </section>

              {/* consultation & evaluation */}
              <section>
                <SectionHead
                  eyebrow="Consultation"
                  title="Consultation & Evaluation"
                />
                <div className="mt-8 grid items-center gap-8 md:grid-cols-2">
                  <div className="space-y-4">
                    {c.consultation.map((p, i) => (
                      <Reveal key={i} delay={i * 100}>
                        <p className="text-[15px] leading-relaxed text-ink-500">
                          {p}
                        </p>
                      </Reveal>
                    ))}
                    <Reveal delay={220}>
                      <Button href="/secure-assessment">
                        Take Free Assessment
                        <Icon name="arrow-right" className="h-4 w-4" strokeWidth={2} />
                      </Button>
                    </Reveal>
                  </div>
                  <Reveal scale>
                    <div className="img-reveal overflow-hidden rounded-3xl border border-forest-900/10 shadow-soft">
                      <img
                        src={IMG.doctorConsultation}
                        alt="A calm evaluation consultation at ZivRA HEALTH"
                        loading="lazy"
                        width={800}
                        height={640}
                        className="aspect-[5/4] w-full object-cover"
                      />
                    </div>
                  </Reveal>
                </div>
              </section>

              {/* faqs */}
              {c.faqs && c.faqs.length > 0 && (
                <section>
                  <SectionHead
                    eyebrow="FAQ"
                    title="Frequently Asked Questions"
                  />
                  <Reveal delay={120} className="mt-8">
                    <Accordion items={c.faqs} />
                  </Reveal>
                </section>
              )}
            </div>

            {/* sidebar */}
            <aside className="space-y-6 lg:pt-2">
              <Reveal>
                <div className="rounded-3xl border border-forest-900/10 bg-sage-50 p-6">
                  <p className="font-display text-[12px] font-bold uppercase tracking-[0.2em] text-gold-600">
                    Speak To A Urologist
                  </p>
                  <p className="mt-3 text-[14px] leading-relaxed text-ink-700">
                    If this page describes what you've been feeling, the next
                    step is a conversation — not more worry.
                  </p>
                  <div className="mt-5 space-y-2.5">
                    <Button href="/secure-assessment" className="w-full">
                      Take Free Assessment
                    </Button>
                    <Button href={site.phoneHref} variant="outline" className="w-full">
                      <Icon name="phone" className="h-4 w-4" strokeWidth={2} />
                      {site.phone}
                    </Button>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={100}>
                <div className="rounded-3xl border border-forest-900/10 bg-white p-6">
                  <p className="font-display text-[12px] font-bold uppercase tracking-[0.2em] text-forest-700">
                    Related Concerns
                  </p>
                  <ul className="mt-4 space-y-3">
                    {related.map((r) => (
                      <li key={r.slug}>
                        <Link
                          href={`/conditions/${r.slug}`}
                          className="group flex items-center gap-3 text-[14px] font-medium text-ink-700 transition-colors hover:text-forest-800"
                        >
                          <span className="flex h-14 w-14 shrink-0 overflow-hidden rounded-xl">
                            <img
                              src={r.image}
                              alt=""
                              loading="lazy"
                              width={112}
                              height={112}
                              className="h-full w-full object-cover"
                            />
                          </span>
                          <span className="flex-1">{r.title}</span>
                          <Icon
                            name="arrow-right"
                            className="h-4 w-4 text-forest-700 transition-transform duration-300 group-hover:translate-x-1"
                            strokeWidth={2}
                          />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </aside>
          </div>

          <div className="mt-16">
            <Reveal>
              <div className="flex items-start gap-3 rounded-2xl border border-gold-500/25 bg-gold-100/50 p-5">
                <Icon name="shield" className="mt-0.5 h-5 w-5 shrink-0 text-gold-600" />
                <p className="text-[13px] leading-relaxed text-ink-700">
                  <span className="font-semibold">Medical disclaimer: </span>
                  {disclaimer}
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </article>

      <CTASection />
    </>
  );
}
