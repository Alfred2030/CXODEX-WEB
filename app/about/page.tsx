import Image from "next/image";
import { about } from "../../content/site";

export const metadata = {
  title: "关于我",
  description:
    "王曙光：30 年一号位实战经验，10 年 GE 总经理、六西格玛黑带大师，10 年好孩子集团 CEO，深度服务 16 个行业，陪 CEO 做最重要的决定。"
};

export default function AboutPage() {
  return (
    <>
      <section className="section">
        <div className="section-inner grid gap-10 lg:grid-cols-[1fr_22rem] lg:items-end">
          <div>
            <p className="eyebrow">About</p>
            <h1 className="max-w-5xl text-4xl font-semibold tracking-normal text-neutral-950 sm:text-5xl">{about.title}</h1>
            <p className="mt-7 max-w-3xl text-lg leading-8 text-neutral-600">{about.subtitle}</p>
            <p className="mt-7 max-w-3xl border-l-2 border-blue-900 pl-5 text-base leading-8 text-neutral-700">{about.belief}</p>
          </div>
          <div className="w-full max-w-sm overflow-hidden border border-neutral-200 bg-neutral-100 lg:justify-self-end">
            <Image
              src="/wang-shuguang-avatar.jpg"
              alt="王曙光头像"
              width={1602}
              height={1921}
              className="aspect-[4/5] w-full object-cover object-top"
              priority
            />
          </div>
        </div>
      </section>
      <section className="section">
        <div className="section-inner">
          <div className="metric-grid border-y border-neutral-200">
            {about.highlights.map((item) => (
              <div key={item.label} className="border-neutral-200 py-6 pr-5 lg:border-r">
                <strong className="block text-3xl font-semibold text-neutral-950">{item.value}</strong>
                <span className="mt-2 block text-sm leading-6 text-neutral-600">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="section-inner grid gap-10 lg:grid-cols-2">
          {about.sections.map((section) => (
            <article key={section.title} className="border-t border-neutral-950 pt-6">
              <h2 className="text-2xl font-semibold text-neutral-950">{section.title}</h2>
              <p className="mt-5 text-base leading-8 text-neutral-600">{section.body}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="bg-neutral-950 text-white">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-24">
          <p className="max-w-4xl text-2xl font-semibold leading-relaxed sm:text-3xl">{about.statement}</p>
        </div>
      </section>
    </>
  );
}
