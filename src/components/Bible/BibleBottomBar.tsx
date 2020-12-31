import { AppBar, Fab, IconButton, Toolbar } from '@material-ui/core'
import {
  ArrowBackIos as BackIosIcon,
  ArrowForwardIos as NextIosIcon,
} from '@material-ui/icons'

import { useGuide } from '../../store'

// Types
import type { BibleBottomBarProps } from '../../types'

const BibleBottomBar: React.FC<BibleBottomBarProps> = ({
  data,
  passage,
  inList,
  backPassage,
  nextPassage,
  openPassageModal,
}) => {
  const { guideData } = useGuide()

  return (
    <AppBar
      className="bible__appbar--bottom"
      position="fixed"
      style={{ top: 'auto', bottom: -1 }}
    >
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          disabled={!data || passage === 'pl-1'}
          onClick={backPassage}
        >
          <BackIosIcon />
        </IconButton>
        <Fab
          color="primary"
          style={{
            position: 'absolute',
            zIndex: 1,
            top: -30,
            left: 0,
            right: 0,
            margin: '0 auto',
          }}
          disabled={!data}
          onClick={openPassageModal}
        >
          {!data ? '' : passage.toUpperCase()}
        </Fab>
        <div
          style={{
            flexGrow: 1,
          }}
        />
        <IconButton
          edge="end"
          color="inherit"
          disabled={
            !data || !guideData
              ? true
              : guideData.in_name
              ? inList.length > 1
                ? passage === 'in-2'
                : passage === 'in-1'
              : passage === 'pb2' || passage === 'pb'
          }
          onClick={nextPassage}
        >
          <NextIosIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}

export default BibleBottomBar
