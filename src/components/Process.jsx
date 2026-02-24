import Timeline from './Timeline'
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
  const timelineData = STEPS.map((s) => ({
    title: s.title,
    content: s.content,
  }))

  return (
    <section className="section reveal" id="process">
      <div className="section-header">
        <h2>Un cadre simple pour tester votre marché</h2>
        <p>Nous ne vous demandons pas de nous croire sur parole. Nous testons d'abord, sur un cadre maîtrisé, avant d'envisager le scale.</p>
      </div>
      <div className="process-timeline-wrap">
        <Timeline data={timelineData} animated />
      </div>
    </section>
  )
}
