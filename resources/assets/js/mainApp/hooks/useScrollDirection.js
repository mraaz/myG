import { useState, useEffect } from 'react'

/**
 * useScrollDirection
 * 
 * Custom React hook to detect the direction of the user scroll. Reports 'up' or 'down'.
 */
export const useScrollDirection = () => {
  const [scrollDirection, setScrollDirection] = useState('up')
  const [prevOffset, setPrevOffset] = useState(0)

  const toggleScrollDirection = () => {
    let scrollY = window.scrollY
    if (scrollY === 0) {
      setScrollDirection('up')
    }
    if (scrollY > prevOffset) {
      setScrollDirection('down')
    } else if (scrollY < prevOffset) {
      setScrollDirection('up')
    }
    setPrevOffset(scrollY)
  }
  useEffect(() => {
    window.addEventListener('scroll', toggleScrollDirection, false)
    return () => {
      window.removeEventListener('scroll', toggleScrollDirection, false)
    }
  })
  return scrollDirection
}
