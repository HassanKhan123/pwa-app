import { useEffect, useState } from 'react'

const useWindowInnerHeight = (): number => {
  const [windowInnerHeight, setWindowInnerHeight] = useState(window.innerHeight)

  useEffect(() => {
    const handleResize = () => {
      setWindowInnerHeight(window.innerHeight)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return windowInnerHeight
}

export default useWindowInnerHeight
