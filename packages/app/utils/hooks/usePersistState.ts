import { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function usePersistState<T>(
  key: string,
  initialValue: T
): [T, (_value: T) => void] {
  const [value, setValue] = useState<T>(initialValue)

  useEffect(() => {
    const getValue = async () => {
      try {
        const value = await AsyncStorage.getItem(key)
        if (value) {
          setValue(typeof initialValue === 'string' ? value : JSON.parse(value))
        }
      } catch (error) {
        console.error(error)
      }
    }

    getValue()
  }, [key, initialValue])

  const setValueAsync = async (value: T) => {
    const newValue = typeof value === 'string' ? value : JSON.stringify(value)

    try {
      await AsyncStorage.setItem(key, newValue)
      setValue(value)
    } catch (error) {
      console.error(error)
    }
  }

  return [value, setValueAsync]
}
