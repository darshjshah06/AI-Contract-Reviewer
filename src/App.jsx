import { useState, useEffect, useRef } from 'react'
import { extractTextFromPDF } from './pdfParser'
import { reviewContract } from './reviewContract'
import HighlightedContract from './HighlightedContract'

const DECISIONS = ['Safe to Sign', 'Proceed with Caution', 'Do Not Sign']

function BottomBall({ result, ballVisible }) {
  const [current, setCurrent] = useState(0)
  const [angle, setAngle] = useState(0)
  const velocityRef = useRef(1)
  const directionRef = useRef(1)

  useEffect(() => {
    if (result) return
    const decisionTimer = setInterval(() => {
      setCurrent(prev => (prev + 1) % DECISIONS.length)
    }, 700)
    return () => clearInterval(decisionTimer)
  }, [result])

  useEffect(() => {
    if (result) return
    let animFrame
    function spin() {
      if (Math.random() < 0.03) directionRef.current *= -1
      if (Math.random() < 0.05) {
        velocityRef.current = (Math.random() * 3 + 0.5) * directionRef.current
      }
      velocityRef.current *= 0.99
      if (Math.abs(velocityRef.current) < 0.3) {
        velocityRef.current = (Math.random() * 2 + 0.5) * directionRef.current
      }
      setAngle(prev => prev + velocityRef.current)
      animFrame = requestAnimationFrame(spin)
    }
    animFrame = requestAnimationFrame(spin)
    return () => cancelAnimationFrame(animFrame)
  }, [result])

  function getVerdictIcon(v) {
    if (v === 'GREEN LIGHT') return '✅'
    if (v === 'CAUTION') return '⚠️'
    if (v === 'DO NOT SIGN') return '🚨'
  }

  function getVerdictLabel(v) {
    if (v === 'GREEN LIGHT') return 'Safe to Sign'
    if (v === 'CAUTION') return 'Proceed with Caution'
    if (v === 'DO NOT SIGN') return 'Do Not Sign'
  }

  return (
    <div
      className={`eight-ball-bottom ${ballVisible ? 'visible' : ''}`}
      style={{ transform: `translateX(-50%) rotate(${angle}deg)` }}
    >
      <div className="eight-ball-bottom-inner">
        <p className="eight-ball-verdict">
          {result
            ? `${getVerdictIcon(result.verdict)} ${getVerdictLabel(result.verdict)}`
            : DECISIONS[current]
          }
        </p>
      </div>
    </div>
  )
}

function getVerdictClass(verdict) {
  if (verdict === 'GREEN LIGHT') return 'green'
  if (verdict === 'CAUTION') return 'yellow'
  if (verdict === 'DO NOT SIGN') return 'red'
}

function getVerdictIcon(verdict) {
  if (verdict === 'GREEN LIGHT') return '✅'
  if (verdict === 'CAUTION') return '⚠️'
  if (verdict === 'DO NOT SIGN') return '🚨'
}

function App() {
  const [phase, setPhase] = useState('landing')
  const [appVisible, setAppVisible] = useState(false)
  const [ballVisible, setBallVisible] = useState(false)
  const [contractText, setContractText] = useState('')
  const [fileName, setFileName] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [ballAngle, setBallAngle] = useState(0)
  const landingVelocityRef = useRef(1)
  const landingDirectionRef = useRef(1)

  useEffect(() => {
    if (phase !== 'landing') return
    let animFrame
    function spin() {
      if (Math.random() < 0.03) landingDirectionRef.current *= -1
      if (Math.random() < 0.05) {
        landingVelocityRef.current = (Math.random() * 3 + 0.5) * landingDirectionRef.current
      }
      landingVelocityRef.current *= 0.99
      if (Math.abs(landingVelocityRef.current) < 0.3) {
        landingVelocityRef.current = (Math.random() * 2 + 0.5) * landingDirectionRef.current
      }
      setBallAngle(prev => prev + landingVelocityRef.current)
      animFrame = requestAnimationFrame(spin)
    }
    animFrame = requestAnimationFrame(spin)
    return () => cancelAnimationFrame(animFrame)
  }, [phase])

  function handleStart() {
    setPhase('rolling')
    setTimeout(() => {
      setPhase('app')
      setAppVisible(true)
      setBallVisible(true)
    }, 1000)
  }

  async function handleFileUpload(e) {
    const file = e.target.files[0]
    if (!file) return
    setFileName(file.name)
    if (file.type === 'application/pdf') {
      const text = await extractTextFromPDF(file)
      setContractText(text)
    } else {
      const text = await file.text()
      setContractText(text)
    }
  }

  function handlePasteInput(e) {
    setContractText(e.target.value)
  }

  async function handleReview() {
    if (!contractText) {
      setError('Please upload a contract or paste text first.')
      return
    }
    setError('')
    setLoading(true)
    try {
      const review = await reviewContract(contractText)
      setResult(review)
    } catch (err) {
      console.error(err)
      setError('Something went wrong. Check your API key and try again.')
    }
    setLoading(false)
  }

  return (
    <>
      {/* Landing Screen */}
      {phase === 'landing' && (
        <div className="landing" onClick={handleStart}>
          <div className="eight-ball-intro">
            <div
              className="landing-ball"
              style={{ transform: `rotate(${ballAngle}deg)` }}
            >
              <div className="landing-ball-inner">
                <p className="landing-ball-text">
                  Press anywhere to start reviewing your contract
                </p>
              </div>
            </div>
            <p className="click-hint">Click anywhere</p>
          </div>
        </div>
      )}

      {/* Rolling Ball Animation */}
      {phase === 'rolling' && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: '#0d1b3e',
          zIndex: 200,
          overflow: 'hidden'
        }}>
          <div className="rolling-ball">
            <div className="rolling-ball-inner" />
          </div>
        </div>
      )}

      {/* Bottom Spinning 8 Ball */}
      {phase === 'app' && (
        <BottomBall result={result} ballVisible={ballVisible} />
      )}

      {/* Main App */}
      <div className={`app-wrapper ${appVisible ? 'visible' : ''}`}>
        <div className="container">

          <div className="header">
            <img
              src="/title.png"
              alt="AI Contract Reviewer"
              style={{ width: '100%', maxWidth: '800px', display: 'block', margin: '0 auto 8px' }}
            />
          </div>

          <div className="witch-text">
            <p>
              "Heed this warning, dear creator... brands shall tempt thee with silver tongues
              and hollow promises. Before thou signs away thy soul, consult the sacred 8 ball
              below — it sees what mortal eyes cannot. Let it be thy shield against trickery and deceit."
            </p>
          </div>

          <div className="upload-box">
            <input
              type="file"
              accept=".pdf,.txt,.doc"
              onChange={handleFileUpload}
            />
            {fileName && <p>✔ Loaded: {fileName}</p>}
          </div>

          <div className="paste-box">
            <p>Or paste your contract text below</p>
            <textarea
              placeholder="Paste contract text here..."
              rows={10}
              value={contractText}
              onChange={handlePasteInput}
            />
          </div>

          <button className="review-btn" onClick={handleReview} disabled={loading}>
            {loading ? 'Reviewing...' : 'Review Contract'}
          </button>

          {error && <p className="error">{error}</p>}

          {result && (
            <div className="results">

              <div className={`verdict-card ${getVerdictClass(result.verdict)}`}>
                <div className="verdict-icon">{getVerdictIcon(result.verdict)}</div>
                <div className="verdict-text">
                  <h2>{result.verdict}</h2>
                  <p>{result.summary}</p>
                </div>
              </div>

              <HighlightedContract
                text={contractText}
                fishyItems={result.fishy}
              />

              {result.fishy && result.fishy.length > 0 && (
                <div className="section">
                  <h3>🚩 Fishy Clauses</h3>
                  {result.fishy.map((item, i) => (
                    <div className="fishy-item" key={i}>
                      <strong>{item.clause}</strong>
                      <p>{item.issue}</p>
                    </div>
                  ))}
                </div>
              )}

              {result.safe && result.safe.length > 0 && (
                <div className="section">
                  <h3>✅ Safe Clauses</h3>
                  {result.safe.map((item, i) => (
                    <div className="safe-item" key={i}>{item}</div>
                  ))}
                </div>
              )}

              <div className="recommendation">
                <h3>💡 Recommendation</h3>
                <p>{result.recommendation}</p>
              </div>

            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default App