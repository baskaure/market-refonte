import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import KingdomAds from './KingdomAds.jsx'
import './index.css'

const path =
  typeof window !== 'undefined' && window.location && window.location.pathname
    ? window.location.pathname
    : '/'

const RootComponent = path.startsWith('/kingdomads') ? KingdomAds : App

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RootComponent />
  </React.StrictMode>,
)
