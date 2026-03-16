import { Marquee } from './ui/marquee'

const reviews = [
  {
    name: 'MILL-FORMA',
    label: '5,0 · Basé sur 18 avis Google',
    body: 'Organisme sérieux, à l’écoute, et capable d’adaptation aux demandes et besoins de ses clients.',
  },
  {
    name: 'Sarah Marsaud',
    label: 'Avis Google',
    body: 'Organisme sérieux, à l’écoute, et capable d’adaptation aux besoins de ses clients.',
  },
  {
    name: 'LEB Communication',
    label: 'Avis Google',
    body: 'Enfin un organisme de formation professionnel à l’écoute et pouvant répondre à des besoins spécifiques.',
  },
  {
    name: 'Elton Morel',
    label: 'Avis Google',
    body: 'Organisme sérieux qui nous a bien accompagnés sur notre plan de formation.',
  },
  {
    name: 'La vie des stars',
    label: 'Avis Google',
    body: 'J’ai bénéficié d’une très belle formation. Merci infiniment au formateur, il était vraiment à l’écoute.',
  },
  {
    name: 'Pierre F',
    label: 'Avis Google',
    body: 'Devis efficace. Formation de qualité. Ils s’occupent de toute la prise en charge. À recommander.',
  },
  {
    name: 'Murielle Dattolo',
    label: 'Avis Google',
    body: 'Vous êtes particuliers ? Entreprises ? N’hésitez pas à contacter MILL FORMA.',
  },
]

const firstRow = reviews.slice(0, Math.ceil(reviews.length / 2))
const secondRow = reviews.slice(Math.ceil(reviews.length / 2))

function ReviewCard({ name, label, body }) {
  return (
    <figure className="review-card">
      <div className="review-card-header">
        <div className="review-avatar">{name.charAt(0)}</div>
        <div className="review-meta">
          <figcaption className="review-name">{name}</figcaption>
          <p className="review-label">{label}</p>
        </div>
      </div>
      <div className="review-stars">
        <span>★★★★★</span>
      </div>
      <blockquote className="review-body">{body}</blockquote>
    </figure>
  )
}

export default function KingdomReviews() {
  return (
    <section className="section kingdom-reviews">
      <div className="kingdom-reviews-inner">
        <div className="kingdom-reviews-header">
          <p className="kingdom-stats-eyebrow">Avis clients</p>
          <h2>Ce que disent les clients MILL FORMA</h2>
          <p className="kingdom-stats-subtitle">
            Notes et retours collectés directement depuis les avis Google laissés par les participants et
            entreprises accompagnées.
          </p>
        </div>

        <div className="reviews-marquee">
          <Marquee pauseOnHover duration={22}>
            {firstRow.map((review) => (
              <ReviewCard key={review.name} {...review} />
            ))}
          </Marquee>
          <Marquee reverse pauseOnHover duration={26}>
            {secondRow.map((review) => (
              <ReviewCard key={review.name} {...review} />
            ))}
          </Marquee>
          <div className="reviews-gradient-left" />
          <div className="reviews-gradient-right" />
        </div>
      </div>
    </section>
  )
}

