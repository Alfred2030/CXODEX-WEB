import Link from "next/link";
import { articles } from "../../content/articles";

export const metadata = {
  title: "洞察文章",
  description:
    "关于经营改善、精益生产、职业经理人、国际化与组织变革的实战洞察——写给创始人与 CEO 的经营笔记。"
};

export default function InsightsPage() {
  return (
    <>
      <section className="section">
        <div className="section-inner">
          <p className="eyebrow">Insights</p>
          <h1 className="max-w-5xl text-4xl font-semibold tracking-normal text-neutral-950 sm:text-5xl">洞察文章</h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-neutral-600">预留给 CEO 经营笔记、精益与销售管理观察、国际化实践思考。</p>
        </div>
      </section>
      <section className="section">
        <div className="section-inner grid gap-0 border-y border-neutral-200">
          {articles.map((post) => (
            <article key={post.title} className="grid gap-5 border-b border-neutral-200 py-8 last:border-b-0 lg:grid-cols-[12rem_1fr]">
              <time className="text-sm font-semibold text-blue-900">{post.date}</time>
              <div>
                <h2 className="text-2xl font-semibold text-neutral-950">
                  <Link href={`/insights/${post.slug}`} className="transition hover:text-blue-900">
                    {post.title}
                  </Link>
                </h2>
                <p className="mt-4 text-base leading-8 text-neutral-600">{post.excerpt}</p>
                <Link href={`/insights/${post.slug}`} className="mt-5 inline-flex text-sm font-semibold text-blue-900 hover:text-neutral-950">
                  阅读文章
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
