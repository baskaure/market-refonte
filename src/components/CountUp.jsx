import { useEffect, useRef, useCallback, useState } from 'react'

function useInViewOnce(ref) {
  const [isInView, setIsInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [ref])
  return isInView
}

function easeOut(t) {
  return 1 - Math.pow(1 - t, 3)
}

export default function CountUp({
  to,
  from = 0,
  direction = 'up',
  delay = 0,
  duration = 2,
  className = '',
  startWhen = true,
  separator = '',
  onStart,
  onEnd,
}) {
  const ref = useRef(null)
  const isInView = useInViewOnce(ref)
  const startVal = direction === 'down' ? to : from
  const endVal = direction === 'down' ? from : to

  const getDecimalPlaces = (num) => {
    const str = num.toString()
    if (str.includes('.')) {
      const decimals = str.split('.')[1]
      if (parseInt(decimals, 10) !== 0) return decimals.length
    }
    return 0
  }

  const maxDecimals = Math.max(getDecimalPlaces(from), getDecimalPlaces(to))

  const formatValue = useCallback(
    (val) => {
      const options = {
        useGrouping: !!separator,
        minimumFractionDigits: maxDecimals,
        maximumFractionDigits: maxDecimals,
      }
      const formatted = Intl.NumberFormat('en-US', options).format(val)
      return separator ? formatted.replace(/,/g, separator) : formatted
    },
    [maxDecimals, separator]
  )

  useEffect(() => {
    if (ref.current) ref.current.textContent = formatValue(startVal)
  }, [startVal, formatValue])

  useEffect(() => {
    if (!isInView || !startWhen) return

    const delayMs = delay * 1000
    const durationMs = duration * 1000
    let rafId
    let startTime = null
    let started = false

    const tick = (now) => {
      if (startTime === null) startTime = now
      const elapsed = now - startTime

      if (elapsed < delayMs) {
        rafId = requestAnimationFrame(tick)
        return
      }

      if (!started) {
        started = true
        if (typeof onStart === 'function') onStart()
      }

      const progress = Math.min((elapsed - delayMs) / durationMs, 1)
      const current = startVal + (endVal - startVal) * easeOut(progress)
      if (ref.current) ref.current.textContent = formatValue(current)

      if (progress < 1) {
        rafId = requestAnimationFrame(tick)
      } else {
        if (typeof onEnd === 'function') onEnd()
      }
    }

    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [isInView, startWhen, startVal, endVal, delay, duration, formatValue, onStart, onEnd])

  return <span className={className} ref={ref} />
}
