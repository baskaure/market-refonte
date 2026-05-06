import { useEffect, useRef, useState } from 'react'
import { CALENDLY_URL } from '../constants'
import { loadCalendly } from '../utils/loadCalendly'
import { TextAnimate } from './ui/text-animate'

export default function CTA() {
  const widgetRef = useRef(null)
  const [shouldLoad, setShouldLoad] = useState(false)

  useEffect(() => {
    const node = widgetRef.current
    if (!node) return

    if (typeof IntersectionObserver === 'undefined') {
      setShouldLoad(true)
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShouldLoad(true)
          io.disconnect()
        }
      },
      { rootMargin: '300px' },
    )
    io.observe(node)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!shouldLoad) return
    let cancelled = false

    loadCalendly().then((Calendly) => {
      if (cancelled || !Calendly || !widgetRef.current) return
      Calendly.initInlineWidget({
        url: CALENDLY_URL,
        parentElement: widgetRef.current,
      })
    }).catch((e) => {
      console.error('Calendly inline widget failed to load', e)
    })

    return () => {
      cancelled = true
    }
  }, [shouldLoad])

  return (
    <section className="section" id="cta">
      <div className="section-header">
        <TextAnimate animation="blurInUp" by="word" as="h2">
          Testez votre marché avec des opportunités réelles
        </TextAnimate>
        <p>Vous ne payez pas pour de la visibilité. Vous investissez dans des opportunités exploitables, livrées en temps réel à votre équipe.</p>
      </div>
      <div className="calendly-wrapper">
        <div
          ref={widgetRef}
          className="calendly-inline-widget"
          style={{ minWidth: '320px', height: '700px' }}
        />
      </div>
    </section>
  )
}
