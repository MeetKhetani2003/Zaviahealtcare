"use client";
import { useState, useEffect } from "react";
import { site } from "@/data/content";
import { Accordion, Button, Icon, Reveal } from "@/components/ui";
import { CTASection, ImageHero } from "@/components/cards";
import { IMG } from "@/assets";

export default function Faqs() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/pages/faqs')
      .then(res => res.json())
      .then(data => {
        setCategories(data.categories || []);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="py-44 text-center font-bold text-forest-700">Loading FAQs...</div>;
  

  return (
    <>
      <ImageHero
        eyebrow="FAQ"
        title="Questions, Answered Straight"
        text="The things patients most often ask before their first consultation — plus the urology basics everyone's a little shy about."
        image={IMG.doctorConsultation}
      />

      <section className="py-20 md:py-28">
        <div className="container-x">
          <div className="grid gap-14 lg:grid-cols-[1fr_1fr]">
            {categories.map((cat, i) => (
              <Reveal key={cat.id} delay={(i % 2) * 120}>
                <div className="rounded-3xl border border-forest-900/10 bg-white p-7 md:p-8">
                  <div className="flex items-center gap-4">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-sage-100 font-display text-sm font-extrabold text-forest-700">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h2 className="font-display text-xl font-bold text-forest-900">
                        {cat.title}
                      </h2>
                      <p className="text-[13px] text-ink-400">{cat.blurb}</p>
                    </div>
                  </div>
                  <div className="mt-6">
                    <Accordion items={cat.items} />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={150} className="mt-14">
            <div className="flex flex-col items-center justify-between gap-6 rounded-[2rem] bg-forest-900 px-8 py-10 text-center md:flex-row md:text-left">
              <div>
                <h2 className="font-display text-2xl font-bold text-ivory-50">
                  Can't find your question?
                </h2>
                <p className="mt-2 max-w-xl text-[14.5px] leading-relaxed text-ivory-100/70">
                  Ask us directly. A quick call is often faster than searching —
                  and there are no silly questions in urology.
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-4">
                <Button href={site.phoneHref} variant="light">
                  <Icon name="phone" className="h-4 w-4" strokeWidth={2} />
                  {site.phone}
                </Button>
                <Button href="/secure-assessment" variant="lightOutline">
                  Take Free Assessment
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <CTASection
        title="One Conversation Ends Most Worries."
        text="Book your consultation with Dr. Adeel in Darbhanga."
      />
    </>
  );
}
