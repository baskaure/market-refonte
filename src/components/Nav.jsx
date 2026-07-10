import { useState, useLayoutEffect, useEffect } from 'react'
import { openCalendly } from '../constants'

const SCROLL_THRESHOLD_PX = 40

export default function Nav() {
  const [scrolled, setScrolled] = useState(() =>
    typeof window !== 'undefined' && window.scrollY > SCROLL_THRESHOLD_PX,
  )

  const isKingdomAds =
    typeof window !== 'undefined' &&
    window.location &&
    window.location.pathname.startsWith('/kingdomads')

  useLayoutEffect(() => {
    setScrolled(window.scrollY > SCROLL_THRESHOLD_PX)
  }, [])

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > SCROLL_THRESHOLD_PX)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={scrolled ? 'nav-scrolled' : ''} aria-label="Navigation principale">
      <div className="nav-container">
        <div className="logo">
          <picture>
            <source
              type="image/webp"
              srcSet="/img/Or_blanc-nav.webp 1x, /img/Or_blanc-nav-2x.webp 2x"
            />
            <img
              src="/img/Or_blanc-nav.webp"
              alt="Marketwins"
              width="35"
              height="40"
              decoding="async"
              fetchpriority="high"
            />
          </picture>
        </div>
        {!isKingdomAds && (
          <ul className="nav-links">
            <li><a href="#how-it-works">Fonctionnement</a></li>
            <li><a href="#process">Processus</a></li>
            <li><a href="#testimonials">Témoignages</a></li>
            <li><a href="#team">Équipe</a></li>
            <li><a href="/blog/">Blog</a></li>
            <li>
              <button
                type="button"
                className="nav-links-calendly"
                onClick={openCalendly}
              >
                Appel
              </button>
            </li>
          </ul>
        )}
        <button type="button" onClick={openCalendly} className="cta-nav">Démarrer</button>
      </div>
    </nav>
  )
}
