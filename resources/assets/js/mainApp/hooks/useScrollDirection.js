import { useState, useEffect } from 'react'

/**
 * useScrollDirection
 * 
 * Custom React hook to detect the direction of the user scroll. Reports 'up' or 'down'.
 */
export const useScrollDirection = (elementRef) => {
  const [scrollDirection, setScrollDirection] = useState('up')
  const [prevOffset, setPrevOffset] = useState(0)

  const ref = elementRef ? elementRef : window
  const toggleScrollDirection = () => {
    let scrollY = ref.scrollY
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
    ref.addEventListener('scroll', toggleScrollDirection, false)
    return () => {
      ref.removeEventListener('scroll', toggleScrollDirection, false)
    }
  })
  return scrollDirection
}
