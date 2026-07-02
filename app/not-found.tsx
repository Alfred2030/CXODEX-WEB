import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-neutral-950 px-5 text-white">
      <div className="max-w-xl">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-200">404</p>
        <h1 className="mt-4 text-4xl font-semibold">页面不存在</h1>
        <p className="mt-5 text-neutral-300">你访问的页面可能已移动，或暂时还没有发布。</p>
        <Link href="/" className="button-dark mt-8 border-white bg-white text-neutral-950 hover:border-blue-900 hover:bg-blue-900 hover:text-white">返回首页</Link>
      </div>
    </main>
  );
}
