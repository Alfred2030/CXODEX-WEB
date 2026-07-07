/* eslint-disable */
"use client";
// 工具卡片（德勤式金边条）+ 每个工具的「使用页面 3D 卡通讲解」弹窗
import { useEffect, useRef, useState } from "react";
import { THREE, buildChar, baseScene } from "./stageLib";

type ToolItem = { name: string; desc: string; href: string; tag?: string; demo?: boolean };
const KEYS = ["diagnose", "bd", "scheduling", "finance", "oee", "interview", "legal", "assess"] as const;
const HUES = [210, 265, 180, 150, 120, 290, 230, 45];

/* ---------- 2D 页面画笔 ---------- */
const UI = { bg: "#14161c", panel: "#1d212b", line: "#2c313d", text: "#dfe3ea", dim: "#8b93a2",
  gold: "#d4a63f", cyan: "#38c8dd", green: "#35c26a", red: "#e05252", amber: "#e0a03c" };
const W2 = 1024, H2 = 640;
type Ctx = CanvasRenderingContext2D;
function rr(c: Ctx, x: number, y: number, w: number, h: number, r = 10) { c.beginPath(); (c as any).roundRect(x, y, w, h, r); c.closePath(); }
function panel(c: Ctx, x: number, y: number, w: number, h: number, lab?: string) {
  c.fillStyle = UI.panel; rr(c, x, y, w, h); c.fill(); c.strokeStyle = UI.line; c.lineWidth = 2; c.stroke();
  if (lab) { c.fillStyle = UI.dim; c.font = '22px "Microsoft YaHei"'; c.textAlign = "left"; c.fillText(lab, x + 16, y + 34); }
}
function btn(c: Ctx, x: number, y: number, w: number, h: number, text: string, gold = true) {
  c.fillStyle = gold ? UI.gold : "#2a3040"; rr(c, x, y, w, h, 8); c.fill();
  c.fillStyle = gold ? "#fff" : UI.text; c.font = 'bold 24px "Microsoft YaHei"'; c.textAlign = "center"; c.fillText(text, x + w / 2, y + h / 2 + 9); c.textAlign = "left";
}
function lines(c: Ctx, x: number, y: number, w: number, n: number, gap = 30) {
  for (let i = 0; i < n; i++) { c.fillStyle = i % 2 ? "#262c38" : "#2b3240"; rr(c, x, y + i * gap, w * (0.6 + ((i * 37) % 40) / 100), 14, 7); c.fill(); }
}
function rowsT(c: Ctx, x: number, y: number, w: number, n: number) {
  for (let i = 0; i < n; i++) { c.fillStyle = i % 2 ? "#20242e" : "#262c38"; rr(c, x, y + i * 40, w, 32, 6); c.fill(); }
}
function chip(c: Ctx, x: number, y: number, text: string, color: string) {
  c.font = 'bold 20px "Microsoft YaHei"'; const w = c.measureText(text).width + 26;
  c.fillStyle = color + "33"; rr(c, x, y, w, 32, 16); c.fill(); c.strokeStyle = color; c.stroke(); c.fillStyle = color; c.fillText(text, x + 13, y + 23); return w;
}
function radar(c: Ctx, cx: number, cy: number, r: number, vals: number[], color: string) {
  const n = vals.length;
  c.strokeStyle = UI.line; c.lineWidth = 2;
  for (const k of [1, 0.66, 0.33]) { c.beginPath(); for (let i = 0; i <= n; i++) { const a = -Math.PI / 2 + (i / n) * Math.PI * 2; c[i ? "lineTo" : "moveTo"](cx + Math.cos(a) * r * k, cy + Math.sin(a) * r * k); } c.stroke(); }
  c.beginPath(); for (let i = 0; i <= n; i++) { const a = -Math.PI / 2 + (i / n) * Math.PI * 2, v = vals[i % n]; c[i ? "lineTo" : "moveTo"](cx + Math.cos(a) * r * v, cy + Math.sin(a) * r * v); } c.closePath();
  c.fillStyle = color + "55"; c.fill(); c.strokeStyle = color; c.lineWidth = 3; c.stroke();
}
function gauge(c: Ctx, cx: number, cy: number, r: number, val: number, color: string) {
  c.lineWidth = 20; c.strokeStyle = "#2a3040";
  c.beginPath(); c.arc(cx, cy, r, Math.PI * 0.75, Math.PI * 2.25); c.stroke();
  c.strokeStyle = color; c.beginPath(); c.arc(cx, cy, r, Math.PI * 0.75, Math.PI * (0.75 + 1.5 * val)); c.stroke();
  c.fillStyle = color; c.font = 'bold 52px "Microsoft YaHei"'; c.textAlign = "center";
  c.fillText(Math.round(val * 100) + "%", cx, cy + 16); c.textAlign = "left"; c.lineWidth = 2;
}
function barsC(c: Ctx, x: number, y: number, w: number, h: number, vals: number[], colors: string[]) {
  const n = vals.length, bw = (w / n) * 0.55;
  vals.forEach((v, i) => { const bx = x + i * (w / n) + (w / n - bw) / 2, bh = h * v; c.fillStyle = colors[i % colors.length]; rr(c, bx, y + h - bh, bw, bh, 6); c.fill(); });
}
function header(c: Ctx, title: string) {
  c.fillStyle = UI.bg; c.fillRect(0, 0, W2, H2);
  c.fillStyle = "#191c24"; c.fillRect(0, 0, W2, 58);
  c.fillStyle = UI.gold; c.font = 'bold 26px "Microsoft YaHei"'; c.textAlign = "left"; c.fillText("● " + title, 24, 38);
  c.fillStyle = UI.dim; c.font = '20px "Microsoft YaHei"'; c.textAlign = "right"; c.fillText("🔒 已登录 · 免费版", W2 - 24, 38); c.textAlign = "left";
}

/* ---------- 8 工具定义 ---------- */
type Def = { title: string; caps: [string, string, string]; regions: number[][]; draw: (c: Ctx) => void };
const DEFS: Record<string, Def> = {
  diagnose: { title: "企业诊断数字人", caps: [
    "① 打开工具，38 项指标在线勾选自评", "② AI 自动评分，定位最该先改的环节", "③ 生成雷达图诊断报告，可下载分享"],
    regions: [[40, 90, 430, 500], [520, 90, 460, 140], [520, 250, 460, 340]],
    draw(c) { panel(c, 40, 90, 430, 500, "经营自评 · 38 项"); rowsT(c, 60, 140, 390, 10);
      c.fillStyle = UI.gold; for (let i = 0; i < 10; i++) { c.beginPath(); c.arc(430, 156 + i * 40, 8, 0, 7); c.fill(); }
      panel(c, 520, 90, 460, 140, "健康度"); c.fillStyle = UI.gold; c.font = 'bold 64px "Microsoft YaHei"'; c.fillText("82 分", 560, 200);
      chip(c, 720, 150, "良好 · 3 项待改", "#d4a63f");
      panel(c, 520, 250, 460, 340, "七维雷达"); radar(c, 750, 430, 130, [0.9, 0.7, 0.8, 0.55, 0.75, 0.6, 0.85], UI.cyan); } },
  bd: { title: "外贸抢单神器", caps: [
    "① 建开拓项目：产品、竞品、目标市场", "② AI 生成目标客户库 + 18 语种冷邮件", "③ 30 天看板跟进到单，导出 Excel"],
    regions: [[40, 90, 940, 120], [40, 230, 560, 360], [620, 230, 360, 360]],
    draw(c) { panel(c, 40, 90, 940, 120, "新建开拓项目"); btn(c, 60, 140, 200, 50, "PCBN 刀片", false); btn(c, 280, 140, 240, 50, "竞品：Sumitomo…", false); btn(c, 540, 140, 200, 50, "市场：中东", false); btn(c, 780, 140, 180, 50, "AI 生成");
      panel(c, 40, 230, 560, 360, "目标客户库 · AI 建议"); rowsT(c, 60, 280, 520, 7);
      chip(c, 470, 286, "A", "#35c26a"); chip(c, 470, 326, "A", "#35c26a"); chip(c, 470, 366, "B", "#e0a03c");
      panel(c, 620, 230, 360, 360, "冷邮件 · 德语"); lines(c, 640, 290, 320, 8, 32); btn(c, 640, 530, 150, 44, "导出 Word"); btn(c, 810, 530, 150, 44, "看板 →", false); } },
  scheduling: { title: "AI智能排产系统", caps: [
    "① 导入订单，或销售直接下单试算交期", "② AI 一键排产：交期与产能算到最优", "③ 逾期自动红灯预警，钉钉即时提醒"],
    regions: [[40, 90, 940, 110], [40, 220, 660, 370], [720, 220, 260, 370]],
    draw(c) { panel(c, 40, 90, 940, 110, ""); btn(c, 60, 120, 180, 54, "导入订单", false); btn(c, 260, 120, 180, 54, "销售下单", false); btn(c, 460, 120, 200, 54, "⚡ 一键排产"); c.fillStyle = UI.dim; c.font = '22px "Microsoft YaHei"'; c.fillText("4368 单 · 114 台设备", 690, 155);
      panel(c, 40, 220, 660, 370, "排产甘特图");
      const cols = ["#38c8dd", "#d4a63f", "#4f8dff", "#35c26a"];
      for (let r = 0; r < 6; r++) { c.fillStyle = "#20242e"; rr(c, 60, 270 + r * 50, 620, 36, 6); c.fill();
        let x = 70; for (let k = 0; k < 3; k++) { const w = 60 + ((r * 53 + k * 97) % 140); c.fillStyle = cols[(r + k) % 4]; rr(c, x, 276 + r * 50, w, 24, 5); c.fill(); x += w + 14; } }
      panel(c, 720, 220, 260, 370, "交期预警"); rowsT(c, 738, 270, 224, 6);
      c.fillStyle = UI.red; c.beginPath(); c.arc(756, 286, 7, 0, 7); c.fill(); c.beginPath(); c.arc(756, 326, 7, 0, 7); c.fill();
      c.fillStyle = UI.green; for (let i = 2; i < 6; i++) { c.beginPath(); c.arc(756, 286 + i * 40, 7, 0, 7); c.fill(); } } },
  finance: { title: "财务分析数字人", caps: [
    "① 上传三大报表 / 董事会月度数据模板", "② 自动算八大指标、环比同比与杜邦", "③ AI 生成「管理层分析和关注」可打印"],
    regions: [[40, 90, 400, 240], [470, 90, 510, 240], [40, 360, 940, 230]],
    draw(c) { panel(c, 40, 90, 400, 240, "上传报表"); c.setLineDash([10, 8]); c.strokeStyle = UI.gold; rr(c, 70, 140, 340, 120, 12); c.stroke(); c.setLineDash([]);
      c.fillStyle = UI.gold; c.font = '40px "Microsoft YaHei"'; c.textAlign = "center"; c.fillText("⇧", 240, 195); c.textAlign = "left";
      chip(c, 70, 280, "利润表.xlsx ✓", "#35c26a"); chip(c, 250, 280, "资产负债表 ✓", "#35c26a");
      panel(c, 470, 90, 510, 240, "关键指标 · 环比/同比"); barsC(c, 500, 150, 300, 150, [0.5, 0.7, 0.55, 0.9], ["#8fa4c8", "#38c8dd", "#8fa4c8", "#d4a63f"]);
      chip(c, 830, 150, "毛利率 41%", "#38c8dd"); chip(c, 830, 196, "净利 +38%", "#35c26a"); chip(c, 830, 242, "现金流 ⚠", "#e0a03c");
      panel(c, 40, 360, 940, 230, "管理层分析和关注 · AI"); lines(c, 64, 412, 900, 5, 36); btn(c, 800, 530, 160, 44, "打印 / PDF"); } },
  oee: { title: "OEE 线上计算", caps: [
    "① 填设备时间、产量与不良数", "② 稼动 × 性能 × 良品，OEE 立即算出", "③ 损失来源一目了然，导出改善报告"],
    regions: [[40, 90, 400, 500], [470, 90, 510, 320], [470, 430, 510, 160]],
    draw(c) { panel(c, 40, 90, 400, 500, "输入"); const labs = ["计划时间 480 分", "停机 45 分", "理论节拍 30/时", "实际产量 198", "不良 6"];
      labs.forEach((L, i) => { c.fillStyle = "#262c38"; rr(c, 64, 150 + i * 78, 352, 56, 8); c.fill(); c.fillStyle = UI.text; c.font = '22px "Microsoft YaHei"'; c.fillText(L, 80, 186 + i * 78); });
      panel(c, 470, 90, 510, 320, "OEE"); gauge(c, 725, 265, 110, 0.82, UI.gold);
      panel(c, 470, 430, 510, 160, "损失来源"); barsC(c, 500, 470, 440, 90, [0.8, 0.45, 0.25], [UI.red, UI.amber, UI.cyan]);
      c.fillStyle = UI.dim; c.font = '20px "Microsoft YaHei"'; c.fillText("停机      换型      速度", 560, 585); } },
  interview: { title: "AI快速面试", caps: [
    "① 上传简历 + 岗位要求，AI 智能出题", "② 候选人在线作答，AI 主持追问", "③ 输出带证据的评估报告，一键初筛"],
    regions: [[40, 90, 300, 500], [370, 90, 340, 500], [740, 90, 240, 500]],
    draw(c) { panel(c, 40, 90, 300, 500, "候选人"); rowsT(c, 60, 140, 260, 5); chip(c, 60, 360, "简历已解析 ✓", "#35c26a"); btn(c, 60, 420, 260, 50, "AI 出题");
      panel(c, 370, 90, 340, 500, "在线面试");
      c.fillStyle = "#2a3040"; rr(c, 390, 150, 240, 60, 14); c.fill();
      c.fillStyle = "#24405a"; rr(c, 440, 230, 240, 60, 14); c.fill();
      c.fillStyle = "#2a3040"; rr(c, 390, 310, 240, 80, 14); c.fill();
      c.fillStyle = UI.text; c.font = '20px "Microsoft YaHei"'; c.fillText("Q1 说说一次跨部门冲突…", 402, 185); c.fillText("候选人回答中…", 452, 265); c.fillText("AI 追问：结果量化？", 402, 345);
      panel(c, 740, 90, 240, 500, "评估"); c.fillStyle = UI.gold; c.font = 'bold 30px "Microsoft YaHei"'; c.fillText("★★★★☆", 770, 180);
      rowsT(c, 758, 220, 204, 5); chip(c, 758, 440, "建议：进入复试", "#35c26a"); } },
  legal: { title: "合同审查数字人", caps: [
    "① 上传或粘贴合同全文", "② AI 四层审查法逐条挑风险", "③ 风险清单 + 修订建议，导出意见书"],
    regions: [[40, 90, 540, 500], [610, 90, 370, 320], [610, 430, 370, 160]],
    draw(c) { panel(c, 40, 90, 540, 500, "合同正文"); lines(c, 64, 150, 490, 12, 36);
      c.fillStyle = UI.red + "44"; rr(c, 64, 220, 430, 18, 8); c.fill(); c.fillStyle = UI.amber + "44"; rr(c, 64, 364, 380, 18, 8); c.fill();
      panel(c, 610, 90, 370, 320, "风险清单");
      ["高 · 违约金上限缺失", "中 · 管辖约定不利", "低 · 通知条款模糊"].forEach((t, i) => { chip(c, 630, 140 + i * 60, t, [UI.red, UI.amber, UI.cyan][i]); });
      panel(c, 610, 430, 370, 160, "修订建议"); lines(c, 630, 480, 330, 3, 34); btn(c, 800, 530, 160, 44, "导出意见书"); } },
  assess: { title: "人才测评数字人", caps: [
    "① 邮箱登录：人格 + 潜力 + 认知三模块", "② 科学计分：16 型风格 + 潜力分级", "③ AI 生成发展报告，类型卡片可分享"],
    regions: [[40, 90, 460, 500], [530, 90, 450, 260], [530, 370, 450, 220]],
    draw(c) { panel(c, 40, 90, 460, 500, "模块一 · 管理人格 12/64");
      c.fillStyle = UI.text; c.font = '22px "Microsoft YaHei"'; c.fillText("遇到全新问题时，我习惯先拆解…", 64, 160);
      for (let i = 0; i < 6; i++) { c.fillStyle = i === 4 ? "#3a3a2a" : "#262c38"; rr(c, 64, 190 + i * 62, 410, 48, 10); c.fill();
        if (i === 4) { c.strokeStyle = UI.gold; c.stroke(); }
        c.fillStyle = i === 4 ? UI.gold : UI.dim; c.font = '20px "Microsoft YaHei"'; c.fillText((i + 1) + " · " + ["完全不符合", "基本不符合", "略不符合", "略符合", "基本符合", "完全符合"][i], 84, 220 + i * 62); }
      panel(c, 530, 90, 450, 260, "16 型结果"); c.fillStyle = UI.gold; c.font = 'bold 44px "Microsoft YaHei"'; c.fillText("战略架构者", 560, 180);
      c.fillStyle = UI.dim; c.font = '24px "Microsoft YaHei"'; c.fillText("INTJ 风格 · 潜力型", 560, 222); chip(c, 560, 260, "认知参考 130 · 卓越", "#38c8dd");
      panel(c, 530, 370, 450, 220, "五维画像"); radar(c, 755, 490, 86, [0.8, 0.6, 0.9, 0.7, 0.75], UI.gold); } },
};

const DUR2 = 18;

export function ToolsGrid({ items }: { items: ToolItem[] }) {
  const [openKey, setOpenKey] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const capRef = useRef<HTMLSpanElement>(null);
  const fillRef = useRef<HTMLElement>(null);
  const timeRef = useRef<HTMLSpanElement>(null);
  const ppRef = useRef<HTMLButtonElement>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const st = useRef<any>({});

  // 引擎：随弹窗打开懒初始化；openKey 变化时重置时间线
  useEffect(() => {
    if (!openKey) { if (st.current.R) st.current.R.renderer.setAnimationLoop(null); return; }
    const s = st.current;
    if (!s.R && canvasRef.current) {
      s.R = baseScene(canvasRef.current);
      s.R.camera.position.set(0, 2.15, 7.4);
      s.char = buildChar(); s.char.g.position.set(-2.35, 0, 0.7); s.char.g.rotation.y = 0.55; s.R.scene.add(s.char.g);
      const cv = document.createElement("canvas"); cv.width = W2; cv.height = H2;
      s.ui = cv.getContext("2d");
      s.tex = new THREE.CanvasTexture(cv);
      const scr = new THREE.Mesh(new THREE.PlaneGeometry(4.4, 2.75), new THREE.MeshBasicMaterial({ map: s.tex, toneMapped: false }));
      scr.position.set(1.05, 1.72, 0); scr.rotation.y = -0.14; s.R.scene.add(scr);
      const frame = new THREE.Mesh(new THREE.BoxGeometry(4.6, 2.95, 0.1), new THREE.MeshStandardMaterial({ color: 0x20242e, roughness: 0.6 }));
      frame.position.set(1.05, 1.72, -0.08); frame.rotation.y = -0.14; frame.castShadow = true; s.R.scene.add(frame);
      const stand = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.1, 0.5, 10), new THREE.MeshStandardMaterial({ color: 0x2a3040 }));
      stand.position.set(1.05, 0.12, -0.1); s.R.scene.add(stand);
    }
    s.T = 0; s.playing = true; s.last = performance.now();
    if (ppRef.current) ppRef.current.textContent = "⏸";
    endRef.current?.classList.remove("show");

    const def: Def = DEFS[openKey];
    const fmt = (x: number) => "0:" + String(Math.floor(x)).padStart(2, "0");
    function paintUI(t: number) {
      header(s.ui, def.title); def.draw(s.ui);
      const step = Math.min(2, Math.floor(t / 6));
      const rg = def.regions[step];
      if (rg) { s.ui.save();
        s.ui.strokeStyle = UI.gold; s.ui.lineWidth = 6 + Math.sin(t * 5) * 2.5;
        s.ui.shadowColor = UI.gold; s.ui.shadowBlur = 26;
        rr(s.ui, rg[0] - 6, rg[1] - 6, rg[2] + 12, rg[3] + 12, 14); s.ui.stroke();
        s.ui.fillStyle = UI.gold; s.ui.font = 'bold 30px "Microsoft YaHei"'; s.ui.shadowBlur = 8;
        s.ui.fillText("第 " + (step + 1) + " 步", rg[0] + 2, rg[1] - 16 < 40 ? rg[1] + 34 : rg[1] - 16);
        s.ui.restore(); }
      s.tex.needsUpdate = true;
    }
    function loop() {
      const now = performance.now();
      if (s.playing) { s.T += (now - s.last) / 1000; if (s.T >= DUR2) { s.T = DUR2; s.playing = false; if (ppRef.current) ppRef.current.textContent = "▶"; endRef.current?.classList.add("show"); } }
      s.last = now;
      const step = Math.min(2, Math.floor(s.T / 6));
      if (capRef.current) { capRef.current.textContent = def.caps[step]; (capRef.current.parentElement as HTMLElement).style.opacity = s.T >= DUR2 - 0.3 ? "0" : "1"; }
      if (fillRef.current) fillRef.current.style.width = (s.T / DUR2) * 100 + "%";
      if (timeRef.current) timeRef.current.textContent = fmt(s.T) + " / " + fmt(DUR2);
      const ch = s.char;
      ch.body.scale.y = 1 + Math.sin(s.T * 2) * 0.012;
      ch.armR.rotation.x = -1.55 + Math.sin(s.T * 2.2) * 0.12; ch.armR.rotation.z = -0.4;
      ch.armL.rotation.x = Math.sin(s.T * 1.3) * 0.1;
      ch.head.rotation.x = Math.sin(s.T * 3) * 0.03 - (s.T % 6 < 0.4 ? 0.12 : 0);
      ch.g.rotation.y = 0.55 + Math.sin(s.T * 0.5) * 0.05;
      s.R.camera.lookAt(0.45 + Math.sin(s.T * 0.3) * 0.06, 1.5, 0);
      paintUI(s.T);
      s.R.renderer.render(s.R.scene, s.R.camera);
    }
    s.R.size();
    s.R.renderer.setAnimationLoop(loop);
    const onVis = () => { s.last = performance.now(); };
    document.addEventListener("visibilitychange", onVis);
    return () => { document.removeEventListener("visibilitychange", onVis); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openKey]);

  useEffect(() => () => { st.current.R?.dispose?.(); }, []);

  const s = st.current;
  return (
    <>
      <style>{`
        .td3-cap{position:absolute;left:0;right:0;bottom:58px;display:flex;justify-content:center;pointer-events:none;padding:0 20px}
        .td3-cap span{background:rgba(8,10,14,.72);border:1px solid rgba(255,255,255,.14);color:#f3e9d2;padding:10px 22px;border-radius:8px;font-size:16.5px;backdrop-filter:blur(4px);text-align:center}
        .td3-end{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;background:rgba(8,10,14,.55);opacity:0;pointer-events:none;transition:opacity .8s}
        .td3-end.show{opacity:1;pointer-events:auto}
      `}</style>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {items.map((tool, i) => {
          const key = KEYS[i] ?? "diagnose";
          return (
            <article key={tool.name} className="group flex flex-col border-l-4 border-[var(--gold)] bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg">
              <div className="px-5 pt-5">
                <h3 className="flex items-center gap-2 text-lg font-bold text-[var(--gold)]">
                  {tool.name}
                  {tool.tag ? <span className={`px-1.5 py-0.5 text-[0.66rem] font-bold tracking-wider ${tool.tag === "新" ? "bg-[var(--gold)] text-white" : "border border-[var(--gold)] text-[var(--gold)]"}`}>{tool.tag}</span> : null}
                </h3>
                <p className="mt-2 min-h-[66px] text-sm leading-6 text-neutral-600">{tool.desc}</p>
              </div>
              <button
                onClick={() => setOpenKey(key)}
                className="relative mx-5 mt-3 block aspect-video overflow-hidden rounded-md text-left"
                style={{ background: `repeating-linear-gradient(0deg, rgba(255,255,255,.05) 0 1px, transparent 1px 26px), repeating-linear-gradient(90deg, rgba(255,255,255,.05) 0 1px, transparent 1px 26px), linear-gradient(135deg, hsl(${HUES[i] ?? 210} 45% 16%), hsl(${(HUES[i] ?? 210) + 50} 55% 30%))` }}
                aria-label={`${tool.name} 3D 演示`}
                data-umami-event="tool-3d-demo" data-umami-event-tool={key}
              >
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 pl-1 text-base text-neutral-900 shadow-lg transition group-hover:scale-110">▶</span>
                </span>
                <span className="absolute bottom-2 left-3 text-xs tracking-wider text-sky-100/90">3D 卡通演示 · 18 秒</span>
              </button>
              <div className="mt-auto flex items-center justify-between px-5 pb-5 pt-4">
                <span className="text-xs text-neutral-400">🔒 登录后免费使用</span>
                <a href={tool.href} target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-[var(--gold)] hover:opacity-75">进入工具 →</a>
              </div>
            </article>
          );
        })}
      </div>

      {/* 3D 演示弹窗 */}
      {openKey && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4" onClick={(e) => { if (e.target === e.currentTarget) setOpenKey(null); }}>
          <div className="w-full max-w-4xl">
            <div className="mb-2 flex items-center justify-between">
              <p className="text-base font-bold text-white">{DEFS[openKey].title} · 使用页面 3D 讲解</p>
              <button onClick={() => setOpenKey(null)} className="text-2xl leading-none text-neutral-400 hover:text-white">×</button>
            </div>
            <div className="t3d-wrap relative overflow-hidden rounded-lg border border-neutral-800 bg-[#0e1015]">
              <canvas ref={canvasRef} width={1280} height={600} className="block w-full" />
              <div className="td3-cap"><span ref={capRef} /></div>
              <div className="td3-end" ref={endRef}>
                <p className="text-xl font-bold text-white">🔒 登录后免费使用</p>
                <a href={items[KEYS.indexOf(openKey as any)]?.href ?? "#"} target="_blank" rel="noopener noreferrer" className="rounded bg-[var(--gold)] px-6 py-2.5 text-sm font-semibold text-white hover:opacity-90">进入工具 · 免费注册</a>
                <button onClick={() => { s.T = 0; s.playing = true; if (ppRef.current) ppRef.current.textContent = "⏸"; endRef.current?.classList.remove("show"); s.last = performance.now(); }} className="rounded border border-white/50 px-5 py-2 text-sm text-white hover:border-[var(--gold)] hover:text-[var(--gold)]">↻ 重播</button>
              </div>
              <div className="absolute inset-x-0 bottom-0 flex items-center gap-3 bg-gradient-to-t from-black/85 to-transparent px-4 py-3">
                <button ref={ppRef} onClick={() => { s.playing = !s.playing; if (ppRef.current) ppRef.current.textContent = s.playing ? "⏸" : "▶"; s.last = performance.now(); }} className="h-9 w-9 rounded-full border border-white/25 bg-white/10 text-sm text-white hover:bg-[var(--gold)]">⏸</button>
                <button onClick={() => { s.T = 0; s.playing = true; if (ppRef.current) ppRef.current.textContent = "⏸"; endRef.current?.classList.remove("show"); s.last = performance.now(); }} className="h-9 w-9 rounded-full border border-white/25 bg-white/10 text-sm text-white hover:bg-[var(--gold)]">↻</button>
                <div className="relative h-1.5 flex-1 cursor-pointer rounded-full bg-white/20" onClick={(e) => { const r = e.currentTarget.getBoundingClientRect(); s.T = Math.max(0, Math.min(DUR2, ((e.clientX - r.left) / r.width) * DUR2)); s.playing = true; if (ppRef.current) ppRef.current.textContent = "⏸"; endRef.current?.classList.remove("show"); s.last = performance.now(); }}>
                  <i ref={fillRef as any} className="absolute inset-y-0 left-0 rounded-full bg-[var(--gold)]" style={{ width: "0%" }} />
                </div>
                <span ref={timeRef} className="min-w-[80px] text-right text-xs tabular-nums text-neutral-300">0:00 / 0:18</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
