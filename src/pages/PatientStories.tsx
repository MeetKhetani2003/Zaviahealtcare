import { patientStories, PHOTO, site } from "../data/content";
import { Button, Icon, Reveal, SectionHead, usePageMeta } from "../components/ui";
import { CTASection, ImageHero } from "../components/cards";

export default function PatientStories() {
  usePageMeta(
    "Patient Stories | ZivRA HEALTH — Darbhanga",
    "Genuine patient experiences from ZivRA HEALTH, Darbhanga. We publish real stories only with patient consent — first names only."
  );

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

              {patientStories.length === 0 ? (
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
                    <Button to="/book-consultation" size="sm">
                      Begin Your Journey
                    </Button>
                  </div>
                </div>
              ) : (
                patientStories.map((s, i) => (
                  <figure
                    key={i}
                    className="rounded-3xl border border-forest-900/10 bg-white p-7"
                  >
                    <blockquote className="text-[15px] leading-relaxed text-ink-700">
                      “{s.quote}”
                    </blockquote>
                    <figcaption className="mt-4 flex items-center gap-3">
                      {s.image ? (
                        <img
                          src={s.image}
                          alt={s.name}
                          width={48}
                          height={48}
                          className="h-12 w-12 rounded-full object-cover"
                        />
                      ) : (
                        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-forest-800 font-display text-base font-bold text-ivory-50">
                          {s.name.charAt(0)}
                        </span>
                      )}
                      <div>
                        <p className="font-display text-[14px] font-bold text-forest-900">
                          {s.name}
                        </p>
                        <p className="text-[12px] uppercase tracking-wide text-ink-400">
                          {s.category}
                        </p>
                      </div>
                    </figcaption>
                  </figure>
                ))
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
