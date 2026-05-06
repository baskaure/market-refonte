const CALENDLY_CSS = 'https://assets.calendly.com/assets/external/widget.css'
const CALENDLY_JS = 'https://assets.calendly.com/assets/external/widget.js'

let calendlyPromise = null

function findCalendlyScript() {
  return document.querySelector(
    'script[data-calendly], script[src*="assets.calendly.com/assets/external/widget.js"]',
  )
}

function ensureStylesheet() {
  if (document.querySelector('link[data-calendly], link[href*="calendly.com/assets/external/widget.css"]')) return
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = CALENDLY_CSS
  link.dataset.calendly = 'true'
  document.head.appendChild(link)
}

function ensureScript() {
  if (findCalendlyScript()) return
  const script = document.createElement('script')
  script.src = CALENDLY_JS
  script.async = true
  script.type = 'text/javascript'
  script.dataset.calendly = 'true'
  document.body.appendChild(script)
}

function waitForCalendlyGlobal(resolve, reject) {
  let attempts = 0
  const maxAttempts = 400
  const id = setInterval(() => {
    attempts += 1
    if (window.Calendly) {
      clearInterval(id)
      resolve(window.Calendly)
    } else if (attempts >= maxAttempts) {
      clearInterval(id)
      reject(new Error('Calendly: délai dépassé, window.Calendly introuvable'))
    }
  }, 50)
}

export function loadCalendly() {
  if (typeof window === 'undefined') return Promise.resolve(null)
  if (window.Calendly) return Promise.resolve(window.Calendly)
  if (calendlyPromise) return calendlyPromise

  calendlyPromise = new Promise((resolve, reject) => {
    ensureStylesheet()
    ensureScript()

    waitForCalendlyGlobal(
      (api) => resolve(api),
      (err) => {
        calendlyPromise = null
        reject(err)
      },
    )
  })

  return calendlyPromise
}
