function HighlightedContract({ text, fishyItems }) {
  if (!text || !fishyItems) return null

  let segments = [{ text, highlighted: false, issue: '' }]

  fishyItems.forEach(item => {
    if (!item.quote) return

    const newSegments = []

    segments.forEach(segment => {
      if (segment.highlighted) {
        newSegments.push(segment)
        return
      }

      const index = segment.text.indexOf(item.quote)

      if (index === -1) {
        newSegments.push(segment)
        return
      }

      const before = segment.text.slice(0, index)
      const match = segment.text.slice(index, index + item.quote.length)
      const after = segment.text.slice(index + item.quote.length)

      if (before) newSegments.push({ text: before, highlighted: false, issue: '' })
      newSegments.push({ text: match, highlighted: true, issue: item.issue })
      if (after) newSegments.push({ text: after, highlighted: false, issue: '' })
    })

    segments = newSegments
  })

  return (
    <div className="section">
      <h3>📄 Contract Text</h3>
      <div className="contract-text">
        {segments.map((segment, i) =>
          segment.highlighted ? (
            <span key={i} className="highlight" title={segment.issue}>
              {segment.text}
            </span>
          ) : (
            <span key={i}>{segment.text}</span>
          )
        )}
      </div>
    </div>
  )
}

export default HighlightedContract