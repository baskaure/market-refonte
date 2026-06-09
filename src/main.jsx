import React, { Suspense } from 'react'
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

const RootComponent = isKingdomAds
  ? React.lazy(() => import('./KingdomAds.jsx'))
  : React.lazy(() => import('./App.jsx'))

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Suspense fallback={null}>
      <RootComponent />
    </Suspense>
  </React.StrictMode>,
)
