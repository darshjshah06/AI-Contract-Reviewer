import { useEffect, useRef } from 'react'

const DECISIONS = [
  'Safe to Sign',
  'Proceed with Caution',
  'Do Not Sign'
]

function EightBall({ text, size = 'large', verdict = null, spinning = false }) {
  const ballRef = useRef(null)
  const angleRef = useRef(0)
  const velocityRef = useRef(0)
  const directionRef = useRef(1)
  const frameRef = useRef(null)
  const decisionIndexRef = useRef(0)
  const decisionTimerRef = useRef(null)

  useEffect(() => {
    if (!spinning || verdict) return

    // Random spin animation
    function animate() {
      // Randomly change direction and speed
      if (Math.random() < 0.02) {
        directionRef.current *= -1
      }
      if (Math.random() < 0.05) {
        velocityRef.current = (Math.random() * 4 + 1) * directionRef.current
      }

      velocityRef.current *= 0.98
      if (Math.abs(velocityRef.current) < 0.3) {
        velocityRef.current = (Math.random() * 2 + 0.5) * directionRef.current
      }

      angleRef.current += velocityRef.current

      if (ballRef.current) {
        ballRef.current.style.transform = `translateX(-50%) rotate(${angleRef.current}deg)`
      }

      frameRef.current = requestAnimationFrame(animate)
    }

    // Cycle through decisions while spinning
    decisionTimerRef.current = setInterval(() => {
      decisionIndexRef.current = (decisionIndexRef.current + 1) % DECISIONS.length
      const el = document.getElementById('verdict-text-spinning')
      if (el) el.textContent = DECISIONS[decisionIndexRef.current]
    }, 600)

    frameRef.current = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(frameRef.current)
      clearInterval(decisionTimerRef.current)
    }
  }, [spinning, verdict])

  const isLarge = size === 'large'
  const ballSize = isLarge ? 380 : 280
  const innerSize = isLarge ? 220 : 160
  const fontSize = isLarge ? 13 : 12

  function getVerdictIcon(v) {
    if (v === 'GREEN LIGHT') return '✅'
    if (v === 'CAUTION') return '⚠️'
    if (v === 'DO NOT SIGN') return '🚨'
    return ''
  }

  function getVerdictLabel(v) {
    if (v === 'GREEN LIGHT') return 'Safe to Sign'
    if (v === 'CAUTION') return 'Proceed with Caution'
    if (v === 'DO NOT SIGN') return 'Do Not Sign'
    return '8'
  }

  return (
    <div
      ref={ballRef}
      style={{
        width: ballSize,
        height: ballSize,
        background: 'radial-gradient(circle at 35% 35%, #555, #111 50%, #000 70%)',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 0 0 6px #111, 0 0 60px rgba(0,0,0,0.9), inset 0 -10px 40px rgba(0,0,0,0.8)',
        position: size === 'large' ? 'relative' : 'fixed',
        left: size === 'large' ? 'auto' : '50%',
        bottom: size === 'large' ? 'auto' : '-100px',
        transform: size === 'large' ? 'none' : 'translateX(-50%)',
        zIndex: size === 'large' ? 'auto' : 50,
        flexShrink: 0,
      }}
    >
      <div
        style={{
          width: innerSize,
          height: innerSize,
          background: 'radial-gradient(circle at 40% 40%, #1a1a1a, #000)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '2px solid #222',
          padding: 12,
        }}
      >
        {verdict ? (
          <p style={{
            color: '#ccff00',
            fontFamily: 'Arial Black, sans-serif',
            fontSize: fontSize,
            fontWeight: 900,
            textAlign: 'center',
            lineHeight: 1.4,
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
          }}>
            {getVerdictIcon(verdict)} {getVerdictLabel(verdict)}
          </p>
        ) : spinning ? (
          <p
            id="verdict-text-spinning"
            style={{
              color: '#ccff00',
              fontFamily: 'Arial Black, sans-serif',
              fontSize: fontSize,
              fontWeight: 900,
              textAlign: 'center',
              lineHeight: 1.4,
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              transition: 'opacity 0.3s',
            }}
          >
            {DECISIONS[0]}
          </p>
        ) : (
          <p style={{
            color: '#ccff00',
            fontFamily: 'Arial Black, sans-serif',
            fontSize: fontSize,
            fontWeight: 900,
            textAlign: 'center',
            lineHeight: 1.4,
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
          }}>
            {text || '8'}
          </p>
        )}
      </div>
    </div>
  )
}

export default EightBall