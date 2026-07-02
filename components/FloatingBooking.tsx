import Link from "next/link";

// 全站悬浮「预约沟通」按钮，固定在页面右下角，带闪烁图标吸引注意。
export function FloatingBooking() {
  return (
    <Link
      href="/contact"
      aria-label="预约沟通"
      className="fixed bottom-5 right-5 z-50 flex items-center gap-2.5 rounded-full border border-blue-900 bg-blue-800 px-5 py-3 text-sm font-semibold text-white shadow-xl shadow-blue-950/30 transition hover:border-blue-950 hover:bg-blue-900"
    >
      <span className="relative flex h-3 w-3" aria-hidden="true">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-300 opacity-80" />
        <span className="relative inline-flex h-3 w-3 rounded-full bg-amber-400" />
      </span>
      预约沟通
    </Link>
  );
}
