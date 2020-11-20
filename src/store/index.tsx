import { GuideProvider, useGuide, useDispatchGuide } from './Guide'

export type ActionTypes = {
  type: string
  data: any
}

const StateProvider: React.FC = ({ children }) => (
  <GuideProvider>{children}</GuideProvider>
)

export { useGuide, useDispatchGuide }

export default StateProvider
