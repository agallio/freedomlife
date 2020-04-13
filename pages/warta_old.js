import React, { Component } from 'react';
import Head from 'next/head';
import { connect } from 'react-redux';
import {
  LinearProgress,
  Card,
  CardContent,
  Typography,
  Fab,
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Grid,
  Button,
  Chip
} from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import CloseIcon from '@material-ui/icons/Close';
import moment from 'moment';
import 'moment/locale/id';
import * as gtag from 'utils/gtag';

import { fetchWartaByMonth } from 'actions/warta';

class Warta extends Component {
  state = {
    wartaOpen: false,
    selectedDate: ''
  };

  componentDidMount() {
    this.props.fetchWartaByMonth();
    gtag.event({
      action: 'to_warta',
      category: 'Warta',
      label: `Active Warta Page (${moment().format('DD-MM-YYYY HH:mm:ss')})`
    });
  }

  // Warta Dialog
  handleClickOpen = date => {
    this.setState({ wartaOpen: true, selectedDate: date });
    gtag.event({
      action: 'read_warta',
      category: 'Warta',
      label: `Read Warta ${this.state.selectedDate} (${moment().format(
        'DD-MM-YY HH:mm:ss'
      )})`
    });
  };
  handleClose = () => this.setState({ wartaOpen: false });

  render() {
    const { isFetching, wartaData } = this.props.warta;

    const getMomentDay = moment().day();

    const nextSunday =
      wartaData.month_data.length > 0 && getMomentDay === 0
        ? wartaData.month_data.find(
            item => item.date === moment().format('DD-MM-YYYY')
          )
        : wartaData.month_data.find(
            item =>
              item.date ===
              moment()
                .day(7)
                .format('DD-MM-YYYY')
          );
    const wartaUrl =
      wartaData.month_data.length > 0 &&
      this.state.selectedDate !== '' &&
      wartaData.month_data.find(item => item.date === this.state.selectedDate)
        .url;
    const wartaDataFiltered =
      wartaData.month_data &&
      wartaData.month_data.filter(
        item =>
          moment(moment().format('DD-MM-YYYY'), 'DD-MM-YYYY').isAfter(
            moment(item.date, 'DD-MM-YYYY')
          ) && item.url
      );

    return (
      <div>
        <Head>
          <title>Warta Digital | FreedomLife</title>
        </Head>
        {isFetching && <LinearProgress color="secondary" />}
        <div className="container" style={{ paddingBottom: 90 }}>
          <h2 className="header-title" style={{ marginTop: 70 }}>
            Warta Digital
          </h2>
          <p className="header-subtitle">
            Gereja Kristen Kemah Daud Yogyakarta
          </p>

          <div style={{ marginTop: 40 }}>
            <Card className="styled-card">
              <CardContent>
                {isFetching ? (
                  <>
                    <Skeleton
                      variant="text"
                      animation="wave"
                      width={250}
                      height={30}
                    />
                    <Skeleton
                      variant="text"
                      animation="wave"
                      width={200}
                      style={{ marginBottom: 20 }}
                    />
                    <Skeleton
                      variant="rect"
                      animation="wave"
                      height={30}
                      style={{ borderRadius: '50px' }}
                    />
                  </>
                ) : (
                  <>
                    <Typography className="bold-text primary" variant="h5">
                      Warta Minggu {getMomentDay === 0 ? 'Ini' : 'Depan'}
                    </Typography>
                    <Typography
                      className="light-text primary"
                      variant="subtitle1"
                    >
                      {getMomentDay === 0
                        ? moment().format('dddd, DD MMMM YYYY')
                        : moment()
                            .day(7)
                            .format('dddd, DD MMMM YYYY')}
                    </Typography>
                    {nextSunday &&
                    moment().format('DD-MM-YYYY') === nextSunday.date ? (
                      <Fab
                        className="guide-passage-box-fab"
                        size="small"
                        variant="extended"
                        color="primary"
                        style={{ marginTop: 12 }}
                        onClick={() => this.handleClickOpen(nextSunday.date)}
                        disabled={isFetching}
                      >
                        Baca
                      </Fab>
                    ) : (
                      <>
                        <Chip
                          label="BELUM TERSEDIA"
                          variant="outlined"
                          color="primary"
                          style={{ width: '100%', marginTop: 15 }}
                        />
                        <Typography
                          variant="body2"
                          style={{ marginTop: 10, color: '#757575' }}
                        >
                          <i>* Warta akan diperbarui setiap hari Minggu</i>
                        </Typography>
                      </>
                    )}
                  </>
                )}
              </CardContent>
            </Card>

            {isFetching ? (
              <></>
            ) : (
              wartaDataFiltered.length > 0 && (
                <Card className="styled-card" style={{ marginTop: 20 }}>
                  <CardContent>
                    <Typography className="bold-text primary" variant="h5">
                      Warta Bulan Ini
                    </Typography>
                    {wartaDataFiltered.map((item, index) => (
                      <Grid
                        key={index}
                        container
                        direction="row"
                        alignItems="center"
                        spacing={2}
                        style={{ marginTop: 5 }}
                      >
                        <Grid item xs={8} sm={10} md={10}>
                          <Typography
                            className="light-text primary"
                            variant="subtitle1"
                          >
                            {moment(item.date, 'DD-MM-YYYY').format(
                              'DD MMMM YYYY'
                            )}
                          </Typography>
                        </Grid>
                        <Grid item xs={4} sm={2} md={2}>
                          <Grid container direction="row" justify="flex-end">
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={() => this.handleClickOpen(item.date)}
                            >
                              Baca
                            </Button>
                          </Grid>
                        </Grid>
                      </Grid>
                    ))}
                  </CardContent>
                </Card>
              )
            )}

            {/* Warta Dialog */}
            <Dialog
              fullScreen
              open={this.state.wartaOpen}
              onClose={this.handleClose}
              PaperProps={{
                className: 'warta-bg'
              }}
            >
              <AppBar style={{ position: 'relative' }}>
                <Toolbar>
                  <IconButton
                    edge="start"
                    color="inherit"
                    onClick={this.handleClose}
                    aria-label="close"
                  >
                    <CloseIcon />
                  </IconButton>
                  <Typography variant="h6" style={{ flex: 1, marginLeft: 20 }}>
                    Warta Digital (
                    {moment(this.state.selectedDate, 'DD-MM-YYYY').format(
                      'DD-MM-YYYY'
                    )}
                    )
                  </Typography>
                </Toolbar>
              </AppBar>
              <div className="warta-container">
                <iframe
                  src={wartaUrl}
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  style={{ height: '100%', width: '100vw', overflow: 'hidden' }}
                ></iframe>
              </div>
            </Dialog>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    warta: state.warta
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchWartaByMonth: () => dispatch(fetchWartaByMonth())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Warta);