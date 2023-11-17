import {
  PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import {
  ListRenderItemInfo,
  Platform,
  FlatList,
  TouchableOpacity,
  useColorScheme,
} from 'react-native'
import { View, Text, useSx, ActivityIndicator, useDripsyTheme } from 'dripsy'
import { useRouter } from 'solito/router'
import { useFocusEffect } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ChevronDownIcon, ChevronRightIcon } from 'react-native-heroicons/solid'

// Components
import FadeInView from 'app/components/FadeInView'
import GuideItemCard from './components/GuideItemCard'

// Contexts
import { useReadPassageContext } from '../read/contexts/ReadPassageContext'

// Queries
import { useGuideByMonthQuery } from 'app/utils/hooks/useGuideQuery'

// Utils
import dayjs from 'app/utils/dayjs'

// Types
import type { GuideDataResponse } from 'app/types'

export default function GuideScreen(
  _: PropsWithChildren<{ onMonthSelectPress?: () => void }>,
) {
  const sx = useSx()
  const {
    theme: { colors },
  } = useDripsyTheme()
  const colorScheme = useColorScheme()
  const { push } = useRouter()
  const flatListRef = useRef<FlatList>()
  const [hasBeenRead, setHasBeenRead] = useState<string[]>([])

  // Context
  const {
    guideMonth,
    guideHasBeenRead,
    setInGuide,
    setGuideDate,
    setGuidePassage,
    setBibleVersion,
  } = useReadPassageContext()

  // Query
  const { data, isLoading, error } = useGuideByMonthQuery(guideMonth)

  // Methods
  const onGuidePress = (date: string) => {
    setInGuide(true)
    setGuideDate(date)
    setGuidePassage('pl-1')
    setBibleVersion('tb')
    push('/read')
  }

  const getPersistedGuideHasBeenRead = async () => {
    try {
      const value = await AsyncStorage.getItem('guideHasBeenRead')
      if (value) {
        return JSON.parse(value)
      }
    } catch (e) {
      console.log(e)
    }
    return []
  }

  const setPersistedGuideHasBeenRead = async (value: string[]) => {
    try {
      await AsyncStorage.setItem('guideHasBeenRead', JSON.stringify(value))
    } catch (e) {
      console.log(e)
    }
  }

  const scrollToTop = () =>
    flatListRef.current!.scrollToIndex({
      index: 0,
      viewOffset: 20,
    })

  // Side-Effects
  useEffect(() => {
    // Wait until the flatListRef is ready then,
    // trigger scrollToTop right after the `guideMonth` changes.
    if (flatListRef.current) {
      scrollToTop()
    }
  }, [guideMonth])

  // Focus Side-Effects
  // Triggered when the screen is focused.
  useFocusEffect(
    useCallback(() => {
      const setGuideHasBeenRead = async () => {
        const persistedGuideHasBeenRead = await getPersistedGuideHasBeenRead()
        if (persistedGuideHasBeenRead.length > 0) {
          if (guideHasBeenRead.length > 0) {
            const populateArray = [
              ...persistedGuideHasBeenRead,
              ...new Set(guideHasBeenRead),
            ]
            const uniqueArray = [...new Set(populateArray)]
            setHasBeenRead(uniqueArray)
            setPersistedGuideHasBeenRead(uniqueArray)
          } else {
            setHasBeenRead(persistedGuideHasBeenRead)
          }
        } else if (guideHasBeenRead.length > 0) {
          setHasBeenRead([...new Set(guideHasBeenRead)])
          setPersistedGuideHasBeenRead([...new Set(guideHasBeenRead)])
        }
      }

      setGuideHasBeenRead()
    }, [guideHasBeenRead]),
  )

  const Component = error ? (
    <GuideItemCard
      isError
      sx={sx}
      nativeColorScheme={colorScheme}
      onGuidePress={onGuidePress}
      isLoading={isLoading}
    />
  ) : (
    <FlatList
      ref={flatListRef as any}
      data={isLoading ? ([...Array(4).keys()] as any) : data}
      keyExtractor={(_, index) => `item-${index}`}
      scrollEventThrottle={16}
      contentContainerStyle={sx({
        paddingY: 14,
        paddingX: [32, '2xl'],
      })}
      renderItem={({ item, index }: ListRenderItemInfo<GuideDataResponse>) => (
        <GuideItemCard
          item={item}
          sx={sx}
          isLoading={isLoading}
          isLastChild={data ? index + 1 === data.length : false}
          nativeColorScheme={colorScheme}
          onGuidePress={onGuidePress}
          hasBeenRead={hasBeenRead.includes(item.date || '')}
        />
      )}
      initialNumToRender={5}
      maxToRenderPerBatch={5}
      windowSize={4}
    />
  )

  return (
    <>
      <View
        sx={{
          paddingX: [32, '2xl'],
          paddingBottom: 'md',
          borderBottomWidth: 1,
          borderBottomColor: colorScheme === 'light' ? '#e6e6e6' : '#374151',
        }}
      >
        <Text
          sx={{
            fontSize: 20,
            fontWeight: '800',
            color: 'text',
            marginBottom: 'sm',
          }}
          // @ts-ignore
          // https://github.com/nandorojo/dripsy/issues/206
          style={Platform.OS === 'web' ? { fontWeight: 800 } : undefined}
        >
          Pilih Panduan Bulan:
        </Text>
        <TouchableOpacity
          onPress={() => push('/guide/month')}
          style={sx({
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: isLoading || error ? 'buttonDisabled' : 'tab',
            borderRadius: 8,
            paddingY: 12,
            paddingX: 'md',
            boxShadow: isLoading || error ? 'none' : 'container',
          })}
          disabled={isLoading}
        >
          <Text
            sx={{ color: isLoading || error ? 'buttonTextDisabled' : 'text' }}
          >
            {dayjs(guideMonth, 'MM').format('MMMM')}
          </Text>

          {isLoading && (
            <ActivityIndicator
              color={colors!.tabText as string}
              sx={{ marginLeft: 12 }}
            />
          )}

          {!isLoading &&
            !error &&
            (Platform.OS === 'android' ? (
              <ChevronRightIcon size={20} style={sx({ color: 'text' })} />
            ) : (
              <ChevronDownIcon size={20} style={sx({ color: 'text' })} />
            ))}
        </TouchableOpacity>
      </View>

      {Platform.OS === 'ios' ? (
        <FadeInView style={{ paddingTop: 0 }}>{Component}</FadeInView>
      ) : (
        Component
      )}
    </>
  )
}
