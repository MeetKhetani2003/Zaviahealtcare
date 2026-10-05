"use client";
import { useState, useEffect } from "react";
import { Button, Icon, Reveal, SectionHead } from "./ui";
import { site } from "../data/content";

export function Stories({ initialStories }: { initialStories: any[] }) {
  const stories = initialStories || [];
  const loading = false;
  const [currentIndex, setCurrentIndex] = useState(0);

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
    <section className="py-20 md:py-28">
      <div className="container-x">
        <Reveal scale>
          {loading ? (
            <div className="py-12 text-center text-forest-700 font-bold">Loading Stories...</div>
          ) : stories.length === 0 ? (
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
                <Button href="/patient-stories" variant="outline">
                  Visit Patient Stories
                </Button>
                <Button href={site.phoneHref}>
                  <Icon name="phone" className="h-4 w-4" strokeWidth={2} />
                  Call {site.phone}
                </Button>
              </div>
            </div>
          ) : (
            <div className="relative mx-auto max-w-4xl">
              <div className="text-center mb-12">
                <SectionHead eyebrow="Patient Stories" title="Real Experiences" center />
              </div>
              <div className="relative overflow-hidden rounded-[2.5rem] bg-sage-50 border border-forest-900/10 shadow-soft p-8 md:p-14">
                {/* Large decorative quote mark */}
                <div className="absolute top-6 left-8 text-gold-500/20 font-serif text-[120px] leading-none pointer-events-none select-none">
                  "
                </div>
                
                <div className="relative z-10 w-full">
                  {stories.map((s, i) => (
                    <div 
                      key={i} 
                      className={`w-full px-2 md:px-8 flex flex-col items-center text-center transition-opacity duration-700 ease-in-out ${
                        i === currentIndex ? 'opacity-100 relative z-10' : 'opacity-0 absolute top-0 left-0 z-0 pointer-events-none'
                      }`}
                    >
                      <blockquote className="text-lg md:text-2xl leading-relaxed text-forest-900 font-medium mb-10 max-w-3xl">
                        "{s.quote}"
                      </blockquote>
                      <div className="flex items-center gap-4 bg-white/80 backdrop-blur-sm pr-6 pl-2 py-2 rounded-full border border-forest-900/10 shadow-sm">
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
                    <button onClick={prevStory} className="absolute left-4 top-1/2 -translate-y-1/2 h-12 w-12 flex items-center justify-center rounded-full border border-forest-900/10 text-forest-900 hover:bg-forest-800 hover:text-white hover:border-forest-800 transition-all bg-white shadow-md z-20">
                      <Icon name="chevron-left" className="h-6 w-6" strokeWidth={2} />
                    </button>
                    <button onClick={nextStory} className="absolute right-4 top-1/2 -translate-y-1/2 h-12 w-12 flex items-center justify-center rounded-full border border-forest-900/10 text-forest-900 hover:bg-forest-800 hover:text-white hover:border-forest-800 transition-all bg-white shadow-md z-20">
                      <Icon name="chevron-right" className="h-6 w-6" strokeWidth={2} />
                    </button>
                    
                    {/* Pagination dots */}
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
              <div className="mt-12 text-center">
                <Button href="/patient-stories" variant="outline">
                  View All Stories
                </Button>
              </div>
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}