import Link from "next/link";
import { notFound } from "next/navigation";
import { articleDetails, articles } from "../../../content/articles";

type ArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = articleDetails[slug];

  if (!article) {
    return {};
  }

  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article"
    }
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = articleDetails[slug];

  if (!article) {
    notFound();
  }

  return (
    <>
      <section className="section">
        <div className="section-inner">
          <Link href="/insights" className="text-sm font-semibold text-blue-900 transition hover:text-neutral-950">
            返回洞察文章
          </Link>
          <p className="eyebrow mt-12">Management Insight</p>
          <h1 className="max-w-5xl text-4xl font-semibold tracking-normal text-neutral-950 sm:text-5xl">{article.title}</h1>
          <div className="mt-6 flex flex-wrap gap-4 text-sm font-semibold text-neutral-500">
            <time>{article.date}</time>
            {article.source ? <span>{article.source}</span> : null}
          </div>
          <p className="mt-8 max-w-4xl text-xl leading-9 text-neutral-700">{article.lead ?? article.excerpt}</p>
        </div>
      </section>

      {article.takeaways ? (
        <section className="section">
          <div className="section-inner grid gap-10 lg:grid-cols-[18rem_1fr]">
            <div>
              <p className="eyebrow">Key Points</p>
              <h2 className="text-3xl font-semibold text-neutral-950">核心启发</h2>
            </div>
            <div className="grid gap-px bg-neutral-200 sm:grid-cols-2">
              {article.takeaways.map((item) => (
                <div key={item} className="bg-white p-6 text-base font-semibold leading-8 text-neutral-800">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="section">
        <div className="section-inner">
          <article className="mx-auto max-w-4xl">
            {article.sections ? (
              <div className="grid gap-12">
                {article.sections.map((section) => (
                  <section key={section.title}>
                    <h2 className="text-2xl font-semibold leading-9 text-neutral-950">{section.title}</h2>
                    <div className="mt-5 grid gap-5">
                      {section.body.map((paragraph) => (
                        <p key={paragraph} className="text-lg leading-9 text-neutral-700">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            ) : (
              <p className="text-lg leading-9 text-neutral-700">{article.excerpt}</p>
            )}
          </article>
        </div>
      </section>
    </>
  );
}
