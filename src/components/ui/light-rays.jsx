'use client'

import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { cn } from '../../lib/utils'

function createRays(count, cycle) {
  if (count <= 0) return []
  return Array.from({ length: count }, (_, index) => {
    const left = 50 + (Math.random() - 0.5) * 24
    const rotate = -28 + Math.random() * 56
    const width = 160 + Math.random() * 160
    const swing = 0.8 + Math.random() * 1.8
    const delay = Math.random() * cycle
    const duration = cycle * (0.75 + Math.random() * 0.5)
    const intensity = 0.6 + Math.random() * 0.5
    return {
      id: `${index}-${Math.round(left * 10)}`,
      left,
      rotate,
      width,
      swing,
      delay,
      duration,
      intensity,
    }
  })
}

function Ray({ left, rotate, width, swing, delay, duration, intensity, fromColor, blur, length }) {
  return (
    <motion.div
      aria-hidden
      className="light-ray"
      style={{
        position: 'absolute',
        bottom: '-12%',
        left: `${left}%`,
        height: length,
        width: `${width}px`,
        transformOrigin: 'bottom',
        transform: 'translateX(-50%)',
        borderRadius: '9999px',
        background: `linear-gradient(to top, ${fromColor}, transparent)`,
        opacity: 0,
        mixBlendMode: 'screen',
        filter: `blur(${blur}px)`,
        pointerEvents: 'none',
      }}
      initial={{ rotate }}
      animate={{
        opacity: [0, intensity, 0],
        rotate: [rotate - swing, rotate + swing, rotate - swing],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'easeInOut',
        delay,
        repeatDelay: duration * 0.1,
      }}
    />
  )
}

export function LightRays({
  className,
  style = {},
  count = 7,
  color = 'rgba(255, 220, 150, 0.25)',
  blur = 36,
  speed = 14,
  length = '70vh',
  ref: refProp,
  ...props
}) {
  const [rays, setRays] = useState([])
  const cycleDuration = Math.max(speed, 0.1)
  const fromColor = color.replace(/(\d+\.?\d*)\s*\)\s*$/, (_, alpha) => `${Math.min(1, parseFloat(alpha) * 1.5)})`)

  useEffect(() => {
    setRays(createRays(count, cycleDuration))
  }, [count, cycleDuration])

  return (
    <div
      ref={refProp}
      className={cn('light-rays-wrapper', className)}
      style={{
        '--light-rays-color': color,
        '--light-rays-blur': `${blur}px`,
        '--light-rays-length': length,
        position: 'absolute',
        inset: 0,
        isolation: 'isolate',
        overflow: 'hidden',
        borderRadius: 'inherit',
        pointerEvents: 'none',
        ...style,
      }}
      {...props}
    >
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.6,
            background: `radial-gradient(circle at 50% 90%, color-mix(in srgb, ${color} 45%, transparent), transparent 70%)`,
          }}
        />
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.6,
            background: `radial-gradient(circle at 50% 92%, color-mix(in srgb, ${color} 35%, transparent), transparent 75%)`,
          }}
        />
        {rays.map((ray) => (
          <Ray
            key={ray.id}
            {...ray}
            fromColor={fromColor}
            blur={blur}
            length={length}
          />
        ))}
      </div>
    </div>
  )
}
