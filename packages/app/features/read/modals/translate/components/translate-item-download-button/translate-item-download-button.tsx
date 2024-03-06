import { useMemo } from 'react'
import { Platform, View, useColorScheme } from 'react-native'
import { MotiPressable } from 'moti/interactions'
import { MotiView } from 'moti'
import { Easing } from 'react-native-reanimated'
import { ArrowPathIcon, CheckIcon } from 'react-native-heroicons/solid'

// Components
import { Text } from '../../../../../../components/text'

// Utils
import { cn } from '../../../../../../utils/helpers'

type TranslateItemDownloadButtonComponentProps = {
  status: 'success' | 'pending' | 'error' | 'idle'
  active?: boolean
  isDownloaded: boolean
  onDownloadClick?: () => void
}

export default function TranslateItemDownloadButtonComponent({
  status,
  active,
  isDownloaded,
  onDownloadClick,
}: TranslateItemDownloadButtonComponentProps) {
  // Constants
  const disabled = status === 'pending'

  // Memoized Values
  const pressableAnimation = useMemo(() => {
    if (status === 'success' || isDownloaded) {
      return { width: 35 }
    }

    if (status === 'pending') {
      return { width: 110 }
    }

    return { width: 90 }
  }, [status, isDownloaded])

  return (
    <MotiPressable
      accessibilityRole="button"
      animate={pressableAnimation}
      transition={{ type: 'spring', damping: 15, mass: 0.25 }}
      containerStyle={{
        flex: 1,
        alignItems: 'flex-end',
        borderRadius: 9999,
      }}
      onPress={onDownloadClick}
      disabled={disabled}
    >
      <View
        className={cn(
          'h-[35px] flex-row items-center justify-center rounded-full',

          active
            ? 'bg-emerald-400 dark:bg-emerald-600'
            : 'bg-gray-200 dark:bg-white/20',

          status === 'pending' ? 'opacity-50' : undefined,

          !disabled &&
            Platform.OS === 'web' &&
            active &&
            'transition duration-200 hover:bg-emerald-600 dark:hover:bg-emerald-500',
          !disabled &&
            Platform.OS === 'web' &&
            !active &&
            'transition duration-200 hover:bg-gray-300 dark:hover:bg-gray-700',
        )}
      >
        {!isDownloaded && status !== 'success' && status !== 'pending' && (
          <InitialState />
        )}
        {status === 'pending' && <LoadingState active={active} />}
        {(status === 'success' || isDownloaded) && (
          <SuccessState active={active} />
        )}
      </View>
    </MotiPressable>
  )
}

type StateComponentProps = {
  active?: boolean
}

function InitialState() {
  return (
    <MotiView from={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Text
        customFontSize="text-sm"
        customFontWeight="font-bold"
        className={cn('uppercase tracking-wider')}
      >
        Unduh
      </Text>
    </MotiView>
  )
}

function LoadingState({ active }: StateComponentProps) {
  const colorScheme = useColorScheme()

  return (
    <MotiView
      from={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4,
      }}
    >
      <Text
        customFontSize="text-sm"
        customFontWeight="font-bold"
        className={cn('uppercase tracking-wider')}
      >
        Unduh
      </Text>

      <MotiView
        from={{ translateX: 50, opacity: 0 }}
        animate={{ translateX: 0, opacity: 1 }}
        transition={{ duration: 250 }}
      >
        <MotiView
          from={{ rotateZ: '0deg' }}
          animate={{ rotateZ: '359deg' }}
          transition={{
            loop: true,
            repeatReverse: false,
            easing: Easing.linear,
            type: 'timing',
            duration: 600,
          }}
        >
          <ArrowPathIcon
            width={16}
            stroke={
              active
                ? colorScheme === 'light'
                  ? '#064e3b'
                  : '#ffffff'
                : colorScheme === 'dark'
                  ? '#ffffff'
                  : '#064e3b'
            }
            color={
              active
                ? colorScheme === 'light'
                  ? '#064e3b'
                  : '#ffffff'
                : colorScheme === 'dark'
                  ? '#ffffff'
                  : '#064e3b'
            }
          />
        </MotiView>
      </MotiView>
    </MotiView>
  )
}

function SuccessState({ active }: StateComponentProps) {
  const colorScheme = useColorScheme()

  return (
    <MotiView from={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <CheckIcon
        width={20}
        stroke={
          active
            ? colorScheme === 'light'
              ? '#064e3b'
              : '#ffffff'
            : colorScheme === 'dark'
              ? '#ffffff'
              : '#064e3b'
        }
        color={
          active
            ? colorScheme === 'light'
              ? '#064e3b'
              : '#ffffff'
            : colorScheme === 'dark'
              ? '#ffffff'
              : '#064e3b'
        }
      />
    </MotiView>
  )
}
