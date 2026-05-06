import { lazy } from 'react'
import Nav from './components/Nav'
import Hero from './components/Hero'
import { LazyOnVisible } from './components/ui/lazy-on-visible'
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
      <LazyOnVisible minHeight={600}>
        <HowItWorks />
      </LazyOnVisible>
      <LazyOnVisible minHeight={600}>
        <WhatYouGet />
      </LazyOnVisible>
      <LazyOnVisible minHeight={800}>
        <Process />
      </LazyOnVisible>
      <LazyOnVisible minHeight={600}>
        <WhoIsItFor />
      </LazyOnVisible>
      <LazyOnVisible minHeight={1200}>
        <Testimonials />
      </LazyOnVisible>
      <LazyOnVisible minHeight={900}>
        <CTA />
      </LazyOnVisible>
      <LazyOnVisible minHeight={700}>
        <Team />
      </LazyOnVisible>
      <LazyOnVisible minHeight={300}>
        <Footer />
      </LazyOnVisible>
      <LazyOnVisible minHeight={0}>
        <VideoModal />
      </LazyOnVisible>
    </>
  )
}

export default App
