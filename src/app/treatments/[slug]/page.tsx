"use client";
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
import Link from "next/link";

export default function TreatmentDetail() {
  const { slug } = useParams() as { slug: string };
  const [t, setT] = useState<any>(null);
  const [others, setOthers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/treatments')
      .then(res => res.json())
      .then(data => {
        const treats = data.treatments || [];
        const found = treats.find((x: any) => x.slug === slug);
        setT(found);
        setOthers(treats.filter((x: any) => x.slug !== slug).slice(0, 3));
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [slug]);

  if (loading) return <div className="text-center py-32 text-forest-700 font-medium">Loading treatment details...</div>;
  if (!t) return redirect("/treatments");

  return (
    <>
      <ImageHero
        eyebrow="Treatments & Care"
        title={t.title}
        text={t.short}
        image={t.image}
      >
        <Breadcrumbs
          dark
          items={[
            { label: "Home", to: "/" },
            { label: "Treatments", to: "/treatments" },
            { label: t.title },
          ]}
        />
      </ImageHero>

      <article className="py-16 md:py-24">
        <div className="container-x">
          <div className="grid gap-14 lg:grid-cols-[1fr_18rem]">
            <div className="space-y-20">
              {/* overview */}
              <section>
                <SectionHead eyebrow="Overview" title="About This Care" />
                <div className="mt-6 space-y-4">
                  {t.overview.map((p, i) => (
                    <Reveal key={i} delay={i * 100}>
                      <p className="max-w-2xl text-[15px] leading-relaxed text-ink-500 md:text-base">
                        {p}
                      </p>
                    </Reveal>
                  ))}
                </div>
              </section>

              {/* who should seek */}
              <section>
                <SectionHead
                  eyebrow="For You If"
                  title="Who Should Seek Professional Advice?"
                />
                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {t.whoShould.map((w, i) => (
                    <Reveal
                      key={w}
                      delay={i * 90}
                      className="flex items-start gap-3 rounded-2xl border border-forest-900/10 bg-white p-5"
                    >
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-botanical-100 text-forest-700">
                        <Icon name="check" className="h-3.5 w-3.5" strokeWidth={2.4} />
                      </span>
                      <p className="text-[14px] leading-relaxed text-ink-700">{w}</p>
                    </Reveal>
                  ))}
                </div>
              </section>

              {/* what consultation involves */}
              <section>
                <SectionHead
                  eyebrow="The Consultation"
                  title="What The Consultation Involves"
                />
                <div className="mt-8 grid items-center gap-8 md:grid-cols-[1fr_260px]">
                  <ol className="space-y-4">
                    {t.involves.map((v, i) => (
                      <Reveal
                        key={v}
                        delay={i * 90}
                        className="flex items-start gap-4 rounded-2xl border border-forest-900/10 bg-ivory-50 p-5"
                      >
                        <span className="font-display text-xl font-extrabold text-gold-500">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <p className="pt-1 text-[14.5px] leading-relaxed text-ink-700">
                          {v}
                        </p>
                      </Reveal>
                    ))}
                  </ol>
                  <Reveal scale>
                    <div className="img-reveal overflow-hidden rounded-3xl border border-forest-900/10 shadow-soft">
                      <img
                        src={IMG.drAdeel}
                        alt={`${site.doctor}, urologist at ZivRA HEALTH`}
                        loading="lazy"
                        width={520}
                        height={650}
                        className="aspect-[4/5] w-full object-cover"
                      />
                    </div>
                  </Reveal>
                </div>
              </section>

              {/* faqs */}
              {t.faqs && t.faqs.length > 0 && (
                <section>
                  <SectionHead eyebrow="FAQ" title="Frequently Asked Questions" />
                  <Reveal delay={120} className="mt-8">
                    <Accordion items={t.faqs} />
                  </Reveal>
                </section>
              )}
            </div>

            {/* sidebar */}
            <aside className="space-y-6 lg:pt-2">
              <Reveal>
                <div className="rounded-3xl bg-forest-900 p-6">
                  <p className="font-display text-[12px] font-bold uppercase tracking-[0.2em] text-gold-300">
                    Book This Consultation
                  </p>
                  <p className="mt-3 text-[14px] leading-relaxed text-ivory-100/70">
                    The first step is a conversation. Book now, or call and we
                    will find a convenient time.
                  </p>
                  <div className="mt-5 space-y-2.5">
                    <Button href="/free-assessment" variant="light" className="w-full">
                      Take Free Assessment
                    </Button>
                    <Button
                      href={site.phoneHref}
                      variant="lightOutline"
                      className="w-full"
                    >
                      <Icon name="phone" className="h-4 w-4" strokeWidth={2} />
                      {site.phone}
                    </Button>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={100}>
                <div className="rounded-3xl border border-forest-900/10 bg-white p-6">
                  <p className="font-display text-[12px] font-bold uppercase tracking-[0.2em] text-forest-700">
                    Other Areas
                  </p>
                  <ul className="mt-4 space-y-3">
                    {others.map((o) => (
                      <li key={o.slug}>
                        <Link
                          href={`/treatments/${o.slug}`}
                          className="group flex items-center justify-between gap-3 text-[14px] font-medium text-ink-700 transition-colors hover:text-forest-800"
                        >
                          {o.title}
                          <Icon
                            name="arrow-right"
                            className="h-4 w-4 shrink-0 text-forest-700 transition-transform duration-300 group-hover:translate-x-1"
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
