"use client";
import { useState, useEffect } from "react";
import { PHOTO, site } from "@/data/content";
import { Button, Icon, Reveal } from "@/components/ui";
import { CTASection, ImageHero } from "@/components/cards";
import { cn } from "@/utils/cn";

export default function HowItWorks() {
  const [steps, setSteps] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/pages/how-it-works')
      .then(res => res.json())
      .then(data => {
        setSteps(data.steps || []);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center py-44 text-forest-700 font-medium">Loading...</div>;
  

  return (
    <>
      <ImageHero
        eyebrow="How It Works"
        title="Your Journey From Concern To Care"
        text="No confusing steps, no guesswork. Just a clear, calm path — from the first phone call to ongoing follow-up."
        image={PHOTO.howItWorksHero}
      />

      <section className="py-16 md:py-24">
        <div className="container-x space-y-24 md:space-y-32">
          {steps.map((step, i) => {
            const flip = i % 2 === 1;
            return (
              <div
                key={step.no}
                className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
              >
                {/* image */}
                <Reveal
                  scale
                  className={cn("relative", flip && "lg:order-2")}
                >
                  <div
                    aria-hidden="true"
                    className={cn(
                      "absolute -top-5 h-full w-full rounded-[2rem] bg-sage-200/70",
                      flip ? "-left-5" : "-right-5"
                    )}
                  />
                  <div className="img-reveal relative overflow-hidden rounded-[2rem] border border-forest-900/10 shadow-soft">
                    <img
                      src={step.image}
                      alt={step.title}
                      loading="lazy"
                      width={1000}
                      height={750}
                      className="aspect-[4/3] w-full object-cover"
                    />
                    <span className="absolute left-5 top-5 rounded-full bg-forest-950/80 px-4 py-1.5 font-display text-[12px] font-bold uppercase tracking-[0.2em] text-gold-300 backdrop-blur-sm">
                      Step {step.no}
                    </span>
                  </div>
                </Reveal>

                {/* text */}
                <div className={cn(flip && "lg:order-1")}>
                  <Reveal>
                    <p className="font-display text-6xl font-extrabold tracking-tight text-sage-200 md:text-7xl">
                      {step.no}
                    </p>
                    <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight text-forest-900 md:text-4xl">
                      {step.title}
                    </h2>
                    <p className="mt-4 max-w-lg text-[15.5px] leading-relaxed text-ink-500">
                      {step.text}
                    </p>
                  </Reveal>
                  <ul className="mt-7 space-y-3.5">
                    {step.points?.map((p: string, j: number) => (
                      <Reveal
                        key={p}
                        delay={j * 100}
                        className="flex items-start gap-3 text-[14.5px] font-medium text-ink-700"
                      >
                        <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-botanical-100 text-forest-700">
                          <Icon name="check" className="h-3.5 w-3.5" strokeWidth={2.4} />
                        </span>
                        {p}
                      </Reveal>
                    ))}
                  </ul>
                  {i === 0 && (
                    <Reveal delay={320} className="mt-9">
                      <div className="flex flex-wrap gap-4">
                        <Button href="/free-assessment">
                          Start Step One
                          <Icon name="arrow-right" className="h-4 w-4" strokeWidth={2} />
                        </Button>
                        <Button href={site.phoneHref} variant="outline">
                          <Icon name="phone" className="h-4 w-4" strokeWidth={2} />
                          {site.phone}
                        </Button>
                      </div>
                    </Reveal>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* reassurance band */}
      <section className="bg-white py-16 md:py-20">
        <div className="container-x">
          <div className="grid gap-8 text-center sm:grid-cols-3">
            {[
              { icon: "clock", t: "At your pace", d: "Consultations are unhurried conversations, not checklists." },
              { icon: "shield", t: "Always private", d: "One-to-one, confidential, and judgement-free." },
              { icon: "heart", t: "Follow-up built in", d: "Where your concern needs it, you won't be left at step three." },
            ].map((item, i) => (
              <Reveal key={item.t} delay={i * 100}>
                <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-sage-100 text-forest-700">
                  <Icon name={item.icon} className="h-6 w-6" strokeWidth={1.8} />
                </span>
                <h3 className="mt-4 font-display text-base font-bold text-forest-900">
                  {item.t}
                </h3>
                <p className="mx-auto mt-2 max-w-xs text-[13.5px] leading-relaxed text-ink-500">
                  {item.d}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Step One Takes Just A Few Minutes."
        text="Book your consultation today — the rest of the path is designed to be calm."
      />
    </>
  );
}
