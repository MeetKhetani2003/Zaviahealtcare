"use client";
import { useState, useEffect } from "react";
import { Icon, Button, Reveal } from "@/components/ui";

type PageData = {
  image: string;
  contactDetails: { phone: string; email: string };
  formFields: Array<{
    id: string;
    label: string;
    type: string;
    placeholder?: string;
    required?: boolean;
    options?: string[];
  }>;
};

export default function BookConsultation() {
  const [data, setData] = useState<PageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState<Record<string, string> | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    fetch('/api/pages/free-assessment')
      .then(res => res.json())
      .then(res => {
        setData(res);
        // Initialize form state
        const initialForm: Record<string, string> = {};
        res.formFields.forEach((f: any) => {
          initialForm[f.id] = "";
        });
        setForm(initialForm);
        setLoading(false);
      });
  }, []);

  const set = (key: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    setErrors((er) => ({ ...er, [key]: "" }));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!data) return;

    const er: Record<string, string> = {};
    data.formFields.forEach(field => {
      if (field.required && (!form[field.id] || form[field.id].trim() === '')) {
        er[field.id] = `${field.label} is required.`;
      }
    });

    setErrors(er);

    if (Object.keys(er).length === 0) {
      setIsSubmitting(true);
      setSubmitError("");
      try {
        const res = await fetch('/api/inquiries', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form)
        });
        if (res.ok) {
          setSubmitted(form);
          window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
          setSubmitError("Something went wrong. Please try again.");
        }
      } catch (err) {
        setSubmitError("Failed to submit. Please check your connection.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  if (loading || !data) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-forest-700 font-bold">Loading assessment form...</div>
      </div>
    );
  }

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
              convenient time. Everything you share stays confidential.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            {/* left — doctor */}
            <Reveal scale className="relative">
              <div className="overflow-hidden rounded-[2rem] border border-forest-900/10 shadow-soft">
                <img
                  src={data.image}
                  alt="Doctor"
                  width={900}
                  height={1050}
                  className="aspect-[6/7] w-full object-cover"
                />
              </div>
              <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-forest-900/10 bg-white/95 p-5 shadow-lift backdrop-blur-sm">
                <div className="grid gap-2 sm:grid-cols-2">
                  <a
                    href={`tel:${data.contactDetails.phone}`}
                    className="flex items-center gap-2 font-display text-[14px] font-bold text-forest-800 transition-colors hover:text-forest-600"
                  >
                    <Icon name="phone" className="h-4 w-4" strokeWidth={2} />
                    {data.contactDetails.phone}
                  </a>
                  <a
                    href={`mailto:${data.contactDetails.email}`}
                    className="flex items-center gap-2 break-all text-[13px] font-medium text-ink-700 transition-colors hover:text-forest-800"
                  >
                    <Icon name="mail" className="h-4 w-4 shrink-0" strokeWidth={2} />
                    {data.contactDetails.email}
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
                    Thank you. Your consultation request has been successfully submitted. Our team will review your details and contact you shortly.
                  </p>
                  <div className="mt-7 flex flex-wrap gap-4">
                    <Button href={`tel:${data.contactDetails.phone}`}>
                      <Icon name="phone" className="h-4 w-4" strokeWidth={2} />
                      Call Now
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSubmitted(null);
                        setForm(Object.keys(form).reduce((acc, key) => ({ ...acc, [key]: "" }), {}));
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
                    {data.formFields.map(field => {
                      const isFullWidth = field.type === 'textarea' || field.id === 'name' || field.id === 'message' || field.id === 'concern';
                      return (
                        <div key={field.id} className={isFullWidth ? 'sm:col-span-2' : ''}>
                          <label htmlFor={field.id} className="field-label">
                            {field.label} {field.required && '*'}
                          </label>
                          
                          {field.type === 'select' ? (
                            <select
                              id={field.id}
                              className="field"
                              value={form[field.id]}
                              onChange={set(field.id)}
                            >
                              <option value="">Select...</option>
                              {field.options?.map(opt => (
                                <option key={opt} value={opt}>{opt}</option>
                              ))}
                            </select>
                          ) : field.type === 'textarea' ? (
                            <textarea
                              id={field.id}
                              className="field field-area"
                              placeholder={field.placeholder}
                              value={form[field.id]}
                              onChange={set(field.id)}
                            />
                          ) : (
                            <input
                              id={field.id}
                              type={field.type}
                              className="field"
                              placeholder={field.placeholder}
                              value={form[field.id]}
                              onChange={set(field.id)}
                              inputMode={field.type === 'number' || field.id.includes('mobile') || field.id.includes('phone') ? 'numeric' : 'text'}
                            />
                          )}
                          
                          {errors[field.id] && (
                            <p className="mt-1.5 text-[12.5px] font-medium text-red-700">
                              {errors[field.id]}
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                  <div className="mt-7">
                    <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={isSubmitting}>
                      {isSubmitting ? "Submitting..." : "Submit Consultation Request"}
                    </Button>
                    {submitError && <p className="mt-2 text-red-600 text-sm font-medium">{submitError}</p>}
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
                    href={`tel:${data.contactDetails.phone}`}
                    className="flex items-center gap-2 font-display text-[15px] font-bold text-forest-800 transition-colors hover:text-forest-600"
                  >
                    <Icon name="phone" className="h-4 w-4" strokeWidth={2} />
                    Call {data.contactDetails.phone}
                  </a>
                  <a
                    href={`mailto:${data.contactDetails.email}`}
                    className="flex items-center gap-2 break-all text-[13.5px] font-medium text-ink-700 transition-colors hover:text-forest-800"
                  >
                    <Icon name="mail" className="h-4 w-4" strokeWidth={2} />
                    {data.contactDetails.email}
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
