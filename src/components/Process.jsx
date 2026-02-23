import { useState, useEffect } from 'react'
import { openCalendly } from '../constants'

const STEPS = [
  {
    id: 1,
    title: 'Appel de cadrage',
    content: (
      <>
        <p>On clarifie ensemble : votre offre, votre cible idéale, vos critères de qualification, et votre capacité de traitement commerciale.</p>
        <p>À la fin, on a une définition précise de ce qu'est une <strong className="process-highlight">opportunité qualifiée</strong> pour vous.</p>
        <button type="button" onClick={openCalendly} className="github-btn calendly-btn" style={{ marginTop: '1.5rem' }}>Lancer votre test<span className="arrow" /></button>
      </>
    ),
  },
  {
    id: 2,
    title: 'Lancement du test',
    content: (
      <>
        <p>Nous lançons un test cadré avec un volume limité d'opportunités, un budget maîtrisé, et un suivi structuré des résultats.</p>
        <p>Vous recevez les opportunités au fur et à mesure pour les traiter, <strong className="process-highlight">en direct</strong>.</p>
        <button type="button" onClick={openCalendly} className="github-btn calendly-btn" style={{ marginTop: '1.5rem' }}>Lancer votre test<span className="arrow" /></button>
      </>
    ),
  },
  {
    id: 3,
    title: 'Bilan & décision',
    content: (
      <>
        <p>Nous analysons ensemble : le taux de contact, le taux de rendez-vous, le taux de transformation, et la rentabilité globale.</p>
        <p>Si c'est rentable, on scale. Sinon, on ajuste… ou on s'arrête là. <strong className="process-highlight">Pas d'engagement long terme</strong>.</p>
        <button type="button" onClick={openCalendly} className="github-btn calendly-btn" style={{ marginTop: '1.5rem' }}>Lancer votre test<span className="arrow" /></button>
      </>
    ),
  },
]

export default function Process() {
  const [step, setStep] = useState(1)

  useEffect(() => {
    const handleKeyDown = (e) => {
      const section = document.getElementById('process')
      if (!section) return
      const rect = section.getBoundingClientRect()
      const isInView = rect.top < window.innerHeight && rect.bottom > 0
      if (!isInView) return
      if (e.key === 'ArrowRight' && step < 3) setStep((s) => s + 1)
      else if (e.key === 'ArrowLeft' && step > 1) setStep((s) => s - 1)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [step])

  return (
    <section className="section reveal" id="process">
      <div className="section-header">
        <h2>Un cadre simple pour tester votre marché</h2>
        <p>Nous ne vous demandons pas de nous croire sur parole. Nous testons d'abord, sur un cadre maîtrisé, avant d'envisager le scale.</p>
      </div>
      <div className="process-container">
        <div className="process-sidebar">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              role="button"
              tabIndex={0}
              className={`process-indicator ${step === i ? 'active' : 'inactive'}`}
              data-step={i}
              onClick={() => setStep(i)}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setStep(i) }}
            >
              {i}
            </div>
          ))}
        </div>
        <div className="process-main-content">
          <div className="process-content-card">
            {STEPS.map((s) => (
              <div
                key={s.id}
                className={`process-step-content ${step === s.id ? 'active' : ''}`}
                data-content={s.id}
              >
                <h3>{s.title}</h3>
                {s.content}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
