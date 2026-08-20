import { useState } from "react";
import { IMG } from "../assets";
import { site } from "../data/content";
import { Button, Icon, Reveal, usePageMeta } from "../components/ui";

/* Stylised, self-contained map illustration (no external embed) */
function MapIllustration() {
  return (
    <svg
      viewBox="0 0 640 420"
      role="img"
      aria-label="Stylised map showing the location of ZivRA HEALTH in Sarai Sattar Khan, Laheriasarai, Darbhanga"
      className="h-full w-full"
      preserveAspectRatio="xMidYMid slice"
    >
      <rect width="640" height="420" fill="#e8eee1" />
      {/* Ganga river band */}
      <path
        d="M-20 60 C 140 20, 260 120, 420 90 S 640 130, 700 90 L 700 -20 L -20 -20 Z"
        fill="#c2d9c8"
      />
      <path
        d="M-20 60 C 140 20, 260 120, 420 90 S 640 130, 700 90"
        fill="none"
        stroke="#8fbc9b"
        strokeWidth="3"
        opacity="0.6"
      />
      {/* roads */}
      <g stroke="#faf8f2" strokeWidth="14" strokeLinecap="round" fill="none">
        <path d="M60 440 L 180 240 L 160 90" />
        <path d="M340 440 L 360 230 L 520 150 L 660 120" />
        <path d="M-20 300 L 200 280 L 470 300 L 660 280" />
      </g>
      <g stroke="#d8e2cd" strokeWidth="2" strokeDasharray="6 10" fill="none">
        <path d="M60 440 L 180 240 L 160 90" />
        <path d="M340 440 L 360 230 L 520 150" />
        <path d="M-20 300 L 660 285" />
      </g>
      {/* park */}
      <ellipse cx="540" cy="330" rx="90" ry="55" fill="#d8e2cd" />
      <circle cx="520" cy="322" r="9" fill="#8fbc9b" />
      <circle cx="556" cy="340" r="7" fill="#8fbc9b" />
      <circle cx="545" cy="312" r="6" fill="#8fbc9b" />
      {/* blocks */}
      <g fill="#dfe7da">
        <rect x="220" y="330" width="70" height="46" rx="6" />
        <rect x="250" y="150" width="60" height="40" rx="6" />
        <rect x="90" y="120" width="46" height="60" rx="6" />
        <rect x="420" y="200" width="56" height="40" rx="6" />
      </g>
      {/* location pin */}
      <g>
        <circle cx="330" cy="250" r="34" fill="#1b4332" opacity="0.12" />
        <path
          d="M330 196c-22 0-38 16-38 36 0 26 38 54 38 54s38-28 38-54c0-20-16-36-38-36z"
          fill="#1b4332"
        />
        <circle cx="330" cy="232" r="14" fill="#cfa94a" />
        <circle cx="330" cy="232" r="6" fill="#faf8f2" />
      </g>
    </svg>
  );
}

export default function Contact() {
  usePageMeta(
    "Contact | ZivRA HEALTH — Sarai Sattar Khan, Darbhanga",
    `Contact ZivRA HEALTH, Darbhanga, Bihar. ${site.doctor}, ${site.qualification} urologist. Call ${site.phone} or email ${site.email}.`
  );

  const [form, setForm] = useState({ name: "", mobile: "", message: "" });
  const [sent, setSent] = useState(false);
  const [err, setErr] = useState<{ name?: string; mobile?: string }>({});

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const er: { name?: string; mobile?: string } = {};
    if (form.name.trim().length < 2) er.name = "Please enter your name.";
    if (!/^[0-9]{10}$/.test(form.mobile.replace(/\s/g, "")))
      er.mobile = "Please enter a valid 10-digit mobile number.";
    setErr(er);
    if (Object.keys(er).length === 0) {
      setSent(true);
    }
  };

  return (
    <>
      <section className="pb-20 pt-32 md:pt-44">
        <div className="container-x">
          <Reveal className="max-w-2xl">
            <span className="inline-flex items-center gap-2 font-display text-[11px] font-bold uppercase tracking-[0.24em] text-forest-700">
              <Icon name="leaf" className="h-3.5 w-3.5 text-gold-500" strokeWidth={2.2} />
              Contact
            </span>
            <h1 className="mt-5 text-balance text-4xl font-bold tracking-tight text-forest-900 md:text-5xl">
              Contact ZivRA HEALTH
            </h1>
            <p className="mt-5 text-[15.5px] leading-relaxed text-ink-500">
              A call, an email, or a visit — whichever feels right. We respond
              to every enquiry personally.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
            {/* left — info */}
            <div className="space-y-5">
              <Reveal>
                <div className="flex items-center gap-5 rounded-3xl border border-forest-900/10 bg-white p-6 shadow-card">
                  <img
                    src={IMG.drAdeel}
                    alt={site.doctor}
                    width={88}
                    height={88}
                    className="h-[88px] w-[88px] rounded-full border-2 border-sage-200 object-cover object-top"
                  />
                  <div>
                    <p className="font-display text-lg font-bold text-forest-900">
                      {site.name}
                    </p>
                    <p className="mt-0.5 text-[14px] font-semibold text-ink-700">
                      {site.doctor}
                    </p>
                    <p className="text-[12.5px] uppercase tracking-wide text-gold-600">
                      {site.qualification} · {site.experience} · {site.role}
                    </p>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={100}>
                <a
                  href={site.phoneHref}
                  className="group flex items-center gap-5 rounded-3xl border border-forest-900/10 bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:shadow-soft"
                >
                  <span className="flex h-13 w-13 shrink-0 items-center justify-center rounded-full bg-forest-800 p-3.5 text-ivory-50">
                    <Icon name="phone" className="h-6 w-6" strokeWidth={1.9} />
                  </span>
                  <div>
                    <p className="font-display text-[12px] font-bold uppercase tracking-[0.18em] text-ink-400">
                      Call
                    </p>
                    <p className="font-display text-xl font-bold text-forest-900 transition-colors group-hover:text-forest-700">
                      {site.phone}
                    </p>
                  </div>
                </a>
              </Reveal>

              <Reveal delay={180}>
                <a
                  href={`mailto:${site.email}`}
                  className="group flex items-center gap-5 rounded-3xl border border-forest-900/10 bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:shadow-soft"
                >
                  <span className="flex shrink-0 items-center justify-center rounded-full bg-sage-100 p-3.5 text-forest-700">
                    <Icon name="mail" className="h-6 w-6" strokeWidth={1.9} />
                  </span>
                  <div className="min-w-0">
                    <p className="font-display text-[12px] font-bold uppercase tracking-[0.18em] text-ink-400">
                      Email
                    </p>
                    <p className="break-all font-display text-[15px] font-bold text-forest-900 transition-colors group-hover:text-forest-700">
                      {site.email}
                    </p>
                  </div>
                </a>
              </Reveal>

              <Reveal delay={260}>
                <div className="flex items-start gap-5 rounded-3xl border border-forest-900/10 bg-white p-6 shadow-card">
                  <span className="flex shrink-0 items-center justify-center rounded-full bg-sage-100 p-3.5 text-forest-700">
                    <Icon name="pin" className="h-6 w-6" strokeWidth={1.9} />
                  </span>
                  <div>
                    <p className="font-display text-[12px] font-bold uppercase tracking-[0.18em] text-ink-400">
                      Visit
                    </p>
                    <p className="mt-1 text-[15px] font-semibold leading-relaxed text-ink-900">
                      {site.address}
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* right — map + form */}
            <div className="space-y-8">
              <Reveal delay={120} scale>
                <div className="overflow-hidden rounded-3xl border border-forest-900/10 shadow-soft">
                  <div className="relative aspect-[16/10]">
                    <MapIllustration />
                    <div className="absolute inset-x-4 bottom-4 flex flex-col items-start justify-between gap-3 rounded-2xl border border-forest-900/10 bg-white/95 p-4 shadow-lift backdrop-blur-sm sm:flex-row sm:items-center">
                      <p className="text-[13.5px] font-semibold leading-snug text-ink-900">
                        Sarai Sattar Khan, Laheriasarai,
                        <br className="hidden sm:block" /> Darbhanga, Bihar
                      </p>
                      <a
                        href={site.mapsUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-full bg-forest-800 px-5 py-2.5 font-display text-[13px] font-bold text-ivory-50 transition-colors hover:bg-forest-700"
                      >
                        <Icon name="pin" className="h-4 w-4" strokeWidth={2} />
                        Open In Google Maps
                      </a>
                    </div>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={200}>
                {sent ? (
                  <div className="rounded-3xl border border-forest-900/10 bg-white p-8 shadow-soft">
                    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-botanical-100 text-forest-700">
                      <Icon name="check" className="h-7 w-7" strokeWidth={2.4} />
                    </span>
                    <h2 className="mt-5 font-display text-2xl font-bold text-forest-900">
                      Message Sent.
                    </h2>
                    <p className="mt-3 text-[14.5px] leading-relaxed text-ink-500">
                      Thank you, {form.name}. We've received your message and
                      will get back to you on {form.mobile} shortly.
                    </p>
                  </div>
                ) : (
                  <form
                    onSubmit={submit}
                    noValidate
                    className="rounded-3xl border border-forest-900/10 bg-white p-7 shadow-soft"
                  >
                    <h2 className="font-display text-xl font-bold text-forest-900">
                      Send Us A Message
                    </h2>
                    <p className="mt-1.5 text-[13.5px] text-ink-500">
                      For appointment requests, the book consultation form is
                      the fastest route.
                    </p>
                    <div className="mt-6 grid gap-5 sm:grid-cols-2">
                      <div>
                        <label htmlFor="ct-name" className="field-label">
                          Name *
                        </label>
                        <input
                          id="ct-name"
                          className="field"
                          placeholder="Your name"
                          value={form.name}
                          onChange={(e) => {
                            setForm((f) => ({ ...f, name: e.target.value }));
                            setErr((er) => ({ ...er, name: undefined }));
                          }}
                        />
                        {err.name && (
                          <p className="mt-1.5 text-[12.5px] font-medium text-red-700">
                            {err.name}
                          </p>
                        )}
                      </div>
                      <div>
                        <label htmlFor="ct-mobile" className="field-label">
                          Mobile Number *
                        </label>
                        <input
                          id="ct-mobile"
                          className="field"
                          placeholder="10-digit mobile number"
                          inputMode="numeric"
                          value={form.mobile}
                          onChange={(e) => {
                            setForm((f) => ({ ...f, mobile: e.target.value }));
                            setErr((er) => ({ ...er, mobile: undefined }));
                          }}
                        />
                        {err.mobile && (
                          <p className="mt-1.5 text-[12.5px] font-medium text-red-700">
                            {err.mobile}
                          </p>
                        )}
                      </div>
                      <div className="sm:col-span-2">
                        <label htmlFor="ct-message" className="field-label">
                          Message
                        </label>
                        <textarea
                          id="ct-message"
                          className="field field-area"
                          placeholder="How can we help?"
                          value={form.message}
                          onChange={(e) =>
                            setForm((f) => ({ ...f, message: e.target.value }))
                          }
                        />
                      </div>
                    </div>
                    <div className="mt-6">
                      <Button type="submit">
                        Send Message
                        <Icon name="arrow-right" className="h-4 w-4" strokeWidth={2} />
                      </Button>
                    </div>
                  </form>
                )}
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
