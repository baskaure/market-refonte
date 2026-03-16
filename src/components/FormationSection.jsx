import { TextAnimate } from './ui/text-animate'

const formationData = [
  {
    year: 2025,
    trainees: 407,
    stats: [
      { label: 'Satisfaction globale', value: '3,55/4', stars: 4 },
      { label: 'Exercices et mises en situation', value: '2,88/4', stars: 3 },
      { label: "Clarté du discours de l’intervenant et rythme de l’animation", value: '3,83/4', stars: 4 },
    ],
  },
  {
    year: 2024,
    trainees: 535,
    stats: [
      { label: 'Satisfaction globale', value: '3,49/4', stars: 4 },
      { label: 'Exercices et mises en situation', value: '2,92/4', stars: 3 },
      { label: "Clarté du discours de l’intervenant et rythme de l’animation", value: '3,77/4', stars: 4 },
    ],
  },
  {
    year: 2023,
    trainees: 1138,
    stats: [
      { label: 'Satisfaction globale', value: '3,83/4', stars: 4 },
      { label: 'Exercices et mises en situation', value: '3,63/4', stars: 4 },
      { label: "Clarté du discours de l’intervention et rythme de l’animation", value: '3,93/4', stars: 4 },
    ],
  },
  {
    year: 2022,
    trainees: 264,
    stats: [
      { label: 'Satisfaction globale', value: '3,83/4', stars: 4 },
      { label: 'Exercices et mises en situation', value: '3,66/4', stars: 4 },
      { label: "Clarté du discours de l’intervenant et rythme de l’animation", value: '3,82/4', stars: 4 },
    ],
  },
  {
    year: 2021,
    trainees: 113,
    stats: [
      { label: 'Satisfaction globale', value: '3,83/4', stars: 4 },
      { label: 'Exercices et mises en situation', value: '3,81/4', stars: 4 },
      { label: "Clarté du discours de l’intervenant et rythme de l’animation", value: '3,93/4', stars: 4 },
    ],
  },
  {
    year: 2020,
    trainees: 76,
    stats: [
      { label: 'Satisfaction globale', value: '3,78/4', stars: 4 },
      { label: 'Exercices et mises en situation', value: '3,65/4', stars: 4 },
      { label: "Clarté du discours de l’intervenant et rythme de l’animation", value: '3,89/4', stars: 4 },
    ],
  },
  {
    year: 2019,
    trainees: 194,
    stats: [
      { label: 'Satisfaction globale', value: '3,85/4', stars: 4 },
      { label: 'Exercices et mises en situation', value: '3,70/4', stars: 4 },
      { label: "Clarté du discours de l’intervenant et rythme de l’animation", value: '3,93/4', stars: 4 },
    ],
  },
]

function Stars({ count }) {
  return (
    <div className="kf-stars">
      {Array.from({ length: count }).map((_, index) => (
        <span key={index}>★</span>
      ))}
    </div>
  )
}

export default function FormationSection() {
  return (
    <section className="kf-main" id="formation">

      <section className="section kf-results">
        <div className="kf-results-inner">
          <div className="section-header kf-results-header">
            <TextAnimate animation="blurInUp" by="word" as="h2">
              Des formations évaluées chaque année
            </TextAnimate>
            <p className="kf-results-subtitle">
              Pour chaque session, nous mesurons la satisfaction globale, la qualité des mises en situation et la clarté de l’intervention.
            </p>
          </div>

          <div className="kf-years-grid">
            {formationData.map((yearData) => (
              <article key={yearData.year} className="kf-year-card">
                <header className="kf-year-header">
                  <span className="kf-year-chip">{yearData.year}</span>
                  <span className="kf-year-meta">{yearData.trainees} stagiaires formés</span>
                </header>
                <div className="kf-year-stats">
                  {yearData.stats.map((stat) => (
                    <div key={stat.label} className="kf-stat-row">
                      <Stars count={stat.stars} />
                      <p className="kf-stat-text">
                        <span className="kf-stat-value">{stat.value}</span>
                        <span className="kf-stat-label"> : {stat.label}</span>
                      </p>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </section>
  )
}

