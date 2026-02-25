import { useEffect, useState } from 'react'

export function TextGenerateEffect({ words, speed = 25, className = '' }) {
  const [displayed, setDisplayed] = useState('')

  useEffect(() => {
    if (!words) return

    let i = 0
    setDisplayed('')

    const interval = setInterval(() => {
      i += 1
      setDisplayed(words.slice(0, i))
      if (i >= words.length) {
        clearInterval(interval)
      }
    }, speed)

    return () => clearInterval(interval)
  }, [words, speed])

  return <p className={className}>{displayed}</p>
}

