import PixelCard from './PixelCard'
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
        <PixelCard variant="pink" className="what-you-get-spotlight">
          <div className="what-points">
            <h3 className="what-you-get-title">Résultat & Efficacité</h3>
            <ul className="what-steps">
              <Step title="Des prospects qualifiés correspondant à vos critères." />
              <Step title="Des demandes entrantes exploitables, avec formulaires complets et intention claire." />
              <Step title="Des rendez-vous validés, directement dans votre agenda." />
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
        </PixelCard>
      </div>
    </section>
  )
}

function Step({ title }) {
  return (
    <li className="what-step">
      <span className="what-step-icon">
        <CheckIcon />
      </span>
      <span>{title}</span>
    </li>
  )
}

function CheckIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M12 2a10 10 0 1 0 10 10a10 10 0 0 0 -10 -10zm4.293 7.293a1 1 0 0 1 .083 1.32l-.083 .094l-4 4a1 1 0 0 1 -1.32 .083l-.094 -.083l-2 -2a1 1 0 0 1 1.32 -1.497l.094 .083l1.293 1.292l3.293 -3.292a1 1 0 0 1 1.414 0z" />
    </svg>
  )
}

