import { Icon, Reveal, usePageMeta, Button } from "../components/ui";

export default function NotFound() {
  usePageMeta("Page Not Found | ZivRA HEALTH");
  return (
    <section className="flex min-h-[70vh] items-center pb-24 pt-40">
      <div className="container-x">
        <Reveal className="mx-auto max-w-xl text-center">
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-sage-100 text-forest-700">
            <Icon name="leaf" className="h-7 w-7" strokeWidth={1.8} />
          </span>
          <h1 className="mt-6 font-display text-5xl font-extrabold tracking-tight text-forest-900">
            404
          </h1>
          <p className="mt-3 font-display text-xl font-bold text-forest-800">
            This page seems to have wandered off.
          </p>
          <p className="mt-3 text-[15px] leading-relaxed text-ink-500">
            The page you're looking for doesn't exist or has moved. Let's get
            you back to somewhere useful.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button to="/">Back To Home</Button>
            <Button to="/book-consultation" variant="outline">
              Book Consultation
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
