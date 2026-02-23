import { useState, useEffect } from 'react'

export default function VideoModal() {
  const [open, setOpen] = useState(false)
  const [src, setSrc] = useState('')

  useEffect(() => {
    const handleOpen = (e) => {
      const { driveId } = e.detail || {}
      if (driveId) {
        setSrc(`https://drive.google.com/file/d/${driveId}/preview`)
        setOpen(true)
        document.body.style.overflow = 'hidden'
      }
    }
    const handleClose = () => {
      setOpen(false)
      setSrc('')
      document.body.style.overflow = ''
    }
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') handleClose()
    }
    window.addEventListener('open-video', handleOpen)
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('open-video', handleOpen)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      setOpen(false)
      setSrc('')
      document.body.style.overflow = ''
    }
  }

  const close = () => {
    setOpen(false)
    setSrc('')
    document.body.style.overflow = ''
  }

  return (
    <div
      id="video-modal"
      className={`video-modal ${open ? 'video-modal-open' : ''}`}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-label="Vidéo témoignage"
    >
      <div className="video-modal-content">
        <button type="button" className="video-modal-close" onClick={close} aria-label="Fermer">&times;</button>
        <iframe
          id="video-modal-iframe"
          src={src}
          title="Vidéo témoignage"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  )
}
