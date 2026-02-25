import { openCalendly } from '../constants'
import DarkVeil from './DarkVeil'
import { TextGenerateEffect } from './ui/text-generate-effect'

export default function Hero() {
  const heroSubtitle = `Arrêtez de payer pour de la visibilité. Investissez dans des opportunités commerciales réelles, à un coût connu à l'avance.`

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

        <TextGenerateEffect words={heroSubtitle} />

        <div className="hero-buttons">
          <button type="button" onClick={openCalendly} className="btn-primary">
            Démarrer le test
          </button>
          <a href="#process" className="btn-secondary">Voir le déroulé</a>
        </div>
      </div>
      <div className="hero-darkveil">
        <DarkVeil
          hueShift={82}
          noiseIntensity={0}
          scanlineIntensity={0}
          speed={0.5}
          scanlineFrequency={0}
          warpAmount={0}
        />
      </div>
    </section>
  )
}
