import React, { PropsWithChildren, useRef } from 'react'
import { Animated, ViewStyle } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'

export default function FadeInView({
  children,
  style,
}: PropsWithChildren<{ style?: ViewStyle }>) {
  const fadeAnim = useRef(new Animated.Value(0)).current

  useFocusEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start()

    return () => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }).start()
    }
  })

  return (
    <Animated.View
      style={[
        {
          flex: 1,
          opacity: fadeAnim,
          transform: [
            {
              translateY: fadeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [8, 0],
              }),
            },
          ],
        },
        style,
      ]}
    >
      {children}
    </Animated.View>
  )
}
