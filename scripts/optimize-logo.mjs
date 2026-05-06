import sharp from 'sharp'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const SRC = path.resolve(__dirname, '..', 'public', 'img', 'Or_blanc-petit.png')
const OUT_DIR = path.resolve(__dirname, '..', 'public', 'img')

const sizes = [
  { w: 160, name: 'Or_blanc-petit-160.webp' },
  { w: 320, name: 'Or_blanc-petit-320.webp' },
]

for (const s of sizes) {
  const out = path.join(OUT_DIR, s.name)
  await sharp(SRC)
    .resize({ width: s.w, withoutEnlargement: true })
    .webp({ quality: 75, effort: 6, alphaQuality: 80 })
    .toFile(out)
  const fs = await import('node:fs/promises')
  const stat = await fs.stat(out)
  console.log(`✓ ${s.name} (${(stat.size / 1024).toFixed(1)} KB)`)
}
