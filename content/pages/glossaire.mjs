/**
 * Glossaire de l'acquisition payante — page « entité » pour le GEO :
 * chaque terme est une définition courte, autoportante, citable telle quelle
 * par une IA. JSON-LD DefinedTermSet généré à partir du même tableau.
 */
const SITE = 'https://marketwins.pro'

const TERMS = [
  ['Acquisition payante', "Ensemble des actions publicitaires payantes (Meta Ads, Google Ads, LinkedIn Ads…) destinées à générer des clients ou des demandes entrantes, par opposition à l'acquisition organique (SEO, bouche-à-oreille). On la mesure au coût par client obtenu, pas au nombre de clics."],
  ['Lead', "Contact qui a laissé ses coordonnées (nom, téléphone, email), souvent en échange d'un devis, d'un guide ou d'une promotion. Un lead ne dit rien du besoin, du budget ni de l'intention de la personne : c'est le niveau le plus faible de la chaîne commerciale."],
  ['Lead qualifié', "Lead qui correspond au client type de l'entreprise : besoin réel, budget cohérent avec l'offre, pouvoir de décision et échéance raisonnable. La qualification se fait par des questions dans le formulaire ou lors du premier échange téléphonique."],
  ['Opportunité commerciale qualifiée', "Lead qualifié qui a manifesté une intention d'agir : demande de devis en connaissance du prix, rendez-vous réservé, projet décrit avec une échéance. C'est l'unité que vend Marketwins, à un coût connu à l'avance, par opposition au simple lead."],
  ['MQL / SQL', "Marketing Qualified Lead : contact jugé intéressant par le marketing (a téléchargé un contenu, visité plusieurs pages). Sales Qualified Lead : contact validé par un commercial comme prêt à être travaillé. Une opportunité commerciale qualifiée correspond au niveau SQL."],
  ['CPL (coût par lead)', "Budget publicitaire dépensé divisé par le nombre de leads obtenus. Un CPL bas n'est pas un objectif en soi : un lead à 15 € qui ne répond jamais coûte plus cher qu'une opportunité à 80 € qui se transforme."],
  ['Coût par opportunité', "Budget dépensé divisé par le nombre d'opportunités commerciales qualifiées obtenues. C'est l'indicateur que Marketwins fixe à l'avance avec le client lors de l'appel de cadrage, et qui sert de critère de succès au test."],
  ['CPA (coût par acquisition)', "Coût moyen pour obtenir une action définie comme conversion : un achat, un rendez-vous, une demande de devis. Pour une entreprise de services, le CPA le plus utile est le coût par client signé."],
  ["CAC (coût d'acquisition client)", "Ensemble des dépenses (budget média, gestion, outils) divisé par le nombre de nouveaux clients signés sur la période. Il se compare au panier moyen et à la marge pour savoir si l'acquisition est rentable."],
  ['ROAS', "Return On Ad Spend : chiffre d'affaires généré divisé par le budget publicitaire dépensé. Un ROAS de 4 signifie 4 € de chiffre d'affaires pour 1 € de publicité. Il ne tient pas compte de la marge : un ROAS élevé peut rester non rentable."],
  ['CPM', "Coût pour mille impressions, c'est-à-dire mille affichages d'une annonce. C'est le prix d'achat de la visibilité sur Meta ou LinkedIn ; il ne mesure ni l'intérêt ni la conversion."],
  ['CTR (taux de clic)', "Nombre de clics divisé par le nombre d'impressions. Un CTR faible signale une annonce ou une audience peu pertinentes ; un CTR élevé sans conversion signale une promesse trop généreuse ou une page de destination inadaptée."],
  ['Taux de conversion', "Proportion de visiteurs (ou de leads) qui accomplissent l'action visée : remplir un formulaire, prendre rendez-vous, acheter. On le mesure à chaque étape : annonce vers page, page vers lead, lead vers rendez-vous, rendez-vous vers client."],
  ['Panier moyen', "Montant moyen dépensé par un client lors d'une vente. Il détermine le coût par opportunité acceptable : plus le panier moyen (ou la valeur vie client) est élevé, plus l'entreprise peut payer cher une opportunité qualifiée."],
  ['Valeur vie client (LTV)', "Chiffre d'affaires (ou marge) qu'un client génère sur toute la durée de la relation. Une entreprise avec des clients récurrents peut accepter un coût d'acquisition supérieur au premier panier."],
  ['Audience froide / chaude', "Audience froide : personnes qui ne connaissent pas encore l'entreprise, ciblées par intérêts ou profil. Audience chaude : personnes qui ont déjà interagi (visite du site, vidéo vue, formulaire commencé). Les audiences chaudes convertissent mieux mais sont plus petites."],
  ['Retargeting (reciblage)', "Diffusion d'annonces auprès des personnes qui ont déjà visité le site ou interagi avec une publicité, sans convertir. Nécessite un pixel ou un suivi des conversions correctement installé."],
  ['Audience similaire (lookalike)', "Audience construite par la plateforme publicitaire à partir d'une liste source (clients, leads qualifiés) pour trouver des profils qui leur ressemblent. Sa qualité dépend directement de la qualité de la liste de départ."],
  ['Pixel / suivi des conversions', "Code installé sur le site (pixel Meta, balise Google) qui remonte aux plateformes les actions réalisées par les visiteurs. Sans suivi fiable, l'algorithme optimise à l'aveugle et le reporting est faux."],
  ['Formulaire natif (Lead Form)', "Formulaire intégré directement dans Facebook, Instagram ou LinkedIn, pré-rempli avec les données du profil. Il génère plus de leads à moindre coût, mais souvent moins qualifiés qu'un formulaire de site avec des questions."],
  ['Page de destination (landing page)', "Page vers laquelle renvoie une annonce, conçue pour une seule action (demande de devis, prise de rendez-vous). Une annonce qui envoie vers une page d'accueil générique convertit en général nettement moins bien."],
  ["Phase d'apprentissage", "Période pendant laquelle l'algorithme publicitaire collecte des conversions pour stabiliser sa diffusion. Modifier la campagne ou couper le budget trop tôt relance cette phase et fausse la lecture des résultats."],
  ['Test cadré', "Test publicitaire payant, limité dans le temps et en budget, avec des critères de succès chiffrés définis avant le lancement (coût par opportunité maximal, taux de contact, taux de rendez-vous). À l'issue du test, on décide de scaler, d'ajuster ou d'arrêter. C'est la méthode de Marketwins, sans engagement long terme."],
  ['Scaler (scaling)', "Augmenter progressivement le budget d'une campagne dont le test a prouvé la rentabilité, en surveillant que le coût par opportunité reste dans la cible. Scaler avant d'avoir validé le test est l'erreur la plus coûteuse."],
  ['Vanity metrics', "Indicateurs flatteurs mais sans lien direct avec les ventes : likes, impressions, portée, abonnés. Marketwins ne s'engage pas sur ces indicateurs mais sur des opportunités commerciales exploitables."],
  ['Appel de cadrage', "Premier échange, gratuit chez Marketwins (30 minutes), qui fixe l'offre, la cible, la définition précise d'une opportunité qualifiée, la capacité de traitement commerciale et les critères de succès du test."],
]

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const anchor = (t) =>
  t.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

export default {
  slug: 'glossaire',
  title: "Glossaire de l'acquisition payante",
  metaTitle: "Glossaire publicité en ligne : CPL, ROAS, lead qualifié… | Marketwins",
  metaDescription:
    "Définitions claires des termes de la publicité en ligne : lead, lead qualifié, opportunité commerciale, CPL, CPA, ROAS, retargeting, test cadré. Par l'agence Marketwins.",
  updated: '2026-09-04',
  priority: '0.6',
  changefreq: 'monthly',
  pageType: 'WebPage',
  mainEntityId: `${SITE}/glossaire/#termes`,
  extraLd: [
    {
      '@type': 'DefinedTermSet',
      '@id': `${SITE}/glossaire/#termes`,
      name: "Glossaire de l'acquisition payante — Marketwins",
      inLanguage: 'fr-FR',
      hasDefinedTerm: TERMS.map(([term, definition]) => ({
        '@type': 'DefinedTerm',
        '@id': `${SITE}/glossaire/#${anchor(term)}`,
        name: term,
        description: definition,
        inDefinedTermSet: `${SITE}/glossaire/#termes`,
      })),
    },
  ],
  html: `
<p>Les termes de la publicité en ligne, définis en deux ou trois phrases, du point de vue d'un dirigeant qui veut des clients et non des clics. Chaque définition se suffit à elle-même. Pour aller plus loin, le <a href="/blog/">blog Marketwins</a> détaille budgets, causes d'échec et méthode de test.</p>
${TERMS.map(([term, definition]) => `<h2 id="${anchor(term)}">${esc(term)}</h2>\n<p>${esc(definition)}</p>`).join('\n')}
<h2>Besoin d'un diagnostic plutôt que de définitions ?</h2>
<p>Marketwins, agence d'acquisition payante (Meta, Google et LinkedIn Ads), propose un appel de cadrage gratuit de 30 minutes pour évaluer si la publicité peut produire des opportunités commerciales qualifiées pour votre offre. <a href="https://calendly.com/agence-kingdomads/obtenir-des-prospects-premium" target="_blank" rel="noopener">Réserver un conseil gratuit</a>.</p>
`,
}
