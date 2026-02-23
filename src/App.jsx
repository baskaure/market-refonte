import { useEffect } from 'react'
import Nav from './components/Nav'
import Hero from './components/Hero'
import HowItWorks from './components/HowItWorks'
import WhatYouGet from './components/WhatYouGet'
import Process from './components/Process'
import WhoIsItFor from './components/WhoIsItFor'
import Testimonials from './components/Testimonials'
import CTA from './components/CTA'
import Team from './components/Team'
import Footer from './components/Footer'
import VideoModal from './components/VideoModal'
import { useReveal } from './hooks/useReveal'
import { useSmoothScroll } from './hooks/useSmoothScroll'

function App() {
  useReveal()
  useSmoothScroll()

  return (
    <>
      <div className="noise" />
      <div className="particles" />
      <Nav />
      <Hero />
      <HowItWorks />
      <WhatYouGet />
      <Process />
      <WhoIsItFor />
      <Testimonials />
      <CTA />
      <Team />
      <Footer />
      <VideoModal />
    </>
  )
}

export default App
