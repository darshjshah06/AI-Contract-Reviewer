function EightBall({ text, size = 'large' }) {
  const isLarge = size === 'large'

  const ballSize = isLarge ? 280 : 180
  const innerSize = isLarge ? 160 : 100
  const fontSize = isLarge ? 13 : 10

  return (
    <div
      className="eight-ball"
      style={{
        width: ballSize,
        height: ballSize,
        background: 'radial-gradient(circle at 35% 35%, #444, #000 70%)',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 0 0 6px #111, 0 0 40px rgba(0,0,0,0.8), inset 0 -10px 30px rgba(0,0,0,0.6)',
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
        }}
      >
        <p
          style={{
            color: '#ccff00',
            fontFamily: 'Arial Black, sans-serif',
            fontSize: fontSize,
            fontWeight: 900,
            textAlign: 'center',
            lineHeight: 1.4,
            padding: 12,
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
          }}
        >
          {text}
        </p>
      </div>
    </div>
  )
}

export default EightBall