import { useEffect, useRef, useState, Suspense } from 'react'

/**
 * Ne monte ses children que lorsque le sentinel approche du viewport.
 * Permet de ne pas charger / hydrater les chunks lazy below-the-fold tant
 * que l'utilisateur n'est pas susceptible de les voir.
 *
 * - Hauteur réservée via `minHeight` pour limiter le CLS quand le contenu apparaît.
 * - Inclut un Suspense (fallback={null}) pour gérer les composants React.lazy.
 */
export function LazyOnVisible({
  children,
  minHeight = 600,
  rootMargin = '400px 0px',
}) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (visible) return
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true)
      return
    }
    const node = ref.current
    if (!node) return
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true)
          io.disconnect()
        }
      },
      { rootMargin },
    )
    io.observe(node)
    return () => io.disconnect()
  }, [visible, rootMargin])

  if (visible) {
    return <Suspense fallback={null}>{children}</Suspense>
  }

  return (
    <div
      ref={ref}
      aria-hidden="true"
      style={{ minHeight, contain: 'layout paint' }}
    />
  )
}
