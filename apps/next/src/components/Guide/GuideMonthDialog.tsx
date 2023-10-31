import { Dispatch, SetStateAction } from 'react'
import Sheet from 'react-modal-sheet'
import { motion } from 'framer-motion-10'

// Utils
import { monthList } from '~/utils/constants'
import dayjs from '~/utils/dayjs'

interface GuideMonthDialogProps {
  open: boolean
  monthNumber: string
  setMonthNumber: Dispatch<SetStateAction<string>>
  onClose: () => void
}

export default function GuideMonthDialog({
  open,
  monthNumber,
  setMonthNumber,
  onClose,
}: GuideMonthDialogProps) {
  return (
    <Sheet
      isOpen={open}
      onClose={onClose}
      tweenConfig={{ ease: [0.61, 1, 0.88, 1], duration: 0.3 }}
    >
      <Sheet.Container>
        <Sheet.Header>
          <div className="react-modal-sheet-header">
            <motion.span className="react-modal-sheet-drag-indicator" />
          </div>

          <h3 className="mx-4 mb-2 text-xl font-bold text-gray-800 dark:text-white sm:mx-auto sm:max-w-md">
            Pilih Bulan
          </h3>
        </Sheet.Header>
        <Sheet.Content>
          <div className="overflow-auto">
            <ul>
              {monthList.map((item) => (
                <li
                  key={item.value}
                  onClick={() => {
                    if (Number(item.value) <= Number(dayjs().format('MM'))) {
                      setMonthNumber(item.value)
                      onClose()
                    }
                  }}
                  className={`m-4 rounded-lg sm:mx-1 ${
                    Number(item.value) > Number(dayjs().format('MM'))
                      ? 'bg-gray-200 text-gray-500 dark:bg-gray-800 dark:text-gray-400'
                      : monthNumber === item.value
                      ? 'cursor-pointer bg-emerald-300 text-emerald-900 shadow dark:bg-emerald-700 dark:text-white'
                      : 'cursor-pointer bg-white text-gray-800 shadow dark:bg-gray-600 dark:text-white'
                  }`}
                >
                  <div className="flex items-center justify-between p-3">
                    <span>{item.name}</span>
                    {item.value === dayjs().format('MM') && (
                      <span
                        className={`rounded px-2 py-1 text-sm tracking-wide ${
                          monthNumber === item.value
                            ? 'bg-white text-emerald-700'
                            : 'bg-emerald-300 text-emerald-900 dark:bg-emerald-700 dark:text-white'
                        }`}
                      >
                        BULAN INI
                      </span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Sheet.Content>
      </Sheet.Container>

      <Sheet.Backdrop onTap={onClose} />
    </Sheet>
  )
}
