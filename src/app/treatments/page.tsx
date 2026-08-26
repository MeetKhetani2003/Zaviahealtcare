"use client";
import { useState, useEffect } from "react";
import { PHOTO } from "@/data/content";
import { Button, Icon, Reveal, SectionHead } from "@/components/ui";
import { CTASection, ImageHero, TreatmentCard } from "@/components/cards";

const includes = [
  {
    icon: "user",
    t: "Undivided attention",
    d: "Your consultation is about you — your history, your symptoms, your questions.",
  },
  {
    icon: "chat",
    t: "Plain-language explanation",
    d: "Findings are explained so you understand them, not just hear them.",
  },
  {
    icon: "shield",
    t: "Complete privacy",
    d: "One-to-one and confidential, including the most sensitive concerns.",
  },
  {
    icon: "check",
    t: "An agreed path forward",
    d: "You leave knowing exactly what happens next — and why.",
  },
];

export default function Treatments() {
  const [treatments, setTreatments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/treatments')
      .then(res => res.json())
      .then(data => {
        setTreatments(data.treatments || []);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <ImageHero
        eyebrow="Treatments & Care"
        title="Personalised Care For Your Urological Concerns"
        text="Care at ZivRA HEALTH is built around your specific concern — evaluated properly, explained clearly, and followed as needed."
        image={PHOTO.treatmentsHero}
      >
        <Button href="/secure-assessment" variant="light">
          Take Free Assessment
          <Icon name="arrow-right" className="h-4 w-4" strokeWidth={2} />
        </Button>
      </ImageHero>

      <section className="bg-ivory-50 py-20 md:py-28">
        <div className="container-x">
          <SectionHead
            eyebrow="Care Paths"
            title="What We Do"
            center={true}
          />
          {loading ? (
            <div className="text-center py-20 text-forest-700 font-medium">Loading treatments...</div>
          ) : (
            <div className="mt-14 grid gap-6 md:grid-cols-2 lg:gap-10">
              {treatments.map((t, i) => (
                <TreatmentCard key={t.slug} t={t} delay={(i % 2) * 120} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="bg-white py-20 md:py-28">
        <div className="container-x">
          <SectionHead
            center
            eyebrow="Every Consultation"
            title="What You Can Expect From Every Visit"
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {includes.map((item, i) => (
              <Reveal
                key={item.t}
                delay={i * 100}
                className="rounded-3xl border border-forest-900/10 bg-ivory-50 p-7 text-center"
              >
                <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-sage-100 text-forest-700">
                  <Icon name={item.icon} className="h-6 w-6" strokeWidth={1.8} />
                </span>
                <h3 className="mt-5 font-display text-base font-bold text-forest-900">
                  {item.t}
                </h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-ink-500">
                  {item.d}
                </p>
              </Reveal>
            ))}
          </div>
          <Reveal delay={200} className="mx-auto mt-10 max-w-2xl text-center">
            <p className="text-[14px] leading-relaxed text-ink-500">
              No procedure is promised online, and no plan is fixed before a
              consultation. What you will always get is an honest, respectful
              evaluation — and a path you understand.
            </p>
          </Reveal>
        </div>
      </section>

      <CTASection
        title="The Right Care Starts With A Conversation."
        text="Tell us your concern, and let's find the right next step together."
      />
    </>
  );
}
