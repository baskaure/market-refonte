import Nav from './components/Nav'
import Footer from './components/Footer'
import HeroFormation from './components/HeroFormation'
import CTA from './components/CTA'
import KingdomStats from './components/KingdomStats'
import KingdomReviews from './components/KingdomReviews'
import FormationSection from './components/FormationSection'
import { useReveal } from './hooks/useReveal'
import { useSmoothScroll } from './hooks/useSmoothScroll'

export default function KingdomAds() {
  useReveal()
  useSmoothScroll()

  return (
    <>
      <div className="noise" />
      <div className="particles" />
      <Nav />
      <main>
        <HeroFormation />
        <KingdomStats />
        <KingdomReviews />
        <FormationSection />
        <CTA />
      </main>
      <Footer />
    </>
  )
}

