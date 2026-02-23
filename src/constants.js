export const CALENDLY_URL = 'https://calendly.com/agence-kingdomads/obtenir-des-prospects-premium?hide_gdpr_banner=1'

export const openCalendly = () => {
  if (typeof window !== 'undefined' && window.Calendly) {
    window.Calendly.initPopupWidget({ url: CALENDLY_URL })
  }
  return false
}
