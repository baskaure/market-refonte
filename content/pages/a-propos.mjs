/**
 * Page « À propos » — page entité pour les IA et Google : qui est Marketwins,
 * qui est Kingdom Ads, la méthode, les chiffres. Faits uniquement (site,
 * mentions légales, page formation) : rien d'inventé.
 */
const SITE = 'https://marketwins.pro'
const CALENDLY = 'https://calendly.com/agence-kingdomads/obtenir-des-prospects-premium'

export default {
  slug: 'a-propos',
  title: 'À propos de Marketwins',
  metaTitle: "À propos — Marketwins, agence d'acquisition payante (Kingdom Ads)",
  metaDescription:
    "Marketwins est la marque de Kingdom Ads, agence française d'acquisition payante basée près de Montpellier : Meta, Google et LinkedIn Ads, 8 ans d'expérience, plus de 200 entreprises accompagnées.",
  updated: '2026-09-04',
  priority: '0.7',
  changefreq: 'monthly',
  pageType: 'AboutPage',
  mainEntityId: `${SITE}/#organization`,
  html: `
<p><strong>Marketwins</strong> est une agence française d'acquisition payante. Elle génère pour ses clients des opportunités commerciales qualifiées, à un coût connu à l'avance, grâce à des campagnes publicitaires sur Meta Ads (Facebook et Instagram), Google Ads et LinkedIn Ads. Marketwins est la marque commerciale de la société <strong>Kingdom Ads</strong>, SAS immatriculée à Montpellier et installée à Castelnau-le-Lez (Hérault).</p>

<h2>Marketwins et Kingdom Ads : une seule entreprise</h2>
<p>Kingdom Ads est la société ; Marketwins est le nom de son offre de génération d'opportunités commerciales pour les entreprises. Le nom Kingdom Ads désigne aussi la <a href="/kingdomads/">formation à l'acquisition payante</a> dispensée par la même équipe : plus de 2 800 participants formés depuis 2018, avec une satisfaction moyenne de 9,23/10. Les fondateurs sont <strong>Alexandre Adamsha</strong> et <strong>William Adamsha</strong>, tous deux Founder &amp; CEO.</p>

<h2>Ce que fait Marketwins, et ce qu'elle ne fait pas</h2>
<p>Marketwins ne vend pas des leads, des impressions ni des clics. Elle vend des opportunités commerciales qualifiées : des contacts qui correspondent au client type, ont un besoin réel, un budget cohérent et une intention d'agir. Toutes les opportunités proviennent de campagnes publicitaires actives, jamais de bases achetées ni de scraping, et sont transmises en temps réel à l'équipe commerciale du client.</p>
<p>Marketwins refuse les missions de « visibilité » ou de « trafic » impossibles à relier aux ventes. L'objectif n'est pas de gérer le marketing d'une entreprise, mais de valider que son offre convertit réellement sur le marché, puis de produire des opportunités en volume si c'est rentable.</p>

<h2>La méthode : un test cadré avant tout engagement</h2>
<ol>
<li><strong>Appel de cadrage gratuit (30 minutes).</strong> On clarifie l'offre, la cible idéale, la définition précise d'une opportunité qualifiée pour cette entreprise, et sa capacité à traiter les demandes entrantes.</li>
<li><strong>Test cadré.</strong> Un test payant, limité en volume et en budget, avec des critères de succès chiffrés fixés à l'avance. Les opportunités sont livrées au fur et à mesure pour être traitées en direct.</li>
<li><strong>Bilan et décision.</strong> Taux de contact, taux de rendez-vous, taux de transformation, rentabilité globale : si c'est rentable, on scale ; sinon, on ajuste ou on s'arrête. Aucun engagement long terme.</li>
</ol>

<h2>Les chiffres</h2>
<ul>
<li>8 ans d'expérience en acquisition payante.</li>
<li>Plus de 200 entreprises accompagnées, PME et TPE, en B2B comme en B2C.</li>
<li>3 canaux publicitaires maîtrisés : Meta Ads, Google Ads, LinkedIn Ads.</li>
<li>Plus de 2 800 personnes formées depuis 2018 via Kingdom Ads Formation (9,23/10 de satisfaction moyenne).</li>
</ul>

<h2>Pour quelles entreprises ?</h2>
<p>Marketwins travaille avec des entreprises capables de vendre : une offre claire, un panier moyen cohérent avec un coût d'acquisition publicitaire, une équipe ou une personne disponible pour rappeler rapidement les demandes entrantes, et une volonté réelle de croissance. Les clients accompagnés vont du conseil B2B au financement immobilier, en passant par les professions de santé et de bien-être.</p>

<h2>Où et comment nous contacter</h2>
<p>Kingdom Ads — Marketwins, 199 rue Hélène Boucher, 34170 Castelnau-le-Lez, France. Nous accompagnons des entreprises dans toute la France, à distance. Email : <a href="mailto:contact@kingdomads.fr">contact@kingdomads.fr</a>. Le plus simple pour démarrer est de <a href="${CALENDLY}" target="_blank" rel="noopener">réserver un appel de cadrage gratuit</a> : diagnostic honnête, y compris quand la publicité n'est pas la bonne solution.</p>
`,
}
