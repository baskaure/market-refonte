import { useEffect } from 'react'
import { CALENDLY_URL } from '../constants'
import { TextAnimate } from './ui/text-animate'

export default function CTA() {
  useEffect(() => {
    if (typeof window === 'undefined') return

    let attempts = 0
    const maxAttempts = 20

    const interval = setInterval(() => {
      const calendly = window.Calendly
      const parent = document.querySelector('.calendly-inline-widget')

      if (calendly && parent) {
        calendly.initInlineWidget({
          url: CALENDLY_URL,
          parentElement: parent,
        })
        clearInterval(interval)
      } else if (attempts >= maxAttempts) {
        clearInterval(interval)
      }

      attempts += 1
    }, 500)

    return () => clearInterval(interval)
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
          className="calendly-inline-widget"
          style={{ minWidth: '320px', height: '700px' }}
        />
      </div>
    </section>
  )
}
