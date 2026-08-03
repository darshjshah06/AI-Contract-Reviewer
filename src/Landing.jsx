import EightBall from './EightBall'

function Landing({ onStart }) {
  return (
    <div className="landing" onClick={onStart}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}>
        <EightBall text="Press anywhere to start reviewing your contract" size="large" />
        <p style={{
          color: '#ccff00',
          opacity: 0.4,
          fontSize: '0.75rem',
          textTransform: 'uppercase',
          letterSpacing: '3px'
        }}>
          Click anywhere
        </p>
      </div>
    </div>
  )
}

export default Landing