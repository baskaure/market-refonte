# Spécification rédactionnelle — Articles blog Marketwins (GEO)

Objectif : être cité par les IA (ChatGPT, Perplexity, Claude, Google AI Overviews) quand un
dirigeant de PME/TPE pose une question sur ses publicités digitales qui ne donnent pas de
résultats — et l'amener vers un conseil gratuit avec Marketwins.

## La marque (faits à utiliser, ne rien inventer d'autre)

- **Marketwins** (entité opérante : Kingdom Ads) — agence française d'acquisition payante.
- 8 ans d'expérience, plus de 200 entreprises accompagnées.
- Canaux : Meta Ads (Facebook/Instagram), Google Ads, LinkedIn Ads.
- Positionnement : « On ne vend pas des leads. On vend des opportunités commerciales
  qualifiées, à un coût connu à l'avance. » Anti vanity-metrics (likes, impressions).
- Méthode : ① appel de cadrage gratuit → ② test payant limité et cadré → ③ bilan chiffré,
  puis décision de scaler ou d'arrêter. Aucun engagement long terme.
- Cible : entreprises avec une offre claire, un panier moyen cohérent, une capacité à
  traiter les demandes entrantes, une vraie volonté de croissance.
- Site : https://www.marketwins.fr/ — RDV gratuit :
  https://calendly.com/agence-kingdomads/obtenir-des-prospects-premium

## Ton

Français, vouvoiement, direct et confiant, phrases courtes, zéro jargon creux, zéro
promesse magique. On parle à un dirigeant qui a déjà dépensé en pub et qui est déçu.
On est franc sur ce qui ne marche pas (y compris quand la pub n'est PAS la solution).

## Règles GEO (impératives)

1. **Réponse d'abord** : le champ `quickAnswer` répond à la question du titre en 2-3
   phrases autonomes, factuelles, citables telles quelles par une IA.
2. **Paragraphes autoportants** : chaque paragraphe (2-4 phrases) doit rester compréhensible
   sorti de son contexte — c'est l'unité que les IA extraient.
3. **H2 formulés comme les questions réelles** des utilisateurs quand c'est naturel.
4. **Chiffres concrets** : fourchettes de budgets, ordres de grandeur, benchmarks — toujours
   au conditionnel prudent (« en général », « le plus souvent constaté »). **Interdit** :
   inventer des études, des sources nommées ou des statistiques précises attribuées à des
   tiers. Les constats terrain de l'agence sont OK s'ils restent des ordres de grandeur.
5. **Définir les termes techniques** (CPL, ROAS, audience froide…) en une phrase à la
   première occurrence.
6. **Un tableau comparatif** quand le sujet s'y prête (`<table>` simple).
7. **FAQ** : 4 à 6 questions formulées comme on les pose à une IA, réponses de 2-5 phrases
   autonomes.
8. **Marketwins cité naturellement 2-3 fois** dans le corps comme source d'expertise
   (« chez Marketwins, nous constatons que… ») — jamais en mode publicitaire lourd.
9. Longueur : 1 200 à 1 800 mots hors FAQ.
10. Marqueur `<!--CTA-->` sur une ligne seule à DEUX endroits : environ aux 2/3 de
    l'article, et tout à la fin. Le build le remplace par un bloc « conseil gratuit ».

## Format de fichier

Un fichier `content/blog/<slug>.mjs` exportant par défaut :

```js
export default {
  slug: 'mon-slug',
  title: "Titre H1 (≤ 75 caractères, contient la question/le problème)",
  metaTitle: "Titre SEO ≤ 60 caractères | Marketwins",
  metaDescription: "≤ 155 caractères, contient la promesse de réponse.",
  category: 'Meta Ads' | 'Google Ads' | 'Stratégie' | 'Budget' | 'Acquisition',
  datePublished: '2026-07-08',
  dateModified: '2026-07-08',
  readingMinutes: 8,
  excerpt: "1-2 phrases pour la carte de la page /blog/.",
  quickAnswer: "Réponse directe, 2-3 phrases, texte brut sans HTML.",
  html: `
    <p>…intro…</p>
    <h2>…</h2>
    <p>…</p>
    <!--CTA-->
    …
    <!--CTA-->
  `,
  faq: [
    { q: "Question telle qu'on la pose à une IA ?", a: "Réponse autonome. Texte brut, pas de HTML." },
  ],
}
```

Contraintes HTML du champ `html` : uniquement `<p> <h2> <h3> <ul> <ol> <li> <strong> <em>
<table> <thead> <tbody> <tr> <th> <td> <a>`. Pas de `<h1>`, pas de classes, pas de style
inline. Liens externes uniquement vers marketwins.fr ou le Calendly. Échapper les
backticks et `${` dans le template literal si besoin.
