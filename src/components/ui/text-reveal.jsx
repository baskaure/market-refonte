import { motion } from 'motion/react'

export function TextReveal({ children, className = '' }) {
  return (
    <motion.p
      className={className}
      style={{ overflow: 'hidden' }}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {children}
    </motion.p>
  )
}

