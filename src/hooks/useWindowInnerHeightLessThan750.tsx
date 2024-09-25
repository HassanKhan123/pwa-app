import { useState, useEffect } from 'react'

const useWindowInnerHeightLessThan750 = (): boolean => {
  const [isLessThan750, setIsLessThan750] = useState(window.innerHeight < 750)

  useEffect(() => {
    const handleResize = () => {
      setIsLessThan750(window.innerHeight < 750)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return isLessThan750
}

export default useWindowInnerHeightLessThan750
