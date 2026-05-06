import { loadCalendly } from './utils/loadCalendly'

const CALENDLY_PATH = 'https://calendly.com/agence-kingdomads/obtenir-des-prospects-premium'

/** URL avec paramètres requis pour l'embed (popup + inline). */
export function getCalendlyUrl() {
  const params = new URLSearchParams({ hide_gdpr_banner: '1' })
  if (typeof window !== 'undefined' && window.location?.host) {
    params.set('embed_domain', window.location.host)
  }
  return `${CALENDLY_PATH}?${params.toString()}`
}

export const openCalendly = () => {
  if (typeof window === 'undefined') return false
  const url = getCalendlyUrl()
  loadCalendly()
    .then((Calendly) => {
      Calendly?.initPopupWidget({ url })
    })
    .catch((e) => {
      console.error('Calendly failed to load', e)
    })
  return false
}
