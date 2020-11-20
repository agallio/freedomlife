import { SyntheticEvent, useState } from 'react'
import {
  AppBar,
  IconButton,
  Slide,
  Snackbar,
  Toolbar,
  Typography,
  useScrollTrigger,
} from '@material-ui/core'
import {
  ArrowBack as BackIcon,
  Translate as TranslateIcon,
  Close as CloseIcon,
  FileCopy as CopyIcon,
} from '@material-ui/icons'
import { Alert } from '@material-ui/lab'

// Types
import type { BibleAppBarProps } from '../../types'

const HideOnScrollTop: React.FC<BibleAppBarProps> = (props) => {
  const { children, window } = props
  const trigger = useScrollTrigger({ target: window ? window() : undefined })

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  )
}

const BibleAppBar: React.FC<BibleAppBarProps> = (props) => {
  const {
    data,
    appBarTitle,
    bibleVersion,
    highlighted,
    highlightedText,
    setHighlighted,
    setHighlightedText,
    goBack,
    openTranslate,
  } = props

  const [copiedSnackbar, setCopiedSnackbar] = useState(false)

  const removeHighlight = () => {
    setHighlighted(false)
    setHighlightedText([])
  }

  const fallbackCopyText = async (text: string) => {
    const textArea = document.createElement('textarea')
    textArea.value = text

    textArea.style.top = '0'
    textArea.style.left = '0'
    textArea.style.position = 'fixed'

    document.body.appendChild(textArea)
    textArea.focus()
    textArea.select()

    try {
      await document.execCommand('copy')
      textArea.style.display = 'none'
      setCopiedSnackbar(true)
      setHighlighted(false)
      setHighlightedText([])
    } catch (e) {
      console.error(e)
      setCopiedSnackbar(false)
    }
  }

  const copyText = async () => {
    let mapHighlightedContent
    let mapHighlightedVerse

    const sortedHighlightedText = highlightedText.sort(
      (a, b) => a.verse - b.verse
    )

    const highlightedContent = sortedHighlightedText.map((item) => item.content)
    const highlightedVerse = sortedHighlightedText.map((item) => item.verse)
    const checkDiffVerse = highlightedVerse
      .slice(1)
      .map((n, i) => n - highlightedVerse[i])
    const isIncreasingSequence = checkDiffVerse.every((value) => value === 1)

    if (highlightedVerse.length > 1) {
      if (isIncreasingSequence) {
        mapHighlightedVerse = `${highlightedVerse[0]}-${
          highlightedVerse[highlightedVerse.length - 1]
        }`
        mapHighlightedContent = highlightedContent.join(' ')
      } else {
        mapHighlightedVerse = highlightedVerse.join(', ')
        mapHighlightedContent = highlightedContent.join('\n\n')
      }
    } else {
      mapHighlightedVerse = highlightedVerse[0]
      mapHighlightedContent = highlightedContent[0]
    }

    if (!navigator.clipboard) {
      fallbackCopyText(
        `"${mapHighlightedContent}" - ${appBarTitle}:${mapHighlightedVerse} (${bibleVersion.toUpperCase()}) \n\n(Disalin dari https://freedomlife.id)`
      )
      return
    }

    try {
      await navigator.clipboard.writeText(
        `"${mapHighlightedContent}" - ${appBarTitle}:${mapHighlightedVerse} (${bibleVersion.toUpperCase()}) \n\n(Disalin dari https://freedomlife.id)`
      )
      setCopiedSnackbar(true)
      setHighlighted(false)
      setHighlightedText([])
    } catch (err) {
      console.error('Failed to copy: ', err)
      setCopiedSnackbar(false)
    }
  }

  const onCopiedSnackbarClose = (
    _: SyntheticEvent<Element, Event>,
    reason?: string
  ) => {
    if (reason === 'clickaway') return
    setCopiedSnackbar(false)
  }

  return (
    <>
      {highlighted ? (
        <AppBar color="primary">
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              style={{ marginRight: 10 }}
              onClick={removeHighlight}
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" style={{ flexGrow: 1 }}>
              {highlightedText.length} ayat disorot
            </Typography>
            <IconButton edge="end" color="inherit" onClick={copyText}>
              <CopyIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      ) : (
        <HideOnScrollTop {...props}>
          <AppBar className="bible__appbar">
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
                disabled={!data}
                onClick={openTranslate}
              >
                <TranslateIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
        </HideOnScrollTop>
      )}

      {/* Copied Snackbar */}
      <Snackbar
        open={copiedSnackbar}
        autoHideDuration={3000}
        onClose={onCopiedSnackbarClose}
        style={{ bottom: 100 }}
      >
        <Alert onClose={onCopiedSnackbarClose} severity="success">
          Ayat tersalin!
        </Alert>
      </Snackbar>
    </>
  )
}

export default BibleAppBar
