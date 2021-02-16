import { useTheme } from 'next-themes'

const SplitbeeBadge: React.FC = () => {
  const { theme } = useTheme()

  return (
    <div className="flex align-center justify-center my-8">
      {theme === 'dark' ? (
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
      )}
    </div>
  )
}

export default SplitbeeBadge
