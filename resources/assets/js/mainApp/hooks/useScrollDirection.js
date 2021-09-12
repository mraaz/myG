import { useState, useEffect } from 'react'

/**
 * useScrollDirection
 *
 * Custom React hook to detect the direction of the user scroll. Reports 'up' or 'down'.
 */
export const useScrollDirection = (elementRef) => {
  // State
  const [scrollDirection, setScrollDirection] = useState('top')
  const [prevOffset, setPrevOffset] = useState(0)

  // If a element is provided, use that. Else default to windows.
  const ref = elementRef ? elementRef : window

  const toggleScrollDirection = () => {
    const scrollY = ref.scrollY

    if (scrollY === 0) {
      setScrollDirection('top')
    } else if (scrollY > prevOffset) {
      setScrollDirection('down')
    } else {
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
