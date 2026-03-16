export function Marquee({
  children,
  reverse = false,
  pauseOnHover = false,
  duration = 20,
  className = '',
}) {
  const style = {
    '--marquee-duration': `${duration}s`,
  }

  const directionClass = reverse ? 'marquee-reverse' : 'marquee-normal'
  const hoverClass = pauseOnHover ? 'marquee-pause-on-hover' : ''

  return (
    <div className={`marquee ${directionClass} ${hoverClass} ${className}`} style={style}>
      <div className="marquee-track">
        <div className="marquee-inner">{children}</div>
        <div className="marquee-inner">{children}</div>
      </div>
    </div>
  )
}


