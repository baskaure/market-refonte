import { lazy } from 'react'
import Nav from './components/Nav'
import HeroFormation from './components/HeroFormation'
import { LazyOnVisible } from './components/ui/lazy-on-visible'
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
      <Nav />
      <main>
        <HeroFormation />
        <LazyOnVisible minHeight={700}>
          <FormationSection />
        </LazyOnVisible>
        <LazyOnVisible minHeight={500}>
          <KingdomStats />
        </LazyOnVisible>
        <LazyOnVisible minHeight={1000}>
          <KingdomReviews />
        </LazyOnVisible>
        <LazyOnVisible minHeight={900}>
          <CTA />
        </LazyOnVisible>
        <LazyOnVisible minHeight={500}>
          <CertificationSection />
        </LazyOnVisible>
      </main>
      <LazyOnVisible minHeight={300}>
        <Footer />
      </LazyOnVisible>
    </>
  )
}
