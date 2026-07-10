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

const SITE = 'https://marketwins.pro'
const CALENDLY = 'https://calendly.com/agence-kingdomads/obtenir-des-prospects-premium'
const PIXEL_ID = '2073138586484176'

/* ---------------------------------------------------------------- helpers */

const esc = (s = '') =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

const frDate = (iso) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })

const jsonLd = (obj) => `<script type="application/ld+json">${JSON.stringify(obj)}</script>`

const pad2 = (n) => String(n).padStart(2, '0')

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
/* Direction : éditorial luxe. Noir profond légèrement chaud, or en accent
   rare, serif italique (Georgia) pour les respirations, hairlines dorées,
   grain discret, barre de progression de lecture en scroll-driven animation. */

const CSS = `
@font-face{font-family:'Outfit';font-style:normal;font-weight:100 900;font-display:swap;src:url('/fonts/outfit-latin-var.woff2') format('woff2');unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}
@view-transition{navigation:auto}
:root{
  --gold:#d4af37;--gold-light:#f4e4b5;--gold-deep:#9a7b1e;
  --ink:#070604;--panel:#0e0c08;--panel-2:#14110a;
  --text:#eae6db;--muted:#a89f8d;--faint:#6f695c;
  --hairline:rgba(212,175,55,.18);--hairline-soft:rgba(212,175,55,.10);
  --serif:Georgia,'Times New Roman',serif;
}
*{margin:0;padding:0;box-sizing:border-box}
html{scroll-behavior:smooth}
body{background:var(--ink);color:var(--text);font-family:'Outfit',system-ui,-apple-system,sans-serif;font-weight:300;line-height:1.75;-webkit-font-smoothing:antialiased;position:relative}
/* atmosphère : halo doré + grain */
body::before{content:"";position:fixed;inset:0;z-index:-2;background:
  radial-gradient(60rem 34rem at 50% -12rem,rgba(212,175,55,.13),transparent 65%),
  radial-gradient(40rem 30rem at 108% 110%,rgba(212,175,55,.05),transparent 60%)}
body::after{content:"";position:fixed;inset:0;z-index:-1;pointer-events:none;opacity:.05;
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)'/%3E%3C/svg%3E")}
a{color:var(--gold);text-decoration:none;transition:color .2s}
a:hover{color:var(--gold-light)}
::selection{background:rgba(212,175,55,.28);color:#fff}
:focus-visible{outline:2px solid var(--gold);outline-offset:3px;border-radius:2px}

/* ── barre de progression de lecture (article) — scroll-driven, sans JS ── */
.progress{position:fixed;top:0;left:0;right:0;height:2px;z-index:90;transform-origin:0 50%;transform:scaleX(0);
  background:linear-gradient(90deg,var(--gold-deep),var(--gold) 60%,var(--gold-light));
  animation:progress-grow linear both;animation-timeline:scroll(root)}
@keyframes progress-grow{to{transform:scaleX(1)}}
@supports not (animation-timeline:scroll()){.progress{display:none}}

/* ── navigation ── */
.nav{position:sticky;top:0;z-index:50;background:rgba(7,6,4,.72);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);border-bottom:1px solid var(--hairline-soft)}
.nav-inner{max-width:1140px;margin:0 auto;padding:.8rem 1.5rem;display:flex;align-items:center;justify-content:space-between;gap:1rem}
.brand{display:inline-flex;align-items:center;gap:.8rem}
.brand img{display:block;height:40px;width:auto}
.brand-text{display:flex;flex-direction:column;line-height:1.05}
.brand-text b{color:#fff;font-weight:700;font-size:1.02rem;letter-spacing:.14em;text-transform:uppercase}
.brand-text em{font-family:var(--serif);font-style:italic;color:var(--gold);font-size:.8rem;letter-spacing:.04em}
.nav-links{display:flex;align-items:center;gap:1.7rem;list-style:none}
.nav-links a{color:var(--muted);font-size:.92rem;letter-spacing:.02em}
.nav-links a:hover{color:#fff}
.nav-links a.btn-gold,.nav-links a.btn-gold:hover{color:#171204}

/* ── boutons ── */
.btn-gold{position:relative;display:inline-flex;align-items:center;gap:.55rem;
  background:linear-gradient(180deg,#eecf74 0%,#d4af37 55%,#b18f22 100%);
  color:#171204;font-weight:700;font-size:.95rem;letter-spacing:.01em;
  padding:.72rem 1.65rem;border-radius:100px;border:0;cursor:pointer;
  box-shadow:inset 0 1px 0 rgba(255,255,255,.55),inset 0 -1px 0 rgba(66,48,6,.55),0 1px 2px rgba(0,0,0,.5),0 4px 18px rgba(212,175,55,.18);
  transition:transform .22s cubic-bezier(.2,.7,.3,1.2),box-shadow .25s}
.btn-gold:hover{color:#171204;transform:translateY(-2px);
  box-shadow:inset 0 1px 0 rgba(255,255,255,.6),inset 0 -1px 0 rgba(66,48,6,.55),0 2px 4px rgba(0,0,0,.5),0 10px 34px rgba(212,175,55,.4)}
.btn-gold:active{transform:translateY(0);box-shadow:inset 0 1px 0 rgba(255,255,255,.4),inset 0 -1px 0 rgba(66,48,6,.5),0 2px 10px rgba(212,175,55,.2)}
.btn-gold .arr{display:inline-block;transition:transform .25s}
.btn-gold:hover .arr{transform:translateX(4px)}
.btn-gold.btn-sm{padding:.55rem 1.25rem;font-size:.88rem}
.btn-ghost{display:inline-flex;align-items:center;gap:.5rem;color:var(--gold);font-size:.95rem;font-weight:400;
  padding:.68rem 1.5rem;border-radius:100px;border:1px solid var(--hairline);background:rgba(212,175,55,.04);
  transition:border-color .25s,background .25s,transform .22s}
.btn-ghost:hover{border-color:rgba(212,175,55,.55);background:rgba(212,175,55,.09);transform:translateY(-2px)}

/* ── gabarit ── */
main{max-width:740px;margin:0 auto;padding:4rem 1.5rem 6rem}
.breadcrumb{font-size:.82rem;color:var(--faint);margin-bottom:2.6rem;letter-spacing:.02em}
.breadcrumb a{color:var(--faint)}
.breadcrumb a:hover{color:var(--gold)}
.chip{display:inline-block;border:1px solid var(--hairline);color:var(--gold);font-size:.72rem;font-weight:400;letter-spacing:.18em;text-transform:uppercase;padding:.32rem .95rem;border-radius:100px;background:rgba(212,175,55,.05)}

/* ── article ── */
h1{color:#fff;font-weight:700;font-size:clamp(2rem,5vw,3rem);line-height:1.12;letter-spacing:-.02em;margin:1.3rem 0 1.1rem;text-wrap:balance}
.meta-line{color:var(--faint);font-size:.88rem;margin-bottom:2.6rem}
.meta-line b{color:var(--muted);font-weight:400}
.meta-sep{color:var(--gold);opacity:.6;margin:0 .45rem}
.quick-answer{position:relative;border-left:2px solid var(--gold);background:linear-gradient(90deg,rgba(212,175,55,.08),transparent 70%);padding:1.5rem 1.7rem 1.4rem;margin:0 0 3rem;border-radius:0 14px 14px 0}
.quick-answer .qa-label{color:var(--gold);font-size:.72rem;letter-spacing:.22em;text-transform:uppercase;display:block;margin-bottom:.65rem}
.quick-answer p{font-family:var(--serif);font-style:italic;color:#fff;font-size:1.16rem;line-height:1.6}
article h2{color:#fff;font-weight:700;font-size:1.6rem;letter-spacing:-.01em;margin:3.2rem 0 1rem;line-height:1.25;padding-top:1.6rem;border-top:1px solid var(--hairline-soft)}
article h3{color:var(--gold-light);font-weight:400;font-size:1.2rem;margin:2.1rem 0 .8rem}
article p{margin-bottom:1.15rem}
article ul,article ol{margin:0 0 1.3rem 1.4rem}
article li{margin-bottom:.5rem}
article li::marker{color:var(--gold)}
article strong{color:#fff;font-weight:700}
article table{width:100%;border-collapse:collapse;margin:1.8rem 0;font-size:.92rem;display:block;overflow-x:auto;border-radius:12px}
article th,article td{border:1px solid var(--hairline-soft);padding:.75rem .95rem;text-align:left;vertical-align:top}
article th{background:rgba(212,175,55,.09);color:var(--gold-light);font-weight:700;white-space:nowrap}
article tr:nth-child(even) td{background:rgba(255,255,255,.015)}

/* ── encart CTA ── */
.cta-box{position:relative;text-align:center;margin:3.4rem 0;padding:2.4rem 1.9rem 2.2rem;border-radius:18px;
  background:linear-gradient(var(--panel),var(--panel)) padding-box,linear-gradient(160deg,rgba(212,175,55,.55),rgba(212,175,55,.08) 45%,rgba(212,175,55,.3)) border-box;
  border:1px solid transparent;overflow:hidden}
.cta-box::before{content:"";position:absolute;inset:0;background:radial-gradient(120% 150% at 50% -20%,rgba(212,175,55,.14),transparent 62%);pointer-events:none}
.cta-box p.cta-title{color:#fff;font-size:1.32rem;font-weight:700;letter-spacing:-.01em;margin-bottom:.55rem;text-wrap:balance}
.cta-box p.cta-sub{color:var(--muted);font-size:.95rem;max-width:34rem;margin:0 auto 1.5rem}

/* ── FAQ (accordéons natifs) ── */
.faq{margin-top:4rem;border-top:1px solid var(--hairline);padding-top:2.4rem}
.faq>h2{color:#fff;font-weight:700;font-size:1.45rem;margin-bottom:1.4rem}
.faq details{border-bottom:1px solid var(--hairline-soft)}
.faq summary{cursor:pointer;list-style:none;display:flex;justify-content:space-between;align-items:baseline;gap:1rem;color:#fff;font-weight:400;font-size:1.05rem;padding:1.05rem .2rem;transition:color .2s}
.faq summary::-webkit-details-marker{display:none}
.faq summary::after{content:"+";color:var(--gold);font-size:1.3rem;font-weight:300;line-height:1;transition:transform .3s}
.faq details[open] summary::after{transform:rotate(45deg)}
.faq summary:hover{color:var(--gold-light)}
.faq details p{color:var(--muted);padding:0 .2rem 1.3rem;max-width:60ch}

/* ── auteur & suite ── */
.author-box{display:flex;gap:1.1rem;align-items:flex-start;margin-top:3.6rem;border:1px solid var(--hairline-soft);background:rgba(255,255,255,.015);border-radius:16px;padding:1.4rem 1.5rem;font-size:.92rem;color:var(--muted)}
.author-box .mono{flex:none;width:44px;height:44px;border-radius:50%;display:grid;place-items:center;font-family:var(--serif);font-style:italic;font-size:1.35rem;color:var(--gold);border:1px solid var(--hairline);background:radial-gradient(circle at 30% 25%,rgba(212,175,55,.18),transparent 70%)}
.author-box strong{color:var(--gold)}
.related{margin-top:3.6rem}
.related h2{color:#fff;font-weight:700;font-size:1.3rem;margin-bottom:.6rem}
.related ul{list-style:none}
.related li{border-bottom:1px solid var(--hairline-soft)}
.related a{display:flex;justify-content:space-between;align-items:baseline;gap:1rem;color:var(--text);padding:.95rem .1rem;font-size:1rem}
.related a::after{content:"→";color:var(--gold);flex:none;transition:transform .25s}
.related a:hover{color:var(--gold-light)}
.related a:hover::after{transform:translateX(4px)}

/* ── pied de page ── */
footer{border-top:1px solid var(--hairline-soft);padding:2.8rem 1.5rem;margin-top:2rem}
.footer-inner{max-width:1140px;margin:0 auto;display:flex;flex-wrap:wrap;gap:1rem 2.5rem;align-items:center;justify-content:space-between;color:var(--faint);font-size:.88rem}
.footer-inner nav{display:flex;gap:1.6rem}
footer a{color:var(--muted)}footer a:hover{color:var(--gold)}

/* ── listing ── */
.blog-hero{text-align:center;margin:1.5rem auto 4rem;max-width:680px}
.blog-hero .eyebrow{font-family:var(--serif);font-style:italic;color:var(--gold);font-size:1.05rem;letter-spacing:.06em;display:block;margin-bottom:1rem}
.blog-hero h1{margin:0 0 1.1rem}
.blog-hero p{color:var(--muted);font-size:1.08rem;text-wrap:balance}
.blog-hero .rule{width:72px;height:1px;margin:1.8rem auto 0;background:linear-gradient(90deg,transparent,var(--gold),transparent)}
.cards{display:grid;grid-template-columns:repeat(6,1fr);gap:1.3rem;max-width:1140px;margin:0 auto}
.card{position:relative;grid-column:span 2;display:flex;flex-direction:column;border:1px solid var(--hairline-soft);border-radius:18px;padding:1.7rem 1.6rem 1.4rem;background:linear-gradient(180deg,rgba(255,255,255,.022),rgba(255,255,255,0));overflow:hidden;transition:transform .3s cubic-bezier(.2,.7,.3,1),border-color .3s}
.card::before{content:"";position:absolute;inset:0;background:radial-gradient(80% 90% at 50% -20%,rgba(212,175,55,.12),transparent 60%);opacity:0;transition:opacity .35s;pointer-events:none}
.card:hover{transform:translateY(-5px);border-color:rgba(212,175,55,.45)}
.card:hover::before{opacity:1}
.card .num{position:absolute;right:1rem;top:.4rem;font-size:3.6rem;font-weight:700;line-height:1;color:transparent;-webkit-text-stroke:1px rgba(212,175,55,.22);pointer-events:none}
.card h2{color:#fff;font-size:1.22rem;font-weight:700;line-height:1.3;letter-spacing:-.01em;margin:.95rem 0 .7rem;text-wrap:balance}
.card:hover h2{color:var(--gold-light)}
.card p{color:var(--muted);font-size:.93rem;flex:1}
.card-foot{display:flex;justify-content:space-between;align-items:center;margin-top:1.3rem;padding-top:1rem;border-top:1px solid var(--hairline-soft)}
.card-foot .card-meta{color:var(--faint);font-size:.8rem}
.card-foot .read{color:var(--gold);font-size:.85rem;opacity:0;transform:translateX(-4px);transition:opacity .3s,transform .3s}
.card:hover .read{opacity:1;transform:none}
.card-featured{grid-column:span 6;flex-direction:row;align-items:flex-end;gap:2.5rem;padding:2.3rem 2.2rem 1.9rem;background:linear-gradient(115deg,rgba(212,175,55,.07),rgba(255,255,255,.01) 55%)}
.card-featured .featured-main{flex:1.4}
.card-featured h2{font-size:clamp(1.5rem,3vw,2.1rem);margin-top:1.1rem}
.card-featured p{flex:1;font-size:1rem}
.card-featured .num{font-size:5.5rem;top:.6rem}
.card-featured .card-foot{border:0;padding:0;margin-top:0;flex:none}

@media(max-width:920px){.cards{grid-template-columns:1fr 1fr}.card,.card-featured{grid-column:span 2}.card-featured{flex-direction:column;align-items:stretch;gap:0}.card-featured .card-foot{margin-top:1.3rem}}
@media(max-width:640px){
  .nav-links li.hide-mobile{display:none}
  .cards{grid-template-columns:1fr}.card,.card-featured{grid-column:span 1}
  main{padding-top:2.4rem}
  .brand-text b{font-size:.92rem}
}
@media(prefers-reduced-motion:reduce){
  *,*::before,*::after{transition:none!important;animation:none!important}
  html{scroll-behavior:auto}
}
`

/* -------------------------------------------------------------- fragments */

// Pixel Meta différé : stub fbq qui met les événements en file d'attente, le
// script (≈250 Ko) n'est chargé qu'à la première interaction ou 3 s après le
// chargement — même mécanique que index.html.
const PIXEL = `<script>!function(f){if(f.fbq)return;var n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[]}(window);fbq('init','${PIXEL_ID}');fbq('track','PageView');(function(){var done=false;function load(){if(done)return;done=true;var t=document.createElement('script');t.async=true;t.src='https://connect.facebook.net/en_US/fbevents.js';document.head.appendChild(t)}['pointerdown','keydown','touchstart','scroll'].forEach(function(e){addEventListener(e,load,{once:true,passive:true})});addEventListener('load',function(){setTimeout(load,3000)})})();</script>
<noscript><img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1" alt=""/></noscript>`

// Police Outfit auto-hébergée (variable, 32 Ko) — zéro requête vers Google Fonts.
const FONTS = `<link rel="preload" as="font" type="font/woff2" href="/fonts/outfit-latin-var.woff2" crossorigin>`

// Prefetch des liens internes au survol/visibilité (Speculation Rules API,
// enhancement progressif — ignoré par les navigateurs non compatibles).
const SPECULATION = `<script type="speculationrules">{"prefetch":[{"where":{"and":[{"href_matches":"/*"},{"not":{"href_matches":"/img/*"}}]},"eagerness":"moderate"}]}</script>`

// Logo 35×40 (portrait) : hauteur fixe, largeur proportionnelle — jamais étiré.
// Le sous-titre de la marque est « Le blog » sur les pages du blog, absent ailleurs.
const navBar = (subtitle) => `<nav class="nav"><div class="nav-inner">
<a class="brand" href="/" aria-label="Marketwins — accueil"><picture><source type="image/webp" srcset="/img/Or_blanc-nav.webp 1x, /img/Or_blanc-nav-2x.webp 2x"><img src="/img/Or_blanc-nav.webp" alt="" width="35" height="40"></picture><span class="brand-text"><b>Marketwins</b>${subtitle ? `<em>${subtitle}</em>` : ''}</span></a>
<ul class="nav-links"><li class="hide-mobile"><a href="/">Accueil</a></li><li class="hide-mobile"><a href="/blog/">Blog</a></li><li><a class="btn-gold btn-sm" href="${CALENDLY}" target="_blank" rel="noopener">Conseil gratuit <span class="arr" aria-hidden="true">→</span></a></li></ul>
</div></nav>`

const NAV = navBar('Le blog')

const FOOTER = `<footer><div class="footer-inner">
<p>© 2026 Kingdom Ads — Marketwins. Opportunités commerciales qualifiées.</p>
<nav aria-label="Pied de page"><a href="/">Accueil</a><a href="/blog/">Blog</a><a href="/mentions-legales/">Mentions légales</a><a href="/confidentialite/">Confidentialité</a><a href="mailto:contact@kingdomads.fr">Contact</a></nav>
</div></footer>`

const CTA_BOX = `<div class="cta-box">
<p class="cta-title">Vos publicités ne donnent pas les résultats attendus&nbsp;?</p>
<p class="cta-sub">Parlez-en 30 minutes avec un expert Marketwins. Diagnostic honnête, sans engagement — on vous dit aussi quand la pub n'est pas la solution.</p>
<a class="btn-gold" href="${CALENDLY}" target="_blank" rel="noopener">Demander un conseil gratuit <span class="arr" aria-hidden="true">→</span></a>
</div>`

const head = ({ title, description, url, type = 'article', published, modified }) => `<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<meta name="author" content="Marketwins">
<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large">
<meta name="theme-color" content="#060606">
<link rel="canonical" href="${url}">
<meta property="og:type" content="${type}">
<meta property="og:locale" content="fr_FR">
<meta property="og:site_name" content="Marketwins">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${SITE}/img/og-image.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="Marketwins — des opportunités commerciales qualifiées via Meta Ads, Google Ads et LinkedIn Ads">
${published ? `<meta property="article:published_time" content="${published}">\n<meta property="article:modified_time" content="${modified || published}">` : ''}
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(description)}">
<meta name="twitter:image" content="${SITE}/img/og-image.jpg">
<link rel="icon" type="image/png" sizes="32x32" href="/img/favicon-32.png">
<link rel="icon" type="image/png" href="/img/logo.png">
<link rel="apple-touch-icon" sizes="180x180" href="/img/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
${FONTS}
${SPECULATION}
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
      image: `${SITE}/img/og-image.jpg`,
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
<div class="progress" aria-hidden="true"></div>
${NAV}
<main>
<nav class="breadcrumb" aria-label="Fil d'Ariane"><a href="/">Accueil</a> › <a href="/blog/">Blog</a> › ${esc(a.category)}</nav>
<article>
<span class="chip">${esc(a.category)}</span>
<h1>${esc(a.title)}</h1>
<p class="meta-line"><b>L'équipe Marketwins</b><span class="meta-sep">·</span>${frDate(a.datePublished)}${a.dateModified && a.dateModified !== a.datePublished ? `<span class="meta-sep">·</span>mis à jour le ${frDate(a.dateModified)}` : ''}<span class="meta-sep">·</span>${a.readingMinutes} min de lecture</p>
<div class="quick-answer"><span class="qa-label">La réponse en bref</span><p>${esc(a.quickAnswer)}</p></div>
${body}
<section class="faq">
<h2>Questions fréquentes</h2>
${a.faq
  .map(
    ({ q, a: ans }, i) => `<details${i === 0 ? ' open' : ''}>
<summary>${esc(q)}</summary>
<p>${esc(ans)}</p>
</details>`
  )
  .join('\n')}
</section>
<div class="author-box"><span class="mono" aria-hidden="true">M</span><div><strong>À propos de Marketwins</strong> — Agence d'acquisition payante (Meta, Google et LinkedIn Ads) : 8 ans d'expérience, plus de 200 entreprises accompagnées. Nous générons des opportunités commerciales qualifiées à un coût connu à l'avance, validées par un test cadré, sans engagement long terme. <a href="${CALENDLY}" target="_blank" rel="noopener">Réserver un conseil gratuit</a>.</div></div>
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

  const card = (a, i) => {
    const featured = i === 0
    return `<a class="card${featured ? ' card-featured' : ''}" href="/blog/${a.slug}/">
<span class="num" aria-hidden="true">${pad2(all.length - i)}</span>
${
  featured
    ? `<span class="featured-main"><span class="chip">${esc(a.category)}</span>
<h2>${esc(a.title)}</h2></span>
<span style="flex:1;display:flex;flex-direction:column;gap:1.3rem"><p>${esc(a.excerpt)}</p>
<span class="card-foot"><span class="card-meta">${frDate(a.datePublished)} · ${a.readingMinutes} min</span><span class="read">Lire l'article →</span></span></span>`
    : `<span><span class="chip">${esc(a.category)}</span></span>
<h2>${esc(a.title)}</h2>
<p>${esc(a.excerpt)}</p>
<span class="card-foot"><span class="card-meta">${frDate(a.datePublished)} · ${a.readingMinutes} min</span><span class="read">Lire →</span></span>`
}
</a>`
  }

  return `<!DOCTYPE html>
<html lang="fr">
<head>
${head({ title, description, url, type: 'website' })}
${ld.map(jsonLd).join('\n')}
</head>
<body>
${NAV}
<main style="max-width:1140px">
<div class="blog-hero">
<span class="eyebrow">Méthode, budgets &amp; résultats</span>
<h1>Le blog Marketwins</h1>
<p>Des réponses franches aux questions que se posent les dirigeants sur la publicité digitale : budgets, campagnes qui ne convertissent pas, qualité des leads.</p>
<div class="rule" aria-hidden="true"></div>
</div>
<div class="cards">
${all.map(card).join('\n')}
</div>
${CTA_BOX}
</main>
${FOOTER}
</body>
</html>`
}

/* Pages hors blog (confidentialité, mentions légales…) : même gabarit visuel,
   contenu dans content/pages/<slug>.mjs. */
function simplePage(p) {
  const url = `${SITE}/${p.slug}/`

  const ld = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': `${url}#webpage`,
      name: p.title,
      description: p.metaDescription,
      url,
      inLanguage: 'fr-FR',
      dateModified: p.updated,
      publisher: { '@id': `${SITE}/#organization` },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Accueil', item: `${SITE}/` },
        { '@type': 'ListItem', position: 2, name: p.title, item: url },
      ],
    },
    { '@context': 'https://schema.org', ...ORG },
  ]

  return `<!DOCTYPE html>
<html lang="fr">
<head>
${head({ title: p.metaTitle, description: p.metaDescription, url, type: 'website' })}
${ld.map(jsonLd).join('\n')}
</head>
<body>
${navBar()}
<main>
<nav class="breadcrumb" aria-label="Fil d'Ariane"><a href="/">Accueil</a> › ${esc(p.title)}</nav>
<article>
<h1>${esc(p.title)}</h1>
<p class="meta-line">Dernière mise à jour<span class="meta-sep">·</span>${frDate(p.updated)}</p>
${p.html}
</article>
</main>
${FOOTER}
</body>
</html>`
}

function sitemap(all, pages) {
  const urls = [
    { loc: `${SITE}/`, priority: '1.0', changefreq: 'monthly' },
    { loc: `${SITE}/kingdomads/`, priority: '0.8', changefreq: 'monthly' },
    { loc: `${SITE}/blog/`, priority: '0.8', changefreq: 'weekly' },
    ...all.map((a) => ({
      loc: `${SITE}/blog/${a.slug}/`,
      priority: '0.7',
      changefreq: 'monthly',
      lastmod: a.dateModified || a.datePublished,
    })),
    ...pages.map((p) => ({
      loc: `${SITE}/${p.slug}/`,
      priority: '0.3',
      changefreq: 'yearly',
      lastmod: p.updated,
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

const PAGES_DIR = path.join(ROOT, 'content', 'pages')
const pages = []
for (const f of (await readdir(PAGES_DIR).catch(() => [])).filter((f) => f.endsWith('.mjs'))) {
  const mod = await import(pathToFileURL(path.join(PAGES_DIR, f)).href)
  const p = mod.default
  for (const field of ['slug', 'title', 'metaTitle', 'metaDescription', 'updated', 'html']) {
    if (!p?.[field]) throw new Error(`${f} : champ manquant "${field}"`)
  }
  pages.push(p)
}

await mkdir(path.join(DIST, 'blog'), { recursive: true })
await writeFile(path.join(DIST, 'blog', 'index.html'), listingPage(articles))
for (const a of articles) {
  const dir = path.join(DIST, 'blog', a.slug)
  await mkdir(dir, { recursive: true })
  await writeFile(path.join(dir, 'index.html'), articlePage(a, articles))
}
for (const p of pages) {
  const dir = path.join(DIST, p.slug)
  await mkdir(dir, { recursive: true })
  await writeFile(path.join(dir, 'index.html'), simplePage(p))
}
await writeFile(path.join(DIST, 'sitemap.xml'), sitemap(articles, pages))

console.log(`Blog généré : ${articles.length} articles + index + ${pages.length} page(s) + sitemap.xml`)
for (const a of articles) console.log(`  /blog/${a.slug}/`)
for (const p of pages) console.log(`  /${p.slug}/`)
