"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import { navigation, site, diagnoseUrl } from "../content/site";
import { enNavigation } from "../content/en";

const T = {
  zh: { back: "← 返回首页", backShort: "← 返回", diagnose: "开始企业诊断", menu: "菜单", other: "EN" },
  en: { back: "← Home", backShort: "← Home", diagnose: "Start diagnosis", menu: "Menu", other: "中文" }
};

function setLangPref(lang: string) {
  try { localStorage.setItem("cxo_lang", lang); } catch { /* ignore */ }
}

export function Header() {
  const pathname = usePathname();
  const isEn = pathname === "/en" || pathname.startsWith("/en/");
  const locale = isEn ? "en" : "zh";
  const t = T[locale];
  const home = isEn ? "/en" : "/";
  const nav = isEn ? enNavigation : navigation;
  const isHome = pathname === "/" || pathname === "/en";
  const counterpart = isEn ? (pathname.replace(/^\/en/, "") || "/") : "/en" + (pathname === "/" ? "" : pathname);
  const menuRef = useRef<HTMLDetailsElement>(null);
  const closeMenu = () => menuRef.current?.removeAttribute("open");

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200/80 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-28 max-w-7xl items-center justify-between gap-3 px-5 sm:px-8">
        <Link href={home} className="flex min-w-0 items-center gap-4">
          <span className="grid h-16 w-16 shrink-0 place-items-center overflow-hidden bg-white sm:h-20 sm:w-20">
            <Image src="/cxodex-logo.png" alt={`${site.brand} logo`} width={80} height={80} className="h-full w-full object-contain" priority />
          </span>
          <span className="min-w-0 leading-tight">
            <span className="block text-2xl font-bold tracking-[0.2em] text-neutral-950 sm:text-3xl">{site.brand}</span>
            <span className="hidden text-[0.7rem] uppercase tracking-[0.24em] text-[var(--gold)] sm:block">CEO Advisory</span>
          </span>
        </Link>
        {!isHome && (
          <nav className="hidden items-center gap-7 lg:flex" aria-label="Main navigation">
            <Link href={home} className="text-sm font-semibold text-[var(--gold)] transition hover:opacity-80">{t.back}</Link>
            {nav.map((item) => (
              <Link key={item.href} href={item.href} className="text-sm font-medium text-neutral-600 transition hover:text-neutral-950">
                {item.label}
              </Link>
            ))}
          </nav>
        )}
        <div className="hidden items-center gap-2.5 lg:flex">
          <Link href={counterpart} onClick={() => setLangPref(locale === "en" ? "zh" : "en")} className="border border-neutral-300 px-2.5 py-2 text-[0.8rem] font-semibold text-neutral-600 transition hover:border-[var(--gold)] hover:text-[var(--gold)]" data-umami-event="lang-switch">{t.other}</Link>
          <a href={diagnoseUrl} target="_blank" rel="noopener noreferrer" className="button-light min-h-0 px-3.5 py-2 text-[0.8rem]" data-umami-event="header-diagnose">{t.diagnose}</a>
        </div>
        <div className="flex items-center gap-2 lg:hidden">
          <Link href={counterpart} onClick={() => setLangPref(locale === "en" ? "zh" : "en")} className="border border-neutral-300 px-2 py-2 text-xs font-semibold text-neutral-600" data-umami-event="lang-switch-mobile">{t.other}</Link>
          <details ref={menuRef} className="group relative">
            <summary className="flex h-10 cursor-pointer list-none items-center gap-2 border border-neutral-400 px-3" aria-label="menu">
              <span className="flex flex-col gap-1">
                <span className="h-0.5 w-5 bg-neutral-950" />
                <span className="h-0.5 w-5 bg-neutral-950" />
                <span className="h-0.5 w-5 bg-neutral-950" />
              </span>
              <span className="whitespace-nowrap text-sm font-semibold text-neutral-950">{t.menu}</span>
            </summary>
            <div className="absolute right-0 mt-3 w-72 max-w-[calc(100vw-2.5rem)] border border-neutral-200 bg-white p-4 shadow-2xl shadow-neutral-950/10" onClick={closeMenu}>
              <div className="grid gap-1">
                <Link href={home} className="px-3 py-3 text-sm font-semibold text-[var(--gold)] hover:bg-neutral-100">{t.back}</Link>
                {nav.map((item) => (
                  <Link key={item.href} href={item.href} className="px-3 py-3 text-sm font-medium text-neutral-700 hover:bg-neutral-100 hover:text-neutral-950">
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}
