import { useEffect, useState } from 'react'
import { TextAnimate } from './ui/text-animate'
import ScrollStack, { ScrollStackItem } from './ScrollStack'

const VIDEO_TESTIMONIALS = [
  {
    driveId: '1_5n8F13O7dMX395KY3JiyhAUL09CF6xS',
    image: '/img/dreamax.jpg',
    name: 'Cyril alias Mr Dreamax',
    company: 'Expert en mindset et développement personnel. Suivi par plus de 3,5M de personnes',
    preview: '"Les Marketwins ont su instaurer un climat de confiance grâce à leur écoute. Ils m\'ont établi rapidement une stratégie de vente claire, structurée et parfaitement adaptée à mes besoins"',
  },
  {
    driveId: '1BtIMB6m5jHLt4IBSnwUalNDYadhcical',
    image: '/img/raphael.jpg',
    name: 'Raphaël Buissière',
    company: 'Expert en financement immobilier',
    preview: '"Kingdom Ads a supprimé les frontières et m\'a permis de gagner en efficacité pour me concentrer sur l\'essentiel de mon activité."',
  },
  {
    driveId: '1pQcQ6uTskgeyVYvfNENkZ-uPHSNV9A2E',
    image: '/img/rt.jpg',
    name: 'Rodolphe Toupain',
    company: 'Président RT Connecting / Expert en appels d\'offres',
    preview: '"J\'ai multiplié mon chiffre d\'affaires par 20 en 4 ans de collaboration avec Kingdom Ads. C\'est structuré, on a des objectifs. Merci à Alexandre et William, je recommande Kingdom Ads !"',
  },
]

const CARD_TESTIMONIALS = [
  { name: 'Rodolphe Toupain', role: 'Directeur • RT-Connecting', text: "J'ai fait x20 en 4 ans avec eux", date: 'Il y a 2 semaines' },
  { name: 'Mike', role: 'Fondateur • Bazehouse', text: "Merci à toute l'équipe pour votre excellent travail ! On a atteint plusieurs millions de vues", date: 'Il y a 1 mois' },
  { name: 'Claire', role: 'Hypnothérapeute', text: "J'ai tous mes mois qui sont complets avec plus de 80 rdvs par mois", date: 'Il y a 3 semaines' },
]

function openVideo(driveId) {
  window.dispatchEvent(new CustomEvent('open-video', { detail: { driveId } }))
}

export default function Testimonials() {
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth >= 900 : true
  )

  useEffect(() => {
    if (typeof window === 'undefined') return
    const update = () => {
      setIsDesktop(window.innerWidth >= 900)
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  return (
    <section className="section reveal" id="testimonials">
      <div className="section-header">
        <TextAnimate animation="fadeIn" by="word" as="h2">
          Ce que disent les entreprises que nous accompagnons
        </TextAnimate>
      </div>
      <div className="testimonials-videos-grid">
        {isDesktop ? (
          <ScrollStack
            useWindowScroll
            itemDistance={60}
            itemScale={0.015}
            itemStackDistance={20}
            baseScale={0.9}
          >
            {VIDEO_TESTIMONIALS.map((t, i) => (
              <ScrollStackItem key={t.driveId}>
                <div className={`testimonial-video-card reveal reveal-delay-${i + 1}`}>
                  <div
                    className="video-preview"
                    role="button"
                    tabIndex={0}
                    style={{ backgroundImage: `url(${t.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                    onClick={() => openVideo(t.driveId)}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') openVideo(t.driveId) }}
                  >
                    <div className="video-overlay" />
                    <div className="play-btn" />
                  </div>
                  <div className="testimonial-video-info">
                    <div className="client-name">{t.name}</div>
                    <div className="client-company">{t.company}</div>
                    <div className="testimonial-preview">{t.preview}</div>
                  </div>
                </div>
              </ScrollStackItem>
            ))}
          </ScrollStack>
        ) : (
          VIDEO_TESTIMONIALS.map((t, i) => (
            <div key={t.driveId} className={`testimonial-video-card reveal reveal-delay-${i + 1}`}>
              <div
                className="video-preview"
                role="button"
                tabIndex={0}
                style={{ backgroundImage: `url(${t.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                onClick={() => openVideo(t.driveId)}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') openVideo(t.driveId) }}
              >
                <div className="video-overlay" />
                <div className="play-btn" />
              </div>
              <div className="testimonial-video-info">
                <div className="client-name">{t.name}</div>
                <div className="client-company">{t.company}</div>
                <div className="testimonial-preview">{t.preview}</div>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="team-grid">
        {CARD_TESTIMONIALS.map((t, i) => (
          <div key={t.name} className={`team-member reveal reveal-delay-${i + 1}`}>
            <div className="testimonial-header">
              <div className="testimonial-name">{t.name}</div>
              <div className="testimonial-role">{t.role}</div>
            </div>
            <div className="testimonial-stars">★★★★★</div>
            <p className="testimonial-text">{t.text}</p>
            <div className="testimonial-date">{t.date}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
