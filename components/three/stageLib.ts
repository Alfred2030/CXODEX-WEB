/* eslint-disable */
// 3D 卡通舞台共享库（业务介绍剧场 + 8 工具演示共用）——与 mockups/deloitte-style/stage-lib.js 同源
import * as THREE from "three";
export { THREE };

export const M = (c: number, o: Record<string, unknown> = {}) =>
  new THREE.MeshStandardMaterial({ color: c, roughness: 0.8, metalness: 0.06, transparent: true, ...o });

export const smooth = (x: number) => (x <= 0 ? 0 : x >= 1 ? 1 : x * x * (3 - 2 * x));

export function fade(t: number, tIn: number, tOut: number, ramp = 1.2) {
  if (t < tIn || t > tOut) return 0;
  return Math.min(1, (t - tIn) / ramp, (tOut - t) / ramp);
}

export function setOpacity(g: THREE.Object3D, o: number) {
  g.visible = o > 0.02;
  g.traverse((n: any) => { if (n.material) n.material.opacity = o; });
}

export function label(text: string, color = "#ffe3a0", w = 2.6, font = 58) {
  const cv = document.createElement("canvas"); cv.width = 512; cv.height = 128;
  const cx = cv.getContext("2d")!;
  cx.font = `bold ${font}px "Microsoft YaHei", sans-serif`;
  cx.textAlign = "center"; cx.textBaseline = "middle";
  cx.shadowColor = "rgba(0,0,0,.6)"; cx.shadowBlur = 14;
  cx.fillStyle = color; cx.fillText(text, 256, 66);
  const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: new THREE.CanvasTexture(cv), transparent: true }));
  sp.scale.set(w, (w * 128) / 512, 1);
  return sp;
}

/* Q 版卡通人物（可换装） */
export function buildChar({ suit = 0x262b36, skin = 0xf2c9a0, glasses = true, tie = true, hair = 0x3c4150 } = {}) {
  const g = new THREE.Group();
  const suitM = M(suit), skinM = M(skin), dark = M(0x20242e),
    gold = M(0xd4a63f, { emissive: 0x6b4f16, emissiveIntensity: 0.4 });
  const body = new THREE.Mesh(new THREE.CapsuleGeometry(0.34, 0.55, 6, 14), suitM);
  body.position.y = 0.95; body.castShadow = true; g.add(body);
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.33, 24, 20), skinM);
  head.position.y = 1.63; head.castShadow = true; g.add(head);
  const hairM = new THREE.Mesh(new THREE.SphereGeometry(0.335, 24, 14, 0, Math.PI * 2, 0, Math.PI * 0.52), M(hair));
  hairM.position.y = 1.66; hairM.rotation.x = -0.24; g.add(hairM);
  if (glasses) {
    [-1, 1].forEach((s) => {
      const rim = new THREE.Mesh(new THREE.TorusGeometry(0.085, 0.016, 8, 20), dark);
      rim.position.set(0.125 * s, 1.65, 0.285); g.add(rim);
    });
    const bridge = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.02, 0.02), dark);
    bridge.position.set(0, 1.65, 0.3); g.add(bridge);
  }
  if (tie) {
    const t = new THREE.Mesh(new THREE.BoxGeometry(0.085, 0.3, 0.03), gold);
    t.position.set(0, 1.08, 0.315); t.rotation.x = 0.06; g.add(t);
  }
  function limb(x: number, y: number, len: number, r: number, mat: THREE.Material) {
    const p = new THREE.Group(); p.position.set(x, y, 0);
    const m = new THREE.Mesh(new THREE.CapsuleGeometry(r, len, 4, 10), mat);
    m.position.y = -(len / 2 + r); m.castShadow = true; p.add(m); g.add(p); return p;
  }
  const armL = limb(-0.42, 1.3, 0.36, 0.075, suitM), armR = limb(0.42, 1.3, 0.36, 0.075, suitM);
  const legL = limb(-0.15, 0.56, 0.34, 0.09, dark), legR = limb(0.15, 0.56, 0.34, 0.09, dark);
  [legL, legR].forEach((l) => {
    const sh = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.09, 0.26), dark);
    sh.position.set(0, -0.56, 0.05); sh.castShadow = true; l.add(sh);
  });
  return { g, armL, armR, legL, legR, head, body };
}

/* 齿轮道具 */
export function gearMesh(rad = 0.55) {
  const g = new THREE.Group();
  const t = new THREE.Mesh(new THREE.TorusGeometry(rad, 0.13, 10, 24),
    M(0xd4a63f, { emissive: 0x6b4f16, emissiveIntensity: 0.35 }));
  g.add(t);
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2;
    const tooth = new THREE.Mesh(new THREE.BoxGeometry(0.17, 0.3, 0.14), M(0xd4a63f));
    tooth.position.set(Math.cos(a) * (rad + 0.18), Math.sin(a) * (rad + 0.18), 0);
    tooth.rotation.z = a; g.add(tooth);
  }
  return g;
}

/* 标准暗色舞台 */
export function baseScene(canvas: HTMLCanvasElement) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0e1015);
  scene.fog = new THREE.Fog(0x0e1015, 14, 34);
  const camera = new THREE.PerspectiveCamera(42, 1280 / 600, 0.1, 100);

  scene.add(new THREE.HemisphereLight(0xbfd0e8, 0x1a1c24, 1.05));
  const key = new THREE.DirectionalLight(0xffffff, 1.6);
  key.position.set(6, 9, 6); key.castShadow = true;
  key.shadow.mapSize.set(1024, 1024);
  Object.assign(key.shadow.camera, { left: -12, right: 12, top: 12, bottom: -12 });
  scene.add(key);
  const goldLight = new THREE.PointLight(0xd4a63f, 22, 18); goldLight.position.set(-3, 3.4, 2); scene.add(goldLight);
  const cyanLight = new THREE.PointLight(0x38c8dd, 16, 16); cyanLight.position.set(6, 2.5, -4); scene.add(cyanLight);

  const ground = new THREE.Mesh(new THREE.CircleGeometry(30, 48),
    new THREE.MeshStandardMaterial({ color: 0x171a21, roughness: 0.95 }));
  ground.rotation.x = -Math.PI / 2; ground.receiveShadow = true; scene.add(ground);
  const grid = new THREE.GridHelper(46, 46, 0x2a3040, 0x20242e);
  grid.position.y = 0.01; scene.add(grid);

  function size() {
    const w = canvas.clientWidth || 1280, h = Math.round((w * 600) / 1280);
    renderer.setSize(w, h, false);
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    camera.aspect = w / h; camera.updateProjectionMatrix();
  }
  const onResize = () => size();
  addEventListener("resize", onResize);
  size();
  const dispose = () => { removeEventListener("resize", onResize); renderer.setAnimationLoop(null); renderer.dispose(); };
  return { renderer, scene, camera, goldLight, cyanLight, size, dispose };
}
