import { useRef, useEffect } from 'react'

// Runs side-effect after the component is mounted
export default function useDidMountEffect(func: () => void, deps: any[]): void {
  const didMount = useRef(false)

  useEffect(() => {
    if (didMount.current) func()
    else didMount.current = true
  }, deps)
}
