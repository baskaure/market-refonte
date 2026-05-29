import { openCalendly } from '../constants'

export default function Hero() {
  return (
    <section className="hero reveal reveal-delay-1">
      <div className="hero-bg-root" aria-hidden="true">
        <div className="hero-shapes-glow" />
        <div className="hero-shapes">
          <div className="hero-shape hero-shape-1"><div className="hero-shape-inner" /></div>
          <div className="hero-shape hero-shape-2"><div className="hero-shape-inner" /></div>
          <div className="hero-shape hero-shape-3"><div className="hero-shape-inner" /></div>
          <div className="hero-shape hero-shape-4"><div className="hero-shape-inner" /></div>
          <div className="hero-shape hero-shape-5"><div className="hero-shape-inner" /></div>
        </div>
        <div className="hero-shapes-vignette" />
      </div>

      <div className="hero-content">
        <h1>
          <span className="hero-title-desktop">
            On ne vend pas des leads.<br />
            On vend des <span className="highlight">opportunités commerciales qualifiées</span>
          </span>
          <span className="hero-title-mobile">
            On ne vend pas des leads.<br />
            On vend des <span className="highlight">opportunités</span><br />
            <span className="highlight">commerciales qualifiées</span>
          </span>
        </h1>

        <p>Arrêtez de payer pour de la visibilité. Investissez dans des opportunités commerciales réelles, à un coût connu à l'avance.</p>

        <div className="hero-buttons">
          <button type="button" onClick={openCalendly} className="btn-primary">
            Démarrer le test
          </button>
          <a href="#process" className="btn-secondary">Voir le déroulé</a>
        </div>
      </div>
    </section>
  )
}
