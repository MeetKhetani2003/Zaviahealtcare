// @ts-nocheck
"use client";

// @ts-nocheck
"use client";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";

/* ═══════════════════════════════════════════════════════════
   BRAND TOKENS
═══════════════════════════════════════════════════════════ */
export const T = {
  forest:  "#1B3A2D",
  pine:    "#2D6A4F",
  leaf:    "#52B788",
  olive:   "#4A6741",
  oliveLight: "#6B8C5A",
  gold:    "#A07928",
  goldLt:  "#F5E9C8",
  cream:   "#F8F5EC",
  cream2:  "#F0EDE3",
  white:   "#FFFFFF",
  ink:     "#1A2E1E",
  muted:   "#5C6B5E",
  border:  "#D8E6DC",
  danger:  "#C0392B",
  success: "#1B7A4A",
  info:    "#1A56A4",
};

/* ═══════════════════════════════════════════════════════════
   GLOBAL CSS
═══════════════════════════════════════════════════════════ */
export const Styles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500&family=Inter:wght@400;500;600;700;800&display=swap');
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
    html{scroll-behavior:smooth}
    body{font-family:'Inter',system-ui,sans-serif;background:#fff;color:${T.ink}}

    /* Scroll progress */
    #zprog{position:fixed;top:0;left:0;height:3px;background:${T.gold};z-index:10000;width:0;transition:width .1s linear}

    /* WhatsApp FAB */
    .wa-fab{position:fixed;bottom:24px;right:24px;z-index:9000;width:56px;height:56px;
      border-radius:50%;background:#25D366;border:none;cursor:pointer;
      display:flex;align-items:center;justify-content:center;font-size:26px;
      box-shadow:0 4px 20px rgba(37,211,102,0.45);
      animation:waPulse 2.5s infinite}
    @keyframes waPulse{0%,100%{box-shadow:0 4px 20px rgba(37,211,102,0.4)}
      50%{box-shadow:0 4px 30px rgba(37,211,102,0.65),0 0 0 8px rgba(37,211,102,0.1)}}

    /* Mobile CTA bar */
    .mob-bar{display:none;position:fixed;bottom:0;left:0;right:0;z-index:8000;
      background:#fff;border-top:1px solid ${T.border};
      padding:10px 16px;gap:10px;align-items:center}
    @media(max-width:768px){.mob-bar{display:flex}.wa-fab{bottom:76px}}

    /* Nav */
    .nav-link{background:none;border:none;cursor:pointer;font-size:14px;font-weight:500;
      padding:7px 13px;border-radius:7px;transition:all .2s;font-family:'Inter',sans-serif;
      color:rgba(255,255,255,.75)}
    .nav-link:hover{color:#fff;background:rgba(255,255,255,.08)}
    .nav-link.active{color:#fff}
    .nav-scrolled .nav-link{color:${T.muted}}
    .nav-scrolled .nav-link:hover,.nav-scrolled .nav-link.active{color:${T.pine}}

    /* Primary button */
    .btn-primary{background:${T.pine};color:#fff;border:none;border-radius:8px;
      font-weight:700;font-family:'Inter',sans-serif;cursor:pointer;
      transition:all .2s;letter-spacing:.01em}
    .btn-primary:hover{background:${T.forest};transform:translateY(-1px);
      box-shadow:0 6px 20px rgba(45,106,79,0.3)}

    /* Gold button */
    .btn-gold{background:${T.gold};color:#fff;border:none;border-radius:8px;
      font-weight:700;font-family:'Inter',sans-serif;cursor:pointer;transition:all .2s}
    .btn-gold:hover{filter:brightness(1.08);transform:translateY(-1px)}

    /* Outline button */
    .btn-outline{background:transparent;border:2px solid rgba(255,255,255,.35);
      color:#fff;border-radius:8px;font-weight:600;cursor:pointer;
      font-family:'Inter',sans-serif;transition:all .2s}
    .btn-outline:hover{border-color:#fff;background:rgba(255,255,255,.08)}

    /* Outline dark */
    .btn-outline-dark{background:transparent;border:1.5px solid ${T.border};
      color:${T.ink};border-radius:8px;font-weight:600;cursor:pointer;
      font-family:'Inter',sans-serif;transition:all .2s}
    .btn-outline-dark:hover{border-color:${T.pine};color:${T.pine}}

    /* Cards */
    .card-lift{transition:transform .25s,box-shadow .25s;border-radius:14px}
    .card-lift:hover{transform:translateY(-4px);box-shadow:0 12px 36px rgba(27,58,45,.12)}

    /* Traya: Ingredient card */
    .ingr-card{flex-shrink:0;width:200px;background:#fff;border-radius:18px;
      padding:22px 16px 18px;display:flex;flex-direction:column;align-items:center;
      box-shadow:0 2px 14px rgba(27,58,45,.07);transition:transform .25s,box-shadow .25s}
    .ingr-card:hover{transform:translateY(-5px);box-shadow:0 10px 30px rgba(27,58,45,.13)}

    /* Traya: Cause card */
    .cause-card{flex-shrink:0;width:215px;background:${T.cream};border-radius:16px;
      padding:24px 18px 22px;display:flex;flex-direction:column;align-items:flex-start}

    /* Traya: Step card */
    .step-card-tr{flex:1;min-width:280px;background:#F5F5F5;border-radius:16px;
      padding:26px 22px 0 22px;display:flex;justify-content:space-between;
      align-items:flex-end;overflow:hidden;min-height:180px;
      transition:box-shadow .25s}
    .step-card-tr:hover{box-shadow:0 8px 28px rgba(27,58,45,.11)}

    /* Traya: Scroll track */
    .scroll-x{display:flex;gap:16px;overflow-x:auto;padding:6px 2px 20px;
      scrollbar-width:none;-ms-overflow-style:none}
    .scroll-x::-webkit-scrollbar{display:none}

    /* Nav arrow */
    .arr-btn{width:40px;height:40px;border-radius:50%;border:1.5px solid #ccc;
      background:#fff;display:flex;align-items:center;justify-content:center;
      cursor:pointer;font-size:17px;color:#444;transition:all .2s;flex-shrink:0}
    .arr-btn:hover{border-color:${T.pine};color:${T.pine}}

    /* Traya: Before/After card */
    .ba-card{width:250px;flex-shrink:0;background:rgba(255,255,255,.09);
      border:1px solid rgba(255,255,255,.18);border-radius:16px;overflow:hidden}

    /* FAQ */
    .faq-item{border-bottom:1px solid ${T.border}}
    .faq-q{width:100%;background:none;border:none;text-align:left;cursor:pointer;
      padding:18px 0;display:flex;justify-content:space-between;align-items:center;
      font-size:15px;font-weight:600;color:${T.ink};font-family:'Inter',sans-serif}
    .faq-body{overflow:hidden;max-height:0;transition:max-height .35s ease}
    .faq-body.open{max-height:220px}

    /* Assessment */
    .quiz-opt{width:100%;border:2px solid ${T.border};border-radius:10px;padding:13px 16px;
      cursor:pointer;background:#fff;font-family:'Inter',sans-serif;font-size:14px;
      color:${T.ink};text-align:left;transition:all .2s}
    .quiz-opt:hover{border-color:${T.leaf};background:${T.cream}}
    .quiz-opt.sel{border-color:${T.pine};background:rgba(45,106,79,.07);
      color:${T.pine};font-weight:600}

    /* Form */
    .fi{width:100%;padding:13px 15px;border:1.5px solid ${T.border};border-radius:9px;
      font-size:15px;outline:none;font-family:'Inter',sans-serif;color:${T.ink};
      transition:border-color .2s}
    .fi:focus{border-color:${T.pine}}

    /* Range slider */
    input[type=range]{-webkit-appearance:none;width:100%;height:5px;
      border-radius:3px;background:${T.border};outline:none}
    input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;
      width:20px;height:20px;border-radius:50%;background:${T.pine};cursor:pointer}

    /* Section tag */
    .stag{font-size:11px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;
      color:${T.olive};margin-bottom:10px}
    .stag-white{font-size:11px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;
      color:${T.leaf};margin-bottom:10px}

    /* Heading */
    .h-serif{font-family:'Cormorant Garamond',Georgia,serif;font-weight:700;line-height:1.15}

    /* Ticker */
    @keyframes tick{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
    .tick-inner{display:flex;animation:tick 24s linear infinite;white-space:nowrap}
    .tick-inner:hover{animation-play-state:paused}

    /* Toggle */
    .tgl-btn{padding:8px 26px;border:none;font-size:12px;font-weight:700;
      letter-spacing:.07em;text-transform:uppercase;cursor:pointer;
      font-family:'Inter',sans-serif;border-radius:6px;transition:all .2s}

    /* Dashboard card */
    .dash-card{background:#fff;border-radius:14px;border:1px solid ${T.border};
      padding:22px;box-shadow:0 2px 12px rgba(27,58,45,.06)}

    /* Step indicator dot */
    .step-dot{width:32px;height:32px;border-radius:50%;display:flex;align-items:center;
      justify-content:center;font-size:13px;font-weight:700;flex-shrink:0;
      transition:all .3s}

    /* Fade in */
    .fade-in{animation:fi .4s ease forwards}
    @keyframes fi{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}

    /* Responsive */
    @media(max-width:768px){
      .steps-row-tr,.hero-flex,.research-flex,.about-flex{flex-direction:column!important}
      .hide-mob{display:none!important}
      .full-mob{width:100%!important}
    }
    @media(max-width:640px){
      .tl-row{flex-direction:column!important;align-items:flex-start!important}
      .tl-line{display:none!important}
    }
  `}</style>
);

/* ═══════════════════════════════════════════════════════════
   LOGO SVG
═══════════════════════════════════════════════════════════ */
export const Logo = ({ size = 38 }) => (
  <svg width={size * 2.2} height={size} viewBox="0 0 160 72" fill="none">
    <path d="M56 48 Q46 34 54 18 Q60 28 74 16 Q88 28 94 18 Q102 34 92 48"
      stroke={T.forest} strokeWidth="2.6" fill="none" strokeLinecap="round"/>
    <path d="M56 48 Q50 56 58 64 Q64 58 68 48Z" fill={T.leaf} opacity=".8"/>
    <path d="M92 48 Q98 56 90 64 Q84 58 80 48Z" fill={T.leaf} opacity=".8"/>
    <path d="M74 52 Q70 40 74 22 Q78 40 74 52Z" fill={T.forest}/>
    <path d="M74 50 Q63 44 60 30 Q68 40 74 50Z" fill={T.olive}/>
    <path d="M74 50 Q85 44 88 30 Q80 40 74 50Z" fill={T.olive}/>
    <line x1="74" y1="54" x2="74" y2="62" stroke={T.gold} strokeWidth="2.2" strokeLinecap="round"/>
    <circle cx="74" cy="11" r="3.5" fill={T.forest}/>
    <path d="M64 20 Q69 15 74 17 Q79 15 84 20" stroke={T.forest} strokeWidth="2"
      fill="none" strokeLinecap="round"/>
    <text x="93" y="48" fontFamily="'Inter',Arial,sans-serif" fontWeight="800"
      fontSize="18" fill={T.forest} letterSpacing="2">ZIVRA</text>
    <text x="93" y="62" fontFamily="'Inter',Arial,sans-serif"
      fontSize="9" fill={T.olive} letterSpacing="4" fontWeight="600">HEALTH</text>
  </svg>
);

/* ═══════════════════════════════════════════════════════════
   SHARED HELPERS
═══════════════════════════════════════════════════════════ */
export const Wrap = ({ children, style = {} }) => (
  <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 26px", ...style }}>
    {children}
  </div>
);
export const Sp = ({ h = 8 }) => <div style={{ height: h }} />;

/* ═══════════════════════════════════════════════════════════
   SCROLL PROGRESS
═══════════════════════════════════════════════════════════ */
export const ScrollProgress = () => {
  useEffect(() => {
    const el = document.getElementById("zprog");
    const h = () => {
      const pct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
      if (el) el.style.width = Math.min(pct, 100) + "%";
    };
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  return <div id="zprog" />;
};

/* ═══════════════════════════════════════════════════════════
   NAVBAR
═══════════════════════════════════════════════════════════ */
export const Navbar = ({ page, setPage }) => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", h); return () => window.removeEventListener("scroll", h);
  }, []);
  const nav = p => { setPage(p); window.scrollTo(0, 0); };
  const links = [{ k: "home", l: "Home" }, { k: "program", l: "How It Works" },
    { k: "stories", l: "Patient Stories" }, { k: "about", l: "About Us" }];
  return (
    <nav className={scrolled ? "nav-scrolled" : ""}
      style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 999,
        background: scrolled ? "rgba(255,255,255,0.97)" : "transparent",
        backdropFilter: scrolled ? "blur(18px)" : "none",
        boxShadow: scrolled ? `0 1px 20px rgba(27,58,45,.09)` : "none",
        transition: "all .3s" }}>
      <Wrap>
        <div style={{ display: "flex", alignItems: "center", height: 66, gap: 20 }}>
          <button onClick={() => nav("home")}
            style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}>
            <Logo size={36} />
          </button>
          <div className="hide-mob" style={{ display: "flex", flex: 1, gap: 2 }}>
            {links.map(l => (
              <button key={l.k} className={`nav-link${page === l.k ? " active" : ""}`}
                onClick={() => nav(l.k)}>{l.l}</button>
            ))}
          </div>
          <div style={{ marginLeft: "auto", display: "flex", gap: 10, alignItems: "center" }}>
            <button onClick={() => nav("consult")} className="btn-outline-dark hide-mob"
              style={{ padding: "9px 18px", fontSize: 13,
                border: `1.5px solid ${scrolled ? T.border : "rgba(255,255,255,.35)"}`,
                color: scrolled ? T.ink : "#fff" }}>
              Talk to an Expert
            </button>
            <button onClick={() => nav("assessment")} className="btn-primary"
              style={{ padding: "10px 20px", fontSize: 13 }}>
              Take Health Assessment →
            </button>
          </div>
        </div>
      </Wrap>
    </nav>
  );
};

/* ═══════════════════════════════════════════════════════════
   FOOTER
═══════════════════════════════════════════════════════════ */
export const Footer = ({ setPage }) => (
  <footer style={{ background: T.forest, padding: "60px 0 0" }}>
    <Wrap>
      <div style={{ display: "flex", gap: 48, marginBottom: 48, flexWrap: "wrap" }}>
        <div style={{ flex: 2, minWidth: 220 }}>
          <div style={{ marginBottom: 14 }}><Logo size={36} /></div>
          <p style={{ color: "rgba(255,255,255,.5)", fontSize: 13, lineHeight: 1.75,
            maxWidth: 260, marginBottom: 18 }}>
            Science-backed kidney stone care — personalised to you. Diet. Hydration. Lifestyle.
          </p>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            {["📱 WhatsApp", "📸 Instagram", "▶ YouTube", "👍 Facebook"].map(s => (
              <span key={s} style={{ color: "rgba(255,255,255,.32)", fontSize: 12, cursor: "pointer" }}>{s}</span>
            ))}
          </div>
        </div>
        {[{ h: "Platform", ls: ["Health Assessment", "Expert Consultation", "Care Plan", "Patient Dashboard", "Progress Tracking"] },
          { h: "Company", ls: ["About Us", "Our Doctors", "Patient Stories", "Research", "Contact"] },
          { h: "Legal", ls: ["Privacy Policy", "Terms of Use", "Medical Disclaimer", "Cookie Policy"] }
        ].map(({ h, ls }) => (
          <div key={h} style={{ flex: 1, minWidth: 130 }}>
            <div style={{ color: T.white, fontWeight: 700, fontSize: 12,
              letterSpacing: ".06em", textTransform: "uppercase", marginBottom: 14 }}>{h}</div>
            {ls.map(l => (
              <div key={l} style={{ color: "rgba(255,255,255,.38)", fontSize: 13,
                marginBottom: 9, cursor: "pointer" }}>{l}</div>
            ))}
          </div>
        ))}
      </div>
      <div style={{ borderTop: "1px solid rgba(255,255,255,.08)", padding: "18px 0",
        display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
        <span style={{ color: "rgba(255,255,255,.25)", fontSize: 11 }}>
          © 2026 Zivra Health. Dietary and lifestyle guidance only — not a substitute for medical advice.
        </span>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {["UPI", "GPay", "PhonePe", "Paytm", "Razorpay"].map(p => (
            <span key={p} style={{ background: "rgba(255,255,255,.08)", color: "rgba(255,255,255,.4)",
              padding: "2px 8px", borderRadius: 5, fontSize: 10, fontWeight: 600 }}>{p}</span>
          ))}
        </div>
      </div>
    </Wrap>
  </footer>
);

/* ═══════════════════════════════════════════════════════════
   HOME — HERO
═══════════════════════════════════════════════════════════ */
export const Hero = ({ setPage }) => (
  <section style={{ background: `linear-gradient(140deg, ${T.forest} 0%, #1E3D2B 55%, #254D35 100%)`,
    paddingTop: 66, minHeight: "100vh", display: "flex", alignItems: "center",
    position: "relative", overflow: "hidden" }}>
    {[280, 440, 620].map((s, i) => (
      <div key={i} style={{ position: "absolute", right: "-8%", top: "50%",
        transform: "translateY(-50%)", width: s, height: s, borderRadius: "50%",
        border: `1px solid rgba(82,183,136,${0.05 + i * 0.03})`, pointerEvents: "none" }} />
    ))}
    <Wrap>
      <div className="hero-flex" style={{ display: "flex", alignItems: "center", gap: 60, padding: "80px 0" }}>
        <div style={{ flex: 1 }}>
          {/* Trust pill */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8,
            background: "rgba(82,183,136,.12)", border: "1px solid rgba(82,183,136,.25)",
            padding: "6px 16px", borderRadius: 30, marginBottom: 24 }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: T.leaf,
              display: "inline-block", boxShadow: `0 0 6px ${T.leaf}` }} />
            <span style={{ color: T.leaf, fontSize: 12, fontWeight: 600 }}>
              Reviewed by 50+ urologists across India
            </span>
          </div>

          <h1 className="h-serif" style={{ fontSize: "clamp(36px,5vw,62px)",
            color: T.white, marginBottom: 14 }}>
            Kidney stones are painful,<br />
            <span style={{ color: T.leaf }}>expensive, and preventable.</span>
          </h1>
          <p style={{ fontSize: 17, lineHeight: 1.8, color: "rgba(255,255,255,.68)",
            maxWidth: 500, marginBottom: 16 }}>
            Zivra is a personalised healthcare platform that helps you understand,
            treat, and prevent kidney stones — through expert-guided diet, hydration,
            and lifestyle care. No guesswork. No generic advice.
          </p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 32 }}>
            {["✓ Doctor-reviewed protocols", "✓ Personalised to your stone type", "✓ Hindi & English support"].map(t => (
              <span key={t} style={{ color: "rgba(255,255,255,.5)", fontSize: 13 }}>{t}</span>
            ))}
          </div>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <button onClick={() => setPage("assessment")} className="btn-primary"
              style={{ padding: "16px 34px", fontSize: 16, borderRadius: 10 }}>
              Take Your Health Assessment →
            </button>
            <button onClick={() => setPage("consult")} className="btn-outline"
              style={{ padding: "14px 28px", fontSize: 15, borderRadius: 10 }}>
              Talk to an Expert
            </button>
          </div>
        </div>

        {/* Right card */}
        <div className="hide-mob" style={{ flex: "0 0 320px" }}>
          <div style={{ background: "rgba(255,255,255,.05)", border: "1px solid rgba(82,183,136,.2)",
            borderRadius: 20, padding: 26, backdropFilter: "blur(10px)" }}>
            <div style={{ display: "flex", gap: 10, marginBottom: 18 }}>
              <div style={{ width: 44, height: 44, borderRadius: "50%",
                background: `linear-gradient(135deg,${T.leaf},${T.pine})`,
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>👨⚕️</div>
              <div>
                <div style={{ color: T.white, fontWeight: 700, fontSize: 14 }}>Dr. Priya Sharma</div>
                <div style={{ color: T.leaf, fontSize: 12 }}>Nephrologist, 12 yrs exp.</div>
              </div>
            </div>
            <p style={{ color: "rgba(255,255,255,.7)", fontSize: 14, lineHeight: 1.7,
              fontStyle: "italic", marginBottom: 18 }}>
              "Most of my patients could have avoided surgery with the right diet guidance
              at the right time. That's exactly what Zivra provides."
            </p>
            <div style={{ borderTop: "1px solid rgba(255,255,255,.08)", paddingTop: 16,
              display: "flex", justifyContent: "space-between" }}>
              {[["500+","Patients"], ["96%","Stone-free"], ["24hr","Plan delivery"]].map(([v, l]) => (
                <div key={l} style={{ textAlign: "center" }}>
                  <div style={{ color: T.leaf, fontWeight: 800, fontSize: 17 }}>{v}</div>
                  <div style={{ color: "rgba(255,255,255,.35)", fontSize: 10 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
          {/* Live indicator */}
          <div style={{ marginTop: 12, background: "rgba(255,255,255,.04)",
            border: "1px solid rgba(255,255,255,.07)", borderRadius: 12,
            padding: "12px 16px", display: "flex", gap: 10, alignItems: "center" }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#22C55E",
              flexShrink: 0, boxShadow: "0 0 6px #22C55E" }} />
            <span style={{ color: "rgba(255,255,255,.55)", fontSize: 13 }}>
              <b style={{ color: T.white }}>3 experts</b> available for consultation now
            </span>
          </div>
        </div>
      </div>
    </Wrap>
  </section>
);

/* ═══════════════════════════════════════════════════════════
   TICKER
═══════════════════════════════════════════════════════════ */
export const Ticker = () => {
  const items = ["✅ 500+ Patients", "⭐ 96% Stone-free", "🚫 No Surgery in Most Cases",
    "💧 Science-Backed Hydration", "🏆 50+ Partner Doctors",
    "📋 Personalised Care Plan", "🌿 Ayurveda + Modern Science", "🔬 Research-Backed"];
  return (
    <div style={{ background: T.pine, padding: "12px 0", overflow: "hidden" }}>
      <div className="tick-inner">
        {[...items, ...items].map((t, i) => (
          <span key={i} style={{ padding: "0 30px", color: T.white, fontSize: 13,
            fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 8 }}>
            {t}<span style={{ opacity: .3, marginLeft: 8 }}>|</span>
          </span>
        ))}
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════
   TRAYA SECTION 1 — ROOT CAUSES CAROUSEL
═══════════════════════════════════════════════════════════ */
export const RootCausesCarousel = () => {
  const ref = useRef(null);
  const scroll = d => ref.current?.scrollBy({ left: d * 240, behavior: "smooth" });

  const OliveIcon = ({ type }) => {
    const s = { width: 56, height: 56 };
    const col = T.olive; const sw = 1.8;
    const icons = {
      dehydration: <svg {...s} viewBox="0 0 56 56" fill="none">
        <path d="M28 10 Q40 24 40 32 C40 40 34.5 44 28 44 C21.5 44 16 40 16 32 C16 24 28 10 28 10Z"
          stroke={col} strokeWidth={sw} fill="none" strokeLinejoin="round"/>
        <path d="M23 33 Q26 28 28 32 Q30 36 33 32" stroke="#E05A5A" strokeWidth={sw} strokeLinecap="round" fill="none"/>
        <path d="M36 10 L36 16" stroke={col} strokeWidth={sw+.5} strokeLinecap="round"/>
        <circle cx="36" cy="19" r="1.5" fill={col}/></svg>,
      diet: <svg {...s} viewBox="0 0 56 56" fill="none">
        <path d="M16 31 Q16 42 28 42 Q40 42 40 31" stroke={col} strokeWidth={sw} fill="none" strokeLinecap="round"/>
        <line x1="16" y1="31" x2="40" y2="31" stroke={col} strokeWidth={sw}/>
        <path d="M21 25 Q23 19 28 17 Q33 19 35 25" stroke={col} strokeWidth={sw} fill="none" strokeLinecap="round"/>
        <line x1="23" y1="21" x2="27" y2="25" stroke="#E05A5A" strokeWidth={sw} strokeLinecap="round"/>
        <line x1="27" y1="21" x2="23" y2="25" stroke="#E05A5A" strokeWidth={sw} strokeLinecap="round"/></svg>,
      mineral: <svg {...s} viewBox="0 0 56 56" fill="none">
        <polygon points="28,12 40,20 40,36 28,44 16,36 16,20" stroke={col} strokeWidth={sw} fill="none"/>
        <line x1="28" y1="12" x2="28" y2="44" stroke={col} strokeWidth={sw-.6} strokeDasharray="3 2"/>
        <line x1="16" y1="20" x2="40" y2="36" stroke={col} strokeWidth={sw-.6} strokeDasharray="3 2"/>
        <line x1="40" y1="20" x2="16" y2="36" stroke={col} strokeWidth={sw-.6} strokeDasharray="3 2"/></svg>,
      oxalate: <svg {...s} viewBox="0 0 56 56" fill="none">
        <path d="M14 42 Q14 26 28 14 Q42 26 42 42" stroke={col} strokeWidth={sw} fill="none" strokeLinejoin="round"/>
        <path d="M28 14 L28 42" stroke={col} strokeWidth={sw-.6} strokeDasharray="3 2"/>
        <line x1="20" y1="30" x2="34" y2="36" stroke="#E05A5A" strokeWidth={sw} strokeLinecap="round"/>
        <line x1="34" y1="30" x2="20" y2="36" stroke="#E05A5A" strokeWidth={sw} strokeLinecap="round"/></svg>,
      climate: <svg {...s} viewBox="0 0 56 56" fill="none">
        <circle cx="28" cy="22" r="8" stroke={col} strokeWidth={sw} fill="none"/>
        {[0,45,90,135,180,225,270,315].map((a,i)=>{const r=a*Math.PI/180;return(
          <line key={i} x1={28+11*Math.cos(r)} y1={22+11*Math.sin(r)}
            x2={28+14*Math.cos(r)} y2={22+14*Math.sin(r)}
            stroke={col} strokeWidth={sw} strokeLinecap="round"/>);})}
        <path d="M36 37 Q38 41 36 43 Q34 41 36 37Z" stroke={col} strokeWidth={sw-.4} fill="none"/></svg>,
      heredity: <svg {...s} viewBox="0 0 56 56" fill="none">
        <path d="M20 12 Q34 20 20 28 Q34 36 20 44" stroke={col} strokeWidth={sw} fill="none" strokeLinecap="round"/>
        <path d="M36 12 Q22 20 36 28 Q22 36 36 44" stroke={col} strokeWidth={sw} fill="none" strokeLinecap="round"/>
        {[18,24,30,38].map(y=><line key={y} x1="20" y1={y} x2="36" y2={y}
          stroke={col} strokeWidth={sw-.5} strokeLinecap="round"/>)}</svg>,
    };
    return <div style={{ marginBottom: 16 }}>{icons[type]}</div>;
  };

  const causes = [
    { type: "dehydration", title: "Dehydration", desc: "Low water intake concentrates urine, allowing stone-forming minerals to crystallise and accumulate." },
    { type: "diet", title: "Poor Diet", desc: "High sodium, excess protein, and wrong food combinations overload the kidney with harmful waste." },
    { type: "mineral", title: "Mineral Imbalance", desc: "Excess calcium, oxalate, or uric acid in blood gets deposited in kidney tissue, forming painful stones." },
    { type: "oxalate", title: "High Oxalate Foods", desc: "Spinach, tomatoes, and nuts eaten daily dramatically increase stone-forming oxalate levels." },
    { type: "climate", title: "Hot Climate", desc: "India's heat increases sweating, reduces urine volume, and concentrates stone-causing minerals rapidly." },
    { type: "heredity", title: "Family History", desc: "Genetic predisposition to calcium or uric acid overexcretion significantly raises your lifetime stone risk." },
  ];
  return (
    <section style={{ background: T.white, padding: "76px 0 60px" }}>
      <Wrap>
        <div style={{ display: "flex", justifyContent: "space-between",
          alignItems: "flex-start", marginBottom: 36, flexWrap: "wrap", gap: 16 }}>
          <div>
            <p className="stag">Root Causes</p>
            <h2 className="h-serif" style={{ fontSize: "clamp(24px,3.5vw,38px)", color: T.ink }}>
              Kidney stone health starts from within
            </h2>
          </div>
          <div style={{ display: "flex", gap: 10, paddingTop: 6 }}>
            <button className="arr-btn" onClick={() => scroll(-1)}>‹</button>
            <button className="arr-btn" onClick={() => scroll(1)}>›</button>
          </div>
        </div>
        <div className="scroll-x" ref={ref}>
          {causes.map(c => (
            <div key={c.title} className="cause-card">
              <OliveIcon type={c.type} />
              <p style={{ fontWeight: 700, fontSize: 15, color: T.ink, marginBottom: 8 }}>{c.title}</p>
              <p style={{ fontSize: 13, color: T.muted, lineHeight: 1.65 }}>{c.desc}</p>
            </div>
          ))}
        </div>
      </Wrap>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   TRAYA SECTION 2 — HOW TO GET STARTED (3-step cards)
═══════════════════════════════════════════════════════════ */
export const HowToStart = ({ setPage }) => {
  const steps = [
    {
      num: "STEP 1", title: "Take Your Health Assessment",
      desc: "A free online questionnaire that assesses your stone type, symptoms, lifestyle, and root cause in under 3 minutes.",
      visual: (
        <div style={{ width: 100, height: 120, display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
          <div style={{ width: 68, height: 116, borderRadius: 12,
            background: T.forest, border: "3px solid #2a2a2a",
            display: "flex", flexDirection: "column", alignItems: "center",
            justifyContent: "flex-start", padding: "10px 7px", gap: 5 }}>
            <div style={{ width: "80%", height: 5, background: T.leaf, borderRadius: 3 }} />
            {[75, 60, 80, 55].map((w, i) => (
              <div key={i} style={{ width: `${w}%`, height: 4,
                background: i % 2 === 0 ? "rgba(255,255,255,.22)" : `rgba(82,183,136,.5)`,
                borderRadius: 3 }} />
            ))}
            <div style={{ width: "55%", height: 14, borderRadius: 5, background: T.leaf, marginTop: 4 }} />
            <div style={{ fontSize: 9, color: "rgba(255,255,255,.6)", marginTop: 2 }}>NEXT →</div>
          </div>
        </div>
      ),
    },
    {
      num: "STEP 2", title: "Expert Reviews Your Assessment",
      desc: "A qualified doctor or health coach reviews your assessment and prepares a personalised evaluation within 24 hours.",
      visual: (
        <div style={{ width: 100, height: 120, display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ width: 72, height: 72, borderRadius: "50%",
              background: `linear-gradient(135deg,${T.leaf},${T.pine})`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 32, margin: "0 auto 6px",
              boxShadow: `0 4px 16px rgba(45,106,79,.3)` }}>👨⚕️</div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 4,
              background: T.success, borderRadius: 20, padding: "3px 8px" }}>
              <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#fff" }} />
              <span style={{ color: "#fff", fontSize: 9, fontWeight: 700 }}>Online</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      num: "STEP 3", title: "Receive Your Personalised Care Plan",
      desc: "Your expert creates a personalised care plan — diet, hydration, lifestyle and support — tailored exactly to your condition.",
      visual: (
        <div style={{ width: 100, height: 120, display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
          <div style={{ width: 86, height: 102,
            background: `linear-gradient(145deg,${T.pine},${T.forest})`,
            borderRadius: 10, padding: 10, display: "flex", flexDirection: "column", gap: 5,
            boxShadow: `4px 4px 16px rgba(27,58,45,.28)` }}>
            <div style={{ width: "70%", height: 6, background: T.leaf, borderRadius: 3 }} />
            <div style={{ width: "55%", height: 4, background: "rgba(255,255,255,.28)", borderRadius: 3 }} />
            {["🥥","🍋","🫘"].map((e,i) => (
              <div key={i} style={{ display: "inline-flex", alignItems: "center", gap: 4,
                background: "rgba(255,255,255,.1)", borderRadius: 5, padding: "2px 5px",
                width: "fit-content" }}>
                <span style={{ fontSize: 10 }}>{e}</span>
                <div style={{ width: 30, height: 3, background: "rgba(255,255,255,.3)", borderRadius: 2 }} />
              </div>
            ))}
          </div>
        </div>
      ),
    },
  ];
  return (
    <section style={{ background: T.white, padding: "76px 0 60px" }}>
      <Wrap>
        <p className="stag">How to Get Started</p>
        <h2 className="h-serif" style={{ fontSize: "clamp(24px,3.5vw,38px)", color: T.ink, marginBottom: 36 }}>
          Take the first step towards a stone-free life
        </h2>
        <div className="steps-row-tr" style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          {steps.map(s => (
            <div key={s.num} className="step-card-tr">
              <div style={{ flex: 1, paddingBottom: 26 }}>
                <span style={{ display: "inline-block", background: "#EBEBEB", color: T.muted,
                  fontSize: 10, fontWeight: 700, letterSpacing: ".1em",
                  padding: "4px 10px", borderRadius: 5, marginBottom: 12 }}>{s.num}</span>
                <h3 style={{ fontWeight: 700, fontSize: 17, color: T.ink, marginBottom: 8, lineHeight: 1.3 }}>
                  {s.title}
                </h3>
                <p style={{ fontSize: 13, color: T.muted, lineHeight: 1.65 }}>{s.desc}</p>
              </div>
              {s.visual}
            </div>
          ))}
        </div>
        <Sp h={36} />
        <div style={{ textAlign: "center" }}>
          <button onClick={() => setPage("assessment")} className="btn-primary"
            style={{ padding: "15px 38px", fontSize: 16, borderRadius: 10 }}>
            Take Your Health Assessment →
          </button>
        </div>
      </Wrap>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   TRAYA SECTION 3 — INGREDIENTS CAROUSEL
═══════════════════════════════════════════════════════════ */
export const IngredientsCarousel = () => {
  const ref = useRef(null);
  const scroll = d => ref.current?.scrollBy({ left: d * 230, behavior: "smooth" });
  const herbs = [
    { emoji:"🌿", bg:"#E8F5E9", name:"Punarnava", hindi:"पुनर्नवा", desc:"Natural diuretic that flushes the kidney and breaks down stone-forming minerals effectively." },
    { emoji:"🌳", bg:"#E3F0EA", name:"Varun", hindi:"वरुण", desc:"Ayurvedic herb clinically shown to dissolve calcium deposits and prevent stone crystallisation." },
    { emoji:"🌱", bg:"#EAF4EE", name:"Gokshura", hindi:"गोक्षुरा", desc:"Strengthens kidney tubules and reduces oxalate crystal formation at the root level." },
    { emoji:"🫘", bg:"#F0EDE3", name:"Kulathi Dal", hindi:"कुलथी", desc:"Traditional Indian remedy with peer-reviewed evidence for dissolving and preventing kidney stones." },
    { emoji:"🍋", bg:"#FFFDE7", name:"Lemon (Nimbu)", hindi:"नींबू", desc:"Citric acid actively prevents stone formation and helps break down existing crystals naturally." },
    { emoji:"🥥", bg:"#F1F8F5", name:"Coconut Water", hindi:"नारियल पानी", desc:"Balances electrolytes, flushes stone crystals from the urinary tract, and reduces recurrence." },
    { emoji:"🌾", bg:"#F5F0E8", name:"Pashanabheda", hindi:"पाषाणभेद", desc:"Sanskrit for 'stone breaker' — Ayurveda's most potent evidence-backed kidney stone herb." },
  ];
  return (
    <section style={{ background: T.cream, padding: "76px 0 60px" }}>
      <Wrap>
        <div style={{ display: "flex", justifyContent: "space-between",
          alignItems: "flex-end", marginBottom: 34, flexWrap: "wrap", gap: 16 }}>
          <div>
            <p className="stag">Ingredients</p>
            <h2 className="h-serif" style={{ fontSize: "clamp(24px,3.5vw,38px)", color: T.ink }}>
              Ayurveda + Modern Science + Nutrition
            </h2>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button className="arr-btn" onClick={() => scroll(-1)}>‹</button>
            <button className="arr-btn" onClick={() => scroll(1)}>›</button>
          </div>
        </div>
        <div className="scroll-x" ref={ref}>
          {herbs.map(h => (
            <div key={h.name} className="ingr-card">
              <div style={{ width: 112, height: 112, borderRadius: 14, background: h.bg,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 54, marginBottom: 16 }}>{h.emoji}</div>
              <p style={{ fontWeight: 700, fontSize: 15, color: T.ink, marginBottom: 2, textAlign: "center" }}>{h.name}</p>
              <p style={{ fontSize: 11, color: T.olive, fontWeight: 600, marginBottom: 8, textAlign: "center" }}>{h.hindi}</p>
              <p style={{ fontSize: 12.5, color: T.muted, lineHeight: 1.65, textAlign: "center" }}>{h.desc}</p>
            </div>
          ))}
        </div>
      </Wrap>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   TRAYA SECTION 4 — RESEARCH BACKED (before/after)
═══════════════════════════════════════════════════════════ */
export const ResearchBacked = () => {
  const ScanCard = ({ hasStone }) => (
    <div style={{ width: "100%", height: 110,
      background: hasStone ? "#091510" : "#0D2010",
      display: "flex", alignItems: "center", justifyContent: "center",
      position: "relative", overflow: "hidden" }}>
      {[20,40,60,80].map(p => <div key={p} style={{ position:"absolute",left:0,right:0,top:`${p}%`,height:1,background:"rgba(82,183,136,.06)" }} />)}
      <svg width="70" height="80" viewBox="0 0 70 80" fill="none">
        <path d="M35 5 Q55 10 58 32 Q60 55 48 68 Q42 76 35 76 Q28 76 22 68 Q10 55 12 32 Q15 10 35 5Z"
          fill="rgba(82,183,136,.13)" stroke="rgba(82,183,136,.45)" strokeWidth="1.4"/>
        {hasStone ? <>
          <circle cx="40" cy="38" r="7" fill="rgba(255,255,255,.85)" stroke="rgba(255,255,255,.9)" strokeWidth=".8"/>
          <circle cx="40" cy="38" r="11" fill="none" stroke="rgba(255,255,255,.2)" strokeWidth="1"/>
          <line x1="52" y1="26" x2="46" y2="33" stroke="#FF6B6B" strokeWidth="1.4" strokeLinecap="round"/>
        </> : <>
          <path d="M28 40 L33 47 L45 33" stroke="#52B788" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        </>}
      </svg>
      <div style={{ position:"absolute", bottom:7, left:0, right:0, textAlign:"center",
        fontSize:9, fontWeight:700, letterSpacing:".08em",
        color: hasStone ? "rgba(255,100,100,.8)" : "rgba(82,183,136,.9)" }}>
        {hasStone ? "⚠ STONE DETECTED" : "✓ CLEAR SCAN"}
      </div>
    </div>
  );
  const patients = [
    { name:"Ramesh K.", city:"Jaipur", stone:"8mm", result:"3 months", avatar:"👨" },
    { name:"Sunita D.", city:"Nagpur", stone:"5mm", result:"6 weeks", avatar:"👩" },
    { name:"Arjun P.", city:"Surat",  stone:"6mm", result:"4 months", avatar:"👨" },
  ];
  return (
    <section style={{ background:`linear-gradient(135deg,${T.forest} 0%,#203D2F 55%,#1A4D35 100%)`, padding:"76px 0 60px" }}>
      <Wrap>
        <div className="research-flex" style={{ display:"flex", gap:52, alignItems:"center" }}>
          <div style={{ flex:"0 0 270px" }}>
            <p className="stag-white">Research Backed</p>
            <h2 className="h-serif" style={{ fontSize:"clamp(28px,4vw,48px)", color:T.white, marginBottom:22 }}>
              96% became<br />stone-free*
            </h2>
            <div style={{ display:"flex", flexDirection:"column", gap:10, marginBottom:26 }}>
              {[{i:"👥",t:"500+ Participants"},{i:"🪨",t:"All stone types (4mm–10mm)"},{i:"📅",t:"Tracked for 3–6 months"}].map(({i,t})=>(
                <div key={t} style={{ display:"inline-flex", alignItems:"center", gap:8,
                  background:"rgba(255,255,255,.1)", border:"1px solid rgba(255,255,255,.14)",
                  borderRadius:20, padding:"7px 14px", width:"fit-content" }}>
                  <span style={{ fontSize:13 }}>{i}</span>
                  <span style={{ color:"rgba(255,255,255,.82)", fontSize:13, fontWeight:500 }}>{t}</span>
                </div>
              ))}
            </div>
            <button style={{ background:"none", border:"none", cursor:"pointer",
              color:T.white, fontWeight:700, fontSize:14, fontFamily:"'Inter',sans-serif",
              display:"flex", alignItems:"center", gap:6,
              borderBottom:"1.5px solid rgba(255,255,255,.38)", paddingBottom:2 }}>
              View Research Results →
            </button>
            <p style={{ fontSize:11, color:"rgba(255,255,255,.3)", marginTop:10 }}>
              *Based on internal patient data. Individual results may vary.
            </p>
          </div>
          {/* Before/After cards */}
          <div style={{ flex:1, display:"flex", gap:14, overflowX:"auto", paddingBottom:6 }}>
            {patients.map(p => (
              <div key={p.name} className="ba-card">
                <div style={{ display:"flex", justifyContent:"center", paddingTop:14, marginBottom:-12, zIndex:2, position:"relative" }}>
                  <div style={{ width:34, height:34, borderRadius:"50%", background:T.cream2,
                    border:"2px solid rgba(255,255,255,.28)",
                    display:"flex", alignItems:"center", justifyContent:"center", fontSize:17 }}>{p.avatar}</div>
                </div>
                <div style={{ textAlign:"center", padding:"15px 12px 8px" }}>
                  <div style={{ fontWeight:700, fontSize:13, color:T.white }}>{p.name}</div>
                  <div style={{ fontSize:11, color:"rgba(255,255,255,.48)" }}>{p.city} · {p.stone} stone</div>
                </div>
                <div style={{ display:"flex" }}>
                  <div style={{ flex:1 }}>
                    <div style={{ textAlign:"center", padding:"5px 0", fontSize:9,
                      fontWeight:700, letterSpacing:".08em", color:"rgba(255,255,255,.44)" }}>BEFORE</div>
                    <ScanCard hasStone={true} />
                  </div>
                  <div style={{ width:1, background:"rgba(255,255,255,.1)" }} />
                  <div style={{ flex:1 }}>
                    <div style={{ textAlign:"center", padding:"5px 0", fontSize:9,
                      fontWeight:700, letterSpacing:".08em", color:"rgba(255,255,255,.44)" }}>AFTER</div>
                    <ScanCard hasStone={false} />
                  </div>
                </div>
                <div style={{ padding:"10px 12px", textAlign:"center" }}>
                  <div style={{ background:"rgba(82,183,136,.2)", border:"1px solid rgba(82,183,136,.28)",
                    borderRadius:20, padding:"4px 10px", fontSize:11, fontWeight:700,
                    color:T.leaf, display:"inline-block" }}>
                    ✓ Stone-free in {p.result}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Wrap>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   TRAYA SECTION 5 — RESULTS TIMELINE (Male/Female toggle)
═══════════════════════════════════════════════════════════ */
export const ResultsTimeline = () => {
  const [gender, setGender] = useState("male");
  const timelines = {
    male: [
      { month:"Week 1–2", icon:"💧", title:"Pain reduces", desc:"Hydration protocol begins. Back and flank pain noticeably decreases." },
      { month:"Month 1",  icon:"🌊", title:"Urine clears up", desc:"Urine becomes clearer. Early stone crystals begin flushing out naturally." },
      { month:"Month 2",  icon:"🪨", title:"Stone shrinking", desc:"Ultrasound shows measurable reduction in stone size. Herb protocol active." },
      { month:"Month 3",  icon:"✨", title:"Stone dissolved", desc:"Most patients show clear scan. Care plan shifts to maintenance phase." },
      { month:"Month 4",  icon:"🏃", title:"Full energy restored", desc:"Kidney function optimised. No pain. Active lifestyle fully resumed." },
      { month:"Month 5+", icon:"🛡️", title:"Prevention mode", desc:"Long-term plan keeps stones away. Recurrence risk below 10%." },
    ],
    female: [
      { month:"Week 1–2", icon:"💧", title:"Discomfort eases", desc:"Pelvic and lower back discomfort reduces with targeted hydration." },
      { month:"Month 1",  icon:"🌿", title:"Hormonal support", desc:"Herbal protocol helps regulate calcium metabolism. Less crystal formation." },
      { month:"Month 2",  icon:"🪨", title:"Stone dissolving", desc:"Oxalate levels drop. Visible stone size reduction confirmed on scan." },
      { month:"Month 3",  icon:"✨", title:"Clear scan", desc:"Stone-free status confirmed. Diet plan adjusted for long-term prevention." },
      { month:"Month 4",  icon:"🌸", title:"Kidney rejuvenated", desc:"Full kidney function restored. Urine and blood tests return to normal." },
      { month:"Month 5+", icon:"🛡️", title:"Stone-free life", desc:"Personalised prevention plan ensures stones do not return." },
    ],
  };
  const tl = timelines[gender];
  return (
    <section style={{ background:T.cream, padding:"76px 0 60px" }}>
      <Wrap>
        <div style={{ display:"flex", marginBottom:18 }}>
          <div style={{ background:T.cream2, borderRadius:8, padding:3, display:"flex", gap:2 }}>
            {["male","female"].map(g => (
              <button key={g} className="tgl-btn" onClick={() => setGender(g)}
                style={{ background: gender===g ? T.white : "transparent",
                  color: gender===g ? T.ink : T.muted,
                  boxShadow: gender===g ? "0 1px 6px rgba(0,0,0,.09)" : "none" }}>
                {g.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
        <h2 className="h-serif" style={{ fontSize:"clamp(24px,3.5vw,38px)", color:T.ink, marginBottom:44 }}>
          When will you see results?
        </h2>
        <div style={{ position:"relative" }}>
          <div style={{ position:"absolute", top:26, left:26, right:26, height:2,
            background:`linear-gradient(to right,${T.pine},${T.leaf})`, zIndex:0 }} />
          <div className="tl-row" style={{ display:"flex", gap:0, position:"relative", zIndex:1 }}>
            {tl.map((t,i) => (
              <div key={t.month} style={{ flex:1, display:"flex", flexDirection:"column",
                alignItems:"center", paddingRight: i<tl.length-1 ? 6 : 0 }}>
                <div style={{ width:52, height:52, borderRadius:10,
                  background: i<=2 ? T.cream2 : T.cream,
                  border: `1.5px solid ${i<=2 ? T.olive : "transparent"}`,
                  display:"flex", alignItems:"center", justifyContent:"center",
                  fontSize:24, marginBottom:8, transition:"all .3s" }}>{t.icon}</div>
                <div style={{ width:10, height:10, borderRadius:"50%", background:T.pine,
                  marginBottom:12, flexShrink:0, zIndex:2 }} />
                <div style={{ textAlign:"center" }}>
                  <p style={{ fontWeight:700, fontSize:12, color:T.olive, marginBottom:4 }}>{t.month}</p>
                  <p style={{ fontWeight:700, fontSize:13, color:T.ink, marginBottom:5 }}>{t.title}</p>
                  <p style={{ fontSize:11.5, color:T.muted, lineHeight:1.6 }}>{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <p style={{ fontSize:11, color:T.muted, marginTop:32,
          borderTop:`1px solid ${T.border}`, paddingTop:14 }}>
          *Timeline varies based on stone type, size, and individual root causes. Results may vary.
          Zivra provides dietary and lifestyle guidance — consult your doctor for medical treatment.
        </p>
      </Wrap>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   TESTIMONIAL REELS
═══════════════════════════════════════════════════════════ */
export const TestimonialReels = ({ setPage }) => {
  const reels = [
    { bg:"linear-gradient(160deg,#1B3A2D,#2D6A4F)", name:"Ramesh K.", city:"Jaipur", result:"8mm stone gone", time:"0:42" },
    { bg:"linear-gradient(160deg,#134E5E,#3A8A62)", name:"Priya S.",  city:"Lucknow", result:"No recurrence — 1 year", time:"0:38" },
    { bg:"linear-gradient(160deg,#1B3A2D,#52B788)", name:"Arjun P.",  city:"Surat",   result:"Saved surgery", time:"0:55" },
    { bg:"linear-gradient(160deg,#2C3E50,#2D6A4F)", name:"Sunita D.", city:"Nagpur",  result:"Pain-free in 6 weeks", time:"0:31" },
    { bg:"linear-gradient(160deg,#1A3326,#A07928)", name:"Vikram T.", city:"Indore",  result:"1 year stone-free", time:"0:47" },
    { bg:"linear-gradient(160deg,#203D2F,#1B7A4A)", name:"Meena R.",  city:"Bhopal",  result:"All stones dissolved", time:"0:36" },
  ];
  return (
    <section style={{ background:T.white, padding:"76px 0 60px" }}>
      <Wrap>
        <div style={{ display:"flex", justifyContent:"space-between",
          alignItems:"flex-end", marginBottom:4, flexWrap:"wrap", gap:12 }}>
          <div>
            <p className="stag">Patient Stories</p>
            <h2 className="h-serif" style={{ fontSize:"clamp(24px,3.5vw,38px)", color:T.ink }}>
              Real people. Real results.
            </h2>
          </div>
          <button onClick={() => setPage("stories")}
            style={{ background:"none", border:`1.5px solid ${T.border}`,
              borderRadius:30, padding:"10px 18px", fontSize:13, cursor:"pointer",
              color:T.muted, fontWeight:600, whiteSpace:"nowrap", alignSelf:"flex-start" }}>
            View All Stories →
          </button>
        </div>
        <div className="scroll-x" style={{ marginTop:24 }}>
          {reels.map((r,i) => (
            <div key={i} style={{ flexShrink:0, width:176, height:314, borderRadius:18,
              position:"relative", overflow:"hidden", cursor:"pointer",
              boxShadow:"0 8px 28px rgba(27,58,45,.22)", transition:"transform .3s" }}
              onMouseEnter={e=>e.currentTarget.style.transform="scale(1.04)"}
              onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}>
              <div style={{ background:r.bg, position:"absolute", inset:0 }} />
              <div style={{ position:"absolute", top:10, right:10, background:"rgba(0,0,0,.5)",
                color:"#fff", fontSize:10, fontWeight:700, padding:"2px 7px", borderRadius:20 }}>{r.time}</div>
              <div style={{ position:"absolute", top:12, left:12, fontSize:10 }}>⭐⭐⭐⭐⭐</div>
              <div style={{ position:"absolute", top:"50%", left:"50%",
                transform:"translate(-50%,-50%)", width:50, height:50, borderRadius:"50%",
                background:"rgba(255,255,255,.9)", display:"flex", alignItems:"center",
                justifyContent:"center", fontSize:20, boxShadow:"0 4px 16px rgba(0,0,0,.25)" }}>▶</div>
              <div style={{ position:"absolute", bottom:0, left:0, right:0, padding:"14px 12px 12px",
                background:"linear-gradient(transparent,rgba(27,58,45,.92))" }}>
                <div style={{ color:T.white, fontWeight:700, fontSize:13 }}>{r.name}</div>
                <div style={{ color:"rgba(255,255,255,.55)", fontSize:11 }}>{r.city}</div>
                <div style={{ background:T.leaf, color:T.white, padding:"3px 10px", borderRadius:20,
                  fontSize:10, fontWeight:700, marginTop:6, display:"inline-block" }}>
                  ✓ {r.result}
                </div>
              </div>
            </div>
          ))}
        </div>
        <p style={{ textAlign:"center", color:T.muted, fontSize:12, marginTop:8 }}>← Swipe to see more stories →</p>
      </Wrap>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   DOCTOR CREDENTIALS
═══════════════════════════════════════════════════════════ */
export const DoctorSection = ({ setPage }) => {
  const doctors = [
    { name:"Dr. Priya Sharma", role:"Nephrologist", exp:"12 years", loc:"Delhi NCR",
      avatar:"👩⚕️", creds:"MBBS, MD Nephrology, AIIMS Delhi",
      quote:"Diet and hydration can resolve most kidney stones without surgical intervention. I've seen it hundreds of times." },
    { name:"Dr. Arjun Mehta", role:"Urologist", exp:"9 years", loc:"Mumbai",
      avatar:"👨⚕️", creds:"MBBS, MS Urology, KEM Hospital",
      quote:"The right nutritional protocol is as important as any medication. Zivra makes that accessible to every patient." },
    { name:"Dr. Kavita Rao", role:"Dietitian & Nutritionist", exp:"8 years", loc:"Bangalore",
      avatar:"👩⚕️", creds:"MSc Nutrition, Certified Renal Dietitian",
      quote:"A properly designed kidney stone diet isn't restrictive — it's strategic. We teach patients to eat right, not less." },
  ];
  return (
    <section style={{ background:T.cream, padding:"76px 0 60px" }}>
      <Wrap>
        <div style={{ display:"flex", justifyContent:"space-between", flexWrap:"wrap",
          gap:16, marginBottom:36 }}>
          <div>
            <p className="stag">Our Experts</p>
            <h2 className="h-serif" style={{ fontSize:"clamp(24px,3.5vw,38px)", color:T.ink }}>
              Qualified professionals, every step
            </h2>
          </div>
          <button onClick={() => setPage("consult")} className="btn-primary"
            style={{ padding:"12px 24px", fontSize:14, borderRadius:8, alignSelf:"flex-end" }}>
            Talk to an Expert →
          </button>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(290px,1fr))", gap:20 }}>
          {doctors.map(d => (
            <div key={d.name} className="card-lift" style={{ background:T.white,
              border:`1px solid ${T.border}`, padding:"26px 22px",
              boxShadow:"0 2px 14px rgba(27,58,45,.06)" }}>
              <div style={{ display:"flex", gap:14, marginBottom:16 }}>
                <div style={{ width:54, height:54, borderRadius:"50%",
                  background:`linear-gradient(135deg,${T.leaf},${T.pine})`,
                  display:"flex", alignItems:"center", justifyContent:"center",
                  fontSize:26, flexShrink:0 }}>{d.avatar}</div>
                <div>
                  <div style={{ fontWeight:700, fontSize:16, color:T.ink }}>{d.name}</div>
                  <div style={{ color:T.olive, fontSize:13, fontWeight:600 }}>{d.role}</div>
                  <div style={{ color:T.muted, fontSize:11 }}>{d.exp} exp · {d.loc}</div>
                </div>
              </div>
              <div style={{ background:T.cream, borderRadius:8, padding:"8px 12px", marginBottom:14 }}>
                <span style={{ fontSize:11, color:T.muted }}>🎓 {d.creds}</span>
              </div>
              <p style={{ fontSize:13.5, color:T.muted, lineHeight:1.7, fontStyle:"italic" }}>
                "{d.quote}"
              </p>
            </div>
          ))}
        </div>
      </Wrap>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   FAQ
═══════════════════════════════════════════════════════════ */
export const FAQ = () => {
  const [open, setOpen] = useState(null);
  const faqs = [
    { q:"Can kidney stones really be managed without surgery?", a:"Yes — for stones up to 8mm, the right diet, hydration protocol, and lifestyle changes can dissolve and flush out stones naturally. Our 96% success rate across 500+ patients confirms this. For larger stones, our experts will give you an honest, medically guided assessment." },
    { q:"How is a Zivra assessment different from seeing a regular doctor?", a:"A Zivra assessment collects detailed information about your stone type, lifestyle, diet, and symptoms — and uses that to build a personalised care pathway. Think of it as the bridge between your doctor's diagnosis and your daily life. We don't replace your doctor; we complement their treatment." },
    { q:"How quickly do I receive my personalised care plan?", a:"Within 24 hours of completing your health assessment and expert review, you will receive your personalised care plan directly via WhatsApp and email." },
    { q:"Is the guidance safe? Will you recommend medicines?", a:"Zivra provides evidence-based dietary and lifestyle guidance reviewed by qualified doctors. Some natural supplements may be recommended. We never prescribe pharmaceutical drugs — that remains with your licensed physician." },
    { q:"What if my stone is larger than 8mm?", a:"Our experts will review your case honestly. If surgery is genuinely required, we will tell you clearly and help you prepare. We will never recommend against medically necessary surgery." },
    { q:"Is Hindi support available?", a:"Yes. Our team is fully bilingual. You can complete your assessment, consult with our experts, and receive your care plan entirely in Hindi if preferred." },
  ];
  return (
    <section style={{ background:T.white, padding:"76px 0 60px" }}>
      <Wrap style={{ maxWidth:720 }}>
        <p className="stag" style={{ textAlign:"center" }}>FAQ</p>
        <h2 className="h-serif" style={{ fontSize:"clamp(24px,3.5vw,38px)", color:T.ink,
          textAlign:"center", marginBottom:40 }}>Questions we get every day</h2>
        {faqs.map((f,i) => (
          <div key={i} className="faq-item">
            <button className="faq-q" onClick={() => setOpen(open===i ? null : i)}>
              <span style={{ paddingRight:16 }}>{f.q}</span>
              <span style={{ color:T.pine, fontSize:22, flexShrink:0 }}>{open===i ? "−" : "+"}</span>
            </button>
            <div className={`faq-body${open===i ? " open" : ""}`}>
              <p style={{ padding:"0 0 20px", color:T.muted, lineHeight:1.75, fontSize:14 }}>{f.a}</p>
            </div>
          </div>
        ))}
      </Wrap>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   CTA BANNER
═══════════════════════════════════════════════════════════ */
export const CTABanner = ({ setPage }) => (
  <section style={{ background:`linear-gradient(135deg,${T.pine},#3A8A62)`, padding:"80px 0", textAlign:"center" }}>
    <Wrap>
      <h2 className="h-serif" style={{ fontSize:"clamp(26px,4vw,46px)", color:T.white, marginBottom:14 }}>
        Your stone's last day is today.
      </h2>
      <p style={{ color:"rgba(255,255,255,.75)", fontSize:17, marginBottom:34 }}>
        Join 500+ patients who chose expert-guided care over surgery.
      </p>
      <div style={{ display:"flex", gap:14, justifyContent:"center", flexWrap:"wrap" }}>
        <button onClick={() => setPage("assessment")}
          style={{ background:T.white, color:T.forest, border:"none", borderRadius:10,
            padding:"17px 40px", fontSize:16, fontWeight:800,
            cursor:"pointer", fontFamily:"'Inter',sans-serif" }}>
          Take Your Health Assessment →
        </button>
        <button onClick={() => setPage("consult")} className="btn-outline"
          style={{ padding:"15px 30px", fontSize:15, borderRadius:10 }}>
          Talk to an Expert
        </button>
      </div>
      <p style={{ color:"rgba(255,255,255,.42)", fontSize:12, marginTop:18 }}>
        ✓ Free to start · ✓ Medically reviewed · ✓ Response in 24 hours
      </p>
    </Wrap>
  </section>
);

/* ═══════════════════════════════════════════════════════════
   HOME PAGE
═══════════════════════════════════════════════════════════ */
export const HomePage = ({ setPage }) => (
  <div className="fade-in">
    <Hero setPage={setPage} />
    <Ticker />
    <RootCausesCarousel />
    <HowToStart setPage={setPage} />
    <IngredientsCarousel />
    <ResearchBacked />
    <TestimonialReels setPage={setPage} />
    <ResultsTimeline />
    <DoctorSection setPage={setPage} />
    <FAQ />
    <CTABanner setPage={setPage} />
  </div>
);

/* ═══════════════════════════════════════════════════════════
   ASSESSMENT PAGE — 6-Step Form
═══════════════════════════════════════════════════════════ */
export const AssessmentPage = ({ setPage }) => {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    name:"", age:"", gender:"", phone:"", city:"",
    painLocation:"", painSeverity:"", urineColor:"", duration:"", stoneHistory:"",
    stoneType:"", familyHistory:"", prevScan:"", waterIntake:"", diet:"", exercise:"", occupation:"",
    conditions:"", medications:"", allergies:"",
    prevTreatment:"", treatmentResult:"", currentStatus:"", reportDesc:"",
  });
  const upd = (k,v) => setForm(f=>({...f,[k]:v}));

  const steps = [
    "Personal Info", "Symptoms", "Stone History",
    "Lifestyle", "Medical History", "Previous Treatment",
  ];

  const Field = ({ label, k, type="text", ph="" }) => (
    <div style={{ marginBottom:18 }}>
      <label style={{ display:"block", fontWeight:600, fontSize:13,
        color:T.forest, marginBottom:7 }}>{label}</label>
      <input className="fi" type={type} placeholder={ph}
        value={form[k]} onChange={e => upd(k, e.target.value)} />
    </div>
  );

  const Select = ({ label, k, opts }) => (
    <div style={{ marginBottom:18 }}>
      <label style={{ display:"block", fontWeight:600, fontSize:13,
        color:T.forest, marginBottom:7 }}>{label}</label>
      <select className="fi" value={form[k]} onChange={e => upd(k, e.target.value)}
        style={{ appearance:"none", backgroundImage:`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%235C6B5E' stroke-width='1.5' stroke-linecap='round' fill='none'/%3E%3C/svg%3E")`,
          backgroundRepeat:"no-repeat", backgroundPosition:"right 14px center" }}>
        <option value="">Select</option>
        {opts.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );

  const OptBtn = ({ label, k, val }) => (
    <button className={`quiz-opt${form[k]===val?" sel":""}`}
      onClick={() => upd(k, val)} style={{ marginBottom:8 }}>
      {form[k]===val?"✓ ":""}{val}
    </button>
  );

  const stepContent = [
    /* Step 0 — Personal Info */
    <div key={0}>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
        <Field label="Full Name" k="name" ph="Your full name" />
        <Field label="Age" k="age" type="number" ph="e.g. 38" />
      </div>
      <div style={{ marginBottom:18 }}>
        <label style={{ display:"block", fontWeight:600, fontSize:13, color:T.forest, marginBottom:10 }}>Gender</label>
        <div style={{ display:"flex", gap:10 }}>
          {["Male","Female","Other"].map(g => (
            <OptBtn key={g} label={g} k="gender" val={g} />
          ))}
        </div>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
        <Field label="WhatsApp Number" k="phone" type="tel" ph="+91 XXXXX XXXXX" />
        <Field label="City / State" k="city" ph="e.g. Jaipur, Rajasthan" />
      </div>
    </div>,

    /* Step 1 — Symptoms */
    <div key={1}>
      <div style={{ marginBottom:18 }}>
        <label style={{ display:"block", fontWeight:600, fontSize:13, color:T.forest, marginBottom:10 }}>
          Where is your pain usually located?
        </label>
        <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
          {["Lower back / flank (side)","Below the navel","Groin area","Burning during urination","No pain — found in scan"].map(o=>(
            <OptBtn key={o} label={o} k="painLocation" val={o} />
          ))}
        </div>
      </div>
      <Select label="Pain Severity (0=none, 10=severe)" k="painSeverity"
        opts={["1-2 (mild)","3-4","5-6 (moderate)","7-8","9-10 (severe)"]} />
      <Select label="Urine Colour During Symptoms" k="urineColor"
        opts={["Normal (pale yellow)","Dark yellow","Pink / reddish","Cloudy / whitish","Brown"]} />
      <Select label="How Long Have You Had Symptoms?" k="duration"
        opts={["Less than 1 week","1–4 weeks","1–3 months","3–6 months","More than 6 months"]} />
    </div>,

    /* Step 2 — Stone History */
    <div key={2}>
      <Select label="Have You Had Kidney Stones Before?" k="stoneHistory"
        opts={["First time","Yes — once before","Yes — multiple times","Not sure — found incidentally"]} />
      <Select label="Stone Type (if known from reports)" k="stoneType"
        opts={["Not sure","Calcium Oxalate","Calcium Phosphate","Uric Acid","Struvite","Cystine"]} />
      <div style={{ marginBottom:18 }}>
        <label style={{ display:"block", fontWeight:600, fontSize:13, color:T.forest, marginBottom:10 }}>
          Family history of kidney stones?
        </label>
        <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
          {["Yes — parents","Yes — siblings","Yes — other relatives","No","Not sure"].map(o=>(
            <OptBtn key={o} label={o} k="familyHistory" val={o} />
          ))}
        </div>
      </div>
      <Select label="Do You Have a Recent Scan / Ultrasound?" k="prevScan"
        opts={["Yes — stone confirmed","Yes — no stone found","No recent scan","Scan scheduled"]} />
    </div>,

    /* Step 3 — Lifestyle */
    <div key={3}>
      <Select label="How Much Water Do You Drink Per Day?" k="waterIntake"
        opts={["Less than 1 litre","1–1.5 litres","1.5–2.5 litres","2.5–3 litres","More than 3 litres"]} />
      <div style={{ marginBottom:18 }}>
        <label style={{ display:"block", fontWeight:600, fontSize:13, color:T.forest, marginBottom:10 }}>
          Primary Diet Type
        </label>
        <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
          {["Vegetarian","Non-vegetarian","Eggetarian","Vegan"].map(o=>(
            <OptBtn key={o} label={o} k="diet" val={o} />
          ))}
        </div>
      </div>
      <Select label="Physical Activity Level" k="exercise"
        opts={["Sedentary (mostly sitting)","Lightly active","Moderately active","Very active"]} />
      <Select label="Occupation Type" k="occupation"
        opts={["Office / Desk job","Field / outdoor work","Physical labour","Home / domestic","Student"]} />
    </div>,

    /* Step 4 — Medical History */
    <div key={4}>
      <div style={{ marginBottom:18 }}>
        <label style={{ display:"block", fontWeight:600, fontSize:13, color:T.forest, marginBottom:10 }}>
          Any existing medical conditions? (select all that apply)
        </label>
        <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
          {["Diabetes","Hypertension (high BP)","Thyroid disorder","Gout / high uric acid","Chronic kidney disease","None of the above"].map(o=>(
            <OptBtn key={o} label={o} k="conditions" val={o} />
          ))}
        </div>
      </div>
      <Field label="Current Medications (if any)" k="medications"
        ph="e.g. Metformin, Amlodipine, or 'None'" />
      <Field label="Any Known Allergies?" k="allergies" ph="Food, medicine, or other allergies" />
    </div>,

    /* Step 5 — Previous Treatment */
    <div key={5}>
      <Select label="Have You Received Any Treatment for Kidney Stones Before?" k="prevTreatment"
        opts={["No treatment yet","Medication only","Laser / ESWL lithotripsy","Surgical removal (PCNL / URS)","Home remedies","Multiple treatments"]} />
      <Select label="Result of Previous Treatment?" k="treatmentResult"
        opts={["Successfully removed","Partially successful","Stone came back","No improvement","Not applicable"]} />
      <div style={{ marginBottom:18 }}>
        <label style={{ display:"block", fontWeight:600, fontSize:13, color:T.forest, marginBottom:10 }}>
          Current Status
        </label>
        <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
          {["Stone still present — in pain","Stone still present — manageable","Stone recently passed","Waiting for treatment decision","Seeking second opinion"].map(o=>(
            <OptBtn key={o} label={o} k="currentStatus" val={o} />
          ))}
        </div>
      </div>
      <div style={{ marginBottom:18 }}>
        <label style={{ display:"block", fontWeight:600, fontSize:13, color:T.forest, marginBottom:7 }}>
          Describe Your Reports (optional)
        </label>
        <textarea className="fi" rows={3} placeholder="E.g. '7mm stone in right kidney, no hydronephrosis'"
          value={form.reportDesc} onChange={e => upd("reportDesc", e.target.value)}
          style={{ resize:"vertical" }} />
        <div style={{ marginTop:10, background:T.cream, borderRadius:8,
          padding:"10px 14px", border:`1px dashed ${T.border}` }}>
          <p style={{ fontSize:12, color:T.muted }}>
            📎 <b>Upload reports:</b> After submission, you can send your ultrasound reports,
            lab results, or stone analysis reports directly via WhatsApp to our team.
          </p>
        </div>
      </div>
    </div>,
  ];

  const pct = ((step) / steps.length) * 100;

  return (
    <div className="fade-in" style={{ minHeight:"100vh", background:T.cream, paddingTop:66 }}>
      <div style={{ maxWidth:680, margin:"0 auto", padding:"44px 24px" }}>
        {/* Header */}
        <div style={{ marginBottom:32 }}>
          <p className="stag">Health Assessment</p>
          <h1 className="h-serif" style={{ fontSize:"clamp(24px,3.5vw,34px)", color:T.forest, marginBottom:8 }}>
            {steps[step]}
          </h1>
          <p style={{ fontSize:14, color:T.muted }}>
            Step {step + 1} of {steps.length} — your answers help us personalise your care.
          </p>
        </div>

        {/* Progress bar */}
        <div style={{ marginBottom:32 }}>
          <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8, gap:4, flexWrap:"wrap" }}>
            {steps.map((s,i) => (
              <span key={s} style={{ fontSize:10, fontWeight:700, letterSpacing:".04em",
                color: i<=step ? T.pine : T.muted, flex:1, textAlign:"center", minWidth:60 }}>{s}</span>
            ))}
          </div>
          <div style={{ height:5, background:T.border, borderRadius:3 }}>
            <div style={{ height:"100%", background:T.pine, borderRadius:3,
              width:`${pct+(100/steps.length)}%`, transition:"width .4s ease" }} />
          </div>
          <div style={{ textAlign:"right", fontSize:11, color:T.muted, marginTop:4 }}>
            {Math.round(pct + (100/steps.length))}% complete
          </div>
        </div>

        {/* Form card */}
        <div style={{ background:T.white, borderRadius:20, padding:"34px 30px",
          boxShadow:"0 8px 36px rgba(27,58,45,.09)" }}>
          {stepContent[step]}

          <div style={{ display:"flex", gap:10, marginTop:28 }}>
            {step > 0 && (
              <button onClick={() => setStep(s=>s-1)} className="btn-outline-dark"
                style={{ flex:1, padding:"13px", fontSize:14 }}>← Back</button>
            )}
            <button onClick={() => step < steps.length-1 ? setStep(s=>s+1) : setPage("result")}
              className="btn-primary"
              style={{ flex:2, padding:"13px", fontSize:15, borderRadius:8 }}>
              {step < steps.length-1 ? "Continue →" : "Submit Assessment →"}
            </button>
          </div>
          <p style={{ textAlign:"center", color:T.muted, fontSize:11, marginTop:14 }}>
            🔒 Your health information is private and secure. We never share it without your permission.
          </p>
        </div>

        {/* Medical disclaimer */}
        <div style={{ marginTop:20, background:T.goldLt, borderRadius:12,
          padding:"14px 18px", border:`1px solid ${T.gold}28` }}>
          <p style={{ fontSize:12, color:T.gold, fontWeight:600 }}>
            ⚕ Medical Disclaimer
          </p>
          <p style={{ fontSize:11, color:"#7A5A20", lineHeight:1.6, marginTop:4 }}>
            This assessment is for informational purposes only and does not constitute a medical diagnosis.
            Please consult a licensed medical professional for clinical diagnosis and treatment decisions.
          </p>
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════
   RESULT PAGE — Assessment Analysis + Personalized Report
═══════════════════════════════════════════════════════════ */
export const ResultPage = ({ setPage }) => {
  const observations = [
    { icon:"🪨", text:"Symptom pattern suggests possible calcium oxalate stone formation" },
    { icon:"💧", text:"Current water intake appears below recommended levels for your risk profile" },
    { icon:"🥗", text:"Diet history indicates elevated oxalate and sodium consumption" },
    { icon:"🔄", text:"Previous stone history indicates higher recurrence risk requiring proactive prevention" },
    { icon:"🌡️", text:"Climate and occupation type may contribute to concentrated urine production" },
  ];
  const factors = [
    { label:"Stone Type (likely)", value:"Calcium Oxalate", color:T.pine },
    { label:"Risk Level", value:"Moderate–High", color:"#E07B00" },
    { label:"Surgical Urgency", value:"Low (manageable)", color:T.success },
    { label:"Recommended Pathway", value:"Diet + Hydration Program", color:T.pine },
  ];
  return (
    <div className="fade-in" style={{ minHeight:"100vh", background:T.cream, paddingTop:66 }}>
      <Wrap style={{ padding:"50px 26px" }}>
        {/* Header */}
        <div style={{ textAlign:"center", marginBottom:40 }}>
          <div style={{ display:"inline-flex", alignItems:"center", gap:8,
            background:"rgba(45,106,79,.1)", border:`1px solid ${T.pine}28`,
            padding:"6px 16px", borderRadius:30, marginBottom:16 }}>
            <span style={{ width:7, height:7, borderRadius:"50%", background:T.pine,
              display:"inline-block" }} />
            <span style={{ color:T.pine, fontSize:12, fontWeight:600 }}>Assessment Complete</span>
          </div>
          <h1 className="h-serif" style={{ fontSize:"clamp(26px,4vw,42px)", color:T.forest, marginBottom:12 }}>
            Your Preliminary Health Report
          </h1>
          <div style={{ background:"#FEF3C7", border:"1px solid #F59E0B30",
            borderRadius:10, padding:"10px 18px", display:"inline-block", marginTop:8 }}>
            <p style={{ fontSize:12, color:"#92400E" }}>
              ⚕ <b>Important:</b> This is an informational assessment, not a medical diagnosis.
              A qualified expert will review your full case and provide a clinical evaluation.
            </p>
          </div>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20, marginBottom:24 }}>
          {/* Key observations */}
          <div style={{ background:T.white, borderRadius:16, padding:"26px 22px",
            border:`1px solid ${T.border}`, gridColumn:"1 / -1" }}>
            <p className="stag">Key Observations</p>
            <h3 className="h-serif" style={{ fontSize:22, color:T.forest, marginBottom:20 }}>
              Based on your assessment, we observed:
            </h3>
            <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
              {observations.map((o,i) => (
                <div key={i} style={{ display:"flex", gap:12, alignItems:"flex-start",
                  padding:"12px 14px", background:T.cream, borderRadius:10 }}>
                  <span style={{ fontSize:20, flexShrink:0 }}>{o.icon}</span>
                  <span style={{ fontSize:14, color:T.ink, lineHeight:1.6 }}>{o.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Contributing factors */}
          <div style={{ background:T.white, borderRadius:16, padding:"26px 22px",
            border:`1px solid ${T.border}` }}>
            <p className="stag">Contributing Factors</p>
            <h3 className="h-serif" style={{ fontSize:20, color:T.forest, marginBottom:18 }}>
              Possible causes in your case
            </h3>
            {factors.map(f => (
              <div key={f.label} style={{ display:"flex", justifyContent:"space-between",
                padding:"12px 0", borderBottom:`1px solid ${T.border}` }}>
                <span style={{ fontSize:13, color:T.muted }}>{f.label}</span>
                <span style={{ fontWeight:700, fontSize:13, color:f.color }}>{f.value}</span>
              </div>
            ))}
          </div>

          {/* Recommended pathway */}
          <div style={{ background:T.forest, borderRadius:16, padding:"26px 22px" }}>
            <p className="stag-white">Your Personalised Care Pathway</p>
            <h3 className="h-serif" style={{ fontSize:20, color:T.white, marginBottom:18 }}>
              Recommended next steps
            </h3>
            {[
              { n:"1", t:"Expert Consultation", d:"A qualified doctor will review your full assessment and make a clinical evaluation." },
              { n:"2", t:"Personalised Diet Plan", d:"A kidney stone diet plan built around your stone type, diet preferences, and lifestyle." },
              { n:"3", t:"Hydration Protocol", d:"A timed hydration schedule to actively flush and dissolve existing stones." },
              { n:"4", t:"Progress Monitoring", d:"Regular check-ins and lab review to track your improvement over time." },
            ].map(s => (
              <div key={s.n} style={{ display:"flex", gap:12, marginBottom:14,
                alignItems:"flex-start" }}>
                <div style={{ width:28, height:28, borderRadius:"50%", background:T.leaf,
                  display:"flex", alignItems:"center", justifyContent:"center",
                  fontWeight:800, fontSize:13, color:T.white, flexShrink:0 }}>{s.n}</div>
                <div>
                  <div style={{ fontWeight:700, fontSize:14, color:T.white }}>{s.t}</div>
                  <div style={{ fontSize:12, color:"rgba(255,255,255,.55)", lineHeight:1.6 }}>{s.d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{ background:T.white, borderRadius:16, padding:"30px 28px",
          border:`1px solid ${T.border}`, textAlign:"center",
          boxShadow:"0 4px 24px rgba(27,58,45,.08)" }}>
          <h3 className="h-serif" style={{ fontSize:26, color:T.forest, marginBottom:10 }}>
            Ready for your expert consultation?
          </h3>
          <p style={{ color:T.muted, fontSize:15, marginBottom:24, lineHeight:1.7 }}>
            A qualified doctor will review your assessment, answer your questions, and design
            your personalised care plan. No generic advice — only guidance built around your case.
          </p>
          <div style={{ display:"flex", gap:14, justifyContent:"center", flexWrap:"wrap" }}>
            <button onClick={() => setPage("consult")} className="btn-primary"
              style={{ padding:"15px 36px", fontSize:16, borderRadius:10 }}>
              Consult an Expert →
            </button>
            <button onClick={() => setPage("assessment")} className="btn-outline-dark"
              style={{ padding:"13px 24px", fontSize:14, borderRadius:10 }}>
              Retake Assessment
            </button>
          </div>
          <p style={{ color:T.muted, fontSize:12, marginTop:16 }}>
            ✓ Reviewed within 24 hours · ✓ Fully confidential · ✓ Hindi & English available
          </p>
        </div>
      </Wrap>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════
   CONSULTATION PAGE
═══════════════════════════════════════════════════════════ */
export const ConsultPage = ({ setPage }) => {
  const [selected, setSelected] = useState(null);
  const [slot, setSlot] = useState(null);
  const [booked, setBooked] = useState(false);

  const experts = [
    { id:1, name:"Dr. Priya Sharma", role:"Nephrologist", exp:"12 years", rating:"4.9", reviews:142, avatar:"👩⚕️", lang:"Hindi, English", next:"Today, 4:00 PM" },
    { id:2, name:"Dr. Arjun Mehta", role:"Urologist", exp:"9 years", rating:"4.8", reviews:98, avatar:"👨⚕️", lang:"Hindi, English, Gujarati", next:"Tomorrow, 11:00 AM" },
    { id:3, name:"Dr. Kavita Rao", role:"Renal Dietitian", exp:"8 years", rating:"4.9", reviews:211, avatar:"👩⚕️", lang:"English, Kannada", next:"Today, 6:00 PM" },
  ];
  const slots = ["9:00 AM","10:30 AM","12:00 PM","2:00 PM","4:00 PM","5:30 PM","7:00 PM"];

  if (booked) return (
    <div style={{ minHeight:"100vh", display:"flex", alignItems:"center",
      justifyContent:"center", background:T.cream, paddingTop:66 }}>
      <div style={{ textAlign:"center", maxWidth:440, padding:40 }}>
        <div style={{ fontSize:60, marginBottom:20 }}>✅</div>
        <h2 className="h-serif" style={{ fontSize:30, color:T.forest, marginBottom:12 }}>Consultation Booked!</h2>
        <p style={{ color:T.muted, fontSize:15, lineHeight:1.75, marginBottom:24 }}>
          Your consultation has been confirmed. You will receive a WhatsApp message with the
          meeting link and preparation instructions within 30 minutes.
        </p>
        <div style={{ background:"#DCFCE7", borderRadius:12, padding:"16px 20px",
          border:"1px solid #86EFAC", marginBottom:24 }}>
          <div style={{ color:T.success, fontWeight:700, marginBottom:4 }}>✓ Confirmed</div>
          <div style={{ color:T.muted, fontSize:13 }}>
            A reminder will be sent 1 hour before your consultation via WhatsApp.
          </div>
        </div>
        <button onClick={() => setPage("dashboard")} className="btn-primary"
          style={{ padding:"13px 30px", fontSize:15, borderRadius:10, width:"100%" }}>
          View Your Dashboard →
        </button>
      </div>
    </div>
  );

  return (
    <div className="fade-in" style={{ minHeight:"100vh", background:T.cream, paddingTop:66 }}>
      <Wrap style={{ padding:"50px 26px" }}>
        <p className="stag">Expert Consultation</p>
        <h1 className="h-serif" style={{ fontSize:"clamp(26px,4vw,40px)", color:T.forest, marginBottom:8 }}>
          Choose your expert
        </h1>
        <p style={{ color:T.muted, fontSize:15, marginBottom:36, lineHeight:1.7 }}>
          All our experts have reviewed your assessment. Select the specialist best suited to your case.
        </p>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(290px,1fr))", gap:18, marginBottom:36 }}>
          {experts.map(e => (
            <div key={e.id} onClick={() => setSelected(e.id)}
              style={{ background:T.white, borderRadius:16, padding:"24px 20px",
                border:`2px solid ${selected===e.id ? T.pine : T.border}`,
                cursor:"pointer", transition:"all .2s",
                background: selected===e.id ? "rgba(45,106,79,.04)" : T.white }}>
              <div style={{ display:"flex", gap:14, marginBottom:14 }}>
                <div style={{ width:52, height:52, borderRadius:"50%",
                  background:`linear-gradient(135deg,${T.leaf},${T.pine})`,
                  display:"flex", alignItems:"center", justifyContent:"center",
                  fontSize:24, flexShrink:0 }}>{e.avatar}</div>
                <div>
                  <div style={{ fontWeight:700, fontSize:16, color:T.ink }}>{e.name}</div>
                  <div style={{ color:T.olive, fontSize:13, fontWeight:600 }}>{e.role}</div>
                  <div style={{ color:T.muted, fontSize:11 }}>{e.exp} exp · {e.lang}</div>
                </div>
              </div>
              <div style={{ display:"flex", gap:10, marginBottom:12 }}>
                <span style={{ background:T.cream, padding:"4px 10px", borderRadius:20,
                  fontSize:12, color:T.ink, fontWeight:600 }}>⭐ {e.rating} ({e.reviews} reviews)</span>
              </div>
              <div style={{ background:T.cream, borderRadius:8, padding:"8px 12px" }}>
                <span style={{ fontSize:12, color:T.muted }}>
                  🗓 Next available: <b style={{ color:T.pine }}>{e.next}</b>
                </span>
              </div>
              {selected===e.id && (
                <div style={{ marginTop:10, color:T.pine, fontSize:12, fontWeight:700 }}>
                  ✓ Selected
                </div>
              )}
            </div>
          ))}
        </div>

        {selected && (
          <div style={{ background:T.white, borderRadius:16, padding:"26px 22px",
            border:`1px solid ${T.border}`, marginBottom:24 }}>
            <h3 style={{ fontWeight:700, fontSize:16, color:T.forest, marginBottom:16 }}>
              Select a Time Slot
            </h3>
            <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
              {slots.map(s => (
                <button key={s} onClick={() => setSlot(s)}
                  style={{ padding:"10px 18px", borderRadius:8, fontSize:13, fontWeight:600,
                    border:`1.5px solid ${slot===s ? T.pine : T.border}`,
                    background: slot===s ? "rgba(45,106,79,.07)" : T.white,
                    color: slot===s ? T.pine : T.muted, cursor:"pointer", transition:"all .2s" }}>
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {selected && slot && (
          <div style={{ textAlign:"center" }}>
            <button onClick={() => setBooked(true)} className="btn-primary"
              style={{ padding:"16px 44px", fontSize:16, borderRadius:10 }}>
              Confirm Consultation →
            </button>
            <p style={{ color:T.muted, fontSize:12, marginTop:12 }}>
              ✓ Consultation details sent to your WhatsApp within 30 minutes
            </p>
          </div>
        )}
      </Wrap>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════
   DASHBOARD PAGE — Progress Tracking
═══════════════════════════════════════════════════════════ */
export const DashboardPage = ({ setPage }) => {
  const [activeTab, setActiveTab] = useState("overview");
  const tabs = ["overview","care-plan","progress","reports","support"];
  const tabLabels = { "overview":"Overview","care-plan":"Care Plan","progress":"Progress","reports":"Reports","support":"Support" };

  const carePlan = [
    { cat:"💧 Hydration", items:["Drink 3 litres of water daily","First glass within 15 min of waking","Lemon water (no sugar) — twice daily","Coconut water — once daily, morning preferred"] },
    { cat:"🥗 Diet — EAT MORE", items:["Citrus fruits (lemon, orange, sweet lime)","Low-oxalate vegetables (cauliflower, cabbage, peas)","Calcium-rich foods (milk, yoghurt, paneer)","Whole grains (wheat, oats, brown rice)"] },
    { cat:"🚫 Diet — AVOID / REDUCE", items:["Raw spinach (palak), beet root","Excess salt — target below 2300mg/day","Red meat and organ meats (uric acid risk)","Packaged foods, chips, namkeen"] },
    { cat:"🌿 Natural Supplements", items:["Cystone tablet — 2 tabs twice daily (after meals)","Potassium Citrate — as directed by your doctor","Punarnava kadha — 30ml morning (empty stomach)"] },
    { cat:"🏃 Lifestyle", items:["30 min walk daily — reduces stone risk significantly","Reduce sedentary time — stand every 45 min","Avoid excessive sweating without rehydration","Track your urine colour — target pale yellow"] },
  ];

  const progress = [
    { week:"Week 1", status:"complete", note:"Hydration protocol started. Pain at 7/10." },
    { week:"Week 2", status:"complete", note:"Water intake consistent. Pain reduced to 5/10." },
    { week:"Week 3", status:"complete", note:"Diet changes active. Urine clearer. Pain at 3/10." },
    { week:"Week 4", status:"current",  note:"Scan scheduled. Stone reducing." },
    { week:"Week 6", status:"upcoming", note:"Follow-up consultation booked." },
    { week:"Month 3", status:"upcoming", note:"Progress review and plan adjustment." },
  ];

  return (
    <div className="fade-in" style={{ minHeight:"100vh", background:"#F2F5F2", paddingTop:66 }}>
      {/* Dashboard header */}
      <div style={{ background:T.forest, padding:"30px 26px 0" }}>
        <Wrap>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start",
            flexWrap:"wrap", gap:14, marginBottom:24 }}>
            <div>
              <p style={{ color:"rgba(255,255,255,.5)", fontSize:12, marginBottom:4 }}>
                Welcome back
              </p>
              <h2 className="h-serif" style={{ fontSize:28, color:T.white }}>Your Health Dashboard</h2>
              <p style={{ color:T.leaf, fontSize:13, marginTop:4 }}>
                🟢 Care plan active · Next consultation: Thu, 21 Aug — 4:00 PM
              </p>
            </div>
            <button onClick={() => setPage("consult")} className="btn-primary"
              style={{ padding:"11px 22px", fontSize:13, borderRadius:8 }}>
              + Free Assessment
            </button>
          </div>
          {/* Tabs */}
          <div style={{ display:"flex", gap:2, overflowX:"auto" }}>
            {tabs.map(t => (
              <button key={t} onClick={() => setActiveTab(t)}
                style={{ background: activeTab===t ? "rgba(255,255,255,.12)" : "none",
                  border:"none", color: activeTab===t ? T.white : "rgba(255,255,255,.5)",
                  padding:"10px 18px", fontSize:13, fontWeight:600, cursor:"pointer",
                  fontFamily:"'Inter',sans-serif", borderRadius:"8px 8px 0 0",
                  borderBottom: activeTab===t ? `2px solid ${T.leaf}` : "2px solid transparent",
                  whiteSpace:"nowrap", transition:"all .2s" }}>
                {tabLabels[t]}
              </button>
            ))}
          </div>
        </Wrap>
      </div>

      <Wrap style={{ padding:"28px 26px" }}>
        {activeTab==="overview" && (
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:16, marginBottom:24 }}>
            {[
              { label:"Days on Program", value:"21 days", icon:"📅", color:T.pine },
              { label:"Water Goal", value:"3L / day", icon:"💧", color:T.info },
              { label:"Pain Level", value:"3 / 10", icon:"📉", color:T.success },
              { label:"Next Check-in", value:"Thu, 4 PM", icon:"🗓", color:T.gold },
            ].map(m => (
              <div key={m.label} className="dash-card" style={{ display:"flex", gap:12, alignItems:"center" }}>
                <div style={{ width:44, height:44, borderRadius:10,
                  background:m.color+"14", display:"flex", alignItems:"center",
                  justifyContent:"center", fontSize:22, flexShrink:0 }}>{m.icon}</div>
                <div>
                  <div style={{ color:T.muted, fontSize:11, fontWeight:600, marginBottom:2 }}>{m.label}</div>
                  <div style={{ fontWeight:800, fontSize:18, color:T.ink }}>{m.value}</div>
                </div>
              </div>
            ))}

            {/* Quick care summary */}
            <div className="dash-card" style={{ gridColumn:"1/-1" }}>
              <h3 style={{ fontWeight:700, fontSize:15, color:T.forest, marginBottom:14 }}>
                Today's Tasks
              </h3>
              <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                {["💧 Drink 3 glasses of water before 10 AM",
                  "🍋 Lemon water after lunch (no sugar)",
                  "💊 Cystone — 2 tablets after breakfast",
                  "🚶 30-minute evening walk"].map((t,i) => (
                  <div key={i} style={{ display:"flex", gap:10, alignItems:"center",
                    padding:"10px 14px", background:T.cream, borderRadius:10 }}>
                    <input type="checkbox" style={{ accentColor:T.pine }} />
                    <span style={{ fontSize:14, color:T.ink }}>{t}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab==="care-plan" && (
          <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
            {carePlan.map(section => (
              <div key={section.cat} className="dash-card">
                <h3 style={{ fontWeight:700, fontSize:15, color:T.forest, marginBottom:14 }}>
                  {section.cat}
                </h3>
                <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                  {section.items.map(item => (
                    <div key={item} style={{ display:"flex", gap:10, alignItems:"flex-start",
                      padding:"8px 12px", background:T.cream, borderRadius:8 }}>
                      <span style={{ color:T.pine, fontWeight:700, flexShrink:0 }}>✓</span>
                      <span style={{ fontSize:14, color:T.ink }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab==="progress" && (
          <div className="dash-card">
            <h3 style={{ fontWeight:700, fontSize:15, color:T.forest, marginBottom:20 }}>
              Your Recovery Timeline
            </h3>
            <div style={{ display:"flex", flexDirection:"column", gap:0 }}>
              {progress.map((p,i) => (
                <div key={p.week} style={{ display:"flex", gap:16, alignItems:"flex-start" }}>
                  <div style={{ display:"flex", flexDirection:"column", alignItems:"center" }}>
                    <div style={{ width:32, height:32, borderRadius:"50%", flexShrink:0,
                      background: p.status==="complete" ? T.pine : p.status==="current" ? T.gold : T.border,
                      display:"flex", alignItems:"center", justifyContent:"center",
                      color:"#fff", fontSize:14, fontWeight:700 }}>
                      {p.status==="complete" ? "✓" : p.status==="current" ? "◉" : "○"}
                    </div>
                    {i < progress.length-1 && (
                      <div style={{ width:2, height:40, background: p.status==="complete" ? T.pine+"40" : T.border }} />
                    )}
                  </div>
                  <div style={{ paddingBottom:24 }}>
                    <div style={{ fontWeight:700, fontSize:14, color:T.ink }}>{p.week}</div>
                    <div style={{ fontSize:13, color:T.muted, lineHeight:1.6 }}>{p.note}</div>
                    <div style={{ fontSize:11, fontWeight:700, marginTop:4,
                      color: p.status==="complete" ? T.success : p.status==="current" ? T.gold : T.muted }}>
                      {p.status==="complete" ? "✓ Completed" : p.status==="current" ? "⬤ In progress" : "○ Upcoming"}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab==="reports" && (
          <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
            <div className="dash-card">
              <h3 style={{ fontWeight:700, fontSize:15, color:T.forest, marginBottom:16 }}>
                Upload New Report
              </h3>
              <div style={{ border:`2px dashed ${T.border}`, borderRadius:12,
                padding:"32px 24px", textAlign:"center", cursor:"pointer",
                background:T.cream, transition:"border-color .2s" }}>
                <div style={{ fontSize:36, marginBottom:12 }}>📎</div>
                <p style={{ fontWeight:600, fontSize:15, color:T.ink, marginBottom:6 }}>
                  Upload ultrasound, lab report, or stone analysis
                </p>
                <p style={{ fontSize:13, color:T.muted }}>
                  PDF, JPG, or PNG · Max 10MB
                </p>
                <button className="btn-primary"
                  style={{ marginTop:16, padding:"10px 24px", fontSize:14, borderRadius:8 }}>
                  Choose File
                </button>
              </div>
            </div>
            <div className="dash-card">
              <h3 style={{ fontWeight:700, fontSize:15, color:T.forest, marginBottom:14 }}>
                Previous Reports
              </h3>
              {[
                { name:"Ultrasound_Report_July2026.pdf", date:"12 Jul 2026", status:"Reviewed" },
                { name:"KFT_BloodTest_June2026.pdf", date:"5 Jun 2026", status:"Reviewed" },
              ].map(r => (
                <div key={r.name} style={{ display:"flex", justifyContent:"space-between",
                  padding:"12px 0", borderBottom:`1px solid ${T.border}`, alignItems:"center" }}>
                  <div>
                    <div style={{ fontWeight:600, fontSize:13, color:T.ink }}>📄 {r.name}</div>
                    <div style={{ fontSize:11, color:T.muted }}>{r.date}</div>
                  </div>
                  <span style={{ background:"#DCFCE7", color:T.success,
                    padding:"3px 10px", borderRadius:20, fontSize:11, fontWeight:700 }}>
                    {r.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab==="support" && (
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))", gap:16 }}>
            {[
              { icon:"💬", title:"WhatsApp Support", desc:"Chat with your health coach directly on WhatsApp. Response within 2 hours.", action:"Open WhatsApp", color:"#25D366" },
              { icon:"📞", title:"Call Us", desc:"Speak to a patient support executive. Available Mon–Sat, 9 AM – 7 PM.", action:"Call Now", color:T.pine },
              { icon:"🗓", title:"Book a Consultation", desc:"Schedule a follow-up with your assigned doctor or dietitian.", action:"Book Now", color:T.gold },
              { icon:"📧", title:"Email Support", desc:"Send detailed queries to our medical team. Response within 24 hours.", action:"Send Email", color:T.info },
            ].map(s => (
              <div key={s.title} className="dash-card">
                <div style={{ fontSize:32, marginBottom:12 }}>{s.icon}</div>
                <h3 style={{ fontWeight:700, fontSize:15, color:T.ink, marginBottom:7 }}>{s.title}</h3>
                <p style={{ fontSize:13, color:T.muted, lineHeight:1.65, marginBottom:16 }}>{s.desc}</p>
                <button style={{ background:s.color, color:"#fff", border:"none",
                  borderRadius:8, padding:"10px 18px", fontSize:13, fontWeight:700,
                  cursor:"pointer", fontFamily:"'Inter',sans-serif", width:"100%" }}>
                  {s.action}
                </button>
              </div>
            ))}
          </div>
        )}
      </Wrap>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════
   STORIES PAGE
═══════════════════════════════════════════════════════════ */
export const StoriesPage = ({ setPage }) => {
  const stories = [
    { name:"Ramesh Kumar", city:"Jaipur, Rajasthan", age:44, stone:"8mm calcium oxalate", duration:"3 months", avatar:"👨", quote:"Had an 8mm stone and was told surgery was my only option. I tried Zivra as a last resort. 3 months later my ultrasound showed nothing. My urologist was genuinely surprised.", result:"Stone completely dissolved" },
    { name:"Sunita Deshpande", city:"Nagpur, Maharashtra", age:38, stone:"5mm uric acid stone", duration:"6 weeks", avatar:"👩", quote:"I used to wake up in severe pain at night and end up in emergency. Zivra's plan changed my diet. The WhatsApp guidance was daily and personal. By week 6, scan was clear.", result:"No more emergency visits" },
    { name:"Arjun Patel", city:"Surat, Gujarat", age:51, stone:"6mm, 2nd recurrence", duration:"4 months", avatar:"👨", quote:"Second stone in 3 years. First time I had surgery — they removed the stone but never told me why it formed. Zivra showed me exactly what was causing it. 4 months later, gone.", result:"1 year stone-free" },
    { name:"Priya Sharma", city:"Lucknow, UP", age:32, stone:"4mm stone during pregnancy", duration:"8 weeks", avatar:"👩", quote:"Kidney stone during pregnancy is terrifying. Surgery was not possible. Zivra's team coordinated with my OB and created a pregnancy-safe diet protocol. 8 weeks — resolved completely.", result:"Safe resolution, no surgery" },
  ];
  return (
    <div className="fade-in">
      <div style={{ background:`linear-gradient(140deg,${T.forest},#203D2F)`, padding:"120px 0 70px", textAlign:"center" }}>
        <Wrap>
          <p className="stag-white">Patient Stories</p>
          <h1 className="h-serif" style={{ fontSize:"clamp(28px,5vw,52px)", color:T.white, marginBottom:16 }}>
            Real people. Real stones.<br />Real results.
          </h1>
        </Wrap>
      </div>
      <section style={{ background:T.cream, padding:"70px 0" }}>
        <Wrap>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))", gap:22 }}>
            {stories.map(s => (
              <div key={s.name} style={{ background:T.white, borderRadius:16, overflow:"hidden",
                border:`1px solid ${T.border}`, boxShadow:"0 2px 14px rgba(27,58,45,.06)" }}>
                <div style={{ height:5, background:`linear-gradient(to right,${T.pine},${T.leaf})` }} />
                <div style={{ padding:"22px 22px 26px" }}>
                  <div style={{ display:"flex", justifyContent:"space-between",
                    alignItems:"flex-start", marginBottom:14 }}>
                    <div style={{ display:"flex", gap:10, alignItems:"center" }}>
                      <div style={{ width:42, height:42, borderRadius:"50%",
                        background:`linear-gradient(135deg,${T.leaf},${T.pine})`,
                        display:"flex", alignItems:"center", justifyContent:"center", fontSize:20 }}>{s.avatar}</div>
                      <div>
                        <div style={{ fontWeight:700, fontSize:14, color:T.ink }}>{s.name}</div>
                        <div style={{ color:T.muted, fontSize:12 }}>{s.city} · Age {s.age}</div>
                      </div>
                    </div>
                    <div style={{ background:"#DCFCE7", color:T.success, padding:"3px 10px",
                      borderRadius:20, fontSize:10, fontWeight:700 }}>✓ Verified</div>
                  </div>
                  <div style={{ display:"flex", gap:7, flexWrap:"wrap", marginBottom:14 }}>
                    {[s.stone, s.duration].map(t => (
                      <span key={t} style={{ background:T.cream, border:`1px solid ${T.border}`,
                        padding:"3px 9px", borderRadius:20, fontSize:11, color:T.ink }}>{t}</span>
                    ))}
                  </div>
                  <p style={{ fontSize:13.5, color:T.muted, lineHeight:1.8,
                    fontStyle:"italic", marginBottom:14 }}>"{s.quote}"</p>
                  <div style={{ display:"flex", alignItems:"center", gap:8, padding:"10px 13px",
                    background:"rgba(82,183,136,.08)", borderRadius:10,
                    border:`1px solid ${T.leaf}20` }}>
                    <span style={{ color:T.pine, fontSize:14 }}>🎯</span>
                    <span style={{ color:T.pine, fontWeight:700, fontSize:12 }}>{s.result}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Wrap>
      </section>
      <CTABanner setPage={setPage} />
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════
   ABOUT PAGE
═══════════════════════════════════════════════════════════ */
export const AboutPage = ({ setPage }) => (
  <div className="fade-in">
    <div style={{ background:`linear-gradient(140deg,${T.forest},#1E4A32)`, padding:"120px 0 70px" }}>
      <Wrap>
        <div className="about-flex" style={{ display:"flex", gap:52, alignItems:"center" }}>
          <div style={{ flex:1 }}>
            <p className="stag-white">Our Mission</p>
            <h1 className="h-serif" style={{ fontSize:"clamp(28px,4vw,48px)", color:T.white, marginBottom:18, lineHeight:1.2 }}>
              No one should pay ₹1 lakh to remove something that the right diet can fix.
            </h1>
            <p style={{ color:"rgba(255,255,255,.62)", fontSize:15, lineHeight:1.8 }}>
              Zivra was built from a simple observation: kidney stones are the most preventable
              painful condition in India, yet most patients leave hospitals with a prescription
              and zero dietary guidance. We fix that.
            </p>
          </div>
        </div>
      </Wrap>
    </div>
    <section style={{ background:T.white, padding:"70px 0" }}>
      <Wrap>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))", gap:20 }}>
          {[
            { icon:"🔬", t:"Science First", d:"Every protocol is grounded in peer-reviewed nephrology and nutrition research — not trends or guesswork." },
            { icon:"🇮🇳", t:"Built for India", d:"Real Indian foods. Real Indian conditions. Protocols adapted for Indian diets, climates, and budgets." },
            { icon:"💬", t:"Human Support", d:"Every patient gets a named health coach and expert who knows their case personally." },
            { icon:"🤝", t:"Doctor-Partnered", d:"We work alongside your urologist, not against them. We complement clinical care, never replace it." },
          ].map(({ icon, t, d }) => (
            <div key={t} style={{ background:T.cream, borderRadius:14, padding:"24px 20px" }}>
              <div style={{ fontSize:28, marginBottom:12 }}>{icon}</div>
              <h3 style={{ fontWeight:700, fontSize:16, color:T.forest, marginBottom:8 }}>{t}</h3>
              <p style={{ fontSize:13, color:T.muted, lineHeight:1.7 }}>{d}</p>
            </div>
          ))}
        </div>
      </Wrap>
    </section>
    <CTABanner setPage={setPage} />
  </div>
);

/* ═══════════════════════════════════════════════════════════
   PROGRAM PAGE (How It Works)
═══════════════════════════════════════════════════════════ */
export const ProgramPage = ({ setPage }) => (
  <div className="fade-in">
    <div style={{ background:`linear-gradient(140deg,${T.forest},#203D2F)`, padding:"120px 0 70px", textAlign:"center" }}>
      <Wrap>
        <p className="stag-white">The Zivra Platform</p>
        <h1 className="h-serif" style={{ fontSize:"clamp(28px,5vw,52px)", color:T.white, marginBottom:16 }}>
          How Zivra works
        </h1>
        <p style={{ color:"rgba(255,255,255,.6)", fontSize:16, maxWidth:520, margin:"0 auto 32px" }}>
          A complete healthcare journey — from your first assessment to long-term prevention.
        </p>
        <button onClick={() => setPage("assessment")} className="btn-primary"
          style={{ padding:"15px 38px", fontSize:16, borderRadius:10 }}>
          Take Your Health Assessment →
        </button>
      </Wrap>
    </div>
    <HowToStart setPage={setPage} />
    <RootCausesCarousel />
    <IngredientsCarousel />
    <ResultsTimeline />
    <DoctorSection setPage={setPage} />
    <CTABanner setPage={setPage} />
  </div>
);

/* ═══════════════════════════════════════════════════════════
   APP ROOT
═══════════════════════════════════════════════════════════ */
export default function App() {
  const [page, setPage] = useState("home");
  const nav = p => { setPage(p); window.scrollTo({ top:0, behavior:"smooth" }); };

  const pages = {
    home:       <HomePage setPage={nav} />,
    program:    <ProgramPage setPage={nav} />,
    stories:    <StoriesPage setPage={nav} />,
    about:      <AboutPage setPage={nav} />,
    assessment: <AssessmentPage setPage={nav} />,
    result:     <ResultPage setPage={nav} />,
    consult:    <ConsultPage setPage={nav} />,
    dashboard:  <DashboardPage setPage={nav} />,
  };

  const noFooter = ["assessment","result","dashboard"];

  return (
    <>
      <Styles />
      <ScrollProgress />
      <Navbar page={page} setPage={nav} />
      <main key={page} className="fade-in">{pages[page] || pages.home}</main>
      {!noFooter.includes(page) && <Footer setPage={nav} />}
      {/* WhatsApp FAB */}
      <a href="https://wa.me/919999999999?text=Hi, I would like to know about Zivra Health"
        target="_blank" rel="noreferrer" className="wa-fab">
        <svg viewBox="0 0 24 24" width="26" height="26" fill="#fff">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.116.555 4.103 1.523 5.824L0 24l6.338-1.5A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.007-1.372l-.36-.213-3.727.882.936-3.619-.233-.372A9.818 9.818 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z"/>
        </svg>
      </a>
      {/* Mobile sticky bar */}
      <div className="mob-bar">
        <a href="https://wa.me/919999999999" target="_blank" rel="noreferrer"
          style={{ flex:1, background:"#25D366", color:"#fff", border:"none",
            borderRadius:9, padding:"12px", textAlign:"center", fontWeight:700,
            fontSize:13, textDecoration:"none", display:"flex",
            alignItems:"center", justifyContent:"center", gap:6 }}>
          💬 WhatsApp
        </a>
        <button onClick={() => nav("assessment")} className="btn-primary"
          style={{ flex:2, padding:"12px", fontSize:13, borderRadius:9 }}>
          Take Assessment →
        </button>
      </div>
    </>
  );
}
