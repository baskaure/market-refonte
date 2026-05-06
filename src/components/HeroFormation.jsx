import { openCalendly } from '../constants'

export default function HeroFormation() {
  return (
    <section className="hero reveal reveal-delay-1">
      <div className="hero-content">
        <p className="kingdom-stats-eyebrow">Kingdom Ads Formation</p>
        <h1>
          On vous forme à{' '}
          <span className="highlight">faire ce que l'on fait pour nos clients</span>
        </h1>

        <p className="kf-hero-subtitle hero-formation-subtitle">
          Programmes de formation, accompagnement opérationnel et partage de nos frameworks pour que vos équipes
          maîtrisent la génération d&apos;opportunités commerciales de A à Z.
        </p>

        <div className="hero-buttons">
          <button type="button" onClick={openCalendly} className="btn-primary">
            Discuter d&apos;un parcours de formation
          </button>
        </div>
      </div>
      <div className="hero-darkveil" aria-hidden="true" />
    </section>
  )
}
