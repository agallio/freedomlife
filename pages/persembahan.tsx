import { SyntheticEvent, useEffect, useState } from 'react'
import Head from 'next/head'
import { Card, CardContent, Button, Snackbar } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { CheckCircle as SuccessIcon } from '@material-ui/icons'

export const Persembahan: React.FC = () => {
  const [copiedNumber, setCopiedNumber] = useState(false)
  const [error, setError] = useState(false)
  const [bank, setBank] = useState('')

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setCopiedNumber(false)
      setBank('')
    }, 2000)
    return () => clearTimeout(timeoutId)
  }, [copiedNumber])

  const fallbackCopyNumber = async (bank: string) => {
    const textArea = document.createElement('textarea')
    textArea.value = bank

    textArea.style.top = '0'
    textArea.style.left = '0'
    textArea.style.position = 'fixed'

    document.body.appendChild(textArea)
    textArea.focus()
    textArea.select()

    try {
      await document.execCommand('copy')
      textArea.style.display = 'none'
      setCopiedNumber(true)
    } catch (e) {
      console.error(e)
      setError(true)
    }
  }

  const copyNumber = async (bank: string) => {
    setBank(bank)

    if (!navigator.clipboard) {
      fallbackCopyNumber(bank === 'cimb' ? '800077521000' : '0600311611')
      return
    }

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
        <h2 className="header__title--persembahan" data-testid="headerTitle">
          Persembahan &amp; Perpuluhan
        </h2>
        <p className="header__subtitle" data-testid="headerSubtitle">
          Gereja Kristen Kemah Daud - Yogyakarta
        </p>
      </div>

      <div className="container--fluid">
        <Card className="guidecard">
          <CardContent className="persembahan" style={{ padding: '16px 10%' }}>
            <p className="persembahan__text" data-testid="persembahanBrief">
              Dukungan untuk pekerjaan pelayanan Gereja Kristen Kemah Daud
              Yogyakarta dapat dilakukan melalui scan QRIS dibawah ini :
            </p>

            <img src="/images/qris.jpeg" alt="qris" style={{ width: '100%' }} />
            <p
              className="persembahan__text"
              style={{ fontSize: 13 }}
              data-testid="persembahanInfo"
            >
              Melalui aplikasi m-Banking / Digital Payment seperti :
            </p>
            <div
              className="persembahan__block"
              data-testid="persembahanInfo_Wallet"
            >
              <b>
                <i>Gopay, OVO, DANA &amp; LinkAja</i>
              </b>
            </div>
            <p
              className="persembahan__text"
              style={{ fontSize: 13, textAlign: 'center' }}
              data-testid="persembahanInfo_Admin"
            >
              (Bebas biaya administrasi untuk semua platform pembayaran)
            </p>

            <hr />
            <p className="persembahan__text" data-testid="persembahanInfo_Bank">
              Atau dapat juga dilakukan melalui transfer pada rekening bank
              dibawah ini :
            </p>

            <h1
              className="persembahan__text--bank"
              data-testid="persembahanInfo_CIMB"
            >
              CIMB Niaga
            </h1>
            <Button
              variant="outlined"
              className="persembahan__button"
              onClick={() => copyNumber('cimb')}
              startIcon={
                copiedNumber && bank === 'cimb' ? <SuccessIcon /> : null
              }
              data-testid="persembahanInfo_CIMB_btn"
            >
              {copiedNumber && bank === 'cimb'
                ? 'Nomor Tersalin!'
                : '8000-7752-1000'}
            </Button>
            <p
              className="persembahan__text"
              data-testid="persembahanInfo_CIMB_name"
            >
              a/n Gereja Kristen Kemah Daud (Klik Untuk Salin)
            </p>
            <h1
              className="bold-text"
              style={{ margin: '10px 0' }}
              data-testid="persembahanInfo_BCA"
            >
              BCA
            </h1>
            <Button
              variant="outlined"
              className="persembahan__button"
              onClick={() => copyNumber('bca')}
              startIcon={
                copiedNumber && bank === 'bca' ? <SuccessIcon /> : null
              }
              data-testid="persembahanInfo_BCA_btn"
            >
              {copiedNumber && bank === 'bca'
                ? 'Nomor Tersalin!'
                : '0600-311-611'}
            </Button>
            <p
              className="persembahan__text"
              data-testid="persembahanInfo_BCA_name"
            >
              a/n Yay Pelita Bangsa (Klik Untuk Salin)
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Error Snackbar */}
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
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
