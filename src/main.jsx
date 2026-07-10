import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { initLeadTracking } from './utils/metaPixel'

// Écoute la confirmation de RDV Calendly pour déclencher l'événement Meta « Lead ».
initLeadTracking()

const path =
  typeof window !== 'undefined' && window.location && window.location.pathname
    ? window.location.pathname
    : '/'

const isKingdomAds = path.startsWith('/kingdomads')

// On ne monte React qu'une fois le chunk de page téléchargé : le HTML statique
// pré-rendu de index.html reste affiché (et stylé) pendant ce temps, au lieu
// d'être effacé par un fallback <Suspense> vide (flash blanc en arrivant
// depuis /blog/). Le code-splitting entre les deux pages est conservé.
const loadPage = isKingdomAds ? import('./KingdomAds.jsx') : import('./App.jsx')

loadPage.then(({ default: RootComponent }) => {
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <RootComponent />
    </React.StrictMode>,
  )
})
