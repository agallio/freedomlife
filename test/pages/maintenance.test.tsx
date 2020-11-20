import { render } from '../testUtils'
import { Maintenance } from '../../pages/maintenance'

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

describe('Maintenance Page', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(<Maintenance />, {})
    expect(asFragment()).toMatchSnapshot()
  })

  it('text value is correct', () => {
    const { getByTestId } = render(<Maintenance />, {})
    const maintenanceText = getByTestId('maintenanceText')
    expect(maintenanceText.textContent).toBe('Situs Sedang Dalam Perbaikan')
  })
})
