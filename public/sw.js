/* CXODEX PWA service worker */
const VERSION = "cxodex-v15";
const CORE = [
  "/",
  "/about",
  "/services",
  "/methodology",
  "/cases",
  "/insights",
  "/contact",
  "/manifest.webmanifest",
  "/icon-192.png",
  "/icon-512.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(VERSION);
      // 逐个缓存，任一失败不影响安装
      await Promise.all(
        CORE.map((url) => cache.add(url).catch(() => null))
      );
      await self.skipWaiting();
    })()
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k)));
      await self.clients.claim();
    })()
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return; // 跨域交给浏览器

  // 不可变的构建产物：缓存优先
  if (url.pathname.startsWith("/_next/static/")) {
    event.respondWith(cacheFirst(req));
    return;
  }

  // 页面导航：网络优先，失败回退缓存，再回退首页
  if (req.mode === "navigate") {
    event.respondWith(
      (async () => {
        try {
          const fresh = await fetch(req);
          const cache = await caches.open(VERSION);
          cache.put(req, fresh.clone());
          return fresh;
        } catch {
          return (await caches.match(req)) || (await caches.match("/")) || Response.error();
        }
      })()
    );
    return;
  }

  // 其它同源 GET：stale-while-revalidate
  event.respondWith(
    (async () => {
      const cache = await caches.open(VERSION);
      const cached = await cache.match(req);
      const network = fetch(req)
        .then((res) => { cache.put(req, res.clone()); return res; })
        .catch(() => null);
      return cached || (await network) || Response.error();
    })()
  );
});

async function cacheFirst(req) {
  const cache = await caches.open(VERSION);
  const cached = await cache.match(req);
  if (cached) return cached;
  const res = await fetch(req);
  cache.put(req, res.clone());
  return res;
}
