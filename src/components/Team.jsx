import ProfileCard from './ProfileCard'
import ShinyText from './ShinyText'

export default function Team() {
  return (
    <section className="section reveal" id="team">
      <div className="section-header">
        <h2>8 ans d'expertise en acquisition</h2>
        <p>
          Plus de 200 entreprises accompagnées pour structurer leur acquisition et transformer la publicité en
          croissance mesurable.
        </p>
      </div>
      <div className="team-grid">
        <ProfileCard
          className="reveal reveal-delay-1"
          name="Alexandre ADAMSHA"
          title="Founder & CEO"
          handle="alexandre"
          status="Online"
          contactText="Parler à Alexandre"
          avatarUrl="/img/alex.jpeg"
          miniAvatarUrl="/img/alex.jpeg"
          showUserInfo={false}
          enableTilt={true}
          enableMobileTilt={false}
          behindGlowColor="rgba(212, 175, 55, 0.67)"
          iconUrl="/img/Or_blanc-petit.png"
          innerGradient="linear-gradient(145deg,rgba(212,175,55,0.32) 0%,rgba(0,0,0,0.9) 100%)"
        />
        <ProfileCard
          className="reveal reveal-delay-2"
          name="William ADAMSHA"
          title="Founder & CEO"
          handle="william"
          status="Online"
          contactText="Parler à William"
          avatarUrl="/img/William-ADAMSHA-400x380.jpg"
          miniAvatarUrl="/img/William-ADAMSHA-400x380.jpg"
          showUserInfo={false}
          enableTilt={true}
          enableMobileTilt={false}
          behindGlowColor="rgba(212, 175, 55, 0.67)"
          iconUrl="/img/Or_blanc-petit.png"
          innerGradient="linear-gradient(145deg,rgba(212,175,55,0.32) 0%,rgba(0,0,0,0.9) 100%)"
        />
      </div>
      <div style={{ textAlign: 'center', marginTop: '3rem' }}>
        <p className="team-description">
          Nous ne sommes pas des techniciens de la pub, mais des partenaires de croissance.
          <br />
          Si le test est concluant pour vous, l'objectif est de construire une{' '}
          <ShinyText
            text="relation long terme"
            speed={3}
            delay={0}
            color="#b5b5b5"
            shineColor="#ffffff"
            spread={120}
            direction="left"
          />
          , pas un one-shot.
        </p>
      </div>
    </section>
  )
}
