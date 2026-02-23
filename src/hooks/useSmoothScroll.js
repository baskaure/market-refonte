import { useEffect } from 'react'

export function useSmoothScroll() {
  useEffect(() => {
    const nav = document.querySelector('nav')
    const handleClick = (e) => {
      const target = e.target
      if (target.tagName !== 'A') return
      const href = target.getAttribute('href')
      if (!href || !href.startsWith('#')) return
      const section = document.querySelector(href)
      if (!section) return
      e.preventDefault()
      const navHeight = nav ? nav.getBoundingClientRect().height : 0
      const top = section.getBoundingClientRect().top + window.scrollY - navHeight - 12
      window.scrollTo({ top, behavior: 'smooth' })
    }
    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])
}
