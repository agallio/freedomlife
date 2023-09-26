import { Platform, useColorScheme } from 'react-native'
import { Text, useSx, View } from 'dripsy'
import { LinearGradient } from 'expo-linear-gradient'
import { BlurView } from 'expo-blur'

// Types
import type { PropsWithChildren, ReactNode } from 'react'

interface GradientCardProps {
  title?: string
  subtitle?: string
  footer?: ReactNode
  actionButton?: ReactNode
  options: {
    lightColorScheme: string[]
    darkColorScheme: string[]
    startColorConfig?: [number, number]
    endColorConfig?: [number, number]
    titleColor?: string
    subtitleColor?: string
    isLastChild?: boolean
    lastChildPadding?: string | number
    insidePadding?: { paddingX: string | number; paddingY: string | number }
  }
}

export default function GradientCard({
  title,
  subtitle,
  footer,
  actionButton,
  options,
  children,
}: PropsWithChildren<GradientCardProps>) {
  const sx = useSx()
  const colorScheme = useColorScheme()

  return (
    <View sx={{ boxShadow: 'container' }}>
      <LinearGradient
        colors={
          colorScheme === 'light'
            ? options.lightColorScheme
            : options.darkColorScheme
        }
        start={options.startColorConfig || [0.25, 1]}
        end={options.endColorConfig || [1, 0.25]}
        style={sx({
          borderRadius: 12,
          marginBottom: options.isLastChild
            ? options.lastChildPadding || 130
            : 24,
        })}
      >
        {title && (
          <BlurView
            intensity={colorScheme === 'light' ? 10 : 20}
            tint="dark"
            style={sx({
              paddingX: 'md',
              paddingY: 12,
              borderTopLeftRadius: 12,
              borderTopRightRadius: 12,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            })}
          >
            <View>
              <Text
                allowFontScaling={false}
                sx={{
                  fontSize: 20,
                  fontWeight: '800',
                  color: options.titleColor || 'text',
                }}
                // @ts-ignore
                // https://github.com/nandorojo/dripsy/issues/206
                style={Platform.OS === 'web' ? { fontWeight: 800 } : undefined}
              >
                {title}
              </Text>
              {subtitle && (
                <Text
                  allowFontScaling={false}
                  sx={{
                    color: options.subtitleColor || 'text',
                    marginTop: 'xs',
                  }}
                >
                  {subtitle}
                </Text>
              )}
            </View>

            {actionButton}
          </BlurView>
        )}

        <View
          style={sx(options.insidePadding || { paddingX: 'md', paddingY: 12 })}
        >
          {children}
        </View>

        {footer}
      </LinearGradient>
    </View>
  )
}
