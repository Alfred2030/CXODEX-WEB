"use client";

import { useEffect, useState } from "react";

type BIP = Event & {
  prompt: () => void;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

type Env = "wechat" | "android" | "ios" | "desktop";

const TIPS: Record<Env, string> = {
  wechat:
    "微信内置浏览器无法直接安装。请点右上角「···」→「在浏览器打开」，再回到本页点「安装到手机」。",
  android:
    "请点浏览器右上角菜单（⋮）→ 选择「安装应用」或「添加到主屏幕」，即可把 CXODEX 装到桌面。",
  ios:
    "请用 Safari 打开本站，点底部「分享」图标 → 选择「添加到主屏幕」。",
  desktop:
    "点击地址栏右侧的安装图标，或浏览器菜单 →「安装 CXODEX」，即可添加为桌面应用。"
};

export function InstallButton() {
  const [standalone, setStandalone] = useState(false);
  const [modal, setModal] = useState<Env | null>(null);

  useEffect(() => {
    const sa =
      window.matchMedia("(display-mode: standalone)").matches ||
      (navigator as unknown as { standalone?: boolean }).standalone === true;
    setStandalone(!!sa);
    const onInstalled = () => setStandalone(true);
    window.addEventListener("appinstalled", onInstalled);
    return () => window.removeEventListener("appinstalled", onInstalled);
  }, []);

  if (standalone) return null;

  function detectEnv(): Env {
    const ua = navigator.userAgent.toLowerCase();
    if (ua.includes("micromessenger")) return "wechat";
    if (/iphone|ipad|ipod/.test(ua)) return "ios";
    if (ua.includes("android")) return "android";
    return "desktop";
  }

  async function onClick() {
    const dp = (window as unknown as { __bipEvent?: BIP }).__bipEvent;
    if (dp) {
      dp.prompt();
      try {
        await dp.userChoice;
      } catch {
        /* ignore */
      }
      (window as unknown as { __bipEvent?: BIP | null }).__bipEvent = null;
      return;
    }
    setModal(detectEnv());
  }

  return (
    <>
      <button
        onClick={onClick}
        className="inline-flex items-center gap-2 rounded-full bg-[var(--gold)] px-6 py-3 text-base font-semibold text-white transition hover:brightness-95"
      >
        <span aria-hidden style={{ fontSize: 18 }}>📲</span>
        安装到手机
      </button>

      {modal && (
        <div
          onClick={() => setModal(null)}
          style={{ position: "fixed", inset: 0, zIndex: 80, background: "rgba(0,0,0,.6)", display: "grid", placeItems: "center", padding: 20 }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{ background: "#fff", color: "#15130f", borderRadius: 16, padding: "26px 24px", maxWidth: 340, width: "100%", textAlign: "center", boxShadow: "0 20px 60px rgba(0,0,0,.35)" }}
          >
            <div style={{ fontFamily: "Georgia,'Songti SC',serif", fontSize: 19, fontWeight: 700 }}>
              把 CXODEX 装到手机
            </div>
            <p style={{ margin: "12px 0 6px", fontSize: 14, lineHeight: 1.7, color: "#2a2620", textAlign: "left" }}>
              {TIPS[modal]}
            </p>
            <p style={{ margin: "8px 0 16px", fontSize: 12, lineHeight: 1.6, color: "#6f6a5f", textAlign: "left" }}>
              安装后有独立图标、全屏打开、可离线，和商店 App 体验一致。
            </p>
            <button
              onClick={() => setModal(null)}
              style={{ width: "100%", padding: "10px 12px", borderRadius: 999, border: "none", background: "#15130f", color: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer" }}
            >
              知道了
            </button>
          </div>
        </div>
      )}
    </>
  );
}
