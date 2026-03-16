import CountUp from './CountUp'

export default function KingdomStats() {
  return (
    <section className="section kingdom-stats">
      <div className="kingdom-stats-inner">
        <div className="kingdom-stats-header">
          <p className="kingdom-stats-eyebrow">Chiffres clés</p>
          <h2>Les résultats obtenus pour nos clients</h2>
          <p className="kingdom-stats-subtitle">
            Un aperçu concret de ce que délivre notre système d&apos;acquisition au quotidien.
          </p>
        </div>

        <div className="kingdom-stats-grid">
          <div className="kingdom-stat-card">
            <div className="kingdom-stat-number">
              <CountUp
                from={0}
                to={2876}
                separator=","
                direction="up"
                duration={1.2}
                className="count-up-text"
              />
            </div>
            <p className="kingdom-stat-label">Participants formés depuis 2018</p>
          </div>

          <div className="kingdom-stat-card">
            <div className="kingdom-stat-number">
              <CountUp
                from={0}
                to={58726}
                separator=","
                direction="up"
                duration={1.4}
                className="count-up-text"
              />
            </div>
            <p className="kingdom-stat-label">Heures de formation délivrées</p>
          </div>

          <div className="kingdom-stat-card">
            <div className="kingdom-stat-number">
              <CountUp
                from={0}
                to={680}
                separator=","
                direction="up"
                duration={1.6}
                className="count-up-text"
              />
              <span className="kingdom-stat-suffix">+</span>
            </div>
            <p className="kingdom-stat-label">Entreprises accompagnées depuis 2018</p>
          </div>

          <div className="kingdom-stat-card">
            <div className="kingdom-stat-number">
              <CountUp
                from={0}
                to={9.23}
                separator=","
                direction="up"
                duration={1.8}
                className="count-up-text"
              />
              <span className="kingdom-stat-suffix">/10</span>
            </div>
            <p className="kingdom-stat-label">Note moyenne de satisfaction à chaud</p>
          </div>
        </div>

        <p className="kingdom-stats-footnote">
          Cumul des résultats issus des bilans d&apos;accompagnement et de satisfaction de 2019 à 2025.
        </p>
      </div>
    </section>
  )
}

