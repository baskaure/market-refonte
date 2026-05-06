export function CanvasText({
  text,
  colors = ['rgba(0,153,255,1)', 'rgba(0,153,255,0.4)', 'rgba(0,153,255,0.1)'],
  lineGap = 4,
  backgroundClassName = '',
  animationDuration = 20,
}) {
  const gradient = `linear-gradient(90deg, ${colors.join(', ')})`

  return (
    <span
      className={`canvas-text-animated ${backgroundClassName}`}
      style={{
        '--canvas-text-duration': `${animationDuration}s`,
        backgroundImage: gradient,
        backgroundSize: '200% 100%',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        letterSpacing: 0.4,
        lineHeight: 1 + lineGap / 10,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {text}
    </span>
  )
}
