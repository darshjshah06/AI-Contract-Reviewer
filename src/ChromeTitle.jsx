import { useEffect, useRef } from 'react'

function ChromeTitle() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    canvas.width = 800
    canvas.height = 120

    let frame = 0

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Iridescent shifting gradient
      const gradient = ctx.createLinearGradient(
        Math.sin(frame * 0.02) * 200,
        0,
        canvas.width + Math.cos(frame * 0.015) * 200,
        canvas.height
      )

      gradient.addColorStop(0, `hsl(${200 + Math.sin(frame * 0.03) * 40}, 80%, 75%)`)
      gradient.addColorStop(0.2, `hsl(${280 + Math.cos(frame * 0.02) * 30}, 70%, 80%)`)
      gradient.addColorStop(0.4, `hsl(${180 + Math.sin(frame * 0.025) * 50}, 90%, 85%)`)
      gradient.addColorStop(0.6, `hsl(${320 + Math.cos(frame * 0.03) * 40}, 75%, 78%)`)
      gradient.addColorStop(0.8, `hsl(${220 + Math.sin(frame * 0.02) * 35}, 85%, 82%)`)
      gradient.addColorStop(1, `hsl(${260 + Math.cos(frame * 0.015) * 45}, 70%, 76%)`)

      // Draw text
      ctx.font = 'bold 64px Georgia, serif'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'

      // Deep shadow for 3D depth
      ctx.shadowColor = 'rgba(0, 0, 0, 0.9)'
      ctx.shadowBlur = 20
      ctx.shadowOffsetX = 4
      ctx.shadowOffsetY = 6

      // Fill with iridescent gradient
      ctx.fillStyle = gradient
      ctx.fillText('AI Contract Reviewer', canvas.width / 2, canvas.height / 2)

      // Shine overlay
      ctx.shadowColor = 'transparent'
      ctx.shadowBlur = 30
      ctx.shadowOffsetX = 6
      ctx.shadowOffsetY = 8
      ctx.shadowColor = 'rgba(0, 0, 0, 0.95)'

      const shineGradient = ctx.createLinearGradient(
        0,
        canvas.height * 0.1,
        0,
        canvas.height * 0.5
      )
      shineGradient.addColorStop(0, `rgba(255, 255, 255, ${0.3 + Math.sin(frame * 0.04) * 0.15})`)
      shineGradient.addColorStop(1, 'rgba(255, 255, 255, 0)')

      ctx.fillStyle = shineGradient
      ctx.fillText('AI Contract Reviewer', canvas.width / 2, canvas.height / 2)

      frame++
      requestAnimationFrame(draw)
    }

    draw()
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: '100%',
        maxWidth: '800px',
        height: 'auto',
        display: 'block',
        margin: '0 auto'
      }}
    />
  )
}

export default ChromeTitle