"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { diagnoseUrl } from "../content/site";

export function CTA() {
  const pathname = usePathname();
  // 首页已有 hero 的「开始诊断/预约」，底部这块重复，故首页不显示（子页仍显示作收尾 CTA）。
  if (pathname === "/") return null;
  return (
    <section className="text-white" style={{ background: "var(--ink)" }}>
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-16 sm:px-8 lg:grid-cols-[1fr_auto] lg:items-center lg:py-24">
        <div>
          <p className="eyebrow mb-4 !text-amber-300/90">开始</p>
          <h2 className="serif max-w-3xl text-3xl font-semibold leading-tight sm:text-4xl">先给企业做一次体检。</h2>
          <p className="mt-5 max-w-2xl text-base leading-8 text-neutral-300">
            填几个关键数字，就能拿到一份可交付客户的诊断报告；想直接聊，也可以预约沟通。
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
          <Link href="/contact" className="button-ghost w-full sm:w-auto">
            预约沟通
          </Link>
          <a href={diagnoseUrl} target="_blank" rel="noopener noreferrer" className="button-gold w-full sm:w-auto">
            开始企业诊断 →
          </a>
        </div>
      </div>
    </section>
  );
}
