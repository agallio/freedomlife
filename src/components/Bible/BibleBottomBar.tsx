import React from 'react'
import { useSelector } from 'react-redux'
import { AppBar, Toolbar, IconButton, Fab } from '@material-ui/core'
import {
  ArrowBackIos as BackIosIcon,
  ArrowForwardIos as NextIosIcon,
} from '@material-ui/icons'

// Redux
import { RootState } from '../../reducers'

interface BibleBottomBarProps {
  isFetching: boolean
  passage: string
  altList: number[]
  backPassage: () => void
  nextPassage: () => void
  openPassageModal: () => void
}

const BibleBottomBar = ({
  isFetching,
  passage,
  altList,
  backPassage,
  nextPassage,
  openPassageModal,
}: BibleBottomBarProps): JSX.Element => {
  const guideData = useSelector((state: RootState) => state.guide.guideData)

  return (
    <AppBar
      position="fixed"
      color="primary"
      style={{ top: 'auto', bottom: -1 }}
    >
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          disabled={isFetching || passage === 'pl-1'}
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
          disabled={isFetching}
          onClick={openPassageModal}
        >
          {isFetching ? '' : passage.toUpperCase()}
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
            isFetching
              ? true
              : guideData.alt_name
              ? altList.length > 1
                ? passage === 'alt-2'
                : passage === 'alt-1'
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
