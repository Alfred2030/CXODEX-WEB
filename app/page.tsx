import { Hero } from "../components/Hero";
import { InstallButton } from "../components/InstallButton";
import { LiveChannel } from "../components/LiveChannel";
import { home, strengths, tools, diagnoseUrl } from "../content/site";

export default function HomePage() {
  return (
    <>
      <Hero
        eyebrow={home.eyebrow}
        title={home.title}
        subtitle={home.subtitle}
        primaryHref={diagnoseUrl}
        primaryLabel={home.primaryCta}
        secondaryHref="/contact"
        secondaryLabel={home.secondaryCta}
      />

      {/* 直播窗口 */}
      <LiveChannel />

      {/* 单项工具 —— 紧跟诊断入口，金底白字横条，点击即进 */}
      <section className="section">
        <div className="section-inner !pt-14 lg:!pt-16">
          <div className="mb-8 flex items-end justify-between gap-4">
            <p className="!mb-0 font-sans text-xl font-bold tracking-tight text-neutral-950 sm:text-2xl">数字人工具</p>
            <a href={tools.portalUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-[var(--gold)] hover:opacity-80">应用中心 →</a>
          </div>
          <div className="grid gap-3.5">
            {tools.items.map((tool, i) => (
              <a
                key={tool.name}
                href={tool.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 sm:gap-6"
              >
                <span className="num w-10 shrink-0 text-2xl font-semibold leading-none text-[var(--gold)]">{String(i + 1).padStart(2, "0")}</span>
                <span className="flex flex-1 flex-col gap-1.5 bg-[var(--gold)] px-6 py-4 text-white transition group-hover:brightness-95 sm:flex-row sm:items-center sm:gap-6">
                  <span className="flex shrink-0 items-center gap-2.5 text-base font-semibold sm:w-52 sm:text-lg">
                    {tool.name}
                    {tool.tag ? <span className="border border-white/60 px-1.5 py-0.5 text-xs font-semibold">{tool.tag}</span> : null}
                  </span>
                  <span className="flex-1 text-sm leading-6 text-white/90">{tool.desc}</span>
                  <span aria-hidden className="hidden text-xl transition-transform group-hover:translate-x-1 sm:block">→</span>
                </span>
              </a>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-3">
            <InstallButton />
            <span className="text-sm leading-6 text-neutral-500">把 CXODEX 装到手机主屏，独立图标、全屏、可离线。</span>
          </div>
        </div>
      </section>

      {/* 三大重点 —— 版面主角 */}
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

      {/* 精简信任条 */}
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

      {/* 服务过的企业 —— 突出滚动 */}
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
