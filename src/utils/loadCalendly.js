const CALENDLY_CSS = 'https://assets.calendly.com/assets/external/widget.css'
const CALENDLY_JS = 'https://assets.calendly.com/assets/external/widget.js'

let calendlyPromise = null

function findCalendlyScript() {
  return document.querySelector(
    'script[data-calendly], script[src*="assets.calendly.com/assets/external/widget.js"]',
  )
}

/**
 * Injecte la feuille de style Calendly et résout quand elle est *chargée*.
 * Indispensable : Calendly dimensionne l'iframe inline et positionne le popup
 * via ce CSS. Si on initialise le widget avant que le CSS soit appliqué,
 * l'iframe se rend avec des dimensions nulles → rien ne s'affiche.
 */
function ensureStylesheet() {
  const existing = document.querySelector(
    'link[data-calendly], link[href*="calendly.com/assets/external/widget.css"]',
  )
  if (existing) {
    // Déjà présent : on attend son chargement si ce n'est pas encore fait.
    if (existing.sheet) return Promise.resolve()
    return new Promise((resolve) => {
      existing.addEventListener('load', () => resolve(), { once: true })
      existing.addEventListener('error', () => resolve(), { once: true })
    })
  }

  return new Promise((resolve) => {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = CALENDLY_CSS
    link.dataset.calendly = 'true'
    link.addEventListener('load', () => resolve(), { once: true })
    link.addEventListener('error', () => resolve(), { once: true })
    document.head.appendChild(link)
  })
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
  if (calendlyPromise) return calendlyPromise

  calendlyPromise = new Promise((resolve, reject) => {
    // On charge le CSS et le JS en parallèle, mais on ne résout
    // qu'une fois les DEUX prêts (CSS appliqué + global Calendly disponible).
    const stylesheetReady = ensureStylesheet()
    ensureScript()

    const globalReady = window.Calendly
      ? Promise.resolve(window.Calendly)
      : new Promise((res, rej) => waitForCalendlyGlobal(res, rej))

    Promise.all([globalReady, stylesheetReady])
      .then(([api]) => resolve(api))
      .catch((err) => {
        calendlyPromise = null
        reject(err)
      })
  })

  return calendlyPromise
}
