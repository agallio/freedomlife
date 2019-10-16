import React, { useState } from 'react';
import { useSelector } from 'react-redux';
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
  ArrowForwardIos as NextIosIcon
} from '@material-ui/icons';

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
  const isFetching = useSelector(state => state.bible.isFetching);
  const chapters = useSelector(state => state.bible.chapters);
  const guideToday = useSelector(state => state.guide.guideToday);
  const [passageModal, setPassageModal] = useState(false);
  const [passage, setPassage] = useState('pl-1');

  let passageArr = [];
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

  const plSpaceSplit = guideToday.pl_name.split(' ');
  const plDashSplit =
    plSpaceSplit.length === 3
      ? plSpaceSplit[2].split('-')
      : plSpaceSplit[1].split('-');
  let list = [];
  for (let i = Number(plDashSplit[0]); i <= Number(plDashSplit[1]); i++) {
    list.push(i);
  }

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
              <Typography variant="h6">
                {isFetching
                  ? 'Memuat'
                  : passage === 'pl-1'
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
                  : ''}
              </Typography>
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
              disabled={isFetching || passage === 'pb2'}
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
        </Dialog>
      </div>
    </Fade>
  );
};

export default Bible;
