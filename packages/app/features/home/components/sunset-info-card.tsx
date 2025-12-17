import { useMemo } from 'react'
import { View } from 'react-native'
import { MotiPressable } from 'moti/interactions'
import { ArrowRightIcon } from 'react-native-heroicons/solid'

import { Text } from '../../../components/text'
import SunsetIcon from '../../../components/icons/sunset-icon'
import SunsetInfoGradient from './sunset-info/sunset-info-gradient'

export default function SunsetInfoCard({ onPress }: { onPress?: () => void }) {
  return (
    <MotiPressable
      accessibilityRole="button"
      animate={useMemo(
        () =>
          ({ pressed }) => {
            'worklet'

            return {
              opacity: pressed ? 0.7 : 1,
            }
          },
        [],
      )}
      transition={{ type: 'timing', duration: 150 }}
      containerStyle={{ width: '100%', cursor: 'pointer' }}
      onPress={onPress}
    >
      <SunsetInfoGradient>
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: 90,
            height: 55,
          }}
        >
          <SunsetIcon className="h-[55px] w-[90px]" />
        </View>
        <View className="flex-1 flex-row items-center gap-2">
          <View className="flex-1">
            <Text className="text-xs text-white min-[374px]:text-base">
              Perjalanan freedomlife akan berakhir pada 1 Januari 2026
            </Text>
          </View>
          <ArrowRightIcon size={16} color="#ffffff" />
        </View>
      </SunsetInfoGradient>
    </MotiPressable>
  )
}
