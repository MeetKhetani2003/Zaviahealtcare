import { useState } from "react";
import { IMG } from "../assets";
import { conditions, site } from "../data/content";
import { Button, Icon, Reveal, usePageMeta } from "../components/ui";

type FormState = {
  name: string;
  mobile: string;
  email: string;
  age: string;
  date: string;
  time: string;
  concern: string;
  message: string;
};

const initial: FormState = {
  name: "",
  mobile: "",
  email: "",
  age: "",
  date: "",
  time: "",
  concern: "",
  message: "",
};

export default function BookConsultation() {
  usePageMeta(
    "Book Consultation | ZivRA HEALTH — Urologist in Darbhanga",
    `Book a urology consultation with Dr. Adeel (BUMS, 15+ years) at ZivRA HEALTH, Darbhanga, Bihar. Call ${site.phone} or use the online form.`
  );

  const [form, setForm] = useState<FormState>(initial);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitted, setSubmitted] = useState<FormState | null>(null);

  const set =
    (key: keyof FormState) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >
    ) => {
      setForm((f) => ({ ...f, [key]: e.target.value }));
      setErrors((er) => ({ ...er, [key]: undefined }));
    };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const er: Partial<Record<keyof FormState, string>> = {};
    if (form.name.trim().length < 2) er.name = "Please enter your full name.";
    if (!/^[0-9]{10}$/.test(form.mobile.replace(/\s/g, "")))
      er.mobile = "Please enter a valid 10-digit mobile number.";
    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email))
      er.email = "Please enter a valid email address.";
    setErrors(er);
    if (Object.keys(er).length === 0) {
      setSubmitted(form);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      <section className="pb-16 pt-32 md:pt-44">
        <div className="container-x">
          <Reveal className="max-w-2xl">
            <span className="inline-flex items-center gap-2 font-display text-[11px] font-bold uppercase tracking-[0.24em] text-forest-700">
              <Icon name="leaf" className="h-3.5 w-3.5 text-gold-500" strokeWidth={2.2} />
              Book A Consultation
            </span>
            <h1 className="mt-5 text-balance text-4xl font-bold tracking-tight text-forest-900 md:text-5xl">
              Book Your Consultation
            </h1>
            <p className="mt-5 text-[15.5px] leading-relaxed text-ink-500">
              Share a few details and our team will call you back to confirm a
              convenient time with {site.doctor}. Everything you share stays
              confidential.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            {/* left — doctor */}
            <Reveal scale className="relative">
              <div className="overflow-hidden rounded-[2rem] border border-forest-900/10 shadow-soft">
                <img
                  src={IMG.drAdeel}
                  alt={`${site.doctor} — ${site.qualification} Urologist`}
                  width={900}
                  height={1050}
                  className="aspect-[6/7] w-full object-cover"
                />
              </div>
              <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-forest-900/10 bg-white/95 p-5 shadow-lift backdrop-blur-sm">
                <p className="font-display text-lg font-bold text-forest-900">
                  {site.doctor}
                </p>
                <p className="mt-0.5 text-[13px] font-medium text-ink-500">
                  {site.qualification} · {site.experience} · {site.role}
                </p>
                <div className="mt-4 grid gap-2 border-t border-forest-900/10 pt-4 sm:grid-cols-2">
                  <a
                    href={site.phoneHref}
                    className="flex items-center gap-2 font-display text-[14px] font-bold text-forest-800 transition-colors hover:text-forest-600"
                  >
                    <Icon name="phone" className="h-4 w-4" strokeWidth={2} />
                    {site.phone}
                  </a>
                  <a
                    href={`mailto:${site.email}`}
                    className="flex items-center gap-2 break-all text-[13px] font-medium text-ink-700 transition-colors hover:text-forest-800"
                  >
                    <Icon name="mail" className="h-4 w-4 shrink-0" strokeWidth={2} />
                    {site.email}
                  </a>
                </div>
              </div>
            </Reveal>

            {/* right — form */}
            <Reveal delay={140}>
              {submitted ? (
                <div className="rounded-3xl border border-forest-900/10 bg-white p-8 shadow-soft md:p-10">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-botanical-100 text-forest-700">
                    <Icon name="check" className="h-8 w-8" strokeWidth={2.4} />
                  </span>
                  <h2 className="mt-6 font-display text-3xl font-bold tracking-tight text-forest-900">
                    Request Received.
                  </h2>
                  <p className="mt-4 text-[15px] leading-relaxed text-ink-500">
                    Thank you, <span className="font-semibold text-forest-900">{submitted.name}</span>.
                    Your consultation request has been noted
                    {submitted.concern && (
                      <>
                        {" "}for <span className="font-semibold text-forest-900">{submitted.concern}</span>
                      </>
                    )}
                    . Our team will call you on{" "}
                    <span className="font-semibold text-forest-900">{submitted.mobile}</span>{" "}
                    to confirm a convenient time.
                  </p>
                  <div className="mt-6 rounded-2xl bg-sage-50 p-5">
                    <p className="text-[13.5px] leading-relaxed text-ink-700">
                      {submitted.date || submitted.time ? (
                        <>
                          <span className="font-semibold text-forest-900">
                            Your preference:
                          </span>{" "}
                          {submitted.date &&
                            new Date(submitted.date).toLocaleDateString("en-IN", {
                              weekday: "long",
                              day: "numeric",
                              month: "long",
                            })}
                          {submitted.date && submitted.time && " · "}
                          {submitted.time}
                          <br />
                          <span className="text-ink-500">
                            We'll confirm the final time with you.
                          </span>
                        </>
                      ) : (
                        <span className="text-ink-500">
                          We'll suggest a few convenient slots when we call.
                        </span>
                      )}
                    </p>
                  </div>
                  <div className="mt-7 flex flex-wrap gap-4">
                    <Button href={site.phoneHref}>
                      <Icon name="phone" className="h-4 w-4" strokeWidth={2} />
                      Call {site.phone}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSubmitted(null);
                        setForm(initial);
                      }}
                    >
                      Submit Another Request
                    </Button>
                  </div>
                </div>
              ) : (
                <form
                  onSubmit={submit}
                  noValidate
                  className="rounded-3xl border border-forest-900/10 bg-white p-7 shadow-soft md:p-9"
                >
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                      <label htmlFor="bk-name" className="field-label">
                        Full Name *
                      </label>
                      <input
                        id="bk-name"
                        className="field"
                        placeholder="Your full name"
                        value={form.name}
                        onChange={set("name")}
                        autoComplete="name"
                      />
                      {errors.name && (
                        <p className="mt-1.5 text-[12.5px] font-medium text-red-700">
                          {errors.name}
                        </p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="bk-mobile" className="field-label">
                        Mobile Number *
                      </label>
                      <input
                        id="bk-mobile"
                        className="field"
                        placeholder="10-digit mobile number"
                        inputMode="numeric"
                        value={form.mobile}
                        onChange={set("mobile")}
                        autoComplete="tel"
                      />
                      {errors.mobile && (
                        <p className="mt-1.5 text-[12.5px] font-medium text-red-700">
                          {errors.mobile}
                        </p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="bk-email" className="field-label">
                        Email
                      </label>
                      <input
                        id="bk-email"
                        type="email"
                        className="field"
                        placeholder="you@example.com"
                        value={form.email}
                        onChange={set("email")}
                        autoComplete="email"
                      />
                      {errors.email && (
                        <p className="mt-1.5 text-[12.5px] font-medium text-red-700">
                          {errors.email}
                        </p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="bk-age" className="field-label">
                        Age
                      </label>
                      <input
                        id="bk-age"
                        className="field"
                        placeholder="e.g. 45"
                        inputMode="numeric"
                        value={form.age}
                        onChange={set("age")}
                      />
                    </div>
                    <div>
                      <label htmlFor="bk-date" className="field-label">
                        Preferred Date
                      </label>
                      <input
                        id="bk-date"
                        type="date"
                        className="field"
                        value={form.date}
                        onChange={set("date")}
                      />
                    </div>
                    <div>
                      <label htmlFor="bk-time" className="field-label">
                        Preferred Time
                      </label>
                      <select
                        id="bk-time"
                        className="field"
                        value={form.time}
                        onChange={set("time")}
                      >
                        <option value="">No preference</option>
                        <option>Morning</option>
                        <option>Afternoon</option>
                        <option>Evening</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="bk-concern" className="field-label">
                        Main Concern
                      </label>
                      <select
                        id="bk-concern"
                        className="field"
                        value={form.concern}
                        onChange={set("concern")}
                      >
                        <option value="">Select a concern</option>
                        {conditions.map((c) => (
                          <option key={c.slug} value={c.title}>
                            {c.title}
                          </option>
                        ))}
                        <option>Other / Not sure</option>
                      </select>
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="bk-message" className="field-label">
                        Message
                      </label>
                      <textarea
                        id="bk-message"
                        className="field field-area"
                        placeholder="Briefly describe what's been going on (optional)"
                        value={form.message}
                        onChange={set("message")}
                      />
                    </div>
                  </div>
                  <div className="mt-7">
                    <Button type="submit" size="lg" className="w-full sm:w-auto">
                      Request Consultation
                      <Icon name="arrow-right" className="h-4.5 w-4.5" strokeWidth={2} />
                    </Button>
                  </div>
                  <p className="mt-5 text-[12.5px] leading-relaxed text-ink-400">
                    By submitting, you agree to be contacted about your
                    consultation. Your details are kept confidential.
                  </p>
                </form>
              )}

              {!submitted && (
                <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-3 rounded-2xl border border-forest-900/10 bg-ivory-100 px-6 py-5">
                  <p className="text-[13.5px] font-medium text-ink-700">
                    Prefer to talk?
                  </p>
                  <a
                    href={site.phoneHref}
                    className="flex items-center gap-2 font-display text-[15px] font-bold text-forest-800 transition-colors hover:text-forest-600"
                  >
                    <Icon name="phone" className="h-4 w-4" strokeWidth={2} />
                    Call {site.phone}
                  </a>
                  <a
                    href={`mailto:${site.email}`}
                    className="flex items-center gap-2 break-all text-[13.5px] font-medium text-ink-700 transition-colors hover:text-forest-800"
                  >
                    <Icon name="mail" className="h-4 w-4" strokeWidth={2} />
                    {site.email}
                  </a>
                </div>
              )}
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
