import { View } from 'react-native'

// Components
import { Text } from '../../../../../components/text'
import ListItem from '../../../../../components/list-item'

// Utils
import { cn } from '../../../../../utils/helpers'
import dayjs from '../../../../../utils/dayjs'

type GuideMonthItemProps = {
  monthNumber: number
  active?: boolean
  disabled?: boolean
  onClick?: (_monthString: string) => void
}

export default function GuideMonthItem({
  monthNumber,
  active,
  disabled,
  onClick,
}: GuideMonthItemProps) {
  const date = new Date(Number(dayjs().format('YYYY')), monthNumber, 1)
  const monthString = String(monthNumber + 1).padStart(2, '0')

  return (
    <ListItem
      active={active}
      disabled={disabled}
      onClick={() => onClick?.(monthString)}
    >
      <View className="flex flex-row items-center justify-between">
        <Text
          className={cn(
            'select-none',
            disabled && 'text-gray-600 dark:text-gray-500',
          )}
        >
          {dayjs(date).format('MMMM')}
        </Text>

        {Number(monthNumber + 1) === Number(dayjs().format('M')) && (
          <View
            className={cn(
              'rounded px-2 py-1',
              active
                ? 'bg-emerald-100 dark:bg-emerald-900'
                : 'bg-emerald-300 dark:bg-emerald-800',
            )}
          >
            <Text
              customFontSize="text-sm"
              className="select-none uppercase tracking-wide"
            >
              Bulan Ini
            </Text>
          </View>
        )}
      </View>
    </ListItem>
  )
}
