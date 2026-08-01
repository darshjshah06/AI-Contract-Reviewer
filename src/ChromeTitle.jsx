function ChromeTitle() {
  return (
    <svg
      viewBox="0 0 800 120"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', maxWidth: '800px', display: 'block', margin: '0 auto' }}
    >
      <defs>
        <linearGradient id="balloon1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#e0aaff" />
          <stop offset="25%" stopColor="#c77dff" />
          <stop offset="50%" stopColor="#a0c4ff" />
          <stop offset="75%" stopColor="#b8c0ff" />
          <stop offset="100%" stopColor="#caf0f8" />
        </linearGradient>

        <linearGradient id="shine" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.6)" />
          <stop offset="40%" stopColor="rgba(255,255,255,0.1)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>

        <filter id="balloon-shadow">
          <feDropShadow dx="3" dy="6" stdDeviation="6" floodColor="rgba(0,0,0,0.5)" />
        </filter>

        <filter id="blur-shine">
          <feGaussianBlur stdDeviation="2" />
        </filter>
      </defs>

      {/* Main balloon text */}
      <text
        x="400"
        y="82"
        textAnchor="middle"
        fontFamily="Arial Rounded MT Bold, Arial, sans-serif"
        fontSize="58"
        fontWeight="900"
        fill="url(#balloon1)"
        filter="url(#balloon-shadow)"
        paintOrder="stroke"
        stroke="rgba(150,100,255,0.4)"
        strokeWidth="6"
        strokeLinejoin="round"
      >
        AI Contract Reviewer
      </text>

      {/* Shine overlay */}
      <text
        x="400"
        y="82"
        textAnchor="middle"
        fontFamily="Arial Rounded MT Bold, Arial, sans-serif"
        fontSize="58"
        fontWeight="900"
        fill="url(#shine)"
      >
        AI Contract Reviewer
      </text>
    </svg>
  )
}

export default ChromeTitle