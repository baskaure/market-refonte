import { HOME_FAQ } from '../data/homeFaq'

export default function FAQ() {
  return (
    <section className="section reveal faq-section" id="faq">
      <div className="section-header">
        <h2>Questions fréquentes</h2>
        <p>Les réponses courtes aux questions que l'on nous pose avant un premier appel.</p>
      </div>
      <div className="faq-list">
        {HOME_FAQ.map(({ q, a }, i) => (
          <details key={q} open={i === 0}>
            <summary>{q}</summary>
            <p>{a}</p>
          </details>
        ))}
      </div>
    </section>
  )
}
