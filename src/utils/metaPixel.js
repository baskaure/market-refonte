/**
 * Déclenchement de l'événement Meta Pixel "Lead" après inscription.
 *
 * Le pixel de base (init + PageView) est chargé dans index.html, dès
 * l'atterrissage, pour le suivi des pubs. Ici on déclenche "Lead" une seule
 * fois, quand le prospect a confirmé son rendez-vous Calendly.
 *
 * Calendly émet un postMessage `calendly.event_scheduled` une fois la prise
 * de RDV finalisée — c'est notre signal d'inscription réussie.
 */

function isCalendlyEvent(e) {
  return (
    e.origin &&
    e.origin.indexOf('calendly.com') > -1 &&
    e.data &&
    typeof e.data.event === 'string' &&
    e.data.event.indexOf('calendly.') === 0
  )
}

let initialized = false
let leadTracked = false

export function initLeadTracking() {
  if (typeof window === 'undefined' || initialized) return
  initialized = true

  window.addEventListener('message', (e) => {
    if (!isCalendlyEvent(e)) return
    if (e.data.event === 'calendly.event_scheduled') {
      trackLead()
    }
  })
}

/** Déclenche l'événement Lead (idempotent sur la durée de vie de la page). */
export function trackLead() {
  if (typeof window === 'undefined' || leadTracked) return
  if (typeof window.fbq !== 'function') return
  window.fbq('track', 'Lead')
  leadTracked = true
}
