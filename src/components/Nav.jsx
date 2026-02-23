import { openCalendly } from '../constants'

export default function Nav() {
  return (
    <nav>
      <div className="nav-container">
        <div className="logo">
          <img src="/img/Or_blanc-petit.png" alt="Kingdom Ads" />
        </div>
        <ul className="nav-links">
          <li><a href="#how-it-works">Fonctionnement</a></li>
          <li><a href="#process">Processus</a></li>
          <li><a href="#testimonials">Témoignages</a></li>
          <li><a href="#team">Équipe</a></li>
          <li><a href="#cta">Appel</a></li>
        </ul>
        <button type="button" onClick={openCalendly} className="cta-nav">Démarrer</button>
      </div>
    </nav>
  )
}
