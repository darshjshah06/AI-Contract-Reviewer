import { useState } from 'react'
import { extractTextFromPDF } from './pdfParser'

function App() {
  const [contractText, setContractText] = useState('')
  const [fileName, setFileName] = useState('')

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

      <button className="review-btn">Review Contract</button>
    </div>
  )
}

export default App