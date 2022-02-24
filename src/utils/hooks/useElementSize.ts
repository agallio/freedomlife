import { useCallback, useLayoutEffect, useState } from 'react'

// Utils
import useEventListener from './useEventListener'

interface Size {
  width: number
  height: number
}

function useElementSize<T extends HTMLElement = HTMLDivElement>(): [
  (_node: T | null) => void,
  Size
] {
  // Mutable values like 'ref.current' aren't valid dependencies
  // because mutating them doesn't re-render the component.
  // Instead, we use a state as a ref to be reactive.
  const [ref, setRef] = useState<T | null>(null)
  const [size, setSize] = useState<Size>({
    width: 0,
    height: 0,
  })

  // Prevent too many rendering using useCallback
  const handleSize = useCallback(() => {
    setSize({
      width: ref?.offsetWidth || 0,
      height: ref?.offsetHeight || 0,
    })

    // eslint-disable-next-line
  }, [ref?.offsetHeight, ref?.offsetWidth])

  useEventListener('resize', handleSize)

  useLayoutEffect(() => {
    handleSize()
    // eslint-disable-next-line
  }, [ref?.offsetHeight, ref?.offsetWidth])

  return [setRef, size]
}

export default useElementSize
