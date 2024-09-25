import { useEffect, useState } from 'react'

const useWindowInnerWidth = (): number => {
  const [windowInnerWidth, setWindowInnerWidth] = useState(window.innerWidth)

  useEffect(() => {
    const handleResize = () => {
      setWindowInnerWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return windowInnerWidth
}

export default useWindowInnerWidth
