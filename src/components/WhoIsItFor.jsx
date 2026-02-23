import { openCalendly } from '../constants'

export default function WhoIsItFor() {
  return (
    <section className="section reveal" id="who-is-it-for">
      <div className="section-header">
        <h2>Nous travaillons uniquement avec des entreprises capables de vendre</h2>
      </div>
      <div className="who-grid">
        <div className="who-left">
          <div className="who-bubble" />
          <div className="who-bubble" />
          <div className="who-bubble" />
          <div className="who-bubble" />
          <div className="who-bubble" />
          <p>Notre modèle est adapté aux structures qui ont :</p>
          <ul>
            <li>Une <strong>offre claire</strong></li>
            <li>Un <strong>panier moyen cohérent</strong></li>
            <li>Une <strong>capacité de traitement commerciale</strong></li>
            <li>Une <strong>volonté réelle de croissance</strong></li>
          </ul>
        </div>
        <div className="who-right">
          <p><strong>Si vous cherchez simplement de la visibilité ou «&nbsp;du trafic&nbsp;», ce n'est pas pour vous.</strong></p>
          <p>Nous ne sommes pas une agence classique. Nous ne vendons pas des campagnes «&nbsp;pour faire joli&nbsp;», des impressions ou des clics, ni du marketing abstrait impossible à relier à vos ventes.</p>
          <p>Nous vendons <strong style={{ color: 'var(--white)' }}>des opportunités commerciales exploitables</strong>. Notre objectif n'est pas de «&nbsp;gérer votre marketing&nbsp;», mais de <strong style={{ color: 'var(--white)' }}>valider que votre offre convertit réellement sur le marché</strong>.</p>
          <button type="button" onClick={openCalendly} className="github-btn calendly-btn" style={{ marginTop: '1.5rem' }}>Démarrer maintenant<span className="arrow" /></button>
        </div>
      </div>
    </section>
  )
}
