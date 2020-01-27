import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Router from 'next/router';
import {
  Fade,
  AppBar,
  Toolbar,
  IconButton,
  Fab,
  Typography,
  useScrollTrigger,
  Slide,
  CircularProgress,
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemText
} from '@material-ui/core';
import {
  ArrowBack as BackIcon,
  ArrowBackIos as BackIosIcon,
  ArrowForwardIos as NextIosIcon,
  Translate as TranslateIcon
} from '@material-ui/icons';

import {
  fetchTodayChapter,
  fetchChapterByDate,
  fetchTodayChapter2020,
  fetchChapter2020ByDate
} from '../src/actions/bible';
import {
  fetchGuide2020ByDate,
  fetchGuide2020Today
} from '../src/actions/guide';

import { logPageView } from '../src/utils/analytics';

const HideOnScrollTop = props => {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({ target: window ? window() : undefined });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
};

const Bible = props => {
  // Redux State
  const isFetching = useSelector(state => state.bible.isFetching);
  const chapters = useSelector(state => state.bible.chapters);
  const new_2020 = useSelector(state => state.guide.new_2020);
  const guideToday = useSelector(state => state.guide.guideToday);
  const guide2020Today = useSelector(state => state.guide.guide2020Today);
  // const guideDate = useSelector(state => state.guide.guideDate);
  // const guideByDate = useSelector(state => state.guide.guideByDate);
  // const guide2020ByDate = useSelector(state => state.guide.guide2020ByDate);
  // Component State
  const [passageModal, setPassageModal] = useState(false);
  const [versionModal, setVersionModal] = useState(false);
  const [bibleVersion, setBibleVersion] = useState('tb');
  const [passage, setPassage] = useState('pl-1');
  // Using Redux Dispatch
  const dispatch = useDispatch();

  // Fetch Today Chapter when the user reloads the `/bible` page
  useEffect(() => {
    logPageView();
    if (new_2020) {
      // if (guideDate) {
      //   dispatch(fetchGuide2020ByDate(guideDate))
      //   dispatch(fetchChapter2020ByDate(guideDate));
      // } else {
      //   dispatch(fetchTodayChapter2020());
      // }
      dispatch(fetchGuide2020Today());
      dispatch(fetchTodayChapter2020('tb'));
    } else {
      // if (guideDate) {
      //   dispatch(fetchChapterByDate(guideDate));
      // } else {
      //   dispatch(fetchTodayChapter());
      // }
      dispatch(fetchTodayChapter());
    }
  }, []);

  // Passage Array (Conditional)
  let passageArr = [];
  // Logic for fill the `passageArr` array
  if (new_2020) {
    if (chapters.pl !== undefined && chapters.pb !== undefined) {
      switch (passage) {
        case 'pl-1':
          passageArr = chapters.pl.find(item => item.passagePlace === 'pl-1')
            .data;
          break;
        case 'pl-2':
          passageArr = chapters.pl.find(item => item.passagePlace === 'pl-2')
            .data;
          break;
        case 'pl-3':
          passageArr = chapters.pl.find(item => item.passagePlace === 'pl-3')
            .data;
          break;
        case 'pl-4':
          passageArr = chapters.pl.find(item => item.passagePlace === 'pl-4')
            .data;
        case 'pb':
          passageArr = chapters.pb.find(item => item.passagePlace === 'pb')
            .data;
          break;

        default:
          break;
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
          passageArr = chapters.pl.find(item => item.passagePlace === 'pl-1')
            .data;
          break;
        case 'pl-2':
          passageArr = chapters.pl.find(item => item.passagePlace === 'pl-2')
            .data;
          break;
        case 'pl-3':
          passageArr = chapters.pl.find(item => item.passagePlace === 'pl-3')
            .data;
          break;
        case 'pb1':
          passageArr = chapters.pb1.find(item => item.passagePlace === 'pb1')
            .data;
          break;
        case 'pb2':
          passageArr = chapters.pb2.find(item => item.passagePlace === 'pb2')
            .data;
          break;

        default:
          break;
      }
    }
  }

  // Scroll to top function
  const topFunction = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };

  const nextPassage = async () => {
    const currChapter = chapters.passage;
    const currPassage = currChapter.find(i => i === passage);
    const currPassageIndex = currChapter.findIndex(i => i === passage);

    if (currPassage) {
      topFunction();
      setPassage(currChapter[currPassageIndex + 1]);
    }
  };

  const backPassage = async () => {
    const currChapter = chapters.passage;
    const currPassage = currChapter.find(i => i === passage);
    const currPassageIndex = currChapter.findIndex(i => i === passage);

    if (currPassage) {
      topFunction();
      setPassage(currChapter[currPassageIndex - 1]);
    }
  };

  // Split the `pl` passage for the passage title
  // const plSpaceSplit = guideDate
  //   ? guideByDate.pl_name.split(' ')
  //   : guideToday.pl_name.split(' ');
  const plSpaceSplit = new_2020
    ? guide2020Today.pl_name.split(' ')
    : guideToday.pl_name.split(' ');
  const plDashSplit =
    plSpaceSplit.length === 3
      ? plSpaceSplit[2] !== undefined && plSpaceSplit[2].split('-')
      : plSpaceSplit[1] !== undefined && plSpaceSplit[1].split('-');
  let list = [];
  for (let i = Number(plDashSplit[0]); i <= Number(plDashSplit[1]); i++) {
    list.push(i);
  }

  const passageChapter = () => {
    if (isFetching) {
      return 'Memuat';
    } else {
      if (new_2020) {
        switch (passage) {
          case 'pl-1':
            return plSpaceSplit.length === 3
              ? `${plSpaceSplit[0]} ${plSpaceSplit[1]} ${
                  list.length === 0 ? plSpaceSplit[2] : list[0]
                } ${
                  bibleVersion !== 'tb' ? `(${bibleVersion.toUpperCase()})` : ''
                }`
              : `${plSpaceSplit[0]} ${
                  list.length === 0 ? plSpaceSplit[1] : list[0]
                } ${
                  bibleVersion !== 'tb' ? `(${bibleVersion.toUpperCase()})` : ''
                }`;

          case 'pl-2':
            return plSpaceSplit.length === 3
              ? `${plSpaceSplit[0]} ${plSpaceSplit[1]} ${list[1]} ${
                  bibleVersion !== 'tb' ? `(${bibleVersion.toUpperCase()})` : ''
                }`
              : `${plSpaceSplit[0]} ${list[1]} ${
                  bibleVersion !== 'tb' ? `(${bibleVersion.toUpperCase()})` : ''
                }`;

          case 'pl-3':
            return plSpaceSplit.length === 3
              ? `${plSpaceSplit[0]} ${plSpaceSplit[1]} ${list[2]} ${
                  bibleVersion !== 'tb' ? `(${bibleVersion.toUpperCase()})` : ''
                }`
              : `${plSpaceSplit[0]} ${list[2]} ${
                  bibleVersion !== 'tb' ? `(${bibleVersion.toUpperCase()})` : ''
                }`;

          case 'pl-4':
            return plSpaceSplit.length === 3
              ? `${plSpaceSplit[0]} ${plSpaceSplit[1]} ${list[3]} ${
                  bibleVersion !== 'tb' ? `(${bibleVersion.toUpperCase()})` : ''
                }`
              : `${plSpaceSplit[0]} ${list[3]} ${
                  bibleVersion !== 'tb' ? `(${bibleVersion.toUpperCase()})` : ''
                }`;

          case 'pb':
            return bibleVersion !== 'tb'
              ? `${guide2020Today.pb_name} (${bibleVersion.toUpperCase()})`
              : guide2020Today.pb_name;

          default:
            return '';
        }
      } else {
        return passage === 'pl-1'
          ? plSpaceSplit.length === 3
            ? `${plSpaceSplit[0]} ${plSpaceSplit[1]} ${
                list.length === 0 ? plSpaceSplit[2] : list[0]
              }`
            : `${plSpaceSplit[0]} ${
                list.length === 0 ? plSpaceSplit[1] : list[0]
              }`
          : passage === 'pl-2'
          ? plSpaceSplit.length === 3
            ? `${plSpaceSplit[0]} ${plSpaceSplit[1]} ${list[1]}`
            : `${plSpaceSplit[0]} ${list[1]}`
          : passage === 'pl-3'
          ? plSpaceSplit.length === 3
            ? `${plSpaceSplit[0]} ${plSpaceSplit[1]} ${list[2]}`
            : `${plSpaceSplit[0]} ${list[2]}`
          : passage === 'pb1'
          ? guideToday.pb1_name
          : passage === 'pb2'
          ? guideToday.pb2_name
          : '';
      }
    }
  };

  return (
    <Fade in>
      <div className="bible-container">
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
            <CircularProgress color="secondary" />
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
                );
              } else {
                return (
                  <Typography key={index} className="regular-text bible-verse">
                    <sup className="bible-verse-sup">{item.verse || ''}</sup>{' '}
                    {item.content || ''}
                  </Typography>
                );
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
              color="secondary"
              style={{
                position: 'absolute',
                zIindex: 1,
                top: -30,
                left: 0,
                right: 0,
                margin: '0 auto'
              }}
              disabled={isFetching}
              onClick={() => setPassageModal(true)}
            >
              {isFetching ? '-' : passage.toUpperCase()}
            </Fab>
            <div
              style={{
                flexGrow: 1
              }}
            />
            <IconButton
              edge="end"
              color="inherit"
              disabled={isFetching || passage === 'pb2' || passage === 'pb'}
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
                          list.length === 0 ? plSpaceSplit[2] : list[0]
                        }`
                      : `${plSpaceSplit[0]} ${
                          list.length === 0 ? plSpaceSplit[1] : list[0]
                        }`
                  }
                  className="modal-passage-list-text"
                  secondaryTypographyProps={{
                    className: 'modal-passage-list-text-secondary'
                  }}
                  onClick={() => {
                    setPassage('pl-1');
                    setPassageModal(false);
                    topFunction();
                  }}
                ></ListItemText>
              </ListItem>
              {list.length > 1 && (
                <ListItem button>
                  <ListItemText
                    primary="Perjanjian Lama 2"
                    secondary={
                      plSpaceSplit.length === 3
                        ? `${plSpaceSplit[0]} ${plSpaceSplit[1]} ${list[1]}`
                        : `${plSpaceSplit[0]} ${list[1]}`
                    }
                    className="modal-passage-list-text"
                    secondaryTypographyProps={{
                      className: 'modal-passage-list-text-secondary'
                    }}
                    onClick={() => {
                      setPassage('pl-2');
                      setPassageModal(false);
                      topFunction();
                    }}
                  ></ListItemText>
                </ListItem>
              )}
              {list.length > 2 && (
                <ListItem button>
                  <ListItemText
                    primary="Perjanjian Lama 3"
                    secondary={
                      plSpaceSplit.length === 3
                        ? `${plSpaceSplit[0]} ${plSpaceSplit[1]} ${list[2]}`
                        : `${plSpaceSplit[0]} ${list[2]}`
                    }
                    className="modal-passage-list-text"
                    secondaryTypographyProps={{
                      className: 'modal-passage-list-text-secondary'
                    }}
                    onClick={() => {
                      setPassage('pl-3');
                      setPassageModal(false);
                      topFunction();
                    }}
                  ></ListItemText>
                </ListItem>
              )}
              {list.length > 3 && (
                <ListItem button>
                  <ListItemText
                    primary="Perjanjian Lama 4"
                    secondary={
                      plSpaceSplit.length === 3
                        ? `${plSpaceSplit[0]} ${plSpaceSplit[1]} ${list[3]}`
                        : `${plSpaceSplit[0]} ${list[3]}`
                    }
                    className="modal-passage-list-text"
                    secondaryTypographyProps={{
                      className: 'modal-passage-list-text-secondary'
                    }}
                    onClick={() => {
                      setPassage('pl-4');
                      setPassageModal(false);
                      topFunction();
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
                    className: 'modal-passage-list-text-secondary'
                  }}
                  onClick={() => {
                    setPassage('pb');
                    setPassageModal(false);
                    topFunction();
                  }}
                ></ListItemText>
              </ListItem>
            </List>
          ) : (
            <List>
              <ListItem button>
                <ListItemText
                  primary="Perjanjian Lama 1"
                  secondary={
                    plSpaceSplit.length === 3
                      ? `${plSpaceSplit[0]} ${plSpaceSplit[1]} ${
                          list.length === 0 ? plSpaceSplit[2] : list[0]
                        }`
                      : `${plSpaceSplit[0]} ${
                          list.length === 0 ? plSpaceSplit[1] : list[0]
                        }`
                  }
                  className="modal-passage-list-text"
                  secondaryTypographyProps={{
                    className: 'modal-passage-list-text-secondary'
                  }}
                  onClick={() => {
                    setPassage('pl-1');
                    setPassageModal(false);
                    topFunction();
                  }}
                ></ListItemText>
              </ListItem>
              {list.length > 1 && (
                <ListItem button>
                  <ListItemText
                    primary="Perjanjian Lama 2"
                    secondary={
                      plSpaceSplit.length === 3
                        ? `${plSpaceSplit[0]} ${plSpaceSplit[1]} ${list[1]}`
                        : `${plSpaceSplit[0]} ${list[1]}`
                    }
                    className="modal-passage-list-text"
                    secondaryTypographyProps={{
                      className: 'modal-passage-list-text-secondary'
                    }}
                    onClick={() => {
                      setPassage('pl-2');
                      setPassageModal(false);
                      topFunction();
                    }}
                  ></ListItemText>
                </ListItem>
              )}
              {list.length > 2 && (
                <ListItem button>
                  <ListItemText
                    primary="Perjanjian Lama 3"
                    secondary={
                      plSpaceSplit.length === 3
                        ? `${plSpaceSplit[0]} ${plSpaceSplit[1]} ${list[2]}`
                        : `${plSpaceSplit[0]} ${list[2]}`
                    }
                    className="modal-passage-list-text"
                    secondaryTypographyProps={{
                      className: 'modal-passage-list-text-secondary'
                    }}
                    onClick={() => {
                      setPassage('pl-3');
                      setPassageModal(false);
                      topFunction();
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
                    className: 'modal-passage-list-text-secondary'
                  }}
                  onClick={() => {
                    setPassage('pb1');
                    setPassageModal(false);
                    topFunction();
                  }}
                ></ListItemText>
              </ListItem>
              <ListItem button>
                <ListItemText
                  primary="Perjanjian Baru 2"
                  secondary={guideToday.pb2_name || ''}
                  className="modal-passage-list-text"
                  secondaryTypographyProps={{
                    className: 'modal-passage-list-text-secondary'
                  }}
                  onClick={() => {
                    setPassage('pb2');
                    setPassageModal(false);
                    topFunction();
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
                  className: 'modal-passage-list-text-secondary'
                }}
                onClick={() => {
                  dispatch(fetchTodayChapter2020('tb'));
                  setBibleVersion('tb');
                  setVersionModal(false);
                  topFunction();
                }}
              ></ListItemText>
            </ListItem>
            <ListItem button>
              <ListItemText
                primary="BIS"
                secondary="Bahasa Indonesia Sehari-Hari"
                className="modal-passage-list-text"
                secondaryTypographyProps={{
                  className: 'modal-passage-list-text-secondary'
                }}
                onClick={() => {
                  dispatch(fetchTodayChapter2020('bis'));
                  setBibleVersion('bis');
                  setVersionModal(false);
                  topFunction();
                }}
              ></ListItemText>
            </ListItem>
            <ListItem button>
              <ListItemText
                primary="FAYH"
                secondary="Firman Allah Yang Hidup"
                className="modal-passage-list-text"
                secondaryTypographyProps={{
                  className: 'modal-passage-list-text-secondary'
                }}
                onClick={() => {
                  dispatch(fetchTodayChapter2020('fayh'));
                  setBibleVersion('fayh');
                  setVersionModal(false);
                  topFunction();
                }}
              ></ListItemText>
            </ListItem>
            <ListItem button>
              <ListItemText
                primary="MSG"
                secondary="The Message"
                className="modal-passage-list-text"
                secondaryTypographyProps={{
                  className: 'modal-passage-list-text-secondary'
                }}
                onClick={() => {
                  dispatch(fetchTodayChapter2020('msg'));
                  setBibleVersion('msg');
                  setVersionModal(false);
                  topFunction();
                }}
              ></ListItemText>
            </ListItem>
            <ListItem button>
              <ListItemText
                primary="NKJV"
                secondary="New King James Version"
                className="modal-passage-list-text"
                secondaryTypographyProps={{
                  className: 'modal-passage-list-text-secondary'
                }}
                onClick={() => {
                  dispatch(fetchTodayChapter2020('nkjv'));
                  setBibleVersion('nkjv');
                  setVersionModal(false);
                  topFunction();
                }}
              ></ListItemText>
            </ListItem>
          </List>
        </Dialog>
      </div>
    </Fade>
  );
};

export default Bible;
