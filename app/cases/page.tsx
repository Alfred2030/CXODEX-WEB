import { CaseCard } from "../../components/CaseCard";
import { cases } from "../../content/cases";

export const metadata = {
  title: "客户案例",
  description:
    "扭亏、交付改善、国际化与组织变革——来自超硬材料、光学、智能两轮等行业的真实改善案例（已脱敏）。"
};

export default function CasesPage() {
  return (
    <>
      <section className="section">
        <div className="section-inner">
          <p className="eyebrow">Cases</p>
          <h1 className="max-w-5xl text-4xl font-semibold tracking-normal text-neutral-950 sm:text-5xl">客户案例</h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-neutral-600">以下案例均来自真实服务经历，出于保密要求已做脱敏处理，用于说明典型经营议题与改善路径。</p>
        </div>
      </section>
      <section className="section">
        <div className="section-inner grid gap-6">
          {cases.map((item, index) => (
            <CaseCard key={item.title} index={index + 1} title={item.title} context={item.context} focus={item.focus} />
          ))}
        </div>
      </section>
    </>
  );
}
