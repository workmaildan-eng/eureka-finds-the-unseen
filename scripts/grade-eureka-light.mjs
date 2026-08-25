import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve("public/images");

async function eurekaGrade(input, output) {
  const { width, height } = await sharp(input).metadata();

  const wash = await sharp({
    create: {
      width,
      height,
      channels: 3,
      background: { r: 248, g: 236, b: 220 },
    },
  })
    .png()
    .toBuffer();

  const washSoft = await sharp(wash)
    .ensureAlpha()
    .composite([
      {
        input: Buffer.from(
          `<svg width="${width}" height="${height}"><rect width="100%" height="100%" fill="white" fill-opacity="0.22"/></svg>`
        ),
        blend: "dest-in",
      },
    ])
    .png()
    .toBuffer();

  await sharp(input)
    .modulate({ brightness: 1.38, saturation: 1.16, hue: -6 })
    .gamma(1.15)
    .linear(0.9, 26)
    .composite([{ input: washSoft, blend: "screen" }])
    .jpeg({ quality: 92 })
    .toFile(output);
}

const files = [
  "hero-home-clean.jpg",
  "hero-home-dust.jpg",
  "unseen-sofa-gap.jpg",
  "unseen-carpet.jpg",
  "unseen-corner.jpg",
];

for (const file of files) {
  const src = path.join(ROOT, file);
  const tmp = path.join(ROOT, file.replace(".jpg", ".graded.jpg"));
  await eurekaGrade(src, tmp);
  await fs.rename(tmp, src);
  console.log("graded", file);
}
