"use client";

import { useEffect, useRef, useState } from "react";

// 香港 SRS 直播源，经 www 同源 /live/ 反代（避免跨域，最稳）。开播前 fetch 404 => “暂未开播”。
const STREAM_URL = "/live/cxodexlive.m3u8";
const SHARE_URL = "https://www.cxodex.com/#live";
const POLL_MS = 8000;

type Status = "checking" | "live" | "offline";

declare global {
  interface Window {
    Hls?: new (config?: unknown) => {
      loadSource: (u: string) => void;
      attachMedia: (v: HTMLMediaElement) => void;
      destroy: () => void;
    } & Record<string, unknown>;
  }
}

export function LiveChannel() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const hlsRef = useRef<{ destroy: () => void } | null>(null);
  const [status, setStatus] = useState<Status>("checking");
  const [share, setShare] = useState(false);
  const [copied, setCopied] = useState(false);
  const [idleFailed, setIdleFailed] = useState(false);
  const [unmuted, setUnmuted] = useState(false);

  // 轮询开播状态
  useEffect(() => {
    let stop = false;
    async function check() {
      try {
        const r = await fetch(`${STREAM_URL}?_=${Date.now()}`, { cache: "no-store" });
        if (r.ok) {
          const t = await r.text();
          // SRS 直播中返回 HLS 播放列表（主列表 #EXT-X-STREAM-INF 或媒体列表 #EXTINF）；未开播则 404
          if (t.includes("#EXTM3U")) {
            if (!stop) setStatus("live");
            return;
          }
        }
        if (!stop) setStatus("offline");
      } catch {
        if (!stop) setStatus("offline");
      }
    }
    check();
    const timer = setInterval(check, POLL_MS);
    return () => {
      stop = true;
      clearInterval(timer);
    };
  }, []);

  // 每次画面切换（循环视频/直播）都回到静音+显示开启声音按钮
  useEffect(() => {
    setUnmuted(false);
  }, [status]);

  // 直播中才初始化播放器
  useEffect(() => {
    const video = videoRef.current;
    if (status !== "live" || !video) return;

    // Safari / iOS 原生支持 HLS
    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = STREAM_URL;
      return () => {
        video.removeAttribute("src");
        video.load();
      };
    }

    // 其它浏览器用 hls.js（自托管）
    let cancelled = false;
    const startHls = () => {
      const Hls = window.Hls;
      if (!Hls || cancelled) return;
      const hls = new Hls({ lowLatencyMode: true, liveSyncDurationCount: 3 });
      hlsRef.current = hls;
      hls.loadSource(STREAM_URL);
      hls.attachMedia(video);
    };
    if (window.Hls) {
      startHls();
    } else {
      const s = document.createElement("script");
      s.src = "/vendor/hls.min.js";
      s.async = true;
      s.onload = startHls;
      document.body.appendChild(s);
    }
    return () => {
      cancelled = true;
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, [status]);

  function copyLink() {
    navigator.clipboard?.writeText(SHARE_URL).then(
      () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      },
      () => {}
    );
  }

  return (
    <section id="live" className="scroll-mt-28 text-white" style={{ background: "var(--ink)" }}>
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:py-16">
        <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow !text-amber-300/90">在线直播</p>
            <h2 className="serif text-2xl font-semibold leading-snug text-white sm:text-4xl">
              直播间 · 与王老师实时连线
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-neutral-300 sm:text-base">
              开播时在此实时观看经营专题与答疑，可分享给同事、客户一起看。
            </p>
          </div>
          <button
            onClick={() => setShare(true)}
            className="inline-flex items-center gap-2 rounded-full border border-white/30 px-4 py-2 text-sm font-semibold text-white transition hover:border-amber-300/80 hover:text-amber-300"
          >
            <span aria-hidden>🔗</span> 分享直播
          </button>
        </div>

        <div className="relative mx-auto w-full overflow-hidden rounded-xl border border-white/10 bg-black" style={{ aspectRatio: "16 / 9", maxWidth: 960 }}>
          {status === "live" ? (
            <>
              <video
                key="live"
                ref={videoRef}
                className="h-full w-full bg-black"
                controls
                playsInline
                autoPlay
                muted
              />
              <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-red-600 px-2.5 py-1 text-xs font-semibold text-white">
                <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-white" />
                直播中
              </span>
              {!unmuted && (
                <button
                  onClick={() => {
                    const v = videoRef.current;
                    if (v) {
                      v.muted = false;
                      v.play().catch(() => {});
                    }
                    setUnmuted(true);
                  }}
                  className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-black/70 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-black/85"
                >
                  <span aria-hidden>🔊</span> 点击开启声音
                </button>
              )}
            </>
          ) : !idleFailed ? (
            // 平时循环播放宣传视频（同源文件，所有浏览器可播）；文件缺失时回退到文字占位
            <>
              <video
                key="idle"
                ref={videoRef}
                className="h-full w-full bg-black object-contain"
                src="/live-idle.mp4"
                autoPlay
                muted
                loop
                playsInline
                controls
                onError={() => setIdleFailed(true)}
                onLoadedData={(e) => {
                  e.currentTarget.play().catch(() => {});
                }}
              />
              {!unmuted && (
                <button
                  onClick={() => {
                    const v = videoRef.current;
                    if (v) {
                      v.muted = false;
                      v.play().catch(() => {});
                    }
                    setUnmuted(true);
                  }}
                  className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-black/70 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-black/85"
                >
                  <span aria-hidden>🔊</span> 点击开启声音
                </button>
              )}
            </>
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-3 px-6 text-center">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold tracking-wide text-neutral-200">
                <span className="inline-block h-2 w-2 rounded-full bg-neutral-400" />
                {status === "checking" ? "正在连接…" : "暂未开播"}
              </span>
              <p className="max-w-md text-sm leading-7 text-neutral-400">
                开播后本页会自动出现直播画面，可先分享给需要的人。
              </p>
            </div>
          )}
        </div>
      </div>

      {share && (
        <div
          onClick={() => setShare(false)}
          style={{ position: "fixed", inset: 0, zIndex: 80, background: "rgba(0,0,0,.6)", display: "grid", placeItems: "center", padding: 20 }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{ background: "#fff", color: "#15130f", borderRadius: 16, padding: "26px 24px", maxWidth: 340, width: "100%", textAlign: "center", boxShadow: "0 20px 60px rgba(0,0,0,.35)" }}
          >
            <div style={{ fontFamily: "Georgia,'Songti SC',serif", fontSize: 19, fontWeight: 700 }}>分享直播间</div>
            <p style={{ margin: "8px 0 14px", fontSize: 13, lineHeight: 1.6, color: "#6f6a5f" }}>
              微信扫码即可打开直播间；在微信中打开后，点右上角「···」可转发给好友或朋友圈。
            </p>
            <img
              src="/live-qr.png"
              alt="直播间二维码"
              style={{ width: 200, height: 200, objectFit: "contain", border: "1px solid #e7e1d4", borderRadius: 12 }}
            />
            <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
              <button
                onClick={copyLink}
                style={{ flex: 1, padding: "10px 12px", borderRadius: 999, border: "1px solid #e7e1d4", background: "#fff", color: "#15130f", fontSize: 14, fontWeight: 600, cursor: "pointer" }}
              >
                {copied ? "已复制链接" : "复制链接"}
              </button>
              <button
                onClick={() => setShare(false)}
                style={{ flex: 1, padding: "10px 12px", borderRadius: 999, border: "none", background: "#15130f", color: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer" }}
              >
                关闭
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
