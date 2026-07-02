import Link from "next/link";
import { navigation } from "../content/site";

type HeroProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
  primaryHref: string;
  primaryLabel: string;
  secondaryHref?: string;
  secondaryLabel?: string;
};

export function Hero({
  eyebrow,
  title,
  subtitle,
  primaryHref,
  primaryLabel,
  secondaryHref = "/contact",
  secondaryLabel = "预约一次沟通"
}: HeroProps) {
  return (
    <section className="hero-photo border-b border-neutral-900 text-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-12 px-5 py-12 sm:px-8 sm:py-14 lg:gap-20 lg:py-20">
        <nav className="hidden flex-wrap items-center gap-x-8 gap-y-2 lg:flex" aria-label="主导航">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm font-medium tracking-wide text-neutral-200 transition hover:text-white">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="max-w-4xl">
          <p className="eyebrow mb-5 !text-amber-300/90">{eyebrow}</p>
          <h1 className="serif whitespace-pre-line text-4xl font-semibold leading-[1.12] tracking-tight sm:text-6xl lg:text-7xl">{title}</h1>
          <p className="mt-7 max-w-2xl text-base leading-8 text-neutral-300 sm:text-lg">{subtitle}</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href={primaryHref} target="_blank" rel="noopener noreferrer" className="button-gold px-7 text-base">
              {primaryLabel} →
            </a>
            <Link href={secondaryHref} className="button-ghost">
              {secondaryLabel}
            </Link>
          </div>
          <div className="mt-9 flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-white/15 pt-6 text-sm font-medium">
            <span className="text-amber-300">① 填 OEE / 产能</span>
            <span className="text-neutral-500">→</span>
            <span className="text-amber-300">② 填财务 / 订单</span>
            <span className="text-neutral-500">→</span>
            <span className="text-amber-300">③ 出《CXO 企业体检报告》</span>
          </div>
        </div>
      </div>
    </section>
  );
}
