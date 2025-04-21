import { View } from 'react-native'

// Components
import Skeleton from '../../../../../components/skeleton'

// Utils
import { cn } from '../../../../../utils/helpers'

export default function ReadTypographyLoading() {
  return [...Array(15).keys()].map((i) => (
    <View
      key={i}
      className={cn(i === 0 && 'my-4 px-12', i > 0 && 'my-1.5 px-4')}
    >
      <Skeleton width="100%" height={i === 0 ? 28 : 20} />
    </View>
  ))
}
