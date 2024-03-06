import { ComponentProps } from 'react'
import { Platform, Text as RNText } from 'react-native'

// Utils
import { cn } from '../utils/helpers'

export type CustomFontSizeType =
  | 'text-xs'
  | 'text-sm'
  | 'text-lg'
  | 'text-xl'
  | 'text-2xl'
  | 'text-3xl'
  | 'custom'

type CustomFontWeightType =
  | 'font-normal'
  | 'font-bold'
  | 'font-light'
  | 'font-medium'
  | 'font-semibold'

type TextProps = ComponentProps<typeof RNText> & {
  customFontSize?: CustomFontSizeType
  customFontWeight?: CustomFontWeightType
}

const parseFontFamily = (fontWeight: CustomFontWeightType) => {
  switch (fontWeight) {
    case 'font-bold':
      return 'inter-bold'
    case 'font-light':
      return 'inter-light'
    case 'font-medium':
      return 'inter-medium'
    case 'font-semibold':
      return 'inter-semibold'

    case 'font-normal':
    default:
      return 'inter'
  }
}

export function Text(props: TextProps) {
  const fontWeight = props.customFontWeight || 'font-normal'
  const fontSize =
    props.customFontSize === 'custom'
      ? undefined
      : props.customFontSize
        ? props.customFontSize
        : 'text-base'

  return (
    <RNText
      // Semantic HTML for Web
      // @ts-ignore
      role={Platform.OS === 'web' ? 'paragraph' : undefined}
      {...props}
      allowFontScaling={props.allowFontScaling || false}
      className={cn(
        'text-emerald-900 dark:text-white',
        fontSize,
        Platform.OS === 'web' && `${fontWeight} font-inter`,
        props.className,
      )}
      style={[
        Platform.OS !== 'web'
          ? { fontFamily: parseFontFamily(fontWeight) }
          : undefined,
        props.style,
      ]}
    />
  )
}

export function Header(props: TextProps) {
  return (
    <Text
      {...props}
      // Semantic HTML for Web
      role={Platform.OS === 'web' ? 'heading' : undefined}
      allowFontScaling={props.allowFontScaling || false}
      customFontSize={props.customFontSize ? props.customFontSize : 'text-xl'}
      customFontWeight={
        props.customFontWeight ? props.customFontWeight : 'font-bold'
      }
      className={cn('leading-relaxed', props.className)}
    />
  )
}
