import { render } from '../testUtils'
import { Home } from '../../pages/index'
import { dayjs } from '../../src/utils'

describe('Home Page', () => {
  describe('Header', () => {
    // it('title rendered as "FreedomLife"', () => {
    //   const { getByTestId } = render(<Home />, {})
    //   const headerTitle = getByTestId('headerTitle')
    //   expect(headerTitle.textContent).toBe('FreedomLife')
    // })

    // Christmas Edition
    it('title rendered as "FreedomLife 🎄"', () => {
      const { getByTestId } = render(<Home />, {})
      const headerTitle = getByTestId('headerTitle')
      expect(headerTitle.textContent).toBe('FreedomLife 🎄')
    })

    it('subtitle rendered as "Aplikasi Panduan Baca Alkitab Setahun"', () => {
      const { getByTestId } = render(<Home />, {})
      const headerSubtitle = getByTestId('headerSubtitle')
      expect(headerSubtitle.textContent).toBe(
        'Aplikasi Panduan Baca Alkitab Setahun'
      )
    })
  })

  describe('Card', () => {
    it('title rendered as "Panduan Hari Ini"', () => {
      const { getByTestId } = render(<Home />, {})
      const homecardTitle = getByTestId('homecardTitle')
      expect(homecardTitle.textContent).toBe('Panduan Hari Ini')
    })

    it(`subtitle rendered as "${dayjs().format('dddd, DD MMMM YYYY')}"`, () => {
      const { getByTestId } = render(<Home />, {})
      const homecardSubtitle = getByTestId('homecardSubtitle')
      expect(homecardSubtitle.textContent).toBe(
        dayjs().format('dddd, DD MMMM YYYY')
      )
    })

    it('pbox 1st title is "PL"', () => {
      const { getByTestId } = render(<Home />, {})
      const homecardPBox_PL = getByTestId('homecardPBox_PL')
      expect(homecardPBox_PL.textContent).toBe('PL')
    })

    it('pbox 2nd title is "PB"', () => {
      const { getByTestId } = render(<Home />, {})
      const homecardPBox_PB = getByTestId('homecardPBox_PB')
      expect(homecardPBox_PB.textContent).toBe('PB')
    })

    it('pbox 3rd title is "ALT"', () => {
      const { getByTestId } = render(<Home />, {})
      const homecardPBox_ALT = getByTestId('homecardPBox_ALT')
      expect(homecardPBox_ALT.textContent).toBe('ALT')
    })

    it('psub 1st value is "Perjanjian Lama"', () => {
      const { getByTestId } = render(<Home />, {})
      const homecardPSub_PL = getByTestId('homecardPSub_PL')
      expect(homecardPSub_PL.textContent).toBe('Perjanjian Lama')
    })

    it('psub 2nd value is "Perjanjian Baru"', () => {
      const { getByTestId } = render(<Home />, {})
      const homecardPSub_PB = getByTestId('homecardPSub_PB')
      expect(homecardPSub_PB.textContent).toBe('Perjanjian Baru')
    })

    it('psub 3rd value is "Tambahan"', () => {
      const { getByTestId } = render(<Home />, {})
      const homecardPSub_ALT = getByTestId('homecardPSub_ALT')
      expect(homecardPSub_ALT.textContent).toBe('Tambahan')
    })

    it('button value is "Baca"', () => {
      const { getByTestId } = render(<Home />, {})
      const homecardButton = getByTestId('homecardButton')
      expect(homecardButton.textContent).toBe('Baca')
    })
  })
})
