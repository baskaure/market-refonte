import { useEffect, useRef } from 'react'
import { getCalendlyUrl } from '../constants'
import { loadCalendly } from '../utils/loadCalendly'
import { TextAnimate } from './ui/text-animate'

export default function CTA() {
  const widgetRef = useRef(null)

  useEffect(() => {
    let cancelled = false

    const mountInline = () => {
      loadCalendly()
        .then((Calendly) => {
          if (cancelled || !Calendly || !widgetRef.current) return
          if (widgetRef.current.querySelector('iframe')) return
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              if (cancelled || !widgetRef.current) return
              if (widgetRef.current.querySelector('iframe')) return
              Calendly.initInlineWidget({
                url: getCalendlyUrl(),
                parentElement: widgetRef.current,
              })
            })
          })
        })
        .catch((e) => {
          console.error('Calendly inline widget failed to load', e)
        })
    }

    const el = widgetRef.current
    // Pas d'IntersectionObserver (vieux navigateurs) : on charge directement.
    if (!el || typeof IntersectionObserver === 'undefined') {
      mountInline()
      return () => {
        cancelled = true
      }
    }

    // On ne charge Calendly que lorsque le CTA approche du viewport.
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          observer.disconnect()
          mountInline()
        }
      },
      { rootMargin: '600px' },
    )
    observer.observe(el)

    return () => {
      cancelled = true
      observer.disconnect()
    }
  }, [])

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
          className="calendly-inline-host"
          style={{ minWidth: '320px', height: '700px' }}
        />
      </div>
    </section>
  )
}
