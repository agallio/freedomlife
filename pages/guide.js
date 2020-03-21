import React, { Component } from 'react';
import Head from 'next/head';
import Router from 'next/router';
import { connect } from 'react-redux';
import {
  Fade,
  LinearProgress,
  Card,
  CardContent,
  Grid,
  Typography,
  ButtonBase
} from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import moment from 'moment';
import 'moment/locale/id';

import {
  fetchGuideByMonth,
  fetchGuideByDate,
  setGuideDate,
  fetchGuide2020ByMonth
} from 'actions/guide';
import { fetchChapterByDate } from 'actions/bible';

class Guide extends Component {
  componentDidMount = () => {
    if (
      moment(this.props.guide.guideToday.date, 'DD-MM-YYYY').format('MM') !==
        moment().format('MM') ||
      this.props.guide.guideByMonth.length === 0
    ) {
      if (this.props.guide.new_2020) {
        this.props.fetchGuide2020ByMonth(
          moment().format('MM'),
          moment().format('YYYY')
        );
      } else {
        this.props.fetchGuideByMonth(
          moment().format('MM'),
          moment().format('YYYY')
        );
      }
    }
  };

  toBible = async date => {
    console.log('Clicked');
    // await this.props.setGuideDate(date);
    // await this.props.fetchGuideByDate(date);
    // await this.props.fetchChapterByDate(date);
    // Router.push('/bible');
  };

  render() {
    const {
      isFetching,
      new_2020,
      guideByMonth,
      guide2020ByMonth
    } = this.props.guide;

    return (
      <Fade in>
        <>
          <Head>
            <title>Panduan Baca | FreedomLife</title>
          </Head>
          {isFetching && <LinearProgress color="secondary" />}
          <div className="container" style={{ paddingBottom: 30 }}>
            <h2 className="header-title" style={{ marginTop: 35 }}>
              Panduan Baca <br /> Bulan Ini
            </h2>
            <p className="header-subtitle">
              Aplikasi panduan baca Alkitab setahun
            </p>
          </div>
          <div className="container-fluid" style={{ paddingBottom: 50 }}>
            <Card className="styled-fluid-card">
              <CardContent
                style={{
                  padding: '16px 10%',
                  height: isFetching && '80vh'
                }}
              >
                {isFetching
                  ? [1, 2, 3, 4, 5, 6].map(item => (
                      <Grid
                        key={item}
                        container
                        justify="flex-start"
                        alignItems="center"
                        style={{ marginBottom: 20 }}
                      >
                        <Grid item sm={4} md={4}>
                          <Skeleton
                            variant="rect"
                            animation="wave"
                            width={105}
                            height={90}
                            style={{ borderRadius: 5 }}
                          />
                        </Grid>
                        <Grid item sm={8} md={8}>
                          <Skeleton variant="text" animation="wave" />
                          <Skeleton variant="text" animation="wave" />
                          <Skeleton variant="text" animation="wave" />
                        </Grid>
                      </Grid>
                    ))
                  : new_2020
                  ? guide2020ByMonth.map((item, index) => (
                      <Grid
                        container
                        key={index}
                        direction="row"
                        justify="flex-start"
                        alignItems="center"
                        spacing={4}
                      >
                        <Grid item sm={4} md={4}>
                          <ButtonBase onClick={() => this.toBible(item.date)}>
                            <div
                              className={
                                moment().format('DD-MM-YYYY') === item.date
                                  ? 'guide-box-primary'
                                  : 'guide-box'
                              }
                            >
                              <Typography
                                className={
                                  moment().format('DD-MM-YYYY') === item.date
                                    ? 'bold-text'
                                    : 'bold-text primary'
                                }
                                style={{
                                  color:
                                    moment().format('DD-MM-YYYY') ===
                                      item.date && '#fff'
                                }}
                              >
                                {moment(item.date, 'DD-MM-YYYY').format('dddd')}
                              </Typography>
                              <Typography
                                variant="h4"
                                className={
                                  moment().format('DD-MM-YYYY') === item.date
                                    ? 'bold-text'
                                    : 'bold-text primary'
                                }
                                style={{
                                  color:
                                    moment().format('DD-MM-YYYY') ===
                                      item.date && '#fff'
                                }}
                              >
                                {item.date.split('-')[0] || '-'}
                              </Typography>
                            </div>
                          </ButtonBase>
                        </Grid>
                        <Grid item sm={8} md={8}>
                          <Typography
                            variant="subtitle1"
                            className={
                              moment().format('DD-MM-YYYY') === item.date
                                ? 'regular-text primary'
                                : 'regular-text'
                            }
                          >
                            {item.pl_name || '-'}
                          </Typography>
                          <Typography
                            variant="subtitle1"
                            className={
                              moment().format('DD-MM-YYYY') === item.date
                                ? 'regular-text primary'
                                : 'regular-text'
                            }
                          >
                            {item.pb_name || '-'}
                          </Typography>
                          {item.alt_name && (
                            <Typography
                              variant="subtitle1"
                              className={
                                moment().format('DD-MM-YYYY') === item.date
                                  ? 'regular-text primary'
                                  : 'regular-text'
                              }
                            >
                              {item.alt_name || '-'}
                            </Typography>
                          )}
                        </Grid>
                      </Grid>
                    ))
                  : guideByMonth.map((item, index) => (
                      <Grid
                        container
                        key={index}
                        direction="row"
                        justify="flex-start"
                        alignItems="center"
                        spacing={4}
                      >
                        <Grid item sm={4} md={4}>
                          <ButtonBase onClick={() => this.toBible(item.date)}>
                            <div
                              className={
                                moment().format('DD-MM-YYYY') === item.date
                                  ? 'guide-box-primary'
                                  : 'guide-box'
                              }
                            >
                              <Typography
                                className={
                                  moment().format('DD-MM-YYYY') === item.date
                                    ? 'bold-text'
                                    : 'bold-text primary'
                                }
                                style={{
                                  color:
                                    moment().format('DD-MM-YYYY') ===
                                      item.date && '#fff'
                                }}
                              >
                                {moment(item.date, 'DD-MM-YYYY').format('dddd')}
                              </Typography>
                              <Typography
                                variant="h4"
                                className={
                                  moment().format('DD-MM-YYYY') === item.date
                                    ? 'bold-text'
                                    : 'bold-text primary'
                                }
                                style={{
                                  color:
                                    moment().format('DD-MM-YYYY') ===
                                      item.date && '#fff'
                                }}
                              >
                                {item.date.split('-')[0] || '-'}
                              </Typography>
                            </div>
                          </ButtonBase>
                        </Grid>
                        <Grid item sm={8} md={8}>
                          <Typography
                            variant="subtitle1"
                            className={
                              moment().format('DD-MM-YYYY') === item.date
                                ? 'regular-text primary'
                                : 'regular-text'
                            }
                          >
                            {item.pl_name || '-'}
                          </Typography>
                          <Typography
                            variant="subtitle1"
                            className={
                              moment().format('DD-MM-YYYY') === item.date
                                ? 'regular-text primary'
                                : 'regular-text'
                            }
                          >
                            {item.pb1_name || '-'}
                          </Typography>
                          <Typography
                            variant="subtitle1"
                            className={
                              moment().format('DD-MM-YYYY') === item.date
                                ? 'regular-text primary'
                                : 'regular-text'
                            }
                          >
                            {item.pb2_name || '-'}
                          </Typography>
                        </Grid>
                      </Grid>
                    ))}
              </CardContent>
            </Card>
          </div>
        </>
      </Fade>
    );
  }
}

const mapStateToProps = state => {
  return { guide: state.guide };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchGuideByMonth: (month, year) =>
      dispatch(fetchGuideByMonth(month, year)),
    fetchChapterByDate: date => dispatch(fetchChapterByDate(date)),
    fetchGuideByDate: date => dispatch(fetchGuideByDate(date)),
    setGuideDate: date => dispatch(setGuideDate(date)),
    // 2020
    fetchGuide2020ByMonth: (month, year) =>
      dispatch(fetchGuide2020ByMonth(month, year))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Guide);
