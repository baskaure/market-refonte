import React from 'react'
import { motion } from 'motion/react'

const animations = {
  blurInUp: {
    hidden: { opacity: 0, y: 8, filter: 'blur(6px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
  },
  fadeIn: {
    hidden: { opacity: 0, y: 8 },
    visible: { opacity: 1, y: 0 },
  },
}

export function TextAnimate({
  children,
  animation = 'blurInUp',
  by = 'word',
  as = 'span',
  once = true,
  className = '',
}) {
  const text = typeof children === 'string' ? children : React.Children.toArray(children).join('')

  let parts
  if (by === 'character') {
    parts = Array.from(text)
  } else if (by === 'line') {
    parts = text.split(/\n+/)
  } else {
    parts = text.split(' ')
  }

  const Component = as
  const variant = animations[animation] || animations.blurInUp

  return (
    <Component className={className}>
      <motion.span
        style={{ display: 'inline-block' }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once }}
        transition={{ staggerChildren: 0.04 }}
      >
        {parts.map((part, i) => (
          <motion.span
            key={`${part}-${i}`}
            style={{ display: 'inline-block', whiteSpace: by === 'line' ? 'block' : 'pre' }}
            variants={variant}
          >
            {by === 'word' && i < parts.length - 1 ? `${part} ` : part}
          </motion.span>
        ))}
      </motion.span>
    </Component>
  )
}

