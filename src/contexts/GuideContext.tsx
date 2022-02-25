import { createContext, ReactNode, useContext, useState } from 'react'

// Types
import type { GuideDataResponse } from '~/types/api'

interface GuideContextState {
  guideData: GuideDataResponse | null
  guideDate: string
}

interface GuideContextValue {
  guideData: GuideDataResponse | null
  setGuideData: (_: GuideDataResponse) => void
  guideDate: string
  setGuideDate: (_: string) => void
}

const GuideContext = createContext<GuideContextValue>({
  guideData: null,
  setGuideData: () => null,
  guideDate: '',
  setGuideDate: () => null,
})

export function GuideProvider({
  children,
}: {
  children: ReactNode | ReactNode[]
}) {
  const [{ guideData, guideDate }, setState] = useState<GuideContextState>({
    guideData: {},
    guideDate: '',
  })

  const setGuideData = (data: GuideDataResponse) =>
    setState((prevState) => ({ ...prevState, guideData: data }))
  const setGuideDate = (date: string) =>
    setState((prevState) => ({ ...prevState, guideDate: date }))

  return (
    <GuideContext.Provider
      value={{ guideData, setGuideData, guideDate, setGuideDate }}
    >
      {children}
    </GuideContext.Provider>
  )
}

export function useGuide() {
  const context = useContext(GuideContext)
  if (!context) {
    throw new Error('useGuide must be used within a GuideProvider')
  }
  return context
}
