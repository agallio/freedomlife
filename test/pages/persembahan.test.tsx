import { render } from '../testUtils'
import { Persembahan } from '../../pages/persembahan'

describe('Persembahan Page', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(<Persembahan />, {})
    expect(asFragment()).toMatchSnapshot()
  })

  describe('Header', () => {
    it('title rendered as "Persembahan & Perpuluhan"', () => {
      const { getByTestId } = render(<Persembahan />, {})
      const headerTitle = getByTestId('headerTitle')
      expect(headerTitle.textContent).toBe('Persembahan & Perpuluhan')
    })

    it('subtitle rendered as "Gereja Kristen Kemah Daud - Yogyakarta"', () => {
      const { getByTestId } = render(<Persembahan />, {})
      const headerSubtitle = getByTestId('headerSubtitle')
      expect(headerSubtitle.textContent).toBe(
        'Gereja Kristen Kemah Daud - Yogyakarta'
      )
    })
  })

  describe('Card', () => {
    it('brief text value is correct', () => {
      const { getByTestId } = render(<Persembahan />, {})
      const persembahanBrief = getByTestId('persembahanBrief')
      expect(persembahanBrief.textContent).toBe(
        'Dukungan untuk pekerjaan pelayanan Gereja Kristen Kemah Daud Yogyakarta dapat dilakukan melalui scan QRIS dibawah ini :'
      )
    })

    describe('Info', () => {
      it('info text value is correct', () => {
        const { getByTestId } = render(<Persembahan />, {})
        const persembahanInfo = getByTestId('persembahanInfo')
        expect(persembahanInfo.textContent).toBe(
          'Melalui aplikasi m-Banking / Digital Payment seperti :'
        )
      })

      it('e-wallet text value is correct', () => {
        const { getByTestId } = render(<Persembahan />, {})
        const persembahanInfo_Wallet = getByTestId('persembahanInfo_Wallet')
        expect(persembahanInfo_Wallet.textContent).toBe(
          'Gopay, OVO, DANA & LinkAja'
        )
      })

      it('admin fee text value is correct', () => {
        const { getByTestId } = render(<Persembahan />, {})
        const persembahanInfo_Admin = getByTestId('persembahanInfo_Admin')
        expect(persembahanInfo_Admin.textContent).toBe(
          '(Bebas biaya administrasi untuk semua platform pembayaran)'
        )
      })

      it('bank text value is correct', () => {
        const { getByTestId } = render(<Persembahan />, {})
        const persembahanInfo_Bank = getByTestId('persembahanInfo_Bank')
        expect(persembahanInfo_Bank.textContent).toBe(
          'Atau dapat juga dilakukan melalui transfer pada rekening bank dibawah ini :'
        )
      })

      it("CIMB bank rendered as 'CIMB Niaga'", () => {
        const { getByTestId } = render(<Persembahan />, {})
        const persembahanInfo_CIMB = getByTestId('persembahanInfo_CIMB')
        expect(persembahanInfo_CIMB.textContent).toBe('CIMB Niaga')
      })

      it('CIMB bank button value is correct', () => {
        const { getByTestId } = render(<Persembahan />, {})
        const persembahanInfo_CIMB_btn = getByTestId('persembahanInfo_CIMB_btn')
        expect(persembahanInfo_CIMB_btn.textContent).toBe('8000-7752-1000')
      })

      it('CIMB bank name is correct', () => {
        const { getByTestId } = render(<Persembahan />, {})
        const persembahanInfo_CIMB_name = getByTestId(
          'persembahanInfo_CIMB_name'
        )
        expect(persembahanInfo_CIMB_name.textContent).toBe(
          'a/n Gereja Kristen Kemah Daud (Klik Untuk Salin)'
        )
      })

      it("BCA bank rendered as 'BCA'", () => {
        const { getByTestId } = render(<Persembahan />, {})
        const persembahanInfo_BCA = getByTestId('persembahanInfo_BCA')
        expect(persembahanInfo_BCA.textContent).toBe('BCA')
      })

      it('BCA bank button value is correct', () => {
        const { getByTestId } = render(<Persembahan />, {})
        const persembahanInfo_BCA_btn = getByTestId('persembahanInfo_BCA_btn')
        expect(persembahanInfo_BCA_btn.textContent).toBe('0600-311-611')
      })

      it('BCA bank name is correct', () => {
        const { getByTestId } = render(<Persembahan />, {})
        const persembahanInfo_BCA_name = getByTestId('persembahanInfo_BCA_name')
        expect(persembahanInfo_BCA_name.textContent).toBe(
          'a/n Yay Pelita Bangsa (Klik Untuk Salin)'
        )
      })
    })
  })
})
