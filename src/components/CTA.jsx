import { CALENDLY_URL } from '../constants'
import { TextAnimate } from './ui/text-animate'

export default function CTA() {
  return (
    <section className="section reveal" id="cta">
      <div className="section-header">
        <TextAnimate animation="blurInUp" by="word" as="h2">
          Testez votre marché avec des opportunités réelles
        </TextAnimate>
        <p>Vous ne payez pas pour de la visibilité. Vous investissez dans des opportunités exploitables, livrées en temps réel à votre équipe.</p>
      </div>
      <div className="calendly-wrapper">
        <div
          className="calendly-inline-widget"
          data-url={CALENDLY_URL}
          style={{ minWidth: '320px', height: '700px' }}
        />
      </div>
    </section>
  )
}
