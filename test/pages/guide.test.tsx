import { render } from '../testUtils'
import { Guide } from '../../pages/guide'

describe('Guide Page', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(<Guide />, {})
    expect(asFragment()).toMatchSnapshot()
  })

  describe('Header', () => {
    it('title rendered as "Panduan Baca"', () => {
      const { getByTestId } = render(<Guide />, {})
      const headerTitle = getByTestId('headerTitle')
      expect(headerTitle.textContent).toBe('Panduan Baca')
    })

    it('subtitle rendered as "Panduan Baca Bulan Ini"', () => {
      const { getByTestId } = render(<Guide />, {})
      const headerSubtitle = getByTestId('headerSubtitle')
      expect(headerSubtitle.textContent).toBe('Panduan Baca Bulan Ini')
    })
  })
})
