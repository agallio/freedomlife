// Components
import Dialog from './dialog'
import MobileDrawer from './mobile'

// Utils
import useMediaQuery from '../../utils/hooks/use-media-query.web'

// Types
import type { DrawerProps } from './types'

/**
 * Web only!
 */
export default function Drawer(props: DrawerProps) {
  const isDesktop = useMediaQuery('(min-width: 768px)')

  if (isDesktop) {
    return <Dialog {...props} />
  }

  return <MobileDrawer {...props} />
}
