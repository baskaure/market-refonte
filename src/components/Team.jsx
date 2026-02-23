export default function Team() {
  return (
    <section className="section reveal" id="team">
      <div className="section-header">
        <h2>8 ans d'expertise en acquisition</h2>
        <p>Plus de 200 entreprises accompagnées pour structurer leur acquisition et transformer la publicité en croissance mesurable.</p>
      </div>
      <div className="team-grid">
        <div className="team-member reveal reveal-delay-1" style={{ backgroundImage: "url('/img/Alex-ADAMSHA-400x380.jpg')" }}>
          <div className="team-member-overlay" />
          <h3 className="member-name">Alexandre ADAMSHA</h3>
          <p className="member-role">Founder & CEO</p>
        </div>
        <div className="team-member reveal reveal-delay-2" style={{ backgroundImage: "url('/img/William-ADAMSHA-400x380.jpg')" }}>
          <div className="team-member-overlay" />
          <h3 className="member-name">William ADAMSHA</h3>
          <p className="member-role">Founder & CEO</p>
        </div>
      </div>
      <div style={{ textAlign: 'center', marginTop: '3rem' }}>
        <p className="team-description">
          Nous ne sommes pas des techniciens de la pub, mais des partenaires de croissance.<br />
          Si le test est concluant pour vous, l'objectif est de construire une <strong style={{ color: 'var(--gold)' }}>relation long terme</strong>, pas un one-shot.
        </p>
      </div>
    </section>
  )
}
