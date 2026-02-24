import { useEffect, useRef, useState } from 'react'

export default function Timeline({ data = [], animated = false }) {
  const containerRef = useRef(null)
  const railRef = useRef(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!animated) return

    const handleScroll = () => {
      if (!railRef.current) return
      const rect = railRef.current.getBoundingClientRect()
      const viewportH = window.innerHeight || document.documentElement.clientHeight

      // 0 quand la timeline arrive tout juste dans le viewport (en bas),
      // 1 avant que la partie basse sorte vraiment de l'écran
      const start = viewportH                 // haut du rail touche le bas de l'écran
      const end = -rect.height / 2           // on sature plus tôt (quand le haut est un peu au‑dessus)
      const t = (rect.top - start) / (end - start)
      let clamped = Math.max(0, Math.min(1, t))

      // On relève légèrement la progression pour que la barre soit un peu plus haute
      clamped = Math.min(1, clamped - 0.1)

      setProgress(clamped)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [animated, data.length])

  const barStyle = animated ? { height: `${progress * 100}%` } : undefined

  return (
    <div className="timeline" ref={containerRef}>
      <div className="timeline-inner">
        {data.map((item, index) => (
          <div className="timeline-item" key={index}>
            <div className="timeline-dot" />
            <div className="timeline-item-content">
              {item.title && <h4 className="timeline-title">{item.title}</h4>}
              <div className="timeline-body">{item.content}</div>
            </div>
          </div>
        ))}

        <div className="timeline-progress-rail" ref={railRef}>
          <div className="timeline-progress-bar" style={barStyle} />
        </div>
      </div>
    </div>
  )
}

