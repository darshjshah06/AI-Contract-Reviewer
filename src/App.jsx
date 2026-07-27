import { useState } from 'react'
import { extractTextFromPDF } from './pdfParser'
import { reviewContract } from './reviewContract'

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
  const [contractText, setContractText] = useState('')
  const [fileName, setFileName] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

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
      setError('Something went wrong. Please try again.')
    }
    setLoading(false)
  }

  return (
    <div className="container">
      <div className="header">
        <h1>AI Contract Reviewer</h1>
        <p>Upload your contract and get an instant verdict</p>
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

          <div className="section">
            <h3>🚩 Fishy Clauses</h3>
            {result.fishy.map((item, i) => (
              <div className="fishy-item" key={i}>
                <strong>{item.clause}</strong>
                <p>{item.issue}</p>
              </div>
            ))}
          </div>

          <div className="section">
            <h3>✅ Safe Clauses</h3>
            {result.safe.map((item, i) => (
              <div className="safe-item" key={i}>{item}</div>
            ))}
          </div>

          <div className="recommendation">
            <h3>💡 Recommendation</h3>
            <p>{result.recommendation}</p>
          </div>

        </div>
      )}
    </div>
  )
}

export default App