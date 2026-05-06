import { lazy, Suspense } from 'react'
import Nav from './components/Nav'
import HeroFormation from './components/HeroFormation'
import { useReveal } from './hooks/useReveal'
import { useSmoothScroll } from './hooks/useSmoothScroll'

const FormationSection = lazy(() => import('./components/FormationSection'))
const KingdomStats = lazy(() => import('./components/KingdomStats'))
const KingdomReviews = lazy(() => import('./components/KingdomReviews'))
const CTA = lazy(() => import('./components/CTA'))
const CertificationSection = lazy(() => import('./components/CertificationSection'))
const Footer = lazy(() => import('./components/Footer'))

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
        <Suspense fallback={null}>
          <FormationSection />
          <KingdomStats />
          <KingdomReviews />
          <CTA />
          <CertificationSection />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </>
  )
}
