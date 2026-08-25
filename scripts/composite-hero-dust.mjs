import path from "node:path";
import sharp from "sharp";

const ASSETS = "/Users/daniel/.cursor/projects/Users-daniel-Desktop-Find-the-Unseen/assets";
const OUT = path.resolve("public/images");
const W = 1536;
const H = 1024;

const svg = (markup) =>
  Buffer.from(`<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">${markup}</svg>`);

async function fade(input, opacity) {
  return sharp(input)
    .ensureAlpha()
    .composite([
      {
        input: Buffer.from(
          `<svg width="${W}" height="${H}"><rect width="100%" height="100%" fill="white" fill-opacity="${opacity}"/></svg>`
        ),
        blend: "dest-in",
      },
    ])
    .png()
    .toBuffer();
}

async function maskedTexture(file, maskSvg, opacity) {
  const resized = await sharp(path.join(ASSETS, file)).resize(W, H, { fit: "cover" }).png().toBuffer();
  const masked = await sharp(resized)
    .composite([{ input: maskSvg, blend: "dest-in" }])
    .png()
    .toBuffer();
  return { input: await fade(masked, opacity), blend: "multiply" };
}

function mulberry32(seed) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* ---------- specks / crumbs ---------- */

function speckLayer(count, region, seed, opts = {}) {
  const { rMin = 0.7, rMax = 3.5, aMin = 0.28, aMax = 0.68, perspective = false } = opts;
  const rng = mulberry32(seed);
  const buf = Buffer.alloc(W * H * 4);
  const paint = (x, y, r, a, tone) => {
    const rr = Math.ceil(r);
    for (let dy = -rr; dy <= rr; dy++) {
      for (let dx = -rr; dx <= rr; dx++) {
        if (dx * dx + dy * dy > r * r) continue;
        const px = (x + dx) | 0;
        const py = (y + dy) | 0;
        if (px < 0 || py < 0 || px >= W || py >= H) continue;
        const i = (py * W + px) * 4;
        const fall = 1 - Math.sqrt(dx * dx + dy * dy) / (r + 0.01);
        const aa = Math.min(255, (a * fall * 255) | 0);
        if (aa > buf[i + 3]) {
          buf[i] = 42 + tone;
          buf[i + 1] = 36 + (tone * 0.8) | 0;
          buf[i + 2] = 32 + (tone * 0.6) | 0;
          buf[i + 3] = aa;
        }
      }
    }
  };

  for (let i = 0; i < count; i++) {
    const u = rng();
    const v = rng();
    const x = region.x + u * region.w;
    const y = region.y + v * region.h;
    // Bigger + denser toward the camera when perspective scaling is on.
    const persp = perspective ? 0.45 + 0.75 * v : 1;
    paint(x, y, (rMin + rng() * (rMax - rMin)) * persp, aMin + rng() * (aMax - aMin), (rng() * 26) | 0);
  }

  return sharp(buf, { raw: { width: W, height: H, channels: 4 } }).png().toBuffer();
}

/* ---------- fine dust film (value noise, multiply) ---------- */

function valueNoise(cell, rng) {
  const gw = Math.ceil(W / cell) + 2;
  const gh = Math.ceil(H / cell) + 2;
  const grid = new Float32Array(gw * gh);
  for (let i = 0; i < grid.length; i++) grid[i] = rng();
  const smooth = (t) => t * t * (3 - 2 * t);
  const out = new Float32Array(W * H);
  for (let y = 0; y < H; y++) {
    const gy = y / cell;
    const y0 = gy | 0;
    const ty = smooth(gy - y0);
    for (let x = 0; x < W; x++) {
      const gx = x / cell;
      const x0 = gx | 0;
      const tx = smooth(gx - x0);
      const a = grid[y0 * gw + x0];
      const b = grid[y0 * gw + x0 + 1];
      const c = grid[(y0 + 1) * gw + x0];
      const d = grid[(y0 + 1) * gw + x0 + 1];
      out[y * W + x] = (a * (1 - tx) + b * tx) * (1 - ty) + (c * (1 - tx) + d * tx) * ty;
    }
  }
  return out;
}

function dustFilmLayer(seed) {
  const rng = mulberry32(seed);
  const n1 = valueNoise(150, rng);
  const n2 = valueNoise(42, rng);
  const n3 = valueNoise(9, rng);
  const buf = Buffer.alloc(W * H * 4);
  for (let i = 0; i < W * H; i++) {
    const n = n1[i] * 0.34 + n2[i] * 0.33 + n3[i] * 0.33;
    const t = Math.max(0, n - 0.46) / 0.54;
    const a = Math.pow(t, 1.9) * 0.34;
    const j = i * 4;
    buf[j] = 58;
    buf[j + 1] = 50;
    buf[j + 2] = 44;
    buf[j + 3] = (a * 255) | 0;
  }
  return sharp(buf, { raw: { width: W, height: H, channels: 4 } }).png().toBuffer();
}

/* ---------- footprint smudge trails ---------- */

function footStamp(x, y, deg, len, opacity) {
  return `<g transform="translate(${x.toFixed(1)},${y.toFixed(1)}) rotate(${deg.toFixed(1)})" opacity="${opacity.toFixed(3)}">
    <ellipse cx="0" cy="${(-len * 0.22).toFixed(1)}" rx="${(len * 0.19).toFixed(1)}" ry="${(len * 0.34).toFixed(1)}"/>
    <ellipse cx="0" cy="${(len * 0.3).toFixed(1)}" rx="${(len * 0.15).toFixed(1)}" ry="${(len * 0.17).toFixed(1)}"/>
  </g>`;
}

function footprintTrail(x0, y0, x1, y1, steps, seed) {
  const rng = mulberry32(seed);
  const dx = x1 - x0;
  const dy = y1 - y0;
  const heading = (Math.atan2(dy, dx) * 180) / Math.PI + 90;
  const perp = Math.atan2(dy, dx) + Math.PI / 2;
  let out = "";
  for (let i = 0; i < steps; i++) {
    const t = i / (steps - 1);
    const side = i % 2 === 0 ? 1 : -1;
    const y = y0 + dy * t;
    const len = 15 + (y / H) * 36;
    const off = side * (len * 0.42 + rng() * 4);
    const x = x0 + dx * t + Math.cos(perp) * off + (rng() - 0.5) * 8;
    const yy = y + Math.sin(perp) * off + (rng() - 0.5) * 6;
    out += footStamp(x, yy, heading + (rng() - 0.5) * 16, len, 0.16 + rng() * 0.1);
  }
  return out;
}

/* ---------- dust-bunny tufts keyed out of the texture photo ---------- */

const TUFT_W = 1230;
const TUFT_H = 820;

async function extractTuftSheet() {
  const { data } = await sharp(path.join(ASSETS, "texture-floor-dust.png"))
    .resize(TUFT_W, TUFT_H, { fit: "cover" })
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const out = Buffer.alloc(TUFT_W * TUFT_H * 4);
  for (let i = 0; i < TUFT_W * TUFT_H; i++) {
    const r = data[i * 3];
    const g = data[i * 3 + 1];
    const b = data[i * 3 + 2];
    // Wood is strongly orange (large R-B spread); grey lint has low chroma.
    const chroma = Math.max(r, g, b) - Math.min(r, g, b);
    const a = Math.max(0, Math.min(1, (54 - chroma) / 30));
    const j = i * 4;
    const grey = (r * 0.32 + g * 0.36 + b * 0.32) | 0;
    out[j] = grey;
    out[j + 1] = grey;
    out[j + 2] = grey;
    out[j + 3] = (a * a * 235) | 0;
  }
  return sharp(out, { raw: { width: TUFT_W, height: TUFT_H, channels: 4 } }).png().toBuffer();
}

async function tuftStamps(sheet) {
  const crops = {
    big: { left: 495, top: 180, width: 555, height: 345 },
    left: { left: 60, top: 60, width: 420, height: 420 },
    bits: { left: 420, top: 555, width: 210, height: 90 },
  };
  const placements = [
    { crop: "big", x: 250, y: 930, w: 118 },
    { crop: "left", x: 92, y: 668, w: 68 },
    { crop: "big", x: 1078, y: 742, w: 84, flop: true },
    { crop: "bits", x: 622, y: 588, w: 44 },
    { crop: "left", x: 858, y: 648, w: 50, flop: true },
    { crop: "big", x: 442, y: 706, w: 58 },
    { crop: "bits", x: 1436, y: 866, w: 66, flop: true },
    { crop: "left", x: 1330, y: 968, w: 92 },
  ];

  const layers = [];
  for (const p of placements) {
    const c = crops[p.crop];
    let img = sharp(sheet).extract(c);
    if (p.flop) img = img.flop();
    const h = Math.round((p.w * c.height) / c.width);
    const buf = await img.resize(p.w, h).png().toBuffer();
    layers.push({
      input: buf,
      left: Math.round(p.x - p.w / 2),
      top: Math.round(p.y - h / 2),
      blend: "over",
    });
  }
  return layers;
}

async function main() {
  const clean = await sharp(path.join(ASSETS, "hero-home-clean-v3.png"))
    .resize(W, H, { fit: "cover" })
    .jpeg({ quality: 92 })
    .toBuffer();

  await sharp(clean).toFile(path.join(OUT, "hero-home-clean.jpg"));

  const rugMask = svg(`
    <defs><filter id="f"><feGaussianBlur stdDeviation="18"/></filter></defs>
    <g filter="url(#f)">
      <polygon points="690,545 1536,520 1536,820 640,800" fill="white"/>
    </g>
  `);

  const sofaMask = svg(`
    <defs><filter id="f"><feGaussianBlur stdDeviation="14"/></filter></defs>
    <g filter="url(#f)">
      <path d="M980 340 C 1080 320, 1280 318, 1536 330
               L 1536 575 L 1020 590 L 960 470 Z" fill="white"/>
    </g>
  `);

  // Visible floor, minus the coffee table and the robot so smudges never sit on top of them.
  const floorMask = svg(`
    <defs>
      <filter id="f"><feGaussianBlur stdDeviation="9"/></filter>
      <mask id="floor">
        <g filter="url(#f)">
          <polygon points="0,614 548,586 565,470 960,470 985,505 1130,505 1160,540 1536,520 1536,1024 0,1024" fill="white"/>
          <rect x="998" y="455" width="530" height="255" fill="black"/>
          <rect x="315" y="418" width="205" height="195" fill="black"/>
        </g>
      </mask>
    </defs>
    <rect width="100%" height="100%" fill="white" mask="url(#floor)"/>
  `);

  const filmRaw = await dustFilmLayer(7);
  const film = await sharp(filmRaw)
    .composite([{ input: floorMask, blend: "dest-in" }])
    .png()
    .toBuffer();

  const footprints = svg(`
    <defs><filter id="b"><feGaussianBlur stdDeviation="2.2"/></filter></defs>
    <g filter="url(#b)" fill="#43392f">
      ${footprintTrail(470, 1000, 610, 585, 9, 3)}
      ${footprintTrail(60, 900, 700, 690, 8, 17)}
      ${footprintTrail(900, 980, 660, 700, 7, 41)}
      <ellipse cx="352" cy="822" rx="62" ry="4.5" transform="rotate(-17 352 822)" opacity="0.12"/>
      <ellipse cx="702" cy="884" rx="84" ry="5" transform="rotate(-7 702 884)" opacity="0.1"/>
      <ellipse cx="892" cy="760" rx="56" ry="4" transform="rotate(-24 892 760)" opacity="0.12"/>
      <ellipse cx="540" cy="648" rx="42" ry="3" transform="rotate(-30 540 648)" opacity="0.1"/>
      <ellipse cx="200" cy="742" rx="48" ry="3.5" transform="rotate(-12 200 742)" opacity="0.11"/>
    </g>
  `);
  const footprintsMasked = await sharp(footprints)
    .png()
    .toBuffer()
    .then((b) => sharp(b).composite([{ input: floorMask, blend: "dest-in" }]).png().toBuffer());

  const grime = svg(`
    <defs><filter id="g"><feGaussianBlur stdDeviation="5.5"/></filter></defs>
    <g filter="url(#g)" fill="#3a3128">
      <polygon points="0,610 548,584 548,598 0,630" opacity="0.42"/>
      <ellipse cx="538" cy="592" rx="30" ry="11" opacity="0.36"/>
      <rect x="580" y="494" width="365" height="12" opacity="0.3"/>
      <ellipse cx="1250" cy="548" rx="210" ry="24" opacity="0.26"/>
      <ellipse cx="1265" cy="706" rx="235" ry="28" opacity="0.3"/>
      <ellipse cx="60" cy="960" rx="120" ry="40" opacity="0.24"/>
    </g>
  `);

  const [rugTex, sofaTex, rugSpecks, sofaSpecks, floorSpecks, kitchenSpecks, crumbs, tuftSheet] =
    await Promise.all([
      maskedTexture("texture-rug-heavy.png", rugMask, 0.62),
      maskedTexture("texture-sofa-dirt.png", sofaMask, 0.5),
      speckLayer(260, { x: 700, y: 540, w: 800, h: 260 }, 11),
      speckLayer(140, { x: 980, y: 330, w: 520, h: 240 }, 29),
      speckLayer(520, { x: 0, y: 600, w: 1010, h: 415 }, 53, { rMin: 0.6, rMax: 3.8, perspective: true }),
      speckLayer(110, { x: 565, y: 478, w: 395, h: 140 }, 71, { rMin: 0.5, rMax: 1.8 }),
      speckLayer(80, { x: 1030, y: 700, w: 440, h: 120 }, 97, { rMin: 1.4, rMax: 4.6, aMin: 0.35, aMax: 0.75 }),
      extractTuftSheet(),
    ]);

  const tufts = await tuftStamps(tuftSheet);

  const blobs = svg(`
    <defs>
      <filter id="s"><feGaussianBlur stdDeviation="5"/></filter>
    </defs>
    <g filter="url(#s)" fill="#3a322b">
      <ellipse cx="900" cy="680" rx="70" ry="22" opacity="0.28"/>
      <ellipse cx="1120" cy="710" rx="80" ry="24" opacity="0.26"/>
      <ellipse cx="1280" cy="660" rx="54" ry="18" opacity="0.24"/>
      <ellipse cx="1180" cy="430" rx="40" ry="16" opacity="0.3"/>
      <ellipse cx="1360" cy="450" rx="36" ry="14" opacity="0.28"/>
      <ellipse cx="1080" cy="500" rx="48" ry="12" opacity="0.32"/>
    </g>
  `);

  await sharp(clean)
    .composite([
      { input: film, blend: "multiply" },
      rugTex,
      sofaTex,
      { input: footprintsMasked, blend: "multiply" },
      { input: await sharp(grime).png().toBuffer(), blend: "multiply" },
      { input: blobs, blend: "multiply" },
      { input: rugSpecks, blend: "over" },
      { input: sofaSpecks, blend: "over" },
      { input: floorSpecks, blend: "over" },
      { input: kitchenSpecks, blend: "over" },
      { input: crumbs, blend: "over" },
      ...tufts,
    ])
    .jpeg({ quality: 92 })
    .toFile(path.join(OUT, "hero-home-dust.jpg"));

  console.log("Wrote pixel-aligned dirty hero layer with film, footprints, tufts and grime");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
