"use client";
import { useState, useEffect } from "react";
import { PHOTO, site } from "@/data/content";
import { Button, Icon, Reveal, SectionHead } from "@/components/ui";
import { CTASection, ImageHero } from "@/components/cards";

export default function PatientStories() {
  const [stories, setStories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetch('/api/pages/patient-stories')
      .then(res => res.json())
      .then(data => {
        setStories(data.stories || []);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (stories.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % stories.length);
    }, 60000);
    return () => clearInterval(timer);
  }, [stories.length]);

  const nextStory = () => setCurrentIndex((prev) => (prev + 1) % stories.length);
  const prevStory = () => setCurrentIndex((prev) => (prev - 1 + stories.length) % stories.length);

  return (
    <>
      <ImageHero
        eyebrow="Patient Stories"
        title="Stories That Reflect Real Care"
        text="Every story on this page will be a real one — shared with consent, identified by first name, and honest about the experience."
        image={PHOTO.storiesHero}
      />

      <section className="py-20 md:py-28">
        <div className="container-x">
          <div className="grid items-start gap-14 lg:grid-cols-2">
            <div>
              <SectionHead
                eyebrow="How We Share Stories"
                title="Honesty, With Privacy First"
                text="We would rather have fewer stories than one that isn't genuine."
              />
              <div className="mt-10 space-y-4">
                {[
                  {
                    icon: "shield",
                    t: "Only with consent",
                    d: "A story is published only when a patient is comfortable sharing it, and can withdraw it any time.",
                  },
                  {
                    icon: "user",
                    t: "First name only",
                    d: "Each story carries the patient's first name and their concern category — nothing more.",
                  },
                  {
                    icon: "chat",
                    t: "In the patient's words",
                    d: "We don't polish or invent. The experience is shared the way the patient lived it.",
                  },
                ].map((item, i) => (
                  <Reveal
                    key={item.t}
                    delay={i * 110}
                    className="flex items-start gap-5 rounded-2xl border border-forest-900/10 bg-white p-6"
                  >
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-sage-100 text-forest-700">
                      <Icon name={item.icon} className="h-5 w-5" strokeWidth={1.9} />
                    </span>
                    <div>
                      <h3 className="font-display text-base font-bold text-forest-900">
                        {item.t}
                      </h3>
                      <p className="mt-1.5 text-[14px] leading-relaxed text-ink-500">
                        {item.d}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            <Reveal scale delay={150} className="space-y-6">
              <div className="img-reveal overflow-hidden rounded-[2rem] border border-forest-900/10 shadow-soft">
                <img
                  src={PHOTO.storiesSupport}
                  alt="A calm moment of trust between a patient and their doctor"
                  loading="lazy"
                  width={1000}
                  height={750}
                  className="aspect-[4/3] w-full object-cover"
                />
              </div>

              {loading ? (
                <div className="py-12 text-center text-forest-700 font-bold">Loading Stories...</div>
              ) : stories.length === 0 ? (
                <div className="relative overflow-hidden rounded-3xl border border-forest-900/10 bg-sage-50 p-8">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                    className="h-8 w-8 text-gold-500"
                  >
                    <path
                      d="M10 8c-3 1-5 3.2-5 7v1h5v-6H7.5C8 9 9 8.4 10 8zm9 0c-3 1-5 3.2-5 7v1h5v-6h-2.5c.5-1 1.5-1.6 2.5-2z"
                      fill="currentColor"
                    />
                  </svg>
                  <h3 className="mt-4 font-display text-lg font-bold text-forest-900">
                    Real experiences from patients will appear here.
                  </h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-ink-500">
                    This section is intentionally waiting for genuine stories
                    rather than filling space with borrowed words. If your
                    experience at ZivRA HEALTH could help another patient, we'd
                    be honoured to share it — on your terms.
                  </p>
                  <div className="mt-5 flex flex-wrap gap-3">
                    <Button href={site.phoneHref} size="sm" variant="outline">
                      <Icon name="phone" className="h-4 w-4" strokeWidth={2} />
                      {site.phone}
                    </Button>
                    <Button href="/secure-assessment" size="sm">
                      Begin Your Journey
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="relative overflow-hidden rounded-[2.5rem] bg-sage-50 border border-forest-900/10 shadow-soft p-8 md:p-12 h-full flex flex-col justify-center">
                  <div className="absolute top-4 left-6 text-gold-500/20 font-serif text-[100px] leading-none pointer-events-none select-none">
                    "
                  </div>
                  <div className="relative z-10 w-full mt-4 mb-4">
                    {stories.map((s, i) => (
                      <div 
                        key={i} 
                        className={`w-full px-4 flex flex-col justify-between text-center transition-opacity duration-700 ease-in-out ${
                          i === currentIndex ? 'opacity-100 relative z-10' : 'opacity-0 absolute top-0 left-0 z-0 pointer-events-none'
                        }`}
                      >
                        <blockquote className="text-lg leading-relaxed text-forest-900 font-medium mb-10 text-left relative z-10">
                          "{s.quote}"
                        </blockquote>
                        <div className="flex items-center gap-4 bg-white/80 backdrop-blur-sm pr-6 pl-2 py-2 rounded-full border border-forest-900/10 shadow-sm self-start">
                          {s.image ? (
                            <img
                              src={s.image}
                              alt={s.name}
                              width={48}
                              height={48}
                              className="h-12 w-12 rounded-full object-cover"
                            />
                          ) : (
                            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-forest-800 font-display text-lg font-bold text-ivory-50">
                              {s.name.charAt(0)}
                            </span>
                          )}
                          <div className="text-left">
                            <p className="font-display text-[15px] font-bold text-forest-900">
                              {s.name}
                            </p>
                            <p className="text-[12px] font-bold uppercase tracking-wider text-gold-600 mt-0.5">
                              {s.category}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {stories.length > 1 && (
                    <>
                      <div className="absolute top-6 right-6 flex items-center gap-2 z-20">
                        <button onClick={prevStory} className="h-10 w-10 flex items-center justify-center rounded-full border border-forest-900/10 text-forest-900 hover:bg-forest-800 hover:text-white transition-all bg-white shadow-sm">
                          <Icon name="chevron-left" className="h-5 w-5" strokeWidth={2} />
                        </button>
                        <button onClick={nextStory} className="h-10 w-10 flex items-center justify-center rounded-full border border-forest-900/10 text-forest-900 hover:bg-forest-800 hover:text-white transition-all bg-white shadow-sm">
                          <Icon name="chevron-right" className="h-5 w-5" strokeWidth={2} />
                        </button>
                      </div>
                      
                      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-20">
                        {stories.map((_, idx) => (
                          <button 
                            key={idx}
                            onClick={() => setCurrentIndex(idx)}
                            className={`w-2 h-2 rounded-full transition-all ${idx === currentIndex ? 'bg-forest-800 w-6' : 'bg-forest-900/20'}`}
                            aria-label={`Go to slide ${idx + 1}`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
              )}
            </Reveal>
          </div>
        </div>
      </section>

      <CTASection
        title="Your Experience Could Be The First Story."
        text="And your concern could be the first thing you put to rest."
      />
    </>
  );
}
