import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'

const SplitbeeBadge: React.FC = () => {
  const [isMounted, setIsMounted] = useState(false)
  const { theme } = useTheme()

  useEffect(() => setIsMounted(true), [])

  return (
    <div className="flex align-center justify-center my-8">
      {isMounted &&
        (theme === 'dark' ? (
          <a href="https://splitbee.io">
            <img
              src="https://splitbee-cdn.fra1.cdn.digitaloceanspaces.com/static/badge/splitbee-badge-dark.svg"
              alt="Analytics by Splitbee.io"
            />
          </a>
        ) : (
          <a href="https://splitbee.io">
            <img
              src="https://splitbee-cdn.fra1.cdn.digitaloceanspaces.com/static/badge/splitbee-badge.svg"
              alt="Analytics by Splitbee.io"
            />
          </a>
        ))}
    </div>
  )
}

export default SplitbeeBadge
