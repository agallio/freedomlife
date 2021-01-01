import { useEffect, useState } from 'react'
import { Divider, Typography } from '@material-ui/core'

export const Maintenance: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)')
    setDarkMode(prefersDark.matches)
  }, [])

  return (
    <div className="maintenance">
      <img
        src={`icon-${darkMode ? 'dark' : '512x512'}.png`}
        alt="logo"
        className="maintenance__logo"
      />
      <Divider orientation="vertical" className="maintenance__divider" />
      <Typography className="maintenance__text">
        Situs Sedang Dalam Perbaikan
      </Typography>
    </div>
  )
}

export default Maintenance
