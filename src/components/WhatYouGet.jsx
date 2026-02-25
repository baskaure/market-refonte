import SpotlightCard from './SpotlightCard'
import { TextAnimate } from './ui/text-animate'
import { TextReveal } from './ui/text-reveal'

export default function WhatYouGet() {
  return (
    <section className="section reveal" id="what-you-get">
      <div className="section-header">
        <TextAnimate animation="blurInUp" by="word" as="h2">
          Concrètement, que recevez-vous ?
        </TextAnimate>
        <p>Selon votre modèle commercial, nous pouvons vous livrer :</p>
      </div>
      <div className="what-you-get-card-wrap">
        <div className="what-you-get-stars" aria-hidden="true">
          <svg
            width="200"
            height="200"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 3C12 3 13.5 8.5 19 8.5C13.5 8.5 12 14 12 14C12 14 10.5 8.5 5 8.5C10.5 8.5 12 3 12 3Z"
              fill="#D9D9D9"
              stroke="#D9D9D9"
              strokeWidth="2"
              strokeLinejoin="round"
            />

            <path
              d="M19 15C19 15 19.8 17.5 22.5 17.5C19.8 17.5 19 20 19 20C19 20 18.2 17.5 15.5 17.5C18.2 17.5 19 15 19 15Z"
              fill="#D9D9D9"
              stroke="#D9D9D9"
              strokeWidth="1.2"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <SpotlightCard className="what-you-get-spotlight" spotlightColor="rgba(255, 255, 255, 0.25)">
          <div className="what-points">
            <h3 className="what-you-get-title">Résultat & Efficacité</h3>
            <ul className="what-items">
              <li>
                <strong>Des prospects qualifiés</strong> Correspondant à vos critères.
              </li>
              <li>
                <strong>Des demandes entrantes exploitables</strong> Formulaires complets, avec intention.
              </li>
              <li>
                <strong>Des rendez-vous validés</strong> Directement dans votre agenda.
              </li>
            </ul>
            <TextReveal>
              Vous vous concentrez sur la vente. Nous nous concentrons sur la qualité et la régularité des opportunités.
            </TextReveal>
            <div className="what-cta">
              <a href="#cta" className="github-btn">
                Tester votre marché
                <span className="arrow" aria-hidden="true" />
              </a>
            </div>
          </div>
        </SpotlightCard>
      </div>
    </section>
  )
}
