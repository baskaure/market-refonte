import { openCalendly } from '../constants'

export default function Footer() {
  return (
    <footer>
      <div className="footer-content reveal">
        <div className="footer-section footer-contact">
          <h4>Kingdom Ads</h4>
          <p>Experts en génération d'opportunités commerciales qualifiées depuis 8 ans.</p>
          <button type="button" onClick={openCalendly} className="github-btn calendly-btn" style={{ marginTop: '1rem' }}>Prendre rendez-vous<span className="arrow" /></button>
        </div>
        <div className="footer-section">
          <h4>Navigation</h4>
          <a href="#how-it-works">Fonctionnement</a>
          <a href="#process">Processus</a>
          <a href="#testimonials">Témoignages</a>
          <a href="#team">Équipe</a>
        </div>
        <div className="footer-section">
          <h4>Contact</h4>
          <a href="mailto:contact@kingdomads.fr">contact@kingdomads.fr</a>
          <div className="social-links">
            <a href="#">Instagram</a>
            <a href="#">LinkedIn</a>
            <a href="#">YouTube</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2026 Kingdom Ads - Marketwins. Tous droits réservés.</p>
      </div>
    </footer>
  )
}
