import { lazy, Suspense } from 'react'
import Nav from './components/Nav'
import Hero from './components/Hero'
import { useReveal } from './hooks/useReveal'
import { useSmoothScroll } from './hooks/useSmoothScroll'

const HowItWorks = lazy(() => import('./components/HowItWorks'))
const WhatYouGet = lazy(() => import('./components/WhatYouGet'))
const Process = lazy(() => import('./components/Process'))
const WhoIsItFor = lazy(() => import('./components/WhoIsItFor'))
const Testimonials = lazy(() => import('./components/Testimonials'))
const CTA = lazy(() => import('./components/CTA'))
const Team = lazy(() => import('./components/Team'))
const Footer = lazy(() => import('./components/Footer'))
const VideoModal = lazy(() => import('./components/VideoModal'))

function App() {
  useReveal()
  useSmoothScroll()

  return (
    <>
      <Nav />
      <Hero />
      <Suspense fallback={null}>
        <HowItWorks />
        <WhatYouGet />
        <Process />
        <WhoIsItFor />
        <Testimonials />
        <CTA />
        <Team />
        <Footer />
        <VideoModal />
      </Suspense>
    </>
  )
}

export default App
