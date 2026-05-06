const CALENDLY_CSS = 'https://assets.calendly.com/assets/external/widget.css'
const CALENDLY_JS = 'https://assets.calendly.com/assets/external/widget.js'

let calendlyPromise = null

export function loadCalendly() {
  if (typeof window === 'undefined') return Promise.resolve(null)
  if (window.Calendly) return Promise.resolve(window.Calendly)
  if (calendlyPromise) return calendlyPromise

  calendlyPromise = new Promise((resolve, reject) => {
    if (!document.querySelector('link[data-calendly]')) {
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = CALENDLY_CSS
      link.dataset.calendly = 'true'
      document.head.appendChild(link)
    }

    const existing = document.querySelector('script[data-calendly]')
    if (existing) {
      existing.addEventListener('load', () => resolve(window.Calendly), { once: true })
      existing.addEventListener('error', (e) => {
        calendlyPromise = null
        reject(e)
      }, { once: true })
      return
    }

    const script = document.createElement('script')
    script.src = CALENDLY_JS
    script.async = true
    script.defer = true
    script.dataset.calendly = 'true'
    script.onload = () => resolve(window.Calendly)
    script.onerror = (e) => {
      calendlyPromise = null
      reject(e)
    }
    document.body.appendChild(script)
  })

  return calendlyPromise
}
