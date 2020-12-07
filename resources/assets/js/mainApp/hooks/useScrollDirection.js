import { useState, useEffect } from 'react'

export const useScrollDirection = () => {
  const [scrollDirection, setScrollDirection] = useState(null)
  const [prevOffset, setPrevOffset] = useState(0)

  const toggleScrollDirection = () => {
    let scrollY = window.scrollY
    if (scrollY === 0) {
      setScrollDirection(null)
    }
    if (scrollY > prevOffset) {
      setScrollDirection('down')
    } else if (scrollY < prevOffset) {
      setScrollDirection('up')
    }
    setPrevOffset(scrollY)
  }
  useEffect(() => {
    window.addEventListener('scroll', toggleScrollDirection)
    return () => {
      window.removeEventListener('scroll', toggleScrollDirection)
    }
  })
  return scrollDirection
}
