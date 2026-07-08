/* eslint-disable @next/next/no-img-element */
import { InstallButton } from "../../components/InstallButton";
import { Theater3D } from "../../components/three/Theater3D";
import { ToolsGrid } from "../../components/three/ToolsGrid";
import { enHome, enStrengths, enTools, enFounder } from "../../content/en";

export const metadata = {
  title: "CXODEX · CEO Advisory",
  description: "CEO advisory and operating improvement. 30 years of frontline leadership, distilled into 8 AI tools — all free after login.",
  openGraph: {
    title: "CXODEX · CEO Advisory",
    description: "Standing beside the CEO on the decisions that matter.",
    url: "https://www.cxodex.com/en",
    locale: "en_US"
  }
};

function Swoosh({ id, className, style }: { id: string; className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={{ mixBlendMode: "screen", pointerEvents: "none", ...style }} viewBox="0 0 900 640" preserveAspectRatio="xMidYMid slice" fill="none" aria-hidden>
      <defs>
        <linearGradient id={id} x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#d4a63f" stopOpacity="0" />
          <stop offset=".45" stopColor="#d4a63f" />
          <stop offset="1" stopColor="#ffe6a6" stopOpacity="0" />
        </linearGradient>
        <filter id={id + "b"} x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="5" /></filter>
      </defs>
      <path d="M-60 560 C 240 480 430 220 940 250" stroke={`url(#${id})`} strokeWidth="5" />
      <path d="M-60 600 C 260 520 520 290 950 320" stroke={`url(#${id})`} strokeWidth="2.5" opacity=".75" />
      <path d="M-60 520 C 230 430 440 170 930 195" stroke={`url(#${id})`} strokeWidth="7" opacity=".5" filter={`url(#${id}b)`} />
    </svg>
  );
}

export default function HomePageEn() {
  return (
    <>
      <style>{`
        @keyframes cxbob{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
        .cx-chip{position:absolute;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.18);backdrop-filter:blur(6px);border-radius:8px;padding:10px 14px;font-size:13px;color:#e8eaee;animation:cxbob 5s ease-in-out infinite}
        .cx-chip small{display:block;color:#9fe8f2;font-size:11px;letter-spacing:1px}
        .cx-glow{position:absolute;border-radius:50%;filter:blur(70px)}
        @media (max-width:960px){.cx-heroart{display:none}}
      `}</style>

      {/* ===== Hero ===== */}
      <section className="relative overflow-hidden text-white" style={{ background: "radial-gradient(1200px 500px at 78% 30%, #232a3d 0%, #15171c 55%)" }}>
        <div className="cx-heroart absolute inset-y-0 right-0 w-[58%] min-w-[520px]" aria-hidden>
          <div className="cx-glow" style={{ width: 360, height: 360, right: "20%", top: "10%", background: "#d4a63f", opacity: 0.16 }} />
          <div className="cx-glow" style={{ width: 300, height: 300, right: "4%", bottom: "-6%", background: "#38c8dd", opacity: 0.14 }} />
          <Swoosh id="swhEn" className="absolute inset-0 h-full w-full" />
          <div className="cx-chip" style={{ right: "36%", top: "20%" }}><small>ADVISORY</small>CEO Advisory</div>
          <div className="cx-chip" style={{ right: "6%", top: "46%", animationDelay: "1.2s" }}><small>EXPORT</small>Export Order Hunter</div>
          <div className="cx-chip" style={{ right: "42%", bottom: "16%", animationDelay: "2.2s" }}><small>SCHEDULING</small>AI Scheduling System</div>
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-5 pb-16 pt-10 sm:px-8 lg:pb-20">
          <p className="mb-8 text-[13px] tracking-[0.2em] text-neutral-400">CEO ADVISORY · SINCE 1994</p>
          <h1 className="text-5xl font-light tracking-wide sm:text-6xl">CEO Advisory</h1>
          <p className="mt-4 text-lg font-extrabold sm:text-xl">Real playbook. Real tools. Real results.</p>
          <p className="mt-4 max-w-xl text-[1.02rem] leading-8 text-neutral-300">
            A top operating leader of 30 years, in the fight beside you: diagnose first, set the playbook, then run it together.
            The playbook is distilled into 8 AI tools — <b className="text-white">all free once you log in</b>.
          </p>
          <div className="mt-8 flex flex-wrap gap-3.5">
            <a href="/en/contact" className="rounded bg-[var(--gold)] px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90" data-umami-event="hero-booking">Book a conversation</a>
            <a href="#theater" className="rounded border border-white/50 px-6 py-3 text-sm font-semibold text-white transition hover:border-[var(--gold-soft)] hover:text-[var(--gold-soft)]">▶ Watch the 3D intro</a>
          </div>
        </div>
      </section>

      {/* ===== 3D Theater ===== */}
      <Theater3D lang="en" />

      {/* ===== Field advisory band ===== */}
      <section className="relative overflow-hidden text-white" style={{ background: "#0b0d12" }}>
        <div className="absolute inset-0" style={{ background: "url(/img/machining.jpg) center/cover", filter: "brightness(.4) saturate(.75)" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(8,10,14,.92) 8%, rgba(8,10,14,.55) 46%, rgba(8,10,14,.25) 100%)" }} />
        <Swoosh id="swpEn" className="absolute inset-0 h-full w-full" style={{ opacity: 0.85 }} />
        <div className="relative z-10 mx-auto max-w-7xl px-5 py-20 sm:px-8">
          <p className="mb-3 text-[13px] font-bold tracking-[0.25em] text-[var(--gold-soft)]">FIELD ADVISORY · ON THE SHOP FLOOR</p>
          <h2 className="text-3xl font-light sm:text-4xl">Improvement doesn&apos;t happen in the boardroom.</h2>
          <p className="mt-3 max-w-xl leading-8 text-neutral-300">On the floor every week: production, orders, financials — landing the playbook in the numbers, not in a slide deck.</p>
          <div className="mt-9 flex flex-wrap gap-x-12 gap-y-6">
            {[["+140%", "Funik 2025 net profit"], ["+20%", "Overall equipment effectiveness"], ["16", "industries served in depth"], ["8", "AI tools · free after login"]].map(([v, l]) => (
              <div key={l}>
                <b className="block text-4xl font-extrabold leading-tight text-[var(--gold-soft)]">{v}</b>
                <span className="mt-1 block text-[13px] text-neutral-400">{l}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== About the founder ===== */}
      <section className="section" id="about-founder">
        <div className="section-inner grid gap-11 lg:grid-cols-[340px_1fr]">
          <div className="text-center">
            <img src="/img/wang-portrait.jpg" alt={enFounder.name} className="block w-full rounded-xl" style={{ boxShadow: "0 0 0 1px rgba(212,166,63,.5), 0 14px 34px rgba(0,0,0,.14)" }} />
            <p className="mt-3 text-xs text-neutral-500">Founder of CXODEX · {enFounder.name}</p>
          </div>
          <div>
            <h2 className="serif text-3xl font-semibold text-neutral-950 sm:text-4xl">{enFounder.name}</h2>
            <p className="mt-1.5 text-[13px] font-bold tracking-[0.2em] text-[var(--gold)]">{enFounder.role}</p>
            <p className="mt-4 max-w-2xl text-[0.95rem] leading-8 text-neutral-600">{enFounder.bio}</p>
            <div className="mt-6 grid gap-3.5 sm:grid-cols-2 xl:grid-cols-4">
              {[["10y GE General Manager", "Global management system"], ["Six Sigma Master Black Belt", "Continuous improvement"], ["10y CEO of Goodbaby", "From manufacturing to global brand"], ["30y · 16 industries", "Frontline, not theory"]].map(([b, s]) => (
                <div key={b} className="border-l-4 border-[var(--gold)] bg-white p-4 shadow-sm">
                  <b className="block text-[15px] text-neutral-950">{b}</b>
                  <span className="text-xs text-neutral-500">{s}</span>
                </div>
              ))}
            </div>
            <figure className="mt-6 border-l-4 border-[var(--gold)] bg-white p-5 shadow-sm">
              <blockquote className="serif text-lg font-semibold leading-8 text-neutral-950">&ldquo;{enFounder.quote}&rdquo;</blockquote>
              <figcaption className="mt-1.5 text-sm text-neutral-500">— {enFounder.quoteBy}</figcaption>
            </figure>
            <div className="mt-6 grid max-w-2xl grid-cols-2 gap-3.5">
              {[["/img/wang-teaching.jpg", "LIVE · Executive class (Danaher management)"], ["/img/factory2.jpg", "GEMBA · Down to the shop floor"]].map(([src, cap]) => (
                <figure key={src} className="relative m-0 aspect-video overflow-hidden rounded-lg" style={{ boxShadow: "inset 0 0 0 1px rgba(212,166,63,.35)" }}>
                  <img src={src} alt={cap} loading="lazy" className="h-full w-full object-cover" style={{ filter: "saturate(.8) brightness(.86)" }} />
                  <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent px-3 py-2 text-[11px] tracking-wider text-amber-100">{cap}</figcaption>
                </figure>
              ))}
            </div>
            <a href="/en/about" className="mt-6 inline-block text-sm font-semibold text-[var(--gold)] hover:opacity-80" data-umami-event="home-about-founder">{enFounder.aboutLabel}</a>
          </div>
        </div>
      </section>

      {/* ===== CXODEX Automation Tools ===== */}
      <section className="section !pt-0">
        <div className="section-inner !pt-4">
          <div className="mb-3 flex items-end justify-between gap-4">
            <p className="!mb-0 font-sans text-xl font-bold tracking-tight text-neutral-950 sm:text-2xl">{enTools.heading}</p>
            <a href={enTools.portalUrl} target="_blank" rel="noopener noreferrer" className="shrink-0 text-sm font-semibold text-[var(--gold)] hover:opacity-80">{enTools.portalLabel}</a>
          </div>
          <p className="mb-4 max-w-3xl text-sm leading-6 text-neutral-500">{enTools.subtitle} Click ▶ on any card for an 18-second 3D walkthrough.</p>
          <p className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#ead9b8] bg-white px-4 py-1.5 text-[13px] text-[var(--gold)]">🔒 Free after a quick email-code login — no password to remember</p>
          <ToolsGrid items={enTools.items} lang="en" />
          <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-3">
            <InstallButton />
            <span className="text-sm leading-6 text-neutral-500">Add CXODEX to your home screen — standalone icon, full screen, works offline.</span>
          </div>
        </div>
      </section>

      {/* ===== Three prescriptions ===== */}
      <section className="section">
        <div className="section-inner">
          <div className="mb-12 max-w-3xl">
            <p className="eyebrow">{enStrengths.eyebrow}</p>
            <h2 className="serif text-3xl font-semibold leading-tight tracking-tight text-neutral-950 sm:text-5xl">{enStrengths.title}</h2>
            <p className="mt-5 text-lg leading-8 text-neutral-600">{enStrengths.subtitle}</p>
          </div>
          <div className="grid gap-px bg-neutral-200 lg:grid-cols-3">
            {enStrengths.items.map((s) => (
              <div key={s.no} className="flex flex-col bg-white p-8 lg:p-10">
                <div className="num text-4xl font-semibold leading-none text-[var(--gold)]">{s.no}</div>
                <p className="mt-5 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--gold)]">{s.tag}</p>
                <h3 className="serif mt-3 text-2xl font-semibold leading-snug text-neutral-950">{s.title}</h3>
                <p className="mt-4 flex-1 text-[0.95rem] leading-8 text-neutral-600">{s.body}</p>
                <a href={s.toolHref} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--gold)] hover:opacity-80">
                  Tool: {s.toolName}
                  <span aria-hidden>→</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Proof metrics ===== */}
      <section className="section">
        <div className="section-inner !py-10 lg:!py-12">
          <div className="metric-grid border-y border-[var(--line)]">
            {enHome.proof.map((item) => (
              <div key={item.label} className="border-[var(--line)] py-7 pr-5 lg:border-r">
                <strong className="flex items-baseline gap-0.5 text-neutral-950">
                  <span className="num text-5xl font-semibold leading-none text-[var(--gold)]">{item.value}</span>
                  <span className="text-lg font-medium text-neutral-700">{item.unit}</span>
                </strong>
                <span className="mt-3 block text-sm leading-6 text-neutral-600">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Clients ===== */}
      <section className="text-white" style={{ background: "var(--ink)" }}>
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:py-16">
          <p className="eyebrow !text-amber-300/90">{enTools.clientsEyebrow}</p>
          <h2 className="serif max-w-3xl text-2xl font-semibold leading-snug text-white sm:text-4xl">{enTools.clientsTitle}</h2>
          <div className="relative mt-9 overflow-hidden" style={{ maskImage: "linear-gradient(to right, transparent, #000 6%, #000 94%, transparent)", WebkitMaskImage: "linear-gradient(to right, transparent, #000 6%, #000 94%, transparent)" }}>
            <ul className="marquee-x flex items-center gap-12 whitespace-nowrap">
              {[...enTools.clients, ...enTools.clients].map((c, i) => (
                <li key={i} className="text-lg font-semibold text-amber-300/90 sm:text-xl">{c}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
