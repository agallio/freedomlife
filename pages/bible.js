import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import { useSelector, useDispatch } from 'react-redux'
import Router from 'next/router'
import {
  Fade,
  AppBar,
  Toolbar,
  IconButton,
  Fab,
  Typography,
  useScrollTrigger,
  Slide,
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core'
import Skeleton from '@material-ui/lab/Skeleton'
import {
  ArrowBack as BackIcon,
  ArrowBackIos as BackIosIcon,
  ArrowForwardIos as NextIosIcon,
  Translate as TranslateIcon,
} from '@material-ui/icons'
import moment from 'moment'
import * as gtag from 'utils/gtag'

import {
  fetchTodayChapter,
  fetchChapterByDate,
  fetchTodayChapter2020,
  fetchChapter2020ByDate,
} from 'actions/bible'
import { fetchGuide2020ByDate, fetchGuide2020Today } from 'actions/guide'

const HideOnScrollTop = (props) => {
  const { children, window } = props
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({ target: window ? window() : undefined })

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  )
}

const Bible = (props) => {
  // Redux State
  const isFetching = useSelector((state) => state.bible.isFetching)
  const chapters = useSelector((state) => state.bible.chapters)
  const new_2020 = useSelector((state) => state.guide.new_2020)
  const guideToday = useSelector((state) => state.guide.guideToday)
  const guide2020Today = useSelector((state) => state.guide.guide2020Today)
  // const guideDate = useSelector(state => state.guide.guideDate);
  // const guideByDate = useSelector(state => state.guide.guideByDate);
  // const guide2020ByDate = useSelector(state => state.guide.guide2020ByDate);
  // Component State
  const [passageModal, setPassageModal] = useState(false)
  const [versionModal, setVersionModal] = useState(false)
  const [bibleVersion, setBibleVersion] = useState('tb')
  const [passage, setPassage] = useState('pl-1')
  // Using Redux Dispatch
  const dispatch = useDispatch()

  // Fetch Today Chapter when the user reloads the `/bible` page
  useEffect(() => {
    if (new_2020) {
      // if (guideDate) {
      //   dispatch(fetchGuide2020ByDate(guideDate))
      //   dispatch(fetchChapter2020ByDate(guideDate));
      // } else {
      //   dispatch(fetchTodayChapter2020());
      // }
      dispatch(fetchGuide2020Today())
      dispatch(fetchTodayChapter2020('tb'))
    } else {
      // if (guideDate) {
      //   dispatch(fetchChapterByDate(guideDate));
      // } else {
      //   dispatch(fetchTodayChapter());
      // }
      dispatch(fetchTodayChapter())
    }
  }, [])

  // Passage Array (Conditional)
  let passageArr = []
  // Logic for fill the `passageArr` array
  if (new_2020) {
    if (
      chapters.pl !== undefined &&
      chapters.pb !== undefined &&
      chapters.alt === undefined
    ) {
      switch (passage) {
        case 'pl-1':
          passageArr = chapters.pl.find((item) => item.passagePlace === 'pl-1')
            .data
          break
        case 'pl-2':
          passageArr = chapters.pl.find((item) => item.passagePlace === 'pl-2')
            .data
          break
        case 'pl-3':
          passageArr = chapters.pl.find((item) => item.passagePlace === 'pl-3')
            .data
          break
        case 'pl-4':
          passageArr = chapters.pl.find((item) => item.passagePlace === 'pl-4')
            .data
          break
        case 'pb':
          passageArr = chapters.pb.find((item) => item.passagePlace === 'pb')
            .data
          break

        default:
          break
      }
    } else if (
      chapters.pl !== undefined &&
      chapters.pb !== undefined &&
      chapters.alt !== undefined
    ) {
      switch (passage) {
        case 'pl-1':
          passageArr = chapters.pl.find((item) => item.passagePlace === 'pl-1')
            .data
          break
        case 'pl-2':
          passageArr = chapters.pl.find((item) => item.passagePlace === 'pl-2')
            .data
          break
        case 'pl-3':
          passageArr = chapters.pl.find((item) => item.passagePlace === 'pl-3')
            .data
          break
        case 'pl-4':
          passageArr = chapters.pl.find((item) => item.passagePlace === 'pl-4')
            .data
          break
        case 'pb':
          passageArr = chapters.pb.find((item) => item.passagePlace === 'pb')
            .data
          break
        case 'alt-1':
          passageArr = chapters.alt.find(
            (item) => item.passagePlace === 'alt-1'
          ).data
          break
        case 'alt-2':
          passageArr = chapters.alt.find(
            (item) => item.passagePlace === 'alt-2'
          ).data
          break

        default:
          break
      }
    }
  } else {
    if (
      chapters.pl !== undefined &&
      chapters.pb1 !== undefined &&
      chapters.pb2 !== undefined
    ) {
      switch (passage) {
        case 'pl-1':
          passageArr = chapters.pl.find((item) => item.passagePlace === 'pl-1')
            .data
          break
        case 'pl-2':
          passageArr = chapters.pl.find((item) => item.passagePlace === 'pl-2')
            .data
          break
        case 'pl-3':
          passageArr = chapters.pl.find((item) => item.passagePlace === 'pl-3')
            .data
          break
        case 'pb1':
          passageArr = chapters.pb1.find((item) => item.passagePlace === 'pb1')
            .data
          break
        case 'pb2':
          passageArr = chapters.pb2.find((item) => item.passagePlace === 'pb2')
            .data
          break

        default:
          break
      }
    }
  }

  // Scroll to top function
  const topFunction = () => {
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
  }

  const nextPassage = async () => {
    const currChapter = chapters.passage
    const currPassage = currChapter.find((i) => i === passage)
    const currPassageIndex = currChapter.findIndex((i) => i === passage)

    if (currPassage) {
      topFunction()
      setPassage(currChapter[currPassageIndex + 1])
    }

    // Google Analytics
    gtag.event({
      action: 'next_bible',
      category: 'Bible',
      label: `Read Bible ${moment().format('DD-MM-YYYY HH:mm:ss')}`,
    })
  }

  const backPassage = async () => {
    const currChapter = chapters.passage
    const currPassage = currChapter.find((i) => i === passage)
    const currPassageIndex = currChapter.findIndex((i) => i === passage)

    if (currPassage) {
      topFunction()
      setPassage(currChapter[currPassageIndex - 1])
    }

    // Google Analytics
    gtag.event({
      action: 'back_bible',
      category: 'Bible',
      label: `Read Bible ${moment().format('DD-MM-YYYY HH:mm:ss')}`,
    })
  }

  // Split the `pl` passage for the passage title
  // const plSpaceSplit = guideDate
  //   ? guideByDate.pl_name.split(' ')
  //   : guideToday.pl_name.split(' ');
  const plSpaceSplit = new_2020
    ? guide2020Today.pl_name.split(' ')
    : guideToday.pl_name.split(' ')
  const altSpaceSplit = guide2020Today.alt_name
    ? guide2020Today.alt_name.split(' ')
    : ''

  const plDashSplit =
    plSpaceSplit.length === 3
      ? plSpaceSplit[2] !== undefined && plSpaceSplit[2].split('-')
      : plSpaceSplit[1] !== undefined && plSpaceSplit[1].split('-')
  let plList = []
  for (let i = Number(plDashSplit[0]); i <= Number(plDashSplit[1]); i++) {
    plList.push(i)
  }

  const altDashSplit =
    altSpaceSplit.length !== 0
      ? altSpaceSplit[1] !== undefined && altSpaceSplit[1].split('-')
      : ''
  let altList = []
  for (let i = Number(altDashSplit[0]); i <= Number(altDashSplit[1]); i++) {
    altList.push(i)
  }

  const passageChapter = () => {
    if (isFetching) {
      return 'Memuat'
    } else {
      if (new_2020) {
        switch (passage) {
          case 'pl-1':
            return plSpaceSplit.length === 3
              ? `${plSpaceSplit[0]} ${plSpaceSplit[1]} ${
                  plList.length === 0 ? plSpaceSplit[2] : plList[0]
                } ${
                  bibleVersion !== 'tb' ? `(${bibleVersion.toUpperCase()})` : ''
                }`
              : `${plSpaceSplit[0]} ${
                  plList.length === 0 ? plSpaceSplit[1] : plList[0]
                } ${
                  bibleVersion !== 'tb' ? `(${bibleVersion.toUpperCase()})` : ''
                }`

          case 'pl-2':
            return plSpaceSplit.length === 3
              ? `${plSpaceSplit[0]} ${plSpaceSplit[1]} ${plList[1]} ${
                  bibleVersion !== 'tb' ? `(${bibleVersion.toUpperCase()})` : ''
                }`
              : `${plSpaceSplit[0]} ${plList[1]} ${
                  bibleVersion !== 'tb' ? `(${bibleVersion.toUpperCase()})` : ''
                }`

          case 'pl-3':
            return plSpaceSplit.length === 3
              ? `${plSpaceSplit[0]} ${plSpaceSplit[1]} ${plList[2]} ${
                  bibleVersion !== 'tb' ? `(${bibleVersion.toUpperCase()})` : ''
                }`
              : `${plSpaceSplit[0]} ${plList[2]} ${
                  bibleVersion !== 'tb' ? `(${bibleVersion.toUpperCase()})` : ''
                }`

          case 'pl-4':
            return plSpaceSplit.length === 3
              ? `${plSpaceSplit[0]} ${plSpaceSplit[1]} ${plList[3]} ${
                  bibleVersion !== 'tb' ? `(${bibleVersion.toUpperCase()})` : ''
                }`
              : `${plSpaceSplit[0]} ${plList[3]} ${
                  bibleVersion !== 'tb' ? `(${bibleVersion.toUpperCase()})` : ''
                }`

          case 'pb':
            return bibleVersion !== 'tb'
              ? `${guide2020Today.pb_name} (${bibleVersion.toUpperCase()})`
              : guide2020Today.pb_name

          case 'alt-1':
            return altList.length > 1
              ? bibleVersion !== 'tb'
                ? `${altSpaceSplit[0]} ${
                    altList[0]
                  } (${bibleVersion.toUpperCase()})`
                : `${altSpaceSplit[0]} ${altList[0]}`
              : altSpaceSplit.length > 3
              ? `${altSpaceSplit[0]} ${altSpaceSplit[1]} ${altSpaceSplit[2]} ${altSpaceSplit[3]}`
              : altSpaceSplit.length > 2
              ? `${altSpaceSplit[0]} ${altSpaceSplit[1]} ${altSpaceSplit[2]}`
              : `${altSpaceSplit[0]} ${altSpaceSplit[1]}`

          case 'alt-2':
            return altList.length > 1
              ? bibleVersion !== 'tb'
                ? `${altSpaceSplit[0]} ${
                    altList[1]
                  } (${bibleVersion.toUpperCase()})`
                : `${altSpaceSplit[0]} ${altList[1]}`
              : `${altSpaceSplit[0]} ${altSpaceSplit[1]}`

          default:
            return ''
        }
      } else {
        return passage === 'pl-1'
          ? plSpaceSplit.length === 3
            ? `${plSpaceSplit[0]} ${plSpaceSplit[1]} ${
                plListlength === 0 ? plSpaceSplit[2] : plList[0]
              }`
            : `${plSpaceSplit[0]} ${
                plListlength === 0 ? plSpaceSplit[1] : plList[0]
              }`
          : passage === 'pl-2'
          ? plSpaceSplit.length === 3
            ? `${plSpaceSplit[0]} ${plSpaceSplit[1]} ${plList[1]}`
            : `${plSpaceSplit[0]} ${plList[1]}`
          : passage === 'pl-3'
          ? plSpaceSplit.length === 3
            ? `${plSpaceSplit[0]} ${plSpaceSplit[1]} ${plList[2]}`
            : `${plSpaceSplit[0]} ${plList[2]}`
          : passage === 'pb1'
          ? guideToday.pb1_name
          : passage === 'pb2'
          ? guideToday.pb2_name
          : ''
      }
    }
  }

  return (
    <Fade in>
      <div className="bible-container">
        <Head>
          <title>Pembacaan Firman | FreedomLife</title>
        </Head>
        <HideOnScrollTop {...props}>
          <AppBar>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={() => Router.push('/')}
                style={{ marginRight: 10 }}
              >
                <BackIcon />
              </IconButton>
              <Typography variant="h6" style={{ flexGrow: 1 }}>
                {passageChapter()}
              </Typography>
              <IconButton
                edge="end"
                color="inherit"
                disabled={isFetching}
                onClick={() => setVersionModal(true)}
              >
                <TranslateIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
        </HideOnScrollTop>

        <div className={isFetching ? 'bible-passage-loading' : 'bible-passage'}>
          {isFetching ? (
            <>
              <Skeleton
                variant="text"
                animation="wave"
                width="50%"
                height={50}
                style={{ marginBottom: 20 }}
              />
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item) => (
                <Skeleton
                  key={item}
                  variant="text"
                  animation="wave"
                  width="90%"
                  height={30}
                  style={{ marginBottom: 5 }}
                />
              ))}
            </>
          ) : (
            passageArr.map((item, index) => {
              if (item.type === 'title') {
                return (
                  <Typography
                    key={index}
                    className="bold-text bible-title"
                    variant="h5"
                  >
                    {item.content || ''}
                  </Typography>
                )
              } else {
                return (
                  <Typography key={index} className="regular-text bible-verse">
                    <sup className="bible-verse-sup">{item.verse || ''}</sup>{' '}
                    {item.content || ''}
                  </Typography>
                )
              }
            })
          )}
        </div>

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
                zIindex: 1,
                top: -30,
                left: 0,
                right: 0,
                margin: '0 auto',
              }}
              disabled={isFetching}
              onClick={() => setPassageModal(true)}
            >
              {isFetching ? '-' : passage.toUpperCase()}
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
                  : guide2020Today.alt_name
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

        <Dialog
          onClose={() => setPassageModal(false)}
          open={passageModal}
          PaperProps={{ className: 'modal-passage' }}
        >
          <DialogTitle className="modal-passage-title">
            Pilih Panduan Baca
          </DialogTitle>
          {new_2020 ? (
            <List>
              <ListItem button>
                <ListItemText
                  primary="Perjanjian Lama 1"
                  secondary={
                    plSpaceSplit.length === 3
                      ? `${plSpaceSplit[0]} ${plSpaceSplit[1]} ${
                          plList.length === 0 ? plSpaceSplit[2] : plList[0]
                        }`
                      : `${plSpaceSplit[0]} ${
                          plList.length === 0 ? plSpaceSplit[1] : plList[0]
                        }`
                  }
                  className="modal-passage-list-text"
                  secondaryTypographyProps={{
                    className: 'modal-passage-list-text-secondary',
                  }}
                  onClick={() => {
                    setPassage('pl-1')
                    setPassageModal(false)
                    topFunction()
                    // Google Analytics
                    gtag.event({
                      action: 'to_passage_pl_1',
                      category: 'Bible',
                      label: `Read Bible (PL-1) ${moment().format(
                        'DD-MM-YYYY HH:mm:ss'
                      )}`,
                    })
                  }}
                ></ListItemText>
              </ListItem>
              {plList.length > 1 && (
                <ListItem button>
                  <ListItemText
                    primary="Perjanjian Lama 2"
                    secondary={
                      plSpaceSplit.length === 3
                        ? `${plSpaceSplit[0]} ${plSpaceSplit[1]} ${plList[1]}`
                        : `${plSpaceSplit[0]} ${plList[1]}`
                    }
                    className="modal-passage-list-text"
                    secondaryTypographyProps={{
                      className: 'modal-passage-list-text-secondary',
                    }}
                    onClick={() => {
                      setPassage('pl-2')
                      setPassageModal(false)
                      topFunction()
                      // Google Analytics
                      gtag.event({
                        action: 'to_passage_pl_2',
                        category: 'Bible',
                        label: `Read Bible (PL-2) ${moment().format(
                          'DD-MM-YYYY HH:mm:ss'
                        )}`,
                      })
                    }}
                  ></ListItemText>
                </ListItem>
              )}
              {plList.length > 2 && (
                <ListItem button>
                  <ListItemText
                    primary="Perjanjian Lama 3"
                    secondary={
                      plSpaceSplit.length === 3
                        ? `${plSpaceSplit[0]} ${plSpaceSplit[1]} ${plList[2]}`
                        : `${plSpaceSplit[0]} ${plList[2]}`
                    }
                    className="modal-passage-list-text"
                    secondaryTypographyProps={{
                      className: 'modal-passage-list-text-secondary',
                    }}
                    onClick={() => {
                      setPassage('pl-3')
                      setPassageModal(false)
                      topFunction()
                      // Google Analytics
                      gtag.event({
                        action: 'to_passage_pl_3',
                        category: 'Bible',
                        label: `Read Bible (PL-3) ${moment().format(
                          'DD-MM-YYYY HH:mm:ss'
                        )}`,
                      })
                    }}
                  ></ListItemText>
                </ListItem>
              )}
              {plList.length > 3 && (
                <ListItem button>
                  <ListItemText
                    primary="Perjanjian Lama 4"
                    secondary={
                      plSpaceSplit.length === 3
                        ? `${plSpaceSplit[0]} ${plSpaceSplit[1]} ${plList[3]}`
                        : `${plSpaceSplit[0]} ${plList[3]}`
                    }
                    className="modal-passage-list-text"
                    secondaryTypographyProps={{
                      className: 'modal-passage-list-text-secondary',
                    }}
                    onClick={() => {
                      setPassage('pl-4')
                      setPassageModal(false)
                      topFunction()
                      // Google Analytics
                      gtag.event({
                        action: 'to_passage_pl_4',
                        category: 'Bible',
                        label: `Read Bible (PL-4) ${moment().format(
                          'DD-MM-YYYY HH:mm:ss'
                        )}`,
                      })
                    }}
                  ></ListItemText>
                </ListItem>
              )}
              <ListItem button>
                <ListItemText
                  primary="Perjanjian Baru"
                  secondary={
                    new_2020
                      ? guide2020Today.pb_name
                      : guideToday.pb1_name || ''
                  }
                  className="modal-passage-list-text"
                  secondaryTypographyProps={{
                    className: 'modal-passage-list-text-secondary',
                  }}
                  onClick={() => {
                    setPassage('pb')
                    setPassageModal(false)
                    topFunction()
                    // Google Analytics
                    gtag.event({
                      action: 'to_passage_pb',
                      category: 'Bible',
                      label: `Read Bible (PB) ${moment().format(
                        'DD-MM-YYYY HH:mm:ss'
                      )}`,
                    })
                  }}
                ></ListItemText>
              </ListItem>
              {guide2020Today.alt_name && altList.length === 0 && (
                <ListItem button>
                  <ListItemText
                    primary="Tambahan"
                    secondary={guide2020Today.alt_name}
                    className="modal-passage-list-text"
                    secondaryTypographyProps={{
                      className: 'modal-passage-list-text-secondary',
                    }}
                    onClick={() => {
                      setPassage('alt-1')
                      setPassageModal(false)
                      topFunction()
                      // Google Analytics
                      gtag.event({
                        action: 'to_passage_alt_1',
                        category: 'Bible',
                        label: `Read Bible (PB) ${moment().format(
                          'DD-MM-YYYY HH:mm:ss'
                        )}`,
                      })
                    }}
                  ></ListItemText>
                </ListItem>
              )}
              {guide2020Today.alt_name && altList.length > 1 && (
                <>
                  <ListItem button>
                    <ListItemText
                      primary="Tambahan 1"
                      secondary={`${altSpaceSplit[0]} ${altList[0]}`}
                      className="modal-passage-list-text"
                      secondaryTypographyProps={{
                        className: 'modal-passage-list-text-secondary',
                      }}
                      onClick={() => {
                        setPassage('alt-1')
                        setPassageModal(false)
                        topFunction()
                        // Google Analytics
                        gtag.event({
                          action: 'to_passage_alt_1',
                          category: 'Bible',
                          label: `Read Bible (PB) ${moment().format(
                            'DD-MM-YYYY HH:mm:ss'
                          )}`,
                        })
                      }}
                    ></ListItemText>
                  </ListItem>
                  <ListItem button>
                    <ListItemText
                      primary="Tambahan 2"
                      secondary={`${altSpaceSplit[0]} ${altList[1]}`}
                      className="modal-passage-list-text"
                      secondaryTypographyProps={{
                        className: 'modal-passage-list-text-secondary',
                      }}
                      onClick={() => {
                        setPassage('alt-2')
                        setPassageModal(false)
                        topFunction()
                        // Google Analytics
                        gtag.event({
                          action: 'to_passage_alt_2',
                          category: 'Bible',
                          label: `Read Bible (PB) ${moment().format(
                            'DD-MM-YYYY HH:mm:ss'
                          )}`,
                        })
                      }}
                    ></ListItemText>
                  </ListItem>
                </>
              )}
            </List>
          ) : (
            <List>
              <ListItem button>
                <ListItemText
                  primary="Perjanjian Lama 1"
                  secondary={
                    plSpaceSplit.length === 3
                      ? `${plSpaceSplit[0]} ${plSpaceSplit[1]} ${
                          plList.length === 0 ? plSpaceSplit[2] : plList[0]
                        }`
                      : `${plSpaceSplit[0]} ${
                          plList.length === 0 ? plSpaceSplit[1] : plList[0]
                        }`
                  }
                  className="modal-passage-list-text"
                  secondaryTypographyProps={{
                    className: 'modal-passage-list-text-secondary',
                  }}
                  onClick={() => {
                    setPassage('pl-1')
                    setPassageModal(false)
                    topFunction()
                  }}
                ></ListItemText>
              </ListItem>
              {plList.length > 1 && (
                <ListItem button>
                  <ListItemText
                    primary="Perjanjian Lama 2"
                    secondary={
                      plSpaceSplit.length === 3
                        ? `${plSpaceSplit[0]} ${plSpaceSplit[1]} ${plList[1]}`
                        : `${plSpaceSplit[0]} ${plList[1]}`
                    }
                    className="modal-passage-list-text"
                    secondaryTypographyProps={{
                      className: 'modal-passage-list-text-secondary',
                    }}
                    onClick={() => {
                      setPassage('pl-2')
                      setPassageModal(false)
                      topFunction()
                    }}
                  ></ListItemText>
                </ListItem>
              )}
              {plList.length > 2 && (
                <ListItem button>
                  <ListItemText
                    primary="Perjanjian Lama 3"
                    secondary={
                      plSpaceSplit.length === 3
                        ? `${plSpaceSplit[0]} ${plSpaceSplit[1]} ${plList[2]}`
                        : `${plSpaceSplit[0]} ${plList[2]}`
                    }
                    className="modal-passage-list-text"
                    secondaryTypographyProps={{
                      className: 'modal-passage-list-text-secondary',
                    }}
                    onClick={() => {
                      setPassage('pl-3')
                      setPassageModal(false)
                      topFunction()
                    }}
                  ></ListItemText>
                </ListItem>
              )}
              <ListItem button>
                <ListItemText
                  primary="Perjanjian Baru 1"
                  secondary={guideToday.pb1_name || ''}
                  className="modal-passage-list-text"
                  secondaryTypographyProps={{
                    className: 'modal-passage-list-text-secondary',
                  }}
                  onClick={() => {
                    setPassage('pb1')
                    setPassageModal(false)
                    topFunction()
                  }}
                ></ListItemText>
              </ListItem>
              <ListItem button>
                <ListItemText
                  primary="Perjanjian Baru 2"
                  secondary={guideToday.pb2_name || ''}
                  className="modal-passage-list-text"
                  secondaryTypographyProps={{
                    className: 'modal-passage-list-text-secondary',
                  }}
                  onClick={() => {
                    setPassage('pb2')
                    setPassageModal(false)
                    topFunction()
                  }}
                ></ListItemText>
              </ListItem>
            </List>
          )}
        </Dialog>

        {/* Bible Version Dialog */}
        <Dialog
          onClose={() => setVersionModal(false)}
          open={versionModal}
          PaperProps={{ className: 'modal-passage' }}
        >
          <DialogTitle className="modal-passage-title">
            Pilih Versi Alkitab
          </DialogTitle>
          <List>
            <ListItem button>
              <ListItemText
                primary="TB"
                secondary="Terjemahan Baru"
                className="modal-passage-list-text"
                secondaryTypographyProps={{
                  className: 'modal-passage-list-text-secondary',
                }}
                onClick={() => {
                  dispatch(fetchTodayChapter2020('tb'))
                  setBibleVersion('tb')
                  setVersionModal(false)
                  topFunction()
                }}
              ></ListItemText>
            </ListItem>
            <ListItem button>
              <ListItemText
                primary="BIS"
                secondary="Bahasa Indonesia Sehari-Hari"
                className="modal-passage-list-text"
                secondaryTypographyProps={{
                  className: 'modal-passage-list-text-secondary',
                }}
                onClick={() => {
                  dispatch(fetchTodayChapter2020('bis'))
                  setBibleVersion('bis')
                  setVersionModal(false)
                  topFunction()
                }}
              ></ListItemText>
            </ListItem>
            <ListItem button>
              <ListItemText
                primary="FAYH"
                secondary="Firman Allah Yang Hidup"
                className="modal-passage-list-text"
                secondaryTypographyProps={{
                  className: 'modal-passage-list-text-secondary',
                }}
                onClick={() => {
                  dispatch(fetchTodayChapter2020('fayh'))
                  setBibleVersion('fayh')
                  setVersionModal(false)
                  topFunction()
                }}
              ></ListItemText>
            </ListItem>
            <ListItem button>
              <ListItemText
                primary="MSG"
                secondary="The Message"
                className="modal-passage-list-text"
                secondaryTypographyProps={{
                  className: 'modal-passage-list-text-secondary',
                }}
                onClick={() => {
                  dispatch(fetchTodayChapter2020('msg'))
                  setBibleVersion('msg')
                  setVersionModal(false)
                  topFunction()
                }}
              ></ListItemText>
            </ListItem>
            <ListItem button>
              <ListItemText
                primary="NKJV"
                secondary="New King James Version"
                className="modal-passage-list-text"
                secondaryTypographyProps={{
                  className: 'modal-passage-list-text-secondary',
                }}
                onClick={() => {
                  dispatch(fetchTodayChapter2020('nkjv'))
                  setBibleVersion('nkjv')
                  setVersionModal(false)
                  topFunction()
                }}
              ></ListItemText>
            </ListItem>
          </List>
        </Dialog>
      </div>
    </Fade>
  )
}

export default Bible
