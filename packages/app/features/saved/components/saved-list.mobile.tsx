import { View } from 'react-native'
import { Header, Text } from '../../../components/text'
import { PressableCard } from '../../../components/card'

export default function SavedList() {
  return (
    <View className="gap-4 px-6 pb-28 pt-4 min-[744px]:px-40 md:px-52 lg:px-96">
      <PressableCard
        title={
          <View className="flex w-full flex-row items-center justify-between px-4 py-2">
            <View className="flex flex-col justify-center">
              <Header
                aria-level={2}
                customFontSize="text-lg"
                className="leading-snug"
              >
                Kejadian 1:1
              </Header>
            </View>
          </View>
        }
      >
        <View className="gap-3 px-4 pb-3 pt-2">
          <Text>
            <Text className="bg-yellow-300 text-gray-900 dark:bg-yellow-700">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Consectetur illum facere excepturi esse sint cum sunt et dolor
              ratione minus nisi, consequuntur laudantium fugit ipsa culpa
              accusamus atque quos numquam!
            </Text>
          </Text>
        </View>
      </PressableCard>
    </View>
  )
}
