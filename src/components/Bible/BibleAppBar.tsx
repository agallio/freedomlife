import React from 'react'
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Slide,
  useScrollTrigger,
} from '@material-ui/core'
import {
  ArrowBack as BackIcon,
  Translate as TranslateIcon,
} from '@material-ui/icons'

interface BibleAppBarProps {
  isFetching: boolean
  appBarTitle: string
  children?: React.ReactElement
  goBack: () => void
  openTranslate: () => void
  window?: () => Window
}

const HideOnScrollTop = (props: BibleAppBarProps): JSX.Element => {
  const { children, window } = props
  const trigger = useScrollTrigger({ target: window ? window() : undefined })

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  )
}

const BibleAppBar = (props: BibleAppBarProps): JSX.Element => {
  const { isFetching, appBarTitle, goBack, openTranslate } = props

  return (
    <HideOnScrollTop {...props}>
      <AppBar>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={goBack}
            style={{ marginRight: 10 }}
          >
            <BackIcon />
          </IconButton>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            {appBarTitle}
          </Typography>
          <IconButton
            edge="end"
            color="inherit"
            disabled={isFetching}
            onClick={openTranslate}
          >
            <TranslateIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </HideOnScrollTop>
  )
}

export default BibleAppBar
