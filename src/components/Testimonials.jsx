import { TextAnimate } from './ui/text-animate'
import { GlassVideoCard } from './ui/glass-video-card'
import { TestimonialsColumn } from './ui/testimonials-columns'

const VIDEO_TESTIMONIALS = [
  {
    driveId: '1_5n8F13O7dMX395KY3JiyhAUL09CF6xS',
    image: '/img/dreamax.jpg',
    name: 'Cyril alias Mr Dreamax',
    company: 'Expert en mindset et développement personnel. Suivi par plus de 3,5M de personnes',
    preview: '"Les Marketwins ont su instaurer un climat de confiance grâce à leur écoute. Ils m\'ont établi rapidement une stratégie de vente claire, structurée et parfaitement adaptée à mes besoins"',
    tags: ['Mindset', 'Stratégie'],
  },
  {
    driveId: '1BtIMB6m5jHLt4IBSnwUalNDYadhcical',
    image: '/img/raphael.jpg',
    name: 'Raphaël Buissière',
    company: 'Expert en financement immobilier',
    preview: '"Kingdom Ads a supprimé les frontières et m\'a permis de gagner en efficacité pour me concentrer sur l\'essentiel de mon activité."',
    tags: ['Immobilier', 'Efficacité'],
  },
  {
    driveId: '1pQcQ6uTskgeyVYvfNENkZ-uPHSNV9A2E',
    image: '/img/rt.jpg',
    name: 'Rodolphe Toupain',
    company: 'Président RT Connecting / Expert en appels d\'offres',
    preview: '"J\'ai multiplié mon chiffre d\'affaires par 20 en 4 ans de collaboration avec Kingdom Ads. C\'est structuré, on a des objectifs. Merci à Alexandre et William, je recommande Kingdom Ads !"',
    tags: ['B2B', 'Croissance'],
  },
]

const ALL_TESTIMONIALS = [
  {
    text: "J'ai fait x20 en 4 ans avec eux. C'est structuré, on a des objectifs clairs et un vrai accompagnement.",
    name: 'Rodolphe Toupain',
    role: 'Directeur • RT-Connecting',
    image: '/img/rt.jpg',
  },
  {
    text: "Merci à toute l'équipe pour votre excellent travail ! On a atteint plusieurs millions de vues.",
    name: 'Mike',
    role: 'Fondateur • Bazehouse',
  },
  {
    text: "J'ai tous mes mois qui sont complets avec plus de 80 rendez-vous par mois.",
    name: 'Claire',
    role: 'Hypnothérapeute',
  },
  {
    text: "Stratégie claire, exécution carrée. Ils ont fait sauter mes plafonds et j'ai enfin un pipeline prévisible.",
    name: 'Cyril',
    role: 'Mr Dreamax • Coach mindset',
    image: '/img/dreamax.jpg',
  },
  {
    text: "Ils ont su comprendre mon métier et adapter leur méthode. Mes leads ont triplé en 3 mois.",
    name: 'Raphaël Buissière',
    role: 'Expert financement immobilier',
    image: '/img/raphael.jpg',
  },
  {
    text: 'Une équipe accessible et réactive. On sent une vraie volonté de faire performer le client.',
    name: 'Sophie L.',
    role: 'Coach business',
  },
  {
    text: 'Le ROI est au rendez-vous dès le premier mois. Je recommande sans hésiter à tout entrepreneur sérieux.',
    name: 'Anthony D.',
    role: 'Fondateur • SaaS B2B',
  },
  {
    text: "Gain de temps énorme : ils gèrent l'acquisition, je me concentre sur la livraison et la croissance.",
    name: 'Julien M.',
    role: 'Consultant indépendant',
  },
  {
    text: 'Un vrai partenariat sur la durée, pas juste une prestation. Le suivi hebdo fait toute la différence.',
    name: 'Léa V.',
    role: 'Agence formation',
  },
]

const FIRST_COLUMN = ALL_TESTIMONIALS.slice(0, 3)
const SECOND_COLUMN = ALL_TESTIMONIALS.slice(3, 6)
const THIRD_COLUMN = ALL_TESTIMONIALS.slice(6, 9)

function openVideo(driveId) {
  window.dispatchEvent(new CustomEvent('open-video', { detail: { driveId } }))
}

export default function Testimonials() {
  return (
    <section className="section reveal" id="testimonials">
      <div className="section-header">
        <TextAnimate animation="fadeIn" by="word" as="h2">
          Ce que disent les entreprises que nous accompagnons
        </TextAnimate>
      </div>
      <div className="testimonials-videos-grid">
        {VIDEO_TESTIMONIALS.map((t, i) => (
          <GlassVideoCard
            key={t.driveId}
            index={i}
            image={t.image}
            title={t.name}
            subtitle={t.company}
            preview={t.preview}
            tags={t.tags}
            onPlay={() => openVideo(t.driveId)}
          />
        ))}
      </div>
      <div className="testimonials-columns">
        <TestimonialsColumn testimonials={FIRST_COLUMN} duration={18} />
        <TestimonialsColumn testimonials={SECOND_COLUMN} duration={22} className="testimonials-col-second" />
        <TestimonialsColumn testimonials={THIRD_COLUMN} duration={20} className="testimonials-col-third" />
      </div>
    </section>
  )
}
