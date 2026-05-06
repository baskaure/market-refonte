import { loadCalendly } from './utils/loadCalendly'

export const CALENDLY_URL = 'https://calendly.com/agence-kingdomads/obtenir-des-prospects-premium?hide_gdpr_banner=1'

export const openCalendly = async () => {
  if (typeof window === 'undefined') return false
  try {
    const Calendly = await loadCalendly()
    Calendly?.initPopupWidget({ url: CALENDLY_URL })
  } catch (e) {
    console.error('Calendly failed to load', e)
  }
  return false
}
