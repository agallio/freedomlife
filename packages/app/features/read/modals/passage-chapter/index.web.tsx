import { MotiView } from 'moti'

// Screen
import { PassageChapterScreenComponent } from './screen'

export default function PassageChapterScreen() {
  return (
    <MotiView
      from={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ type: 'timing', duration: 200 }}
    >
      <PassageChapterScreenComponent />
    </MotiView>
  )
}
