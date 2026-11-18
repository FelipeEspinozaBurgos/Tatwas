import { mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const source = path.join(root, "favicon.webp");
const output = path.join(root, "assets", "img");
await mkdir(output, { recursive: true });

for (const [name, size] of [
  ["favicon-32.png", 32],
  ["apple-touch-icon.png", 180],
  ["icon-192.png", 192],
  ["icon-512.png", 512]
]) {
  await sharp(source)
    .resize(size, size, { fit: "contain", background: "#ffffff" })
    .png()
    .toFile(path.join(output, name));
}

const symbol = await sharp(source)
  .resize(350, 350, { fit: "contain", background: "#ffffff" })
  .png()
  .toBuffer();
const overlay = Buffer.from(`<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <text x="600" y="505" text-anchor="middle" fill="#d4af5f"
    font-family="Georgia, serif" font-size="54">Tatwámetro</text>
  <text x="600" y="558" text-anchor="middle" fill="#d4af5f"
    font-family="Georgia, serif" font-size="27">Las vibraciones del Éter · Krumm Heller</text>
</svg>`);

await sharp({
  create: {
    width: 1200,
    height: 630,
    channels: 3,
    background: "#0f0d17"
  }
})
  .composite([
    { input: symbol, left: 425, top: 60 },
    { input: overlay, left: 0, top: 0 }
  ])
  .jpeg({ quality: 85, mozjpeg: true })
  .toFile(path.join(output, "og-image.jpg"));
