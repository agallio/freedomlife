import React, { SyntheticEvent, useState } from 'react'
import Head from 'next/head'
import { Card, CardContent, Button, Snackbar } from '@material-ui/core'
import { Alert } from '@material-ui/lab'

const Persembahan = (): JSX.Element => {
  const [copiedNumber, setCopiedNumber] = useState(false)
  const [error, setError] = useState(false)

  const copyNumber = async (bank: string) => {
    try {
      await navigator.clipboard.writeText(
        bank === 'cimb' ? '800077521000' : '0600311611'
      )
      setCopiedNumber(true)
    } catch (e) {
      console.error(e)
      setError(true)
    }
  }

  const onCopiedNumberClose = (
    _: SyntheticEvent<Element, Event>,
    reason?: string
  ) => {
    if (reason === 'clickaway') return
    setCopiedNumber(false)
  }

  const onErrorClose = (_: SyntheticEvent<Element, Event>, reason?: string) => {
    if (reason === 'clickaway') return
    setError(false)
  }

  return (
    <>
      <Head>
        <title>Persembahan | FreedomLife</title>
      </Head>

      <div className="container" style={{ paddingBottom: 30 }}>
        <h2 className="header-title" style={{ marginTop: 35 }}>
          Persembahan &amp; Perpuluhan
        </h2>
        <p className="header-subtitle">
          Gereja Kristen Kemah Daud - Yogyakarta
        </p>
      </div>

      <div className="container-fluid">
        <Card className="styled-fluid-card">
          <CardContent className="persembahan" style={{ padding: '16px 10%' }}>
            <p className="persembahan-text">
              Dukungan untuk pekerjaan pelayanan Gereja Kristen Kemah Daud
              Yogyakarta dapat dilakukan melalui scan QRIS dibawah ini :
            </p>

            <img src="/images/qris.jpeg" alt="qris" style={{ width: '100%' }} />
            <p className="persembahan-text" style={{ fontSize: 13 }}>
              Melalui aplikasi m-Banking / Digital Payment seperti :
            </p>
            <div className="persembahan-block">
              <b>
                <i>Gopay, OVO, DANA &amp; LinkAja</i>
              </b>
            </div>
            <p
              className="persembahan-text"
              style={{ fontSize: 13, textAlign: 'center' }}
            >
              (Bebas biaya administrasi untuk semua platform pembayaran)
            </p>

            <hr />
            <p className="persembahan-text">
              Atau dapat juga dilakukan melalui transfer pada rekening bank
              dibawah ini :
            </p>

            <h1 className="bold-text" style={{ margin: '10px 0' }}>
              CIMB Niaga
            </h1>
            <Button
              variant="outlined"
              className="persembahan-button"
              onClick={() => copyNumber('cimb')}
            >
              8000-7752-1000
            </Button>
            <p className="persembahan-text">
              a/n Gereja Kristen Kemah Daud (Klik Untuk Salin)
            </p>
            <h1 className="bold-text" style={{ margin: '10px 0' }}>
              BCA
            </h1>
            <Button
              variant="outlined"
              className="persembahan-button"
              onClick={() => copyNumber('bca')}
            >
              0600-311-611
            </Button>
            <p className="persembahan-text">
              a/n Yay Pelita Bangsa (Klik Untuk Salin)
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Copied Snackbar */}
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={copiedNumber}
        autoHideDuration={3000}
        onClose={onCopiedNumberClose}
      >
        <Alert onClose={onCopiedNumberClose} severity="success">
          Nomor rekening bank tersalin!
        </Alert>
      </Snackbar>

      {/* Error Snackbar */}
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={error}
        autoHideDuration={3000}
        onClose={onErrorClose}
      >
        <Alert onClose={onErrorClose} severity="error">
          Terjadi kesalahan! Coba beberapa saat lagi.
        </Alert>
      </Snackbar>
    </>
  )
}

export default Persembahan
