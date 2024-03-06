import { type ComponentProps } from 'react'
import { Platform, View, ScrollView } from 'react-native'

export default function ScreenScrollView(
  props: ComponentProps<typeof ScrollView>,
) {
  const Component = Platform.select({
    // On web, don't use ScrollView since it will make a fixed scrollable container.
    // This makes the mobile browser's UI being stuck and detects that it's not scrollable.
    // (e.g. Safari's URL bar not collapsed when scrolling, Chrome's top URL bar not minimized)
    // See more: https://solito.dev/recipes/scroll-view#window-scrolling
    //
    // @ts-ignore
    web: View as typeof ScrollView,
    default: ScrollView,
  })

  return <Component {...props} />
}
