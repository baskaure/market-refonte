import { openCalendly } from '../constants'
import { TextAnimate } from './ui/text-animate'

export default function HowItWorks() {
  return (
    <section className="section reveal" id="how-it-works">
      <div className="section-header">
        <TextAnimate animation="blurInUp" by="word" as="h2">
          Comment sont générées les opportunités ?
        </TextAnimate>
      </div>
      <div className="how-grid">
        <div className="how-text">
          <p>Nous utilisons la publicité ciblée (Meta, Google, LinkedIn…) pour identifier des entreprises ou des particuliers réellement intéressés par votre offre.</p>
          <p>Contrairement aux agences qui vendent des listes achetées ou de la «&nbsp;notoriété&nbsp;» floue, nous travaillons en flux tendu.</p>
          <button type="button" onClick={openCalendly} className="github-btn calendly-btn">Tester votre marché<span className="arrow" /></button>
        </div>
        <div className="how-points">
          <div className="how-bubble" />
          <div className="how-bubble" />
          <div className="how-bubble" />
          <div className="how-bubble" />
          <div className="how-bubble" />
          <div className="how-card reveal reveal-delay-1">
            <h3>Zéro scrapping, zéro base morte</h3>
            <p>100&nbsp;% des prospects proviennent de nos campagnes publicitaires actives.</p>
          </div>
          <div className="how-card reveal reveal-delay-2">
            <h3>Intention réelle</h3>
            <p>Chaque prospect remplit un formulaire qualifiant pour demander à être contacté.</p>
          </div>
          <div className="how-card reveal reveal-delay-3">
            <h3>Transmission en temps réel</h3>
            <p>Vous recevez l'opportunité à la minute où elle est générée, prête à être traitée par votre équipe.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
