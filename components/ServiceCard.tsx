type ServiceCardProps = {
  index: number;
  title: string;
  body: string;
  target: string;
  problem: string;
  deliverables: string[];
};

export function ServiceCard({ index, title, body, target, problem, deliverables }: ServiceCardProps) {
  return (
    <article className="flex h-full flex-col bg-white p-6 sm:p-8">
      <span className="text-xs font-semibold tracking-[0.18em] text-blue-900">{String(index).padStart(2, "0")}</span>
      <h2 className="mt-5 text-2xl font-semibold leading-tight text-neutral-950">{title}</h2>
      <p className="mt-4 text-base leading-8 text-neutral-600">{body}</p>
      <dl className="mt-7 grid gap-5 border-t border-neutral-200 pt-6">
        <div>
          <dt className="text-xs font-semibold tracking-[0.16em] text-neutral-400">目标客户</dt>
          <dd className="mt-2 text-sm leading-7 text-neutral-700">{target}</dd>
        </div>
        <div>
          <dt className="text-xs font-semibold tracking-[0.16em] text-neutral-400">核心问题</dt>
          <dd className="mt-2 text-sm leading-7 text-neutral-700">{problem}</dd>
        </div>
      </dl>
      <div className="mt-6 border-t border-neutral-200 pt-6">
        <h3 className="text-xs font-semibold tracking-[0.16em] text-neutral-400">交付成果</h3>
        <ul className="mt-3 grid gap-2 text-sm leading-7 text-neutral-700">
          {deliverables.map((item) => (
            <li key={item} className="border-l-2 border-blue-900 pl-3">{item}</li>
          ))}
        </ul>
      </div>
    </article>
  );
}
