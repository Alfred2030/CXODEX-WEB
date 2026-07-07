/* eslint-disable */
"use client";
// 3D 剧场 · 两分钟看懂 CEO 陪跑（网页实时渲染，替代直播闲时位）
import { useEffect, useRef } from "react";
import { THREE, M, label, setOpacity, fade, smooth, buildChar, baseScene } from "./stageLib";

const DUR = 46;
const CAPS = [
  { t: 0, end: 8, text: "30 年一线经营者：GE 高管十年 · 六西格玛黑带大师 · 好孩子集团 CEO 十年" },
  { t: 8, end: 18, text: "CEO 陪跑——不是讲课，是和你一起下场打仗" },
  { t: 18, end: 30, text: "富耐克 2025：净利润 +140% · OEE +20%" },
  { t: 30, end: 40, text: "打法沉淀成 8 个 AI 数字工具，登录后全部免费使用" },
  { t: 40, end: 46, text: "真打法。真工具。真结果。" },
];
const CAMS = [
  { t: 0, pos: [0, 2.0, 6.6], look: [0, 1.3, 0] },
  { t: 7, pos: [0.9, 2.15, 6.9], look: [0, 1.3, 0] },
  { t: 9, pos: [1.6, 2.4, 9.2], look: [1.2, 1.2, 0] },
  { t: 17, pos: [4.6, 2.6, 9.6], look: [4.4, 1.4, -0.4] },
  { t: 19, pos: [3.4, 2.9, 9.4], look: [4.0, 1.7, -0.6] },
  { t: 29, pos: [3.4, 2.9, 9.4], look: [4.0, 1.7, -0.6] },
  { t: 31, pos: [0, 2.5, 8.6], look: [0, 1.5, 0] },
  { t: 39, pos: [0, 2.7, 8.6], look: [0, 1.5, 0] },
  { t: 46, pos: [0, 4.4, 13.5], look: [0, 1.3, 0] },
];

export function Theater3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const capRef = useRef<HTMLSpanElement>(null);
  const fillRef = useRef<HTMLElement>(null);
  const timeRef = useRef<HTMLSpanElement>(null);
  const ppRef = useRef<HTMLButtonElement>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const progRef = useRef<HTMLDivElement>(null);
  const eng = useRef<any>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const R = baseScene(canvasRef.current);
    const { renderer, scene, camera, goldLight } = R;
    const C = buildChar(); scene.add(C.g);

    /* 工厂 */
    const factory = new THREE.Group();
    {
      const wall = M(0x2b3345), roofM = M(0x222836), win = M(0x38c8dd, { emissive: 0x38c8dd, emissiveIntensity: 0.05 });
      const main = new THREE.Mesh(new THREE.BoxGeometry(3.4, 1.7, 2), wall); main.position.y = 0.85; main.castShadow = true; factory.add(main);
      const roof = new THREE.Mesh(new THREE.CylinderGeometry(1.15, 1.15, 3.5, 3, 1), roofM);
      roof.rotation.z = Math.PI / 2; roof.rotation.y = Math.PI / 2; roof.position.y = 2.05; roof.scale.set(1, 0.98, 0.62); factory.add(roof);
      const chim = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.2, 1.1, 10), roofM); chim.position.set(1.15, 2.4, 0); factory.add(chim);
      (factory as any).userData.windows = [];
      for (let i = 0; i < 3; i++) {
        const w = new THREE.Mesh(new THREE.PlaneGeometry(0.5, 0.42), (win as any).clone());
        w.position.set(-1.05 + i * 1.05, 0.95, 1.01); factory.add(w); (factory as any).userData.windows.push(w);
      }
      const gear = new THREE.Group();
      const t = new THREE.Mesh(new THREE.TorusGeometry(0.5, 0.13, 10, 24), M(0xd4a63f, { emissive: 0x6b4f16, emissiveIntensity: 0.35 }));
      gear.add(t);
      for (let i = 0; i < 8; i++) {
        const tooth = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.3, 0.14), M(0xd4a63f));
        const a = (i / 8) * Math.PI * 2; tooth.position.set(Math.cos(a) * 0.68, Math.sin(a) * 0.68, 0); tooth.rotation.z = a; gear.add(tooth);
      }
      gear.position.set(-2.35, 1.5, 0.4); factory.add(gear); (factory as any).userData.gear = gear;
      const sign = label("陪跑企业", "#cfd8ea", 2.0); sign.position.set(0, 2.9, 0); factory.add(sign);
      factory.position.set(7.4, 0, -1.4);
    }
    scene.add(factory);

    /* 成果柱状图 */
    const bars = new THREE.Group();
    {
      const defs = [
        { x: 0, h: 1.15, c: 0x8fa4c8, text: null as string | null },
        { x: 1.0, h: 2.1, c: 0x38c8dd, text: "OEE +20%" },
        { x: 2.0, h: 3.0, c: 0xd4a63f, text: "净利润 +140%" },
      ];
      (bars as any).userData.items = [];
      defs.forEach((d) => {
        const b = new THREE.Mesh(new THREE.BoxGeometry(0.62, 1, 0.62), M(d.c, { emissive: d.c, emissiveIntensity: 0.12 }));
        b.position.x = d.x; b.castShadow = true; bars.add(b);
        let lb: any = null;
        if (d.text) { lb = label(d.text, "#" + d.c.toString(16).padStart(6, "0"), 2.4); lb.position.set(d.x, d.h + 0.55, 0); bars.add(lb); }
        (bars as any).userData.items.push({ mesh: b, h: d.h, label: lb });
      });
      bars.position.set(4.1, 0, -0.7);
    }
    scene.add(bars);

    /* 8 工具环绕 */
    const tools = new THREE.Group();
    {
      (tools as any).userData.cubes = [];
      for (let i = 0; i < 8; i++) {
        const cube = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.42, 0.42),
          M(i % 2 ? 0xd4a63f : 0x38c8dd, { emissive: i % 2 ? 0xd4a63f : 0x38c8dd, emissiveIntensity: 0.28 }));
        cube.castShadow = true; tools.add(cube); (tools as any).userData.cubes.push(cube);
      }
      const ring = new THREE.Mesh(new THREE.TorusGeometry(2.1, 0.015, 8, 80), M(0xd4a63f, { emissive: 0xd4a63f, emissiveIntensity: 0.5 }));
      ring.rotation.x = Math.PI / 2.25; tools.add(ring);
      const t2 = ring.clone(); t2.rotation.x = Math.PI / 1.75; t2.rotation.y = 0.5; tools.add(t2);
      tools.position.set(0, 1.5, 0);
    }
    scene.add(tools);

    function camAt(t: number) {
      let i = 0; while (i < CAMS.length - 2 && t > CAMS[i + 1].t) i++;
      const a = CAMS[i], b = CAMS[i + 1];
      const k = smooth((t - a.t) / Math.max(0.001, b.t - a.t));
      for (let j = 0; j < 3; j++) camera.position.setComponent(j, a.pos[j] + (b.pos[j] - a.pos[j]) * k);
      camera.lookAt(
        a.look[0] + (b.look[0] - a.look[0]) * k,
        a.look[1] + (b.look[1] - a.look[1]) * k,
        a.look[2] + (b.look[2] - a.look[2]) * k);
    }

    let T = 0, playing = true, last = performance.now();
    const fmt = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
    const playT = (p: boolean) => { playing = p; if (ppRef.current) ppRef.current.textContent = p ? "⏸" : "▶"; last = performance.now(); };

    function update(t: number) {
      const c = CAPS.find((c) => t >= c.t && t < c.end);
      if (capRef.current) {
        capRef.current.textContent = c ? c.text : "";
        (capRef.current.parentElement as HTMLElement).style.opacity = c ? "1" : "0";
      }
      if (fillRef.current) fillRef.current.style.width = (t / DUR) * 100 + "%";
      if (timeRef.current) timeRef.current.textContent = fmt(t) + " / " + fmt(DUR);
      if (endRef.current) endRef.current.classList.toggle("show", t >= DUR - 1.2);

      camAt(t);
      goldLight.intensity = 20 + Math.sin(t * 2.1) * 5;

      const ch = C; let walk = 0;
      if (t < 8) {
        ch.g.position.set(0, 0, 0.4); ch.g.rotation.y = Math.sin(t * 0.5) * 0.12;
        ch.body.scale.y = 1 + Math.sin(t * 2) * 0.012;
        ch.armL.rotation.x = Math.sin(t * 1.4) * 0.08; ch.armR.rotation.x = -Math.sin(t * 1.4) * 0.08;
      } else if (t < 18) {
        const k = (t - 8) / 10; const x = -3.4 + k * 6.2;
        ch.g.position.set(x, Math.abs(Math.sin(t * 7)) * 0.05, 0.6);
        ch.g.rotation.y = Math.PI / 2; walk = 1;
      } else if (t < 30) {
        ch.g.position.set(2.8, 0, 0.6);
        ch.g.rotation.y = Math.PI / 2.6;
        ch.armR.rotation.x = -1.9 + Math.sin(t * 2.6) * 0.07;
        ch.armR.rotation.z = -0.3;
        ch.armL.rotation.x = Math.sin(t * 1.4) * 0.08;
      } else if (t < 40) {
        ch.g.position.set(0, 0, 0);
        ch.g.rotation.y = (t - 30) * 0.5;
        ch.armL.rotation.x = -0.5; ch.armR.rotation.x = -0.5;
        ch.armL.rotation.z = 0.5; ch.armR.rotation.z = -0.5;
      } else {
        ch.g.position.set(0, 0, 0); ch.g.rotation.y = Math.sin(t) * 0.15;
        ch.armR.rotation.x = -2.35; ch.armR.rotation.z = Math.sin(t * 6) * 0.35;
        ch.armL.rotation.x = 0; ch.armL.rotation.z = 0;
      }
      if (walk) {
        const w = Math.sin(t * 7) * 0.68;
        ch.legL.rotation.x = w; ch.legR.rotation.x = -w;
        ch.armL.rotation.x = -w * 0.62; ch.armR.rotation.x = w * 0.62;
      } else if (t < 8 || (t >= 30 && t < 40)) {
        ch.legL.rotation.x = 0; ch.legR.rotation.x = 0;
      }

      setOpacity(factory, fade(t, 6.5, 19.5));
      const lit = smooth((t - 13) / 2.5);
      (factory as any).userData.windows.forEach((w: any) => (w.material.emissiveIntensity = 0.05 + lit * 1.5));
      (factory as any).userData.gear.rotation.z += 0.004 + lit * 0.05;

      const bo = fade(t, 17.5, 31);
      setOpacity(bars, bo);
      (bars as any).userData.items.forEach((it: any, i: number) => {
        const k = smooth((t - 18.6 - i * 1.1) / 1.6);
        it.mesh.scale.y = Math.max(0.001, k * it.h);
        it.mesh.position.y = it.mesh.scale.y / 2;
        if (it.label) it.label.material.opacity = Math.min(bo, smooth((t - 19.4 - i * 1.1) / 1.2));
      });

      const to = fade(t, 29.5, 41.5);
      setOpacity(tools, to);
      tools.rotation.y = t * 0.7;
      (tools as any).userData.cubes.forEach((cb: any, i: number) => {
        const a = (i / 8) * Math.PI * 2 + t * 0.7;
        const tilt = i % 2 ? 0.35 : -0.3;
        cb.position.set(Math.cos(a) * 2.1, Math.sin(a * 2) * 0.35 * Math.sin(tilt + 1), Math.sin(a) * 2.1);
        cb.rotation.x = t; cb.rotation.y = t * 1.3;
      });
    }

    function loop() {
      const now = performance.now();
      if (playing) { T += (now - last) / 1000; if (T >= DUR) { T = DUR; playT(false); } }
      last = now;
      update(T);
      renderer.render(scene, camera);
    }
    renderer.setAnimationLoop(loop);
    const onVis = () => { last = performance.now(); };
    document.addEventListener("visibilitychange", onVis);

    eng.current = {
      toggle: () => playT(!playing),
      replay: () => { T = 0; playT(true); },
      progSeek: (e: React.MouseEvent) => {
        const r = progRef.current!.getBoundingClientRect();
        T = Math.max(0, Math.min(DUR, ((e.clientX - r.left) / r.width) * DUR)); playT(true);
      },
    };

    return () => { document.removeEventListener("visibilitychange", onVis); R.dispose(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="text-white" id="theater" style={{ background: "#0b0d12" }}>
      <style>{`
        .t3d-wrap{position:relative;border-radius:10px;overflow:hidden;background:#0e1015;border:1px solid #262b36;box-shadow:0 20px 60px rgba(0,0,0,.5)}
        .t3d-wrap canvas{width:100%;height:auto;display:block}
        .t3d-cap{position:absolute;left:0;right:0;bottom:64px;display:flex;justify-content:center;pointer-events:none;padding:0 20px}
        .t3d-cap span{background:rgba(8,10,14,.72);border:1px solid rgba(255,255,255,.14);color:#f3e9d2;padding:10px 22px;border-radius:8px;font-size:16.5px;letter-spacing:.5px;backdrop-filter:blur(4px);text-align:center}
        .t3d-ctl{position:absolute;left:0;right:0;bottom:0;display:flex;align-items:center;gap:14px;padding:12px 16px;background:linear-gradient(transparent, rgba(5,6,9,.85) 40%)}
        .t3d-ctl button{background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.25);color:#fff;width:38px;height:38px;border-radius:50%;font-size:15px;cursor:pointer;transition:.15s}
        .t3d-ctl button:hover{background:var(--gold);border-color:var(--gold)}
        .t3d-prog{flex:1;height:5px;background:rgba(255,255,255,.18);border-radius:99px;cursor:pointer;position:relative}
        .t3d-prog i{position:absolute;left:0;top:0;bottom:0;background:#d4a63f;border-radius:99px;width:0%}
        .t3d-time{font-size:12.5px;color:#c5cbd4;font-variant-numeric:tabular-nums;min-width:86px;text-align:right}
        .t3d-end{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;background:rgba(8,10,14,.55);opacity:0;pointer-events:none;transition:opacity .8s}
        .t3d-end.show{opacity:1;pointer-events:auto}
        .t3d-live{display:inline-flex;align-items:center;gap:7px;font-size:12.5px;font-weight:700;letter-spacing:2px;color:#ff6b6b;border:1px solid #ff6b6b66;padding:4px 12px;border-radius:999px}
        .t3d-live i{width:8px;height:8px;border-radius:50%;background:#ff5252;animation:t3dpulse 1.4s infinite}
        @keyframes t3dpulse{0%,100%{opacity:1}50%{opacity:.25}}
      `}</style>
      <div className="mx-auto max-w-5xl px-5 py-14 sm:px-8">
        <div className="mb-2 flex flex-wrap items-baseline gap-4">
          <span className="t3d-live"><i />直播间</span>
          <h2 className="text-2xl font-light sm:text-3xl">3D 剧场 · 两分钟看懂 CEO 陪跑</h2>
        </div>
        <p className="mb-5 text-sm text-neutral-400">3D 卡通实时渲染 · 自动播放 · 可暂停 / 拖动进度</p>
        <div className="t3d-wrap">
          <canvas ref={canvasRef} width={1280} height={600} />
          <div className="t3d-cap"><span ref={capRef} /></div>
          <div className="t3d-end" ref={endRef}>
            <div className="text-5xl font-extrabold">CXODEX<b className="text-[var(--gold)]">.</b></div>
            <p className="text-neutral-200">真打法。真工具。真结果。</p>
            <a href="/contact" className="mt-2 rounded bg-[var(--gold)] px-6 py-2.5 text-sm font-semibold text-white hover:opacity-90">预约一次 CEO 陪跑沟通</a>
          </div>
          <div className="t3d-ctl">
            <button ref={ppRef} onClick={() => eng.current?.toggle()}>⏸</button>
            <button onClick={() => eng.current?.replay()}>↻</button>
            <div className="t3d-prog" ref={progRef} onClick={(e) => eng.current?.progSeek(e)}><i ref={fillRef as any} /></div>
            <span className="t3d-time" ref={timeRef}>0:00 / 0:46</span>
          </div>
        </div>
        <p className="mt-4 text-xs leading-6 text-neutral-500">
          ※ 本段为网页实时 3D 渲染（非视频文件），加载快、可交互。8 个工具已内置同风格 3D 卡通「使用页面讲解」——在下方工具卡片点「▶ 3D 演示」播放。
        </p>
      </div>
    </section>
  );
}
