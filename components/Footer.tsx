import Link from "next/link";
import Image from "next/image";
import { navigation, site } from "../content/site";

export function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-neutral-950 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:px-8 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <div className="mb-5 inline-flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center overflow-hidden border border-white/20 bg-white">
              <Image src="/cxodex-logo.png" alt={`${site.brand} logo`} width={44} height={44} className="h-full w-full object-contain" />
            </span>
            <span>
              <strong className="block tracking-[0.22em]">{site.brand}</strong>
              <span className="text-xs uppercase tracking-[0.18em] text-neutral-400">CEO Advisory · Operating Improvement</span>
            </span>
          </div>
          <p className="max-w-xl text-sm leading-7 text-neutral-300">{site.description}</p>
        </div>
        <div className="grid gap-8 sm:grid-cols-2">
          <div>
            <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-neutral-500">Navigation</h2>
            <div className="grid gap-3">
              {navigation.map((item) => (
                <Link key={item.href} href={item.href} className="text-sm text-neutral-300 hover:text-white">{item.label}</Link>
              ))}
            </div>
          </div>
          <div>
            <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-neutral-500">Contact</h2>
            <a className="text-sm text-neutral-300 hover:text-white" href={`mailto:${site.email}`}>{site.email}</a>
            <p className="mt-6 text-xs text-neutral-500">© 2026 {site.domain}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
