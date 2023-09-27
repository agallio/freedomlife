import WithGuide from './WithGuide'
import WithoutGuide from './WithoutGuide'

// Contexts
import { useReadPassageContext } from '../../contexts/ReadPassageContext'

// Types
import type { PropsWithChildren } from 'react'

export type PassageScreenProps = PropsWithChildren<{
  onSelectGuidePress?: () => void
}>

export function PassageScreen(props: PassageScreenProps) {
  const { inGuide } = useReadPassageContext()

  return inGuide ? <WithGuide {...props} /> : <WithoutGuide />
}
