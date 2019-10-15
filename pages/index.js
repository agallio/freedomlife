import React, { Component } from 'react';
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
import moment from 'moment';
import 'moment/locale/id';

import { fetchGuideToday } from '../src/actions/guide';
import { fetchTodayChapter } from '../src/actions/bible';

class Index extends Component {
  componentDidMount = async () => {
    if (this.props.guide.guideToday.date !== moment().format('DD-MM-YYYY')) {
      this.props.fetchGuideToday();
    }
  };

  toBible = () => {
    if (
      this.props.guide.guideToday.date === moment().format('DD-MM-YYYY') &&
      this.props.bible.chapters.passage.length === 0
    ) {
      this.props.fetchTodayChapter();
    }
    Router.push('/bible');
  };

  render() {
    const { isFetching, guideToday } = this.props.guide;

    return (
      <div>
        {isFetching && <LinearProgress color="secondary" />}
        <div className="container" style={{ paddingBottom: 90 }}>
          <h2 className="header-title" style={{ marginTop: 70 }}>
            Freedom Life
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
                  {moment().format('dddd, LL')}
                </Typography>

                {['PL', 'PB1', 'PB2'].map(item => (
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
    fetchTodayChapter: version => dispatch(fetchTodayChapter(version))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Index);
