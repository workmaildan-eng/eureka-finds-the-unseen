import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(".");
const ASSETS = "/Users/daniel/.cursor/projects/Users-daniel-Desktop-Find-the-Unseen/assets";
const OUT = path.join(ROOT, "public/images");
const SIZE = 768;
const RADIUS = Math.round(SIZE * 0.223);

const svg = (w, h, markup) =>
  Buffer.from(`<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">${markup}</svg>`);

async function copyIcon(name, size = 384) {
  await sharp(path.join(ASSETS, name))
    .resize(size, size, { fit: "cover" })
    .png({ compressionLevel: 9 })
    .toFile(path.join(OUT, name));
}

async function composeWinIcon() {
  const product = await sharp(path.join(OUT, "j15-max-ultra-official.jpg"))
    .resize(Math.round(SIZE * 0.9), Math.round(SIZE * 0.9), {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toBuffer();

  const gift = svg(
    250,
    250,
    `
    <g>
      <ellipse cx="125" cy="232" rx="78" ry="12" fill="#7A2EC0" opacity="0.18"/>
      <rect x="48" y="108" width="154" height="118" rx="16" fill="#7A2EC0"/>
      <rect x="40" y="88" width="170" height="38" rx="10" fill="#8F45D4"/>
      <rect x="112" y="88" width="26" height="138" fill="#f8f6f2"/>
      <rect x="40" y="102" width="170" height="12" fill="#ece6f3"/>
      <ellipse cx="92" cy="78" rx="36" ry="20" fill="#f8f6f2" transform="rotate(-28 92 78)"/>
      <ellipse cx="158" cy="78" rx="36" ry="20" fill="#f8f6f2" transform="rotate(28 158 78)"/>
      <circle cx="125" cy="82" r="14" fill="#ece6f3"/>
      <circle cx="125" cy="82" r="7" fill="#7A2EC0"/>
    </g>
    `
  );

  const ring = svg(
    SIZE,
    SIZE,
    `<rect x="7" y="7" width="${SIZE - 14}" height="${SIZE - 14}" rx="${RADIUS - 6}" fill="none" stroke="#7A2EC0" stroke-width="14"/>`
  );

  const mask = svg(
    SIZE,
    SIZE,
    `<rect width="${SIZE}" height="${SIZE}" rx="${RADIUS}" fill="white"/>`
  );

  const composed = await sharp({
    create: {
      width: SIZE,
      height: SIZE,
      channels: 4,
      background: { r: 248, g: 246, b: 242, alpha: 1 },
    },
  })
    .composite([
      { input: product, gravity: "centre" },
      { input: gift, left: SIZE - 250 - 18, top: SIZE - 250 - 8 },
      { input: ring, blend: "over" },
    ])
    .png()
    .toBuffer();

  await sharp(composed)
    .composite([{ input: mask, blend: "dest-in" }])
    .png({ compressionLevel: 9 })
    .toFile(path.join(OUT, "step-win.png"));
}

await fs.promises.mkdir(OUT, { recursive: true });
await copyIcon("step-follow.png");
await copyIcon("step-comment.png");
await composeWinIcon();
console.log("Wrote step-follow.png, step-comment.png, step-win.png");
