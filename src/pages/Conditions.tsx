import { conditions, PHOTO, site } from "../data/content";
import { Button, Icon, Reveal, usePageMeta } from "../components/ui";
import { ConditionCard, CTASection, ImageHero } from "../components/cards";

export default function Conditions() {
  usePageMeta(
    "Urological Conditions | ZivRA HEALTH — Darbhanga",
    "Explore urological conditions in plain language — urinary health, kidney stones, prostate, bladder, male urology and sexual health. Darbhanga, Bihar."
  );

  return (
    <>
      <ImageHero
        eyebrow="Urological Conditions"
        title="Understanding Your Urological Health"
        text="Clear, honest information about the concerns we care for — so you understand your health before your first conversation."
        image={PHOTO.conditionsHero}
      >
        <Button to="/book-consultation" variant="light">
          Book Consultation
          <Icon name="arrow-right" className="h-4 w-4" strokeWidth={2} />
        </Button>
      </ImageHero>

      <section className="py-20 md:py-28">
        <div className="container-x">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {conditions.map((c, i) => (
              <ConditionCard key={c.slug} c={c} delay={(i % 3) * 110} tall />
            ))}
          </div>
        </div>
      </section>

      <section className="pb-20 md:pb-28">
        <div className="container-x">
          <Reveal scale>
            <div className="flex flex-col items-center gap-6 rounded-[2rem] border border-forest-900/10 bg-sage-50 px-8 py-12 text-center md:px-16">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-botanical-100 text-forest-700">
                <Icon name="chat" className="h-6 w-6" strokeWidth={1.8} />
              </span>
              <h2 className="max-w-2xl text-balance text-2xl font-bold tracking-tight text-forest-900 md:text-3xl">
                Not Sure Which Area Fits Your Concern?
              </h2>
              <p className="max-w-xl text-[15px] leading-relaxed text-ink-500">
                That's completely normal. A consultation is simply a
                professional conversation — describe what you're experiencing,
                and the right path will become clear.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button to="/conditions/other-concerns" variant="outline">
                  Read “Other Urological Concerns”
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

      <CTASection />
    </>
  );
}
