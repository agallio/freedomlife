import { Platform, View } from 'react-native'

// Components
import GradientCard from '../../../../components/gradient-card'
import { Header, Text } from '../../../../components/text'
import { Button } from '../../../../components/button'

// Icon Components
import NewUserIcon from '../../../../components/icons/new-user-icon'

export default function NewUserCardComponent({
  onClick,
}: {
  onClick: () => Promise<void>
}) {
  return (
    <GradientCard
      variants="new-user"
      title={
        <View className="px-4 py-2">
          <Header aria-level={2} className="text-white">
            Baru Pertama Kali?
          </Header>
        </View>
      }
      footer={
        <View className="w-full px-4 py-3">
          <Button
            fullWidth
            text="Pelajari Lebih Lanjut"
            variant="card"
            className="web:hover:bg-blue-800/50 web:dark:hover:bg-gray-900/30 web:active:bg-blue-800/50 web:dark:active:bg-gray-900/30 bg-blue-800/70 dark:bg-gray-800/30"
            textClassName="text-sm text-white"
            onClick={onClick}
          />
        </View>
      }
    >
      <View className="items-center justify-center gap-3 px-4 pb-5 pt-3">
        <NewUserIcon
          className={Platform.OS === 'web' ? 'w-44' : undefined}
          style={
            Platform.OS !== 'web' ? { width: 160, height: 160 } : undefined
          }
        />
        <Text customFontSize="text-sm" className="text-center text-white">
          {`Baru pertama kali buka freedomlife?\nYuk belajar cara pakainya!`}
        </Text>
      </View>
    </GradientCard>
  )
}
