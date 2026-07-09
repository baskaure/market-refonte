/**
 * Génère les assets de partage et d'identité du site :
 *   - public/img/og-image.jpg        (1200×630 — Open Graph / Twitter Cards)
 *   - public/img/apple-touch-icon.png (180×180)
 *   - public/img/favicon-32.png       (32×32)
 *   - public/img/icon-192.png / icon-512.png (PWA manifest)
 *
 * Usage : node scripts/generate-og.mjs
 * La police Outfit est utilisée si elle est disponible via fontconfig,
 * sinon repli sans-serif (le rendu reste correct).
 */
import sharp from 'sharp'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const IMG = path.join(ROOT, 'public', 'img')

const LOGO = path.join(IMG, 'Or_blanc-petit.png')

/* ------------------------------------------------------------ OG image */

const ogSvg = `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="glow" cx="50%" cy="0%" r="90%">
      <stop offset="0%" stop-color="#d4af37" stop-opacity="0.22"/>
      <stop offset="45%" stop-color="#d4af37" stop-opacity="0.06"/>
      <stop offset="100%" stop-color="#d4af37" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="goldline" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#d4af37" stop-opacity="0"/>
      <stop offset="50%" stop-color="#d4af37"/>
      <stop offset="100%" stop-color="#d4af37" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="#060606"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <rect x="28" y="28" width="1144" height="574" rx="18" fill="none" stroke="#d4af37" stroke-opacity="0.35" stroke-width="2"/>
  <text x="600" y="300" text-anchor="middle" font-family="Outfit, DejaVu Sans, sans-serif" font-weight="700" font-size="64" fill="#ffffff">On ne vend pas des leads.</text>
  <text x="600" y="378" text-anchor="middle" font-family="Outfit, DejaVu Sans, sans-serif" font-weight="700" font-size="52" fill="#d4af37">Des opportunités commerciales qualifiées</text>
  <rect x="450" y="425" width="300" height="2" fill="url(#goldline)"/>
  <text x="600" y="480" text-anchor="middle" font-family="Outfit, DejaVu Sans, sans-serif" font-weight="400" font-size="28" fill="#b5b5b5">Meta Ads · Google Ads · LinkedIn Ads — à un coût connu à l'avance</text>
  <text x="600" y="560" text-anchor="middle" font-family="Outfit, DejaVu Sans, sans-serif" font-weight="400" font-size="24" fill="#8a8a8a" letter-spacing="3">marketwins.fr</text>
</svg>`

async function buildOg() {
  const logo = await sharp(LOGO).resize({ height: 130, fit: 'inside' }).png().toBuffer()
  const logoMeta = await sharp(logo).metadata()
  await sharp(Buffer.from(ogSvg))
    .composite([{ input: logo, top: 70, left: Math.round((1200 - logoMeta.width) / 2) }])
    .flatten({ background: '#060606' })
    .jpeg({ quality: 88, mozjpeg: true })
    .toFile(path.join(IMG, 'og-image.jpg'))
  console.log('og-image.jpg généré (1200×630)')
}

/* ------------------------------------------------------------- favicons */

async function icon(size, pad, out, { background = '#0a0a0a', transparent = false } = {}) {
  const inner = size - pad * 2
  const logo = await sharp(LOGO).resize({ width: inner, height: inner, fit: 'inside' }).png().toBuffer()
  const meta = await sharp(logo).metadata()
  const base = transparent
    ? { create: { width: size, height: size, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } }
    : { create: { width: size, height: size, channels: 4, background } }
  await sharp(base)
    .composite([
      {
        input: logo,
        top: Math.round((size - meta.height) / 2),
        left: Math.round((size - meta.width) / 2),
      },
    ])
    .png()
    .toFile(path.join(IMG, out))
  console.log(`${out} généré (${size}×${size})`)
}

await buildOg()
await icon(180, 22, 'apple-touch-icon.png')
await icon(32, 2, 'favicon-32.png', { transparent: true })
await icon(192, 28, 'icon-192.png')
await icon(512, 72, 'icon-512.png')
