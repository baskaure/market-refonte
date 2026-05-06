/**
 * Optimise toutes les images de public/img/ :
 *  - Convertit en WebP (qualité 80)
 *  - Redimensionne à plusieurs largeurs (responsive)
 *  - Garde l'original (fallback)
 *
 * Usage : node scripts/optimize-images.mjs
 */
import { promises as fs } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const SRC_DIR = path.resolve(__dirname, '..', 'public', 'img')

const RASTER_EXT = ['.jpg', '.jpeg', '.png']
const WIDTHS = [400, 800, 1200, 1600]
const WEBP_QUALITY = 80

async function listImages(dir) {
  const items = await fs.readdir(dir, { withFileTypes: true })
  const files = []
  for (const it of items) {
    if (!it.isFile()) continue
    const ext = path.extname(it.name).toLowerCase()
    if (RASTER_EXT.includes(ext)) files.push(path.join(dir, it.name))
  }
  return files
}

function variantName(file, suffix) {
  const ext = path.extname(file)
  const base = file.slice(0, -ext.length)
  return `${base}${suffix}`
}

async function process(file) {
  const stat = await fs.stat(file)
  const baseName = path.basename(file)
  const image = sharp(file, { failOn: 'none' })
  const meta = await image.metadata()
  const origW = meta.width || 0

  console.log(`\n→ ${baseName}  (${origW}px, ${(stat.size / 1024).toFixed(1)} KB)`)

  const webpMain = variantName(file, '.webp')
  await sharp(file, { failOn: 'none' })
    .webp({ quality: WEBP_QUALITY, effort: 6 })
    .toFile(webpMain)
  const mainStat = await fs.stat(webpMain)
  console.log(`   ✓ ${path.basename(webpMain)} (${(mainStat.size / 1024).toFixed(1)} KB)`)

  for (const w of WIDTHS) {
    if (origW && w >= origW) continue
    const out = variantName(file, `-${w}.webp`)
    await sharp(file, { failOn: 'none' })
      .resize({ width: w, withoutEnlargement: true })
      .webp({ quality: WEBP_QUALITY, effort: 6 })
      .toFile(out)
    const s = await fs.stat(out)
    console.log(`   ✓ ${path.basename(out)} (${(s.size / 1024).toFixed(1)} KB)`)
  }
}

async function main() {
  const files = await listImages(SRC_DIR)
  if (files.length === 0) {
    console.log('Aucune image trouvée dans', SRC_DIR)
    return
  }
  console.log(`Optimisation de ${files.length} image(s) dans ${SRC_DIR}`)
  for (const f of files) {
    try {
      await process(f)
    } catch (e) {
      console.error(`Erreur sur ${f}:`, e.message)
    }
  }
  console.log('\nTerminé.')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
