import { motion } from 'motion/react'

export function GlassVideoCard({
  image,
  title,
  subtitle,
  preview,
  tags = [],
  duration,
  onPlay,
  index = 0,
  className = '',
}) {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onPlay?.()
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`glass-video-card ${className}`}
      role="button"
      tabIndex={0}
      onClick={onPlay}
      onKeyDown={handleKeyDown}
      aria-label={`Lire la vidéo témoignage de ${title}`}
    >
      <div className="glass-video-media">
        <img
          src={image}
          alt={title}
          className="glass-video-img"
          loading="lazy"
          decoding="async"
          width="800"
          height="450"
        />
        <div className="glass-video-gradient" />

        {tags.length > 0 && (
          <div className="glass-video-tags">
            {tags.map((tag, i) => (
              <span key={i} className="glass-video-badge">
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="glass-video-overlay">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="glass-video-play"
            aria-hidden="true"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
            <span>Voir la vidéo</span>
          </motion.div>
        </div>
      </div>

      <div className="glass-video-body">
        <div className="glass-video-text">
          <h3 className="glass-video-title">{title}</h3>
          {subtitle && <p className="glass-video-subtitle">{subtitle}</p>}
          {preview && <p className="glass-video-excerpt">{preview}</p>}
        </div>

        {duration && (
          <div className="glass-video-meta">
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <span>{duration}</span>
          </div>
        )}
      </div>
    </motion.div>
  )
}
