import React from 'react'
import { motion } from 'motion/react'

function getInitials(name = '') {
  return name
    .split(' ')
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

function Avatar({ image, name }) {
  if (image) {
    return (
      <img
        src={image}
        alt={name}
        width={40}
        height={40}
        className="testimonial-col-avatar"
        loading="lazy"
      />
    )
  }
  return (
    <div className="testimonial-col-avatar testimonial-col-avatar-fallback" aria-hidden="true">
      {getInitials(name)}
    </div>
  )
}

export function TestimonialsColumn({ className = '', testimonials = [], duration = 10 }) {
  return (
    <div className={`testimonials-col ${className}`}>
      <motion.div
        animate={{ translateY: '-50%' }}
        transition={{
          duration,
          repeat: Infinity,
          ease: 'linear',
          repeatType: 'loop',
        }}
        className="testimonials-col-track"
      >
        {[0, 1].map((dup) => (
          <React.Fragment key={dup}>
            {testimonials.map((t, i) => (
              <article
                className="testimonial-col-card"
                key={`${dup}-${i}`}
                aria-hidden={dup === 1 ? 'true' : undefined}
              >
                <p className="testimonial-col-text">{t.text}</p>
                <div className="testimonial-col-author">
                  <Avatar image={t.image} name={t.name} />
                  <div className="testimonial-col-meta">
                    <span className="testimonial-col-name">{t.name}</span>
                    <span className="testimonial-col-role">{t.role}</span>
                  </div>
                </div>
              </article>
            ))}
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  )
}
