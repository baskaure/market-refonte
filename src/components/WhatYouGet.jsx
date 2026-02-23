import SpotlightCard from './SpotlightCard'

export default function WhatYouGet() {
  return (
    <section className="section reveal" id="what-you-get">
      <div className="section-header">
        <h2>Concrètement, que recevez-vous ?</h2>
        <p>Selon votre modèle commercial, nous pouvons vous livrer :</p>
      </div>
      <div className="what-you-get-card-wrap">
        <div className="what-you-get-stars" aria-hidden="true">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M12 4C12 4 11.5 8.5 8 10C4.5 11.5 4.5 12.5 8 14C11.5 15.5 12 20 12 20C12 20 12.5 15.5 16 14C19.5 12.5 19.5 11.5 16 10C12.5 8.5 12 4 12 4Z" fill="#D9D9D9" />
            <path d="M19 14C19 14 18.7 16.3 17 17C15.3 17.7 15.3 18.3 17 19C18.7 19.7 19 22 19 22C19 22 19.3 19.7 21 19C22.7 18.3 22.7 17.7 21 17C19.3 16.3 19 14 19 14Z" fill="#D9D9D9" />
          </svg>
        </div>
        <SpotlightCard className="what-you-get-spotlight" spotlightColor="rgba(255, 255, 255, 0.25)">
          <div className="what-points">
          <h3 className="what-you-get-title">Résultat & Efficacité</h3>
          <ul>
            <li><strong>Des prospects qualifiés</strong> correspondant à vos critères.</li>
            <li><strong>Des demandes entrantes exploitables</strong> (formulaires complets, avec intention).</li>
            <li><strong>Des rendez-vous validés</strong> directement dans votre agenda.</li>
          </ul>
          <p>Vous vous concentrez sur la vente. Nous nous concentrons sur la qualité et la régularité des opportunités.</p>
        </div>
        </SpotlightCard>
      </div>
    </section>
  )
}
