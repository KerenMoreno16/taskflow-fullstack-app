import { useEffect, useState } from 'react'

function CustomCursor() {
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  })

  useEffect(() => {
    const moveCursor = (e) => {
      setPosition({
        x: e.clientX,
        y: e.clientY,
      })
    }

    window.addEventListener('mousemove', moveCursor)

    return () => {
      window.removeEventListener('mousemove', moveCursor)
    }
  }, [])

  return (
    <div
      className="fixed top-0 left-0 w-6 h-6 rounded-full bg-cyan-400/30 border border-cyan-400 pointer-events-none z-[9999] backdrop-blur-md transition-transform duration-75"
      style={{
        transform: `translate(${position.x - 12}px, ${position.y - 12}px)`,
      }}
    />
  )
}

export default CustomCursor