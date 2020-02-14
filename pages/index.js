import React, { Component } from 'react';
import Head from 'next/head';
import { connect } from 'react-redux';
import Router from 'next/router';
import {
  LinearProgress,
  Card,
  CardContent,
  Typography,
  Grid,
  Fab
} from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import moment from 'moment';
import 'moment/locale/id';
import * as gtag from 'utils/gtag';

import {
  fetchGuideToday,
  setGuideDate,
  fetchGuide2020Today
} from 'actions/guide';

class Index extends Component {
  componentDidMount = () => {
    localStorage.clear();
    if (this.props.guide.guideToday.date !== moment().format('DD-MM-YYYY')) {
      if (this.props.guide.new_2020) {
        this.props.fetchGuide2020Today();
      } else {
        this.props.fetchGuideToday();
      }
    }
  };

  toBible = () => {
    this.props.setGuideDate('');
    gtag.event({
      action: 'to_bible',
      category: 'Bible',
      label: `Read Bible ${moment().format('DD-MM-YYYY HH:mm:ss')}`
    });
    Router.push('/bible');
  };

  render() {
    const {
      isFetching,
      new_2020,
      guideToday,
      guide2020Today
    } = this.props.guide;

    const isFeb = moment().format('MM') === '02';

    return (
      <div>
        <Head>
          <title>FreedomLife</title>
        </Head>
        {isFetching && <LinearProgress color="secondary" />}
        <div className="container" style={{ paddingBottom: 90 }}>
          <h2 className="header-title" style={{ marginTop: 70 }}>
            Freedom Life <FavoriteIcon />
          </h2>
          <p className="header-subtitle">
            Aplikasi panduan baca Alkitab setahun
          </p>

          <div style={{ marginTop: 40 }}>
            <Card className="styled-card">
              <CardContent>
                <Typography className="bold-text primary" variant="h5">
                  Panduan Hari Ini
                </Typography>
                <Typography className="light-text primary" variant="subtitle1">
                  {/* {moment().format('dddd, LL')} */}
                </Typography>

                {new_2020
                  ? isFeb
                    ? ['PL', 'PB', 'ALT'].map(item => (
                        <Grid
                          key={item}
                          container
                          direction="row"
                          alignItems="center"
                          spacing={2}
                          style={{ marginTop: 5 }}
                        >
                          <Grid item xs={3} sm={2} md={2}>
                            <div className="guide-passage-box">
                              <h5 className="guide-passage-box-text">{item}</h5>
                            </div>
                          </Grid>
                          <Grid item xs={9} sm={10} md={10}>
                            {isFetching ? (
                              <LinearProgress />
                            ) : (
                              <Typography
                                className="bold-text primary-feb"
                                variant="h6"
                                style={{ fontSize: 17 }}
                              >
                                {item === 'PL'
                                  ? guide2020Today.pl_name
                                  : item === 'PB'
                                  ? guide2020Today.pb_name
                                  : item === 'ALT'
                                  ? guide2020Today.alt_name
                                  : 'Tidak ada data'}
                              </Typography>
                            )}
                            <Typography
                              className="light-text primary-feb"
                              variant="subtitle1"
                            >
                              {item === 'PL'
                                ? 'Perjanjian Lama'
                                : item === 'PB'
                                ? 'Perjanjian Baru'
                                : item === 'ALT'
                                ? 'Tambahan'
                                : ''}
                            </Typography>
                          </Grid>
                        </Grid>
                      ))
                    : ['PL', 'PB'].map(item => (
                        <Grid
                          key={item}
                          container
                          direction="row"
                          alignItems="center"
                          spacing={2}
                          style={{ marginTop: 5 }}
                        >
                          <Grid item xs={3} sm={2} md={2}>
                            <div className="guide-passage-box">
                              <h5 className="guide-passage-box-text">{item}</h5>
                            </div>
                          </Grid>
                          <Grid item xs={9} sm={10} md={10}>
                            {isFetching ? (
                              <LinearProgress />
                            ) : (
                              <Typography
                                className="bold-text primary"
                                variant="h6"
                                style={{ fontSize: 17 }}
                              >
                                {item === 'PL'
                                  ? guide2020Today.pl_name
                                  : item === 'PB'
                                  ? guide2020Today.pb_name
                                  : 'Tidak ada data'}
                              </Typography>
                            )}
                            <Typography
                              className="light-text primary"
                              variant="subtitle1"
                            >
                              {item === 'PL'
                                ? 'Perjanjian Lama'
                                : item === 'PB'
                                ? 'Perjanjian Baru'
                                : ''}
                            </Typography>
                          </Grid>
                        </Grid>
                      ))
                  : ['PL', 'PB1', 'PB2'].map(item => (
                      <Grid
                        key={item}
                        container
                        direction="row"
                        alignItems="center"
                        spacing={2}
                        style={{ marginTop: 5 }}
                      >
                        <Grid item xs={3} sm={2} md={2}>
                          <div className="guide-passage-box">
                            <h5 className="guide-passage-box-text">{item}</h5>
                          </div>
                        </Grid>
                        <Grid item xs={9} sm={10} md={10}>
                          {isFetching ? (
                            <LinearProgress />
                          ) : (
                            <Typography
                              className="bold-text primary"
                              variant="h6"
                              style={{ fontSize: 17 }}
                            >
                              {item === 'PL'
                                ? guideToday.pl_name
                                : item === 'PB1'
                                ? guideToday.pb1_name
                                : item === 'PB2'
                                ? guideToday.pb2_name
                                : 'Tidak ada data'}
                            </Typography>
                          )}
                          <Typography
                            className="light-text primary"
                            variant="subtitle1"
                          >
                            {item === 'PL'
                              ? 'Perjanjian Lama'
                              : item === 'PB1'
                              ? 'Perjanjian Baru 1'
                              : item === 'PB2'
                              ? 'Perjanjian Baru 2'
                              : ''}
                          </Typography>
                        </Grid>
                      </Grid>
                    ))}

                <br />
                <Fab
                  className="guide-passage-box-fab"
                  size="small"
                  variant="extended"
                  color="primary"
                  onClick={this.toBible}
                >
                  Baca
                </Fab>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    guide: state.guide,
    bible: state.bible
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchGuideToday: () => dispatch(fetchGuideToday()),
    setGuideDate: date => dispatch(setGuideDate(date)),
    // 2020
    fetchGuide2020Today: () => dispatch(fetchGuide2020Today())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
