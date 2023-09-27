import { Platform, useColorScheme } from 'react-native'
import { View, Text, useSx } from 'dripsy'
import { BlurTint, BlurView } from 'expo-blur'
import { Skeleton } from 'moti/skeleton'

// Constants
import { skeletonColors } from 'app/provider/dripsy/colors'

// Types
import type { PropsWithChildren, ReactNode } from 'react'

interface CardProps {
  title?: string
  subtitle?: string
  footer?: ReactNode
  actionButton?: ReactNode
  options?: {
    isLoading?: boolean
    titleColor?: string
    subtitleColor?: string
    backgroundColor?: string
    isLastChild?: boolean
    lastChildPadding?: string | number
  }
}

export default function Card({
  title,
  subtitle,
  footer,
  actionButton,
  options,
  children,
}: PropsWithChildren<CardProps>) {
  const sx = useSx()
  const colorScheme = useColorScheme()

  return (
    <View
      sx={{
        overflow: 'hidden',
        borderRadius: 12,
        boxShadow: 'container',
        backgroundColor: options?.backgroundColor || 'tab',
        marginBottom: options?.isLastChild
          ? options?.lastChildPadding || 130
          : 24,
      }}
    >
      {title && (
        <BlurView
          intensity={colorScheme === 'light' ? 10 : 20}
          tint={colorScheme as BlurTint}
          style={sx({
            paddingX: 'md',
            paddingY: 12,
            borderBottomWidth: colorScheme === 'light' ? 1 : 0,
            borderBottomColor: colorScheme === 'light' ? '#e6e6e6' : undefined,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          })}
        >
          <Skeleton
            show={options?.isLoading}
            width="50%"
            colors={skeletonColors(colorScheme)}
          >
            <View>
              <Text
                sx={{
                  fontSize: 20,
                  fontWeight: '800',
                  color: options?.titleColor || 'text',
                }}
                // @ts-ignore
                // https://github.com/nandorojo/dripsy/issues/206
                style={Platform.OS === 'web' ? { fontWeight: 800 } : undefined}
              >
                {title}
              </Text>
              {subtitle && (
                <Text
                  sx={{
                    color: options?.subtitleColor || 'text',
                    marginTop: 'xs',
                  }}
                >
                  {subtitle}
                </Text>
              )}
            </View>
          </Skeleton>

          {actionButton}
        </BlurView>
      )}

      <View style={sx({ paddingX: 'md', paddingY: 12 })}>{children}</View>

      {footer}
    </View>
  )
}
