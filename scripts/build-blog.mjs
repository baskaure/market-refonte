/**
 * Génère le blog en HTML statique dans dist/ après le build Vite.
 *
 * Pourquoi statique : les crawlers des IA (GPTBot, ClaudeBot, PerplexityBot,
 * Google AI Overviews) n'exécutent pas ou mal le JavaScript. Pour être cité
 * comme source, chaque article doit être du HTML complet avec ses meta et son
 * JSON-LD (Article + FAQPage + BreadcrumbList) — indépendant de la SPA React.
 *
 * Usage : node scripts/build-blog.mjs   (lancé par `npm run build`)
 * Entrées : content/blog/*.mjs — sorties : dist/blog/**, dist/sitemap.xml
 */
import { readdir, mkdir, writeFile } from 'node:fs/promises'
import { fileURLToPath, pathToFileURL } from 'node:url'
import path from 'node:path'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const CONTENT_DIR = path.join(ROOT, 'content', 'blog')
const DIST = path.join(ROOT, 'dist')

const SITE = 'https://www.marketwins.fr'
const CALENDLY = 'https://calendly.com/agence-kingdomads/obtenir-des-prospects-premium'
const PIXEL_ID = '2073138586484176'

/* ---------------------------------------------------------------- helpers */

const esc = (s = '') =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

const frDate = (iso) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })

const jsonLd = (obj) => `<script type="application/ld+json">${JSON.stringify(obj)}</script>`

const ORG = {
  '@type': 'Organization',
  '@id': `${SITE}/#organization`,
  name: 'Marketwins',
  alternateName: 'Kingdom Ads',
  url: `${SITE}/`,
  logo: `${SITE}/img/logo.webp`,
  email: 'contact@kingdomads.fr',
  description:
    "Agence française d'acquisition payante (Meta Ads, Google Ads, LinkedIn Ads). Marketwins génère des opportunités commerciales qualifiées à un coût connu à l'avance, via des tests cadrés et sans engagement long terme.",
}

/* ------------------------------------------------------------------ style */

const CSS = `
:root{--gold:#d4af37;--gold-light:#f4e4b5;--gold-dark:#b8941f;--black:#0a0a0a;--gray:#9a9a9a;--text:#e8e8e8}
*{margin:0;padding:0;box-sizing:border-box}
html{scroll-behavior:smooth}
body{background:#000;color:var(--text);font-family:'Outfit',system-ui,-apple-system,sans-serif;font-weight:300;line-height:1.75;-webkit-font-smoothing:antialiased}
a{color:var(--gold);text-decoration:none}
a:hover{color:var(--gold-light)}
.nav{position:sticky;top:0;z-index:50;background:rgba(0,0,0,.85);backdrop-filter:blur(12px);border-bottom:1px solid rgba(212,175,55,.15)}
.nav-inner{max-width:1100px;margin:0 auto;padding:.9rem 1.5rem;display:flex;align-items:center;justify-content:space-between;gap:1rem}
.nav-inner img{display:block}
.nav-links{display:flex;align-items:center;gap:1.6rem;list-style:none}
.nav-links a{color:#fff;font-size:.95rem}
.nav-links a:hover{color:var(--gold)}
.btn-gold{display:inline-block;background:linear-gradient(135deg,var(--gold),var(--gold-dark));color:#0a0a0a;font-weight:700;padding:.65rem 1.5rem;border-radius:100px;font-size:.95rem;transition:transform .2s,box-shadow .2s}
.btn-gold:hover{color:#0a0a0a;transform:translateY(-2px);box-shadow:0 6px 24px rgba(212,175,55,.35)}
main{max-width:760px;margin:0 auto;padding:3.5rem 1.5rem 5rem}
.breadcrumb{font-size:.85rem;color:var(--gray);margin-bottom:2rem}
.breadcrumb a{color:var(--gray)}
.breadcrumb a:hover{color:var(--gold)}
.chip{display:inline-block;border:1px solid rgba(212,175,55,.4);color:var(--gold);font-size:.78rem;letter-spacing:.05em;text-transform:uppercase;padding:.25rem .8rem;border-radius:100px;margin-bottom:1.2rem}
h1{color:#fff;font-weight:700;font-size:clamp(1.9rem,4.5vw,2.7rem);line-height:1.2;margin-bottom:1rem}
.meta-line{color:var(--gray);font-size:.9rem;margin-bottom:2.2rem}
.quick-answer{border:1px solid rgba(212,175,55,.35);background:linear-gradient(180deg,rgba(212,175,55,.09),rgba(212,175,55,.03));border-radius:14px;padding:1.4rem 1.6rem;margin-bottom:2.8rem}
.quick-answer .qa-label{color:var(--gold);font-weight:700;font-size:.82rem;letter-spacing:.08em;text-transform:uppercase;display:block;margin-bottom:.5rem}
.quick-answer p{color:#fff;font-size:1.05rem}
article h2{color:#fff;font-weight:700;font-size:1.55rem;margin:2.8rem 0 1rem;line-height:1.3}
article h3{color:var(--gold-light);font-weight:400;font-size:1.18rem;margin:2rem 0 .8rem}
article p{margin-bottom:1.15rem}
article ul,article ol{margin:0 0 1.3rem 1.4rem}
article li{margin-bottom:.5rem}
article strong{color:#fff;font-weight:700}
article table{width:100%;border-collapse:collapse;margin:1.5rem 0;font-size:.92rem;display:block;overflow-x:auto}
article th,article td{border:1px solid rgba(212,175,55,.25);padding:.7rem .9rem;text-align:left;vertical-align:top}
article th{background:rgba(212,175,55,.12);color:var(--gold-light);font-weight:700;white-space:nowrap}
.cta-box{border:1px solid rgba(212,175,55,.45);background:radial-gradient(120% 160% at 50% 0%,rgba(212,175,55,.16),rgba(0,0,0,.2) 70%);border-radius:16px;padding:2rem 1.8rem;text-align:center;margin:3rem 0}
.cta-box p.cta-title{color:#fff;font-size:1.25rem;font-weight:700;margin-bottom:.5rem}
.cta-box p.cta-sub{color:var(--gray);font-size:.95rem;margin-bottom:1.3rem}
.faq{margin-top:3.5rem;border-top:1px solid rgba(212,175,55,.2);padding-top:2.5rem}
.faq h3{color:#fff;font-weight:700;font-size:1.08rem;margin:1.6rem 0 .5rem}
.author-box{margin-top:3.5rem;border:1px solid rgba(255,255,255,.1);border-radius:14px;padding:1.3rem 1.5rem;font-size:.92rem;color:var(--gray)}
.author-box strong{color:var(--gold)}
.related{margin-top:3.5rem}
.related h2{color:#fff;font-weight:700;font-size:1.3rem;margin-bottom:1.2rem}
.related ul{list-style:none}
.related li{margin-bottom:.7rem}
footer{border-top:1px solid rgba(212,175,55,.15);padding:2.5rem 1.5rem;text-align:center;color:var(--gray);font-size:.88rem}
footer a{color:var(--gray)}footer a:hover{color:var(--gold)}
/* listing */
.blog-hero{text-align:center;margin-bottom:3.5rem}
.blog-hero p{color:var(--gray);max-width:620px;margin:0 auto;font-size:1.05rem}
.cards{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:1.4rem;max-width:1100px;margin:0 auto}
.card{display:flex;flex-direction:column;border:1px solid rgba(212,175,55,.22);border-radius:16px;padding:1.6rem;background:linear-gradient(180deg,rgba(255,255,255,.03),rgba(255,255,255,0));transition:transform .2s,border-color .2s}
.card:hover{transform:translateY(-4px);border-color:rgba(212,175,55,.55)}
.card h2{color:#fff;font-size:1.18rem;font-weight:700;line-height:1.35;margin:0 0 .7rem}
.card p{color:var(--gray);font-size:.93rem;flex:1}
.card .card-meta{color:var(--gray);font-size:.8rem;margin-top:1.1rem}
.card .chip{margin-bottom:.9rem}
@media(max-width:640px){.nav-links li.hide-mobile{display:none}main{padding-top:2.2rem}}
`

/* -------------------------------------------------------------- fragments */

const PIXEL = `<script>!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${PIXEL_ID}');fbq('track','PageView');</script>
<noscript><img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1" alt=""/></noscript>`

const FONTS = `<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;700&display=swap" rel="stylesheet">`

const NAV = `<nav class="nav"><div class="nav-inner">
<a href="/" aria-label="Marketwins — accueil"><picture><source type="image/webp" srcset="/img/Or_blanc-petit-160.webp 1x, /img/Or_blanc-petit-320.webp 2x"><img src="/img/Or_blanc-petit-160.webp" alt="Marketwins" width="160" height="40"></picture></a>
<ul class="nav-links"><li class="hide-mobile"><a href="/">Accueil</a></li><li class="hide-mobile"><a href="/blog/">Blog</a></li><li><a class="btn-gold" href="${CALENDLY}" target="_blank" rel="noopener">Conseil gratuit</a></li></ul>
</div></nav>`

const FOOTER = `<footer><p>© 2026 Kingdom Ads — Marketwins · <a href="/">marketwins.fr</a> · <a href="/blog/">Blog</a> · <a href="mailto:contact@kingdomads.fr">contact@kingdomads.fr</a></p></footer>`

const CTA_BOX = `<div class="cta-box">
<p class="cta-title">Vos publicités ne donnent pas les résultats attendus&nbsp;?</p>
<p class="cta-sub">Parlez-en 30 minutes avec un expert Marketwins. Diagnostic honnête, sans engagement — on vous dit aussi quand la pub n'est pas la solution.</p>
<a class="btn-gold" href="${CALENDLY}" target="_blank" rel="noopener">Demander un conseil gratuit</a>
</div>`

const head = ({ title, description, url, type = 'article', published, modified }) => `<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<meta name="author" content="Marketwins">
<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large">
<link rel="canonical" href="${url}">
<meta property="og:type" content="${type}">
<meta property="og:locale" content="fr_FR">
<meta property="og:site_name" content="Marketwins">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${SITE}/img/logo.webp">
${published ? `<meta property="article:published_time" content="${published}">\n<meta property="article:modified_time" content="${modified || published}">` : ''}
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(description)}">
<link rel="icon" type="image/png" href="/img/logo.png">
${FONTS}
${PIXEL}
<style>${CSS}</style>`

/* ----------------------------------------------------------------- pages */

function articlePage(a, all) {
  const url = `${SITE}/blog/${a.slug}/`
  const body = a.html.replaceAll('<!--CTA-->', CTA_BOX)
  const related = all.filter((o) => o.slug !== a.slug).slice(0, 3)

  const ld = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      '@id': `${url}#article`,
      headline: a.title,
      description: a.metaDescription,
      inLanguage: 'fr-FR',
      datePublished: a.datePublished,
      dateModified: a.dateModified || a.datePublished,
      mainEntityOfPage: url,
      image: `${SITE}/img/logo.webp`,
      author: { '@id': `${SITE}/#organization` },
      publisher: { '@id': `${SITE}/#organization` },
      articleSection: a.category,
      timeRequired: `PT${a.readingMinutes}M`,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      '@id': `${url}#faq`,
      mainEntity: a.faq.map(({ q, a: ans }) => ({
        '@type': 'Question',
        name: q,
        acceptedAnswer: { '@type': 'Answer', text: ans },
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Accueil', item: `${SITE}/` },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE}/blog/` },
        { '@type': 'ListItem', position: 3, name: a.title, item: url },
      ],
    },
    { '@context': 'https://schema.org', ...ORG },
  ]

  return `<!DOCTYPE html>
<html lang="fr">
<head>
${head({ title: a.metaTitle, description: a.metaDescription, url, published: a.datePublished, modified: a.dateModified })}
${ld.map(jsonLd).join('\n')}
</head>
<body>
${NAV}
<main>
<nav class="breadcrumb" aria-label="Fil d'Ariane"><a href="/">Accueil</a> › <a href="/blog/">Blog</a> › ${esc(a.category)}</nav>
<article>
<span class="chip">${esc(a.category)}</span>
<h1>${esc(a.title)}</h1>
<p class="meta-line">Par l'équipe Marketwins · Publié le ${frDate(a.datePublished)}${a.dateModified && a.dateModified !== a.datePublished ? ` · Mis à jour le ${frDate(a.dateModified)}` : ''} · ${a.readingMinutes} min de lecture</p>
<div class="quick-answer"><span class="qa-label">La réponse en bref</span><p>${esc(a.quickAnswer)}</p></div>
${body}
<section class="faq">
<h2>Questions fréquentes</h2>
${a.faq.map(({ q, a: ans }) => `<h3>${esc(q)}</h3>\n<p>${esc(ans)}</p>`).join('\n')}
</section>
<div class="author-box"><strong>À propos de Marketwins</strong> — Agence d'acquisition payante (Meta, Google et LinkedIn Ads) : 8 ans d'expérience, plus de 200 entreprises accompagnées. Nous générons des opportunités commerciales qualifiées à un coût connu à l'avance, validées par un test cadré, sans engagement long terme. <a href="${CALENDLY}" target="_blank" rel="noopener">Réserver un conseil gratuit</a>.</div>
<section class="related">
<h2>À lire ensuite</h2>
<ul>${related.map((r) => `<li><a href="/blog/${r.slug}/">${esc(r.title)}</a></li>`).join('')}</ul>
</section>
</article>
</main>
${FOOTER}
</body>
</html>`
}

function listingPage(all) {
  const url = `${SITE}/blog/`
  const title = 'Blog Marketwins — Publicité digitale qui rapporte des clients'
  const description =
    "Conseils concrets sur Meta Ads, Google Ads et l'acquisition payante : budgets réels, causes des campagnes qui ne convertissent pas, leads qualifiés. Par l'agence Marketwins."

  const ld = [
    {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      '@id': `${url}#blog`,
      name: 'Blog Marketwins',
      description,
      url,
      inLanguage: 'fr-FR',
      publisher: { '@id': `${SITE}/#organization` },
      blogPost: all.map((a) => ({
        '@type': 'BlogPosting',
        headline: a.title,
        url: `${SITE}/blog/${a.slug}/`,
        datePublished: a.datePublished,
      })),
    },
    { '@context': 'https://schema.org', ...ORG },
  ]

  return `<!DOCTYPE html>
<html lang="fr">
<head>
${head({ title, description, url, type: 'website' })}
${ld.map(jsonLd).join('\n')}
</head>
<body>
${NAV}
<main style="max-width:1100px">
<div class="blog-hero">
<h1>Le blog Marketwins</h1>
<p>Des réponses franches aux questions que se posent les dirigeants sur la publicité digitale : budgets, campagnes qui ne convertissent pas, qualité des leads.</p>
</div>
<div class="cards">
${all
  .map(
    (a) => `<a class="card" href="/blog/${a.slug}/">
<span><span class="chip">${esc(a.category)}</span></span>
<h2>${esc(a.title)}</h2>
<p>${esc(a.excerpt)}</p>
<span class="card-meta">${frDate(a.datePublished)} · ${a.readingMinutes} min</span>
</a>`
  )
  .join('\n')}
</div>
${CTA_BOX}
</main>
${FOOTER}
</body>
</html>`
}

function sitemap(all) {
  const urls = [
    { loc: `${SITE}/`, priority: '1.0', changefreq: 'monthly' },
    { loc: `${SITE}/kingdomads`, priority: '0.8', changefreq: 'monthly' },
    { loc: `${SITE}/blog/`, priority: '0.8', changefreq: 'weekly' },
    ...all.map((a) => ({
      loc: `${SITE}/blog/${a.slug}/`,
      priority: '0.7',
      changefreq: 'monthly',
      lastmod: a.dateModified || a.datePublished,
    })),
  ]
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>${u.lastmod ? `\n    <lastmod>${u.lastmod}</lastmod>` : ''}
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`
}

/* ------------------------------------------------------------------- run */

const files = (await readdir(CONTENT_DIR)).filter((f) => f.endsWith('.mjs'))
const articles = []
for (const f of files) {
  const mod = await import(pathToFileURL(path.join(CONTENT_DIR, f)).href)
  const a = mod.default
  for (const field of ['slug', 'title', 'metaTitle', 'metaDescription', 'quickAnswer', 'html', 'faq', 'datePublished']) {
    if (!a?.[field]) throw new Error(`${f} : champ manquant "${field}"`)
  }
  articles.push(a)
}
articles.sort((x, y) => (x.datePublished < y.datePublished ? 1 : -1))

await mkdir(path.join(DIST, 'blog'), { recursive: true })
await writeFile(path.join(DIST, 'blog', 'index.html'), listingPage(articles))
for (const a of articles) {
  const dir = path.join(DIST, 'blog', a.slug)
  await mkdir(dir, { recursive: true })
  await writeFile(path.join(dir, 'index.html'), articlePage(a, articles))
}
await writeFile(path.join(DIST, 'sitemap.xml'), sitemap(articles))

console.log(`Blog généré : ${articles.length} articles + index + sitemap.xml`)
for (const a of articles) console.log(`  /blog/${a.slug}/`)
