"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { cn } from "@/utils/cn";
import type { Faq } from "@/data/content";

/* ------------------------------------------------------------------ */
/*  SEO                                                                */
/* ------------------------------------------------------------------ */

export function usePageMeta(title: string, description?: string) {
  useEffect(() => {
    document.title = title;
    if (description) {
      let el = document.querySelector('meta[name="description"]');
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute("name", "description");
        document.head.appendChild(el);
      }
      el.setAttribute("content", description);
    }
  }, [title, description]);
}

/* ------------------------------------------------------------------ */
/*  Icons                                                              */
/* ------------------------------------------------------------------ */

const paths: Record<string, React.ReactNode> = {
  phone: (
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
  ),
  mail: (
    <>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-10 5L2 7" />
    </>
  ),
  pin: (
    <>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
      <circle cx="12" cy="10" r="3" />
    </>
  ),
  "arrow-right": (
    <>
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </>
  ),
  check: <path d="M20 6 9 17l-5-5" />,
  leaf: (
    <>
      <path d="M6 21c-1-7 3-14 14-16 1 8-3 15-12 15" />
      <path d="M6 21c3-6 7-10 12-13" />
    </>
  ),
  "chevron-down": <path d="m6 9 6 6 6-6" />,
  menu: (
    <>
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
    </>
  ),
  x: (
    <>
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </>
  ),
  shield: (
    <path d="M12 22s8-3.5 8-10V5.5L12 2 4 5.5V12c0 6.5 8 10 8 10z" />
  ),
  user: (
    <>
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </>
  ),
  chat: (
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  ),
  pulse: <path d="M22 12h-4l-3 8L9 4l-3 8H2" />,
  heart: (
    <path d="M19.5 13.5 12 21l-7.5-7.5a5 5 0 1 1 7.5-6.6 5 5 0 1 1 7.5 6.6z" />
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </>
  ),
  plus: (
    <>
      <path d="M12 5v14" />
      <path d="M5 12h14" />
    </>
  ),
};

export function Icon({
  name,
  className,
  strokeWidth = 1.8,
}: {
  name: keyof typeof paths | string;
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("h-5 w-5", className)}
      aria-hidden="true"
    >
      {paths[name] ?? paths.leaf}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Scroll reveal                                                      */
/* ------------------------------------------------------------------ */

export function Reveal({
  children,
  className,
  delay = 0,
  scale = false,
  as: Tag = "div" as React.ElementType,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  scale?: boolean;
  as?: React.ElementType;
}) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            el.classList.add("is-visible");
            io.disconnect();
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -36px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as React.Ref<never>}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={cn("reveal", scale && "reveal-scale", className)}
    >
      {children}
    </Tag>
  );
}

/* ------------------------------------------------------------------ */
/*  Buttons                                                            */
/* ------------------------------------------------------------------ */

const btnStyles = {
  primary:
    "bg-forest-800 text-ivory-50 hover:bg-forest-700 hover:-translate-y-0.5 shadow-card",
  outline:
    "border border-forest-800/25 text-forest-800 hover:border-forest-800/60 hover:bg-forest-800/5",
  light: "bg-ivory-50 text-forest-900 hover:bg-white hover:-translate-y-0.5 shadow-card",
  lightOutline:
    "border border-ivory-50/40 text-ivory-50 hover:border-ivory-50/80 hover:bg-white/10",
  gold: "bg-gold-400 text-forest-950 hover:bg-gold-300 hover:-translate-y-0.5 shadow-card",
};

export function Button({
  to,
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  onClick,
  type = "button",
  ariaLabel,
}: {
  to?: string;
  href?: string;
  variant?: keyof typeof btnStyles;
  size?: "sm" | "md" | "lg";
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  ariaLabel?: string;
}) {
  const cls = cn(
    "btn",
    size === "sm" && "h-10 px-5 text-[13px]",
    size === "md" && "h-12 px-7 text-sm",
    size === "lg" && "h-[3.4rem] px-8 text-[15px]",
    btnStyles[variant],
    className
  );

  if (to)
    return (
      <Link href={to} className={cls} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  if (href)
    return (
      <a href={href} className={cls} aria-label={ariaLabel}>
        {children}
      </a>
    );
  return (
    <button type={type} onClick={onClick} className={cls} aria-label={ariaLabel}>
      {children}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  Section heading                                                    */
/* ------------------------------------------------------------------ */

export function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 font-display text-[11px] font-bold uppercase tracking-[0.24em]",
        className ?? "text-forest-700"
      )}
    >
      <Icon name="leaf" className="h-3.5 w-3.5 text-gold-500" strokeWidth={2.2} />
      {children}
    </span>
  );
}

export function SectionHead({
  eyebrow,
  title,
  text,
  center = false,
  dark = false,
  className,
}: {
  eyebrow: string;
  title: string;
  text?: string;
  center?: boolean;
  dark?: boolean;
  className?: string;
}) {
  return (
    <Reveal
      className={cn(
        "max-w-2xl",
        center && "mx-auto text-center",
        className
      )}
    >
      <Eyebrow className={dark ? "text-botanical-300" : undefined}>
        {eyebrow}
      </Eyebrow>
      <h2
        className={cn(
          "mt-4 text-balance text-3xl font-bold leading-[1.12] tracking-tight md:text-[2.6rem]",
          dark ? "text-ivory-50" : "text-forest-900"
        )}
      >
        {title}
      </h2>
      {text && (
        <p
          className={cn(
            "mt-5 text-[15px] leading-relaxed md:text-base",
            dark ? "text-ivory-100/70" : "text-ink-500"
          )}
        >
          {text}
        </p>
      )}
    </Reveal>
  );
}

/* ------------------------------------------------------------------ */
/*  Accordion                                                          */
/* ------------------------------------------------------------------ */

export function Accordion({
  items,
  className,
}: {
  items: Faq[];
  className?: string;
}) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className={cn("divide-y divide-forest-900/10", className)}>
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="group flex w-full items-center justify-between gap-4 py-5 text-left"
            >
              <span
                className={cn(
                  "font-display text-[15px] font-semibold transition-colors md:text-base",
                  isOpen ? "text-forest-800" : "text-ink-900 group-hover:text-forest-800"
                )}
              >
                {item.q}
              </span>
              <span
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300",
                  isOpen
                    ? "rotate-45 border-forest-800 bg-forest-800 text-ivory-50"
                    : "border-forest-900/15 text-forest-800 group-hover:border-forest-800/50"
                )}
              >
                <Icon name="plus" className="h-4 w-4" strokeWidth={2} />
              </span>
            </button>
            <div className={cn("accordion-body", isOpen && "open")}>
              <div className="accordion-inner">
                <p className="pb-6 pr-2 text-[14.5px] leading-relaxed text-ink-500 md:pr-12">
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Botanical background decoration                                    */
/* ------------------------------------------------------------------ */

export function Botanical({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 600 600"
      fill="none"
      aria-hidden="true"
      className={cn("pointer-events-none select-none", className)}
    >
      <path
        d="M600 60C480 80 380 160 350 290c-12 52-8 102 12 146 46-18 94-20 146-12C638 400 668 240 600 60z"
        fill="currentColor"
        opacity="0.5"
      />
      <path
        d="M600 340c-84 6-156 52-186 138-10 30-8 62 4 92 30-12 62-14 92-4 56-44 92-120 90-226z"
        fill="currentColor"
        opacity="0.35"
      />
      <path
        d="M368 442c-56 12-100 52-114 114"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.5"
      />
      <circle cx="330" cy="470" r="5" fill="currentColor" opacity="0.6" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Disclaimer                                                         */
/* ------------------------------------------------------------------ */

export function Disclaimer({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-start gap-3 rounded-2xl border border-gold-500/25 bg-gold-100/50 p-5",
        className
      )}
    >
      <Icon name="shield" className="mt-0.5 h-4.5 w-4.5 shrink-0 text-gold-600" />
      <p className="text-[13px] leading-relaxed text-ink-700">{text}</p>
    </div>
  );
}
