/* eslint-disable @next/next/no-img-element */
import { InstallButton } from "../components/InstallButton";
import { Theater3D } from "../components/three/Theater3D";
import { ToolsGrid } from "../components/three/ToolsGrid";
import { home, strengths, tools } from "../content/site";

// 金色光带（对标德勤绿色 swoosh 的品牌化处理）
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

export default function HomePage() {
  return (
    <>
      <style>{`
        @keyframes cxbob{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
        .cx-chip{position:absolute;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.18);backdrop-filter:blur(6px);border-radius:8px;padding:10px 14px;font-size:13px;color:#e8eaee;animation:cxbob 5s ease-in-out infinite}
        .cx-chip small{display:block;color:#9fe8f2;font-size:11px;letter-spacing:1px}
        .cx-glow{position:absolute;border-radius:50%;filter:blur(70px)}
        @media (max-width:960px){.cx-heroart{display:none}}
      `}</style>

      {/* ===== Hero：CEO 陪跑（德勤式深底 + 创始人实照 + 金色光带） ===== */}
      <section className="relative overflow-hidden text-white" style={{ background: "radial-gradient(1200px 500px at 78% 30%, #232a3d 0%, #15171c 55%)" }}>
        <div className="cx-heroart absolute inset-y-0 right-0 w-[58%] min-w-[520px]" aria-hidden>
          <div className="cx-glow" style={{ width: 360, height: 360, right: "20%", top: "10%", background: "#d4a63f", opacity: 0.16 }} />
          <div className="cx-glow" style={{ width: 300, height: 300, right: "4%", bottom: "-6%", background: "#38c8dd", opacity: 0.14 }} />
          <Swoosh id="swh" className="absolute inset-0 h-full w-full" />
          <div className="cx-chip" style={{ right: "36%", top: "20%" }}><small>ADVISORY</small>CEO 陪跑</div>
          <div className="cx-chip" style={{ right: "6%", top: "46%", animationDelay: "1.2s" }}><small>EXPORT</small>外贸抢单神器</div>
          <div className="cx-chip" style={{ right: "42%", bottom: "16%", animationDelay: "2.2s" }}><small>SCHEDULING</small>AI智能排产系统</div>
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-5 pb-16 pt-10 sm:px-8 lg:pb-20">
          <p className="mb-8 text-[13px] tracking-[0.2em] text-neutral-400">CEO ADVISORY · SINCE 1994</p>
          <h1 className="text-5xl font-light tracking-wide sm:text-6xl">CEO 陪跑</h1>
          <p className="mt-4 text-lg font-extrabold sm:text-xl">真打法。真工具。真结果。</p>
          <p className="mt-4 max-w-xl text-[1.02rem] leading-8 text-neutral-300">
            30 年一线经营者与你并肩下场：先诊断、定打法、再落地陪跑。打法沉淀成 8 个 AI 数字工具，
            <b className="text-white">注册登录后全部免费使用</b>。
          </p>
          <div className="mt-8 flex flex-wrap gap-3.5">
            <a href="/contact" className="rounded bg-[var(--gold)] px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90" data-umami-event="hero-booking">预约一次陪跑沟通</a>
            <a href="#theater" className="rounded border border-white/50 px-6 py-3 text-sm font-semibold text-white transition hover:border-[var(--gold-soft)] hover:text-[var(--gold-soft)]">▶ 观看 3D 业务介绍</a>
            <a href={tools.portalUrl} target="_blank" rel="noopener noreferrer" className="rounded border border-transparent px-4 py-3 text-sm font-semibold text-[var(--gold-soft)] hover:opacity-80" data-umami-event="hero-register">登录 / 免费注册 →</a>
          </div>
        </div>
      </section>

      {/* ===== 3D 剧场（直播区）：两分钟看懂 CEO 陪跑 ===== */}
      <Theater3D />

      {/* ===== 车间实景带 ===== */}
      <section className="relative overflow-hidden text-white" style={{ background: "#0b0d12" }}>
        <div className="absolute inset-0" style={{ background: "url(/img/machining.jpg) center/cover", filter: "brightness(.4) saturate(.75)" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(8,10,14,.92) 8%, rgba(8,10,14,.55) 46%, rgba(8,10,14,.25) 100%)" }} />
        <Swoosh id="swp" className="absolute inset-0 h-full w-full" style={{ opacity: 0.85 }} />
        <div className="relative z-10 mx-auto max-w-7xl px-5 py-20 sm:px-8">
          <p className="mb-3 text-[13px] font-bold tracking-[0.25em] text-[var(--gold-soft)]">FIELD ADVISORY · 走进车间的陪跑</p>
          <h2 className="text-3xl font-light sm:text-4xl">改善不在会议室，在现场。</h2>
          <p className="mt-3 max-w-xl leading-8 text-neutral-300">每周下场：车间、订单、报表——和你的团队一起把打法做进数字里，而不是留在 PPT 上。</p>
          <div className="mt-9 flex flex-wrap gap-x-12 gap-y-6">
            {[["+140%", "富耐克 2025 净利润"], ["+20%", "OEE 设备综合效率"], ["16 个", "深度服务行业"], ["8 个", "AI 数字工具 · 登录免费用"]].map(([v, l]) => (
              <div key={l}>
                <b className="block text-4xl font-extrabold leading-tight text-[var(--gold-soft)]">{v}</b>
                <span className="mt-1 block text-[13px] text-neutral-400">{l}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 关于王曙光（CEO 陪跑本尊） ===== */}
      <section className="section" id="about-founder">
        <div className="section-inner grid gap-11 lg:grid-cols-[340px_1fr]">
          <div className="text-center">
            <img src="/img/wang-portrait.jpg" alt="王曙光" className="block w-full rounded-xl" style={{ boxShadow: "0 0 0 1px rgba(212,166,63,.5), 0 14px 34px rgba(0,0,0,.14)" }} />
            <p className="mt-3 text-xs text-neutral-500">CXODEX 创始人 · 王曙光</p>
          </div>
          <div>
            <h2 className="serif text-3xl font-semibold text-neutral-950 sm:text-4xl">王曙光</h2>
            <p className="mt-1.5 text-[13px] font-bold tracking-[0.2em] text-[var(--gold)]">CXODEX 创始人 · CEO 陪跑教练</p>
            <p className="mt-4 max-w-2xl text-[0.95rem] leading-8 text-neutral-600">
              不是顾问式的“给建议”，而是经营者式的“一起干”。GE 十年总经理、六西格玛黑带大师；好孩子集团十年 CEO；
              30 年在 14 家不同所有制企业担任一号位，深度服务过 16 个行业。你在这个网站上看到的每一个方法和工具，都来自这些一线经历。
            </p>
            <div className="mt-6 grid gap-3.5 sm:grid-cols-2 xl:grid-cols-4">
              {[["GE 高管十年", "通用电气 · 全球化管理体系"], ["六西格玛黑带大师", "Master Black Belt · 持续改善"], ["好孩子集团 CEO 十年", "从制造到全球品牌"], ["30 年 · 16 个行业", "一线经营，不是理论"]].map(([b, s]) => (
                <div key={b} className="border-l-4 border-[var(--gold)] bg-white p-4 shadow-sm">
                  <b className="block text-[15px] text-neutral-950">{b}</b>
                  <span className="text-xs text-neutral-500">{s}</span>
                </div>
              ))}
            </div>
            <figure className="mt-6 border-l-4 border-[var(--gold)] bg-white p-5 shadow-sm">
              <blockquote className="serif text-lg font-semibold leading-8 text-neutral-950">“王老师是我悬崖边的那道墙。”</blockquote>
              <figcaption className="mt-1.5 text-sm text-neutral-500">—— 富耐克 李董事长（2025 年净利润 +140%，OEE 提升 20%）</figcaption>
            </figure>
            <div className="mt-6 grid max-w-2xl grid-cols-2 gap-3.5">
              {[["/img/wang-teaching.jpg", "实录 · 经营干部课堂（丹纳赫管理专题）"], ["/img/factory2.jpg", "GEMBA · 下到车间现场"]].map(([src, cap]) => (
                <figure key={src} className="relative m-0 aspect-video overflow-hidden rounded-lg" style={{ boxShadow: "inset 0 0 0 1px rgba(212,166,63,.35)" }}>
                  <img src={src} alt={cap} loading="lazy" className="h-full w-full object-cover" style={{ filter: "saturate(.8) brightness(.86)" }} />
                  <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent px-3 py-2 text-[11px] tracking-wider text-amber-100">{cap}</figcaption>
                </figure>
              ))}
            </div>
            <a href="/about" className="mt-6 inline-block text-sm font-semibold text-[var(--gold)] hover:opacity-80" data-umami-event="home-about-founder">
              完整履历与经历 →
            </a>
          </div>
        </div>
      </section>

      {/* ===== CXODEX 自动化工具列表（德勤式卡片 + 3D 使用讲解） ===== */}
      <section className="section !pt-0">
        <div className="section-inner !pt-4">
          <div className="mb-3 flex items-end justify-between gap-4">
            <p className="!mb-0 font-sans text-xl font-bold tracking-tight text-neutral-950 sm:text-2xl">CXODEX 自动化工具列表</p>
            <a href={tools.portalUrl} target="_blank" rel="noopener noreferrer" className="shrink-0 text-sm font-semibold text-[var(--gold)] hover:opacity-80">应用中心 →</a>
          </div>
          <p className="mb-4 max-w-3xl text-sm leading-6 text-neutral-500">把陪跑中反复用到的经营动作，沉淀成可自助使用的在线工具——随时可用，多数免费。点卡片上的 ▶ 看 18 秒 3D 使用讲解。</p>
          <p className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#ead9b8] bg-white px-4 py-1.5 text-[13px] text-[var(--gold)]">🔒 免费工具需登录后使用 · 邮箱验证码一键开通，无需记密码</p>
          <ToolsGrid items={tools.items} />
          <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-3">
            <InstallButton />
            <span className="text-sm leading-6 text-neutral-500">把 CXODEX 装到手机主屏，独立图标、全屏、可离线。</span>
          </div>
        </div>
      </section>

      {/* ===== 三大重点 ===== */}
      <section className="section">
        <div className="section-inner">
          <div className="mb-12 max-w-3xl">
            <p className="eyebrow">{strengths.eyebrow}</p>
            <h2 className="serif text-3xl font-semibold leading-tight tracking-tight text-neutral-950 sm:text-5xl">{strengths.title}</h2>
            <p className="mt-5 text-lg leading-8 text-neutral-600">{strengths.subtitle}</p>
          </div>
          <div className="grid gap-px bg-neutral-200 lg:grid-cols-3">
            {strengths.items.map((s) => (
              <div key={s.no} className="flex flex-col bg-white p-8 lg:p-10">
                <div className="num text-4xl font-semibold leading-none text-[var(--gold)]">{s.no}</div>
                <p className="mt-5 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--gold)]">{s.tag}</p>
                <h3 className="serif mt-3 text-2xl font-semibold leading-snug text-neutral-950">{s.title}</h3>
                <p className="mt-4 flex-1 text-[0.95rem] leading-8 text-neutral-600">{s.body}</p>
                <a
                  href={s.toolHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--gold)] hover:opacity-80"
                >
                  配套工具：{s.toolName}
                  <span aria-hidden>→</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 精简信任条 ===== */}
      <section className="section">
        <div className="section-inner !py-10 lg:!py-12">
          <div className="metric-grid border-y border-[var(--line)]">
            {home.proof.map((item) => (
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

      {/* ===== 服务过的企业 ===== */}
      <section className="text-white" style={{ background: "var(--ink)" }}>
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:py-16">
          <p className="eyebrow !text-amber-300/90">服务过的企业</p>
          <h2 className="serif max-w-3xl text-2xl font-semibold leading-snug text-white sm:text-4xl">
            从超硬材料到热力、光学、智能两轮与汽车塑件
          </h2>
          <div
            className="relative mt-9 overflow-hidden"
            style={{
              maskImage: "linear-gradient(to right, transparent, #000 6%, #000 94%, transparent)",
              WebkitMaskImage: "linear-gradient(to right, transparent, #000 6%, #000 94%, transparent)"
            }}
          >
            <ul className="marquee-x flex items-center gap-12 whitespace-nowrap">
              {[...tools.clients, ...tools.clients].map((c, i) => (
                <li key={i} className="text-lg font-semibold text-amber-300/90 sm:text-xl">{c}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
