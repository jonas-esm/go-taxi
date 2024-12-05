import { useState, useEffect } from 'react'

let timeoutId: NodeJS.Timeout

function useDebounce(value: any, delay: number): any {
  const [debouncedValue, setDebouncedValue] = useState(value)
  const [isWaiting, setIsWaiting] = useState(false)

  useEffect(() => {
    setIsWaiting(true)

    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    timeoutId = setTimeout(() => {
      setDebouncedValue(value)
      setIsWaiting(false)
    }, delay)

    return () => {
      clearTimeout(timeoutId)
      setIsWaiting(false)
    }
  }, [value, delay])

  return [debouncedValue, isWaiting]
}

export default useDebounce
1
