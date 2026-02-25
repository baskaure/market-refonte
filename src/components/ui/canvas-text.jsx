import { motion, useMotionValue, useAnimationFrame, useTransform } from 'motion/react'

export function CanvasText({
  text,
  colors = ['rgba(0,153,255,1)', 'rgba(0,153,255,0.4)', 'rgba(0,153,255,0.1)'],
  lineGap = 4,
  backgroundClassName = '',
  animationDuration = 20,
}) {
  const progress = useMotionValue(0)

  useAnimationFrame((time) => {
    const cycle = (time / (animationDuration * 1000)) % 1
    progress.set(cycle * 100)
  })

  const backgroundPosition = useTransform(progress, (p) => `${-50 + p}% 0%`)

  const gradient = `linear-gradient(90deg, ${colors.join(', ')})`

  return (
    <motion.span
      className={`inline-flex items-center justify-center text-sm sm:text-base font-medium ${backgroundClassName}`}
      style={{
        backgroundImage: gradient,
        backgroundSize: '200% 100%',
        backgroundPosition,
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        letterSpacing: 0.4,
        lineHeight: 1 + lineGap / 10,
      }}
    >
      {text}
    </motion.span>
  )
}

