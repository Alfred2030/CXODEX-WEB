import { methodology } from "../../content/site";

export const metadata = {
  title: "方法论",
  description:
    "先看事实、再定优先级、最后进入执行复盘——CXODEX 把 30 年经营经验沉淀为可执行的改善方法论。"
};

export default function MethodologyPage() {
  return (
    <>
      <section className="section">
        <div className="section-inner">
          <p className="eyebrow">Methodology</p>
          <h1 className="max-w-5xl text-4xl font-semibold tracking-normal text-neutral-950 sm:text-5xl">{methodology.title}</h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-neutral-600">{methodology.subtitle}</p>
        </div>
      </section>
      <section className="section">
        <div className="section-inner grid gap-14 lg:grid-cols-[1fr_0.8fr]">
          <div className="grid gap-0 border-y border-neutral-200">
            {methodology.steps.map((step, index) => (
              <article key={step.title} className="grid gap-5 border-b border-neutral-200 py-8 last:border-b-0 sm:grid-cols-[5rem_1fr]">
                <span className="text-sm font-semibold tracking-[0.18em] text-blue-900">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h2 className="text-2xl font-semibold text-neutral-950">{step.title}</h2>
                  <p className="mt-4 text-base leading-8 text-neutral-600">{step.body}</p>
                </div>
              </article>
            ))}
          </div>
          <aside className="border border-neutral-200 bg-neutral-50 p-8">
            <h2 className="text-xl font-semibold text-neutral-950">原则</h2>
            <div className="mt-7 grid gap-4">
              {methodology.principles.map((principle) => (
                <p key={principle} className="border-l-2 border-blue-900 pl-4 text-sm font-semibold leading-6 text-neutral-700">{principle}</p>
              ))}
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
