type CaseCardProps = {
  index: number;
  title: string;
  context: string;
  focus: string;
};

export function CaseCard({ index, title, context, focus }: CaseCardProps) {
  return (
    <article className="grid gap-6 border border-neutral-200 bg-white p-7 sm:p-9 lg:grid-cols-[8rem_1fr_1fr]">
      <span className="text-xs font-semibold tracking-[0.18em] text-blue-900">CASE {String(index).padStart(2, "0")}</span>
      <div>
        <h2 className="text-2xl font-semibold text-neutral-950">{title}</h2>
        <p className="mt-4 text-sm font-semibold uppercase tracking-[0.16em] text-neutral-400">背景</p>
        <p className="mt-3 text-base leading-8 text-neutral-600">{context}</p>
      </div>
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-neutral-400">工作重点</p>
        <p className="mt-3 text-base leading-8 text-neutral-600">{focus}</p>
      </div>
    </article>
  );
}
