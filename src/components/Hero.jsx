import { lazy, Suspense } from 'react'
import { openCalendly } from '../constants'

const DarkVeil = lazy(() => import('./DarkVeil'))

export default function Hero() {
  return (
    <section className="hero reveal reveal-delay-1">
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
      <div className="hero-darkveil">
        <Suspense fallback={null}>
          <DarkVeil
            hueShift={82}
            noiseIntensity={0}
            scanlineIntensity={0}
            speed={0.5}
            scanlineFrequency={0}
            warpAmount={0}
          />
        </Suspense>
      </div>
    </section>
  )
}
