import SpotlightCard from '../SpotlightCard'

export function CardSpotlight({ children, className = '' }) {
  return (
    <SpotlightCard className={className} spotlightColor="rgba(255, 255, 255, 0.25)">
      {children}
    </SpotlightCard>
  )
}

