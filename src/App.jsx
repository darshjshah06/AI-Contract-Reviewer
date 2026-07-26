import { useState } from 'react'
import { extractTextFromPDF } from './pdfParser'
import { reviewContract } from './reviewContract'

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
        {fileName && <p>Loaded: {fileName}</p>}
      </div>

      <div className="paste-box">
        <textarea
          placeholder="Or paste contract text here..."
          rows={10}
          value={contractText}
          onChange={handlePasteInput}
        />
      </div>

      <button onClick={handleReview} disabled={loading}>
        {loading ? 'Reviewing...' : 'Review Contract'}
      </button>

      {error && <p>{error}</p>}

      {result && (
        <div className="results">
          <h2>Verdict: {result.verdict}</h2>
          <p>{result.summary}</p>

          <h3>🚩 Fishy Clauses</h3>
          {result.fishy.map((item, i) => (
            <div key={i}>
              <strong>{item.clause}</strong>
              <p>{item.issue}</p>
            </div>
          ))}

          <h3>✅ Safe Clauses</h3>
          {result.safe.map((item, i) => (
            <p key={i}>{item}</p>
          ))}

          <h3>💡 Recommendation</h3>
          <p>{result.recommendation}</p>
        </div>
      )}
    </div>
  )
}

export default App