import React, { useRef, useEffect, useState } from 'react'

const ANIMATION = {
  blurInUp: 'ta-blur-up',
  fadeIn: 'ta-fade-in',
}

export function TextAnimate({
  children,
  animation = 'blurInUp',
  by = 'word',
  as = 'span',
  once = true,
  className = '',
}) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          if (once) observer.disconnect()
        } else if (!once) {
          setVisible(false)
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [once])

  const text = typeof children === 'string' ? children : React.Children.toArray(children).join('')

  let parts
  if (by === 'character') parts = Array.from(text)
  else if (by === 'line') parts = text.split(/\n+/)
  else parts = text.split(' ')

  const Component = as
  const animClass = ANIMATION[animation] || ANIMATION.blurInUp

  return (
    <Component className={className} ref={ref}>
      {parts.map((part, i) => (
        <span
          key={`${part}-${i}`}
          className={`ta-part ${animClass}${visible ? ' ta-visible' : ''}`}
          style={{
            display: 'inline-block',
            whiteSpace: by === 'line' ? 'block' : 'pre',
            animationDelay: `${i * 0.04}s`,
          }}
        >
          {by === 'word' && i < parts.length - 1 ? `${part} ` : part}
        </span>
      ))}
    </Component>
  )
}
