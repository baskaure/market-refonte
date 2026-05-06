import { useRef, useId, useEffect, useSyncExternalStore } from 'react'
import { animate, useMotionValue } from 'motion/react'

const MASK_URL =
  'https://framerusercontent.com/images/ceBGguIpUU8luwByxuQz79t7To.png'
const NOISE_URL =
  'https://framerusercontent.com/images/g0QcWrxr87K0ufOxIUFBakwYA8.png'

function mapRange(value, fromLow, fromHigh, toLow, toHigh) {
  if (fromLow === fromHigh) return toLow
  const percentage = (value - fromLow) / (fromHigh - fromLow)
  return toLow + percentage * (toHigh - toLow)
}

function usePrefersReducedMotion() {
  return useSyncExternalStore(
    (onStoreChange) => {
      if (typeof window === 'undefined') return () => {}
      const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
      mq.addEventListener('change', onStoreChange)
      return () => mq.removeEventListener('change', onStoreChange)
    },
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    () => false,
  )
}

function useInstanceId() {
  const id = useId()
  const cleanId = id.replace(/:/g, '')
  return `shadowoverlay-${cleanId}`
}

/**
 * Fond type « ethereal shadow » (filtre SVG + masque).
 * Rotation 180° : la forme du masque est retournée (effet bas du hero).
 */
export function EtherealShadow({
  sizing = 'fill',
  color = 'rgba(128, 128, 128, 1)',
  animation,
  noise,
  style,
  className = '',
}) {
  const filterId = useInstanceId()
  const reducedMotion = usePrefersReducedMotion()
  const animationEnabled =
    !reducedMotion && animation && animation.scale > 0

  const feColorMatrixRef = useRef(null)
  const hueRotateMotionValue = useMotionValue(180)
  const hueRotateAnimationRef = useRef(null)

  const displacementScale = animation
    ? mapRange(animation.scale, 1, 100, 20, 100)
    : 0
  const animationDuration = animation
    ? mapRange(animation.speed, 1, 100, 1000, 50)
    : 1

  useEffect(() => {
    if (!feColorMatrixRef.current || !animationEnabled) return

    if (hueRotateAnimationRef.current) {
      hueRotateAnimationRef.current.stop()
    }
    hueRotateMotionValue.set(0)
    hueRotateAnimationRef.current = animate(hueRotateMotionValue, 360, {
      duration: animationDuration / 25,
      repeat: Infinity,
      repeatType: 'loop',
      repeatDelay: 0,
      ease: 'linear',
      delay: 0,
      onUpdate: (value) => {
        if (feColorMatrixRef.current) {
          feColorMatrixRef.current.setAttribute('values', String(value))
        }
      },
    })

    return () => {
      if (hueRotateAnimationRef.current) {
        hueRotateAnimationRef.current.stop()
      }
    }
  }, [animationEnabled, animationDuration, hueRotateMotionValue])

  return (
    <div
      className={`ethereal-shadow ${className}`.trim()}
      style={{
        overflow: 'hidden',
        position: 'relative',
        width: '100%',
        height: '100%',
        transform: 'rotate(180deg)',
        transformOrigin: 'center center',
        ...style,
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: -displacementScale,
          filter: animationEnabled ? `url(#${filterId}) blur(4px)` : 'none',
        }}
      >
        {animationEnabled && (
          <svg
            style={{ position: 'absolute', width: 0, height: 0 }}
            aria-hidden="true"
          >
            <defs>
              <filter id={filterId}>
                <feTurbulence
                  result="undulation"
                  numOctaves="2"
                  baseFrequency={`${mapRange(animation.scale, 0, 100, 0.001, 0.0005)},${mapRange(animation.scale, 0, 100, 0.004, 0.002)}`}
                  seed="0"
                  type="turbulence"
                />
                <feColorMatrix
                  ref={feColorMatrixRef}
                  in="undulation"
                  type="hueRotate"
                  values="180"
                />
                <feColorMatrix
                  in="dist"
                  result="circulation"
                  type="matrix"
                  values="4 0 0 0 1  4 0 0 0 1  4 0 0 0 1  1 0 0 0 0"
                />
                <feDisplacementMap
                  in="SourceGraphic"
                  in2="circulation"
                  scale={displacementScale}
                  result="dist"
                />
                <feDisplacementMap
                  in="dist"
                  in2="undulation"
                  scale={displacementScale}
                  result="output"
                />
              </filter>
            </defs>
          </svg>
        )}
        <div
          style={{
            backgroundColor: color,
            WebkitMaskImage: `url('${MASK_URL}')`,
            maskImage: `url('${MASK_URL}')`,
            maskSize: sizing === 'stretch' ? '100% 100%' : 'cover',
            WebkitMaskSize: sizing === 'stretch' ? '100% 100%' : 'cover',
            maskRepeat: 'no-repeat',
            WebkitMaskRepeat: 'no-repeat',
            maskPosition: 'center',
            WebkitMaskPosition: 'center',
            width: '100%',
            height: '100%',
          }}
        />
      </div>

      {noise && noise.opacity > 0 && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url("${NOISE_URL}")`,
            backgroundSize: noise.scale * 200,
            backgroundRepeat: 'repeat',
            opacity: noise.opacity / 2,
          }}
        />
      )}
    </div>
  )
}
