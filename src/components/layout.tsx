"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "../utils/cn";
import { IMG } from "../assets";
import { nav, site, conditions, disclaimer } from "../data/content";
import { Botanical, Button, Icon } from "./ui";

/* ------------------------------------------------------------------ */
/*  Logo                                                               */
/* ------------------------------------------------------------------ */

export function Logo({
  className,
  onDark = false,
}: {
  className?: string;
  onDark?: boolean;
}) {
  return (
    <Link href="/" aria-label="ZivRA HEALTH — Home" className="inline-block">
      <span
        className={cn(
          "block overflow-hidden transition-all duration-500",
          onDark
            ? "rounded-xl bg-ivory-50 px-3 py-2"
            : "mix-blend-multiply",
          className
        )}
      >
        <img
          src={IMG.logo}
          alt="ZivRA HEALTH logo"
          className="h-full w-auto"
          draggable={false}
        />
      </span>
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/*  Header                                                             */
/* ------------------------------------------------------------------ */

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500 border-b border-forest-900/10 bg-ivory-50/95 shadow-sm backdrop-blur-sm",
          scrolled ? "shadow-[0_8px_30px_-18px_rgb(18_45_35/0.3)]" : ""
        )}
      >
        <div
          className={cn(
            "container-x flex items-center justify-between gap-4 transition-all duration-500",
            scrolled ? "py-2.5" : "py-4 md:py-5"
          )}
        >
          <Logo className="h-16 md:h-20" />

          <nav className="hidden items-center gap-7 xl:flex" aria-label="Main">
            {nav.map((item) => (
              <Link
                key={item.to}
                href={item.to}
                className={cn(
                  "font-display text-[13.5px] font-semibold transition-colors duration-300",
                  pathname === item.to
                    ? "text-forest-800 underline decoration-gold-500 decoration-2 underline-offset-8"
                    : "text-ink-700 hover:text-forest-800"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2.5 md:gap-3">
            <a
              href={site.phoneHref}
              className="hidden items-center gap-2.5 rounded-full border border-forest-900/15 py-2 pl-2.5 pr-4 transition-colors duration-300 hover:border-forest-800/50 lg:flex"
              aria-label={`Call ${site.phone}`}
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-forest-800 text-ivory-50">
                <Icon name="phone" className="h-3.5 w-3.5" strokeWidth={2} />
              </span>
              <span className="font-display text-[13px] font-bold tracking-wide text-forest-900">
                {site.phone}
              </span>
            </a>
            <Button href="/secure-assessment" size="sm" className="hidden sm:inline-flex">
              Secure Assessment
            </Button>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-forest-900/15 text-forest-900 transition-colors hover:border-forest-800/50 xl:hidden"
            >
              <Icon name="menu" strokeWidth={2} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className={cn(
          "fixed inset-0 z-[60] transition-opacity duration-300 xl:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        aria-hidden={!open}
      >
        <div
          className="absolute inset-0 bg-forest-950/50"
          onClick={() => setOpen(false)}
        />
        <div
          className={cn(
            "absolute right-0 top-0 flex h-full w-[min(24rem,100%)] flex-col overflow-y-auto bg-ivory-50 shadow-soft transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
            open ? "translate-x-0" : "translate-x-full"
          )}
        >
          <div className="flex items-center justify-between border-b border-forest-900/10 px-6 py-5">
            <Logo className="h-14" />
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-forest-900/15 text-forest-900"
            >
              <Icon name="x" strokeWidth={2} />
            </button>
          </div>
          <nav className="flex flex-col px-6 py-6" aria-label="Mobile">
            {nav.map((item, i) => (
              <Link
                key={item.to}
                href={item.to}
                style={{ transitionDelay: `${i * 30}ms` }}
                className={cn(
                  "border-b border-forest-900/5 py-4 font-display text-xl font-bold transition-colors",
                  pathname === item.to ? "text-forest-800" : "text-ink-900"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-auto space-y-3 bg-white px-6 py-6">
            <Button href="/secure-assessment" className="w-full">
              Secure Assessment
            </Button>
            <Button href={site.phoneHref} variant="outline" className="w-full">
              <Icon name="phone" className="h-4 w-4" strokeWidth={2} />
              Call {site.phone}
            </Button>
            <p className="pt-2 text-center text-[12px] leading-relaxed text-ink-400">
              {site.address}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Mobile sticky CTA                                                  */
/* ------------------------------------------------------------------ */

export function MobileCTA() {
  const pathname = usePathname();
  if (pathname === "/secure-assessment" || pathname === "/contact") return null;
  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 border-t border-forest-900/10 bg-white/95 backdrop-blur-sm md:hidden",
        "[padding-bottom:env(safe-area-inset-bottom)]"
      )}
    >
      <Link
        href="/secure-assessment"
        className="flex h-14 items-center justify-center gap-2 bg-forest-800 font-display text-[13.5px] font-bold text-ivory-50"
      >
        <Icon name="calendar" className="h-4 w-4" strokeWidth={2} />
        Secure Assessment
      </Link>
      <a
        href={site.phoneHref}
        className="flex h-14 items-center justify-center gap-2 font-display text-[13.5px] font-bold text-forest-800"
      >
        <Icon name="phone" className="h-4 w-4" strokeWidth={2} />
        Call Now
      </a>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Footer                                                             */
/* ------------------------------------------------------------------ */

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-forest-950 pb-24 pt-16 text-ivory-100 md:pb-10 md:pt-20">
      <Botanical className="absolute -right-24 -top-24 h-96 w-96 text-botanical-500/10" />
      <div className="container-x relative">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.3fr_0.8fr_0.8fr_1.1fr]">
          <div>
            <Logo onDark className="h-20" />
            <p className="mt-6 max-w-sm text-[14px] leading-relaxed text-ivory-100/60">
              Personalised, patient-centred urological care in{" "}
              {site.location}, led by {site.doctor}, {site.qualification} —
              urologist with {site.experience.toLowerCase()}.
            </p>
            <div className="mt-7">
              <Button href="/secure-assessment" variant="gold" size="sm">
                Secure Assessment
                <Icon name="arrow-right" className="h-4 w-4" strokeWidth={2} />
              </Button>
            </div>
          </div>

          <div>
            <h3 className="font-display text-[12px] font-bold uppercase tracking-[0.22em] text-gold-300">
              Explore
            </h3>
            <ul className="mt-5 space-y-3">
              {nav.map((item) => (
                <li key={item.to}>
                  <Link
                    href={item.to}
                    className="text-[14px] text-ivory-100/65 transition-colors hover:text-ivory-50"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-[12px] font-bold uppercase tracking-[0.22em] text-gold-300">
              Conditions
            </h3>
            <ul className="mt-5 space-y-3">
              {conditions.slice(0, 5).map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/conditions/${c.slug}`}
                    className="text-[14px] text-ivory-100/65 transition-colors hover:text-ivory-50"
                  >
                    {c.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/conditions"
                  className="text-[14px] font-semibold text-gold-300 transition-colors hover:text-gold-100"
                >
                  View all conditions →
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-[12px] font-bold uppercase tracking-[0.22em] text-gold-300">
              Contact
            </h3>
            <ul className="mt-5 space-y-4 text-[14px] text-ivory-100/65">
              <li>
                <a
                  href={site.phoneHref}
                  className="flex items-start gap-3 transition-colors hover:text-ivory-50"
                >
                  <Icon name="phone" className="mt-0.5 h-4 w-4 shrink-0 text-gold-300" />
                  {site.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="flex items-start gap-3 break-all transition-colors hover:text-ivory-50"
                >
                  <Icon name="mail" className="mt-0.5 h-4 w-4 shrink-0 text-gold-300" />
                  {site.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Icon name="pin" className="mt-0.5 h-4 w-4 shrink-0 text-gold-300" />
                {site.address}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 border-t border-ivory-50/10 pt-8">
          <p className="text-[12px] leading-relaxed text-ivory-100/40">{disclaimer}</p>
          <p className="mt-4 font-display text-[12.5px] font-semibold tracking-wide text-ivory-100/60">
            © 2026 ZivRA HEALTH. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/*  Scroll restore                                                     */
/* ------------------------------------------------------------------ */

export function ScrollToTop() {
  const pathname = usePathname();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);
  return null;
}

/* ------------------------------------------------------------------ */
/*  Layout                                                             */
/* ------------------------------------------------------------------ */

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin');

  return (
    <div className="flex min-h-screen flex-col font-sans antialiased">
      {!isAdmin && <Header />}
      <main className="flex-1">{children}</main>
      {!isAdmin && <Footer />}
      {!isAdmin && <MobileCTA />}
      {!isAdmin && (
        <a
          href="https://wa.me/917004553815"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-[80px] right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-110 md:bottom-10 md:right-10"
          aria-label="Chat on WhatsApp"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.347-.272.297-1.04 1.016-1.04 2.479 0 1.463 1.065 2.876 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
          </svg>
        </a>
      )}
    </div>
  );
}
