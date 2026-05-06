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

/** Aligné sur le breakpoint mobile global (900px). */
function useCompactHeroViewport() {
  return useSyncExternalStore(
    (onStoreChange) => {
      if (typeof window === 'undefined') return () => {}
      const mq = window.matchMedia('(max-width: 900px)')
      mq.addEventListener('change', onStoreChange)
      return () => mq.removeEventListener('change', onStoreChange)
    },
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(max-width: 900px)').matches,
    () => false,
  )
}

function useInstanceId() {
  const id = useId()
  const cleanId = id.replace(/:/g, '')
  return `shadowoverlay-${cleanId}`
}

/**
 * Fond « ethereal shadow » : masque + bruit.
 * — Desktop : filtre SVG (turbulence + displacement), fluide.
 * — Mobile WebKit : le displacement SVG rend souvent tout transparent ; on utilise
 *   blur + hue-rotate CSS animé (même feeling lumineux, stable).
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
  const compactViewport = useCompactHeroViewport()

  const animationWanted = Boolean(animation && animation.scale > 0)
  const animationEnabled = !reducedMotion && animationWanted

  /** Filtre « liquide » uniquement hors petit viewport (Safari iOS). */
  const useLiquidSvgFilter = animationEnabled && !compactViewport

  /** Petit écran : animation par CSS (classe + keyframes dans index.css). */
  const useMobileCssHue = animationEnabled && compactViewport

  const feColorMatrixRef = useRef(null)
  const hueRotateMotionValue = useMotionValue(180)
  const hueRotateAnimationRef = useRef(null)

  const displacementScaleRaw = animationWanted
    ? mapRange(animation.scale, 1, 100, 20, 100)
    : 0
  const displacementScale = compactViewport
    ? displacementScaleRaw * 0.5
    : displacementScaleRaw

  const animationDuration = animation
    ? mapRange(animation.speed, 1, 100, 1000, 50)
    : 1
  const hueDuration =
    (animationDuration / 25) * (compactViewport ? 1.35 : 1)

  const turbX = mapRange(animation?.scale ?? 0, 0, 100, 0.001, 0.0005)
  const turbY = mapRange(animation?.scale ?? 0, 0, 100, 0.004, 0.002)
  const turbFactor = compactViewport ? 0.82 : 1
  const baseFrequency = `${turbX * turbFactor},${turbY * turbFactor}`

  const blurPx = compactViewport ? 2.5 : 4

  const maskFill =
    sizing === 'stretch' || compactViewport ? '100% 100%' : 'cover'

  const insetExpand = useLiquidSvgFilter
    ? -displacementScale
    : -Math.max(20, Math.ceil(blurPx * 5))

  const innerFilter = useLiquidSvgFilter
    ? `url(#${filterId}) blur(${blurPx}px)`
    : useMobileCssHue
      ? undefined
      : `blur(${blurPx}px)`

  useEffect(() => {
    if (!useLiquidSvgFilter || !feColorMatrixRef.current) return

    if (hueRotateAnimationRef.current) {
      hueRotateAnimationRef.current.stop()
    }
    hueRotateMotionValue.set(0)
    hueRotateAnimationRef.current = animate(hueRotateMotionValue, 360, {
      duration: hueDuration,
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
  }, [useLiquidSvgFilter, hueDuration, hueRotateMotionValue])

  return (
    <div
      className={`ethereal-shadow ${className}`.trim()}
      style={{
        overflow: 'hidden',
        position: 'relative',
        width: '100%',
        height: '100%',
        minWidth: '100%',
        minHeight: '100%',
        transform: compactViewport
          ? 'rotate(180deg) translateZ(0)'
          : 'rotate(180deg)',
        WebkitTransform: compactViewport
          ? 'rotate(180deg) translateZ(0)'
          : 'rotate(180deg)',
        transformOrigin: 'center center',
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
        ...(useMobileCssHue
          ? { '--ethereal-mobile-hue-duration': `${hueDuration}s` }
          : {}),
        ...style,
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: insetExpand,
          filter: innerFilter,
          WebkitFilter: innerFilter,
        }}
      >
        {useLiquidSvgFilter && (
          <svg
            style={{ position: 'absolute', width: 0, height: 0 }}
            aria-hidden="true"
          >
            <defs>
              <filter id={filterId} colorInterpolationFilters="sRGB">
                <feTurbulence
                  result="undulation"
                  numOctaves="2"
                  baseFrequency={baseFrequency}
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
          className={useMobileCssHue ? 'ethereal-glow-mobile' : undefined}
          style={{
            backgroundColor: color,
            WebkitMaskImage: `url('${MASK_URL}')`,
            maskImage: `url('${MASK_URL}')`,
            maskSize: maskFill,
            WebkitMaskSize: maskFill,
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
