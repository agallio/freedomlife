import { Dispatch, SetStateAction } from 'react'
import Sheet from 'react-modal-sheet'
import { motion } from 'framer-motion'

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
    <Sheet isOpen={open} onClose={onClose}>
      <Sheet.Container onViewportBoxUpdate={null}>
        <Sheet.Header onViewportBoxUpdate={null}>
          <div className="react-modal-sheet-header">
            <motion.span className="react-modal-sheet-drag-indicator" />
          </div>

          <h3 className="mx-4 mb-2 text-gray-800 font-bold text-xl sm:max-w-md sm:mx-auto dark:text-white">
            Pilih Bulan
          </h3>
        </Sheet.Header>
        <Sheet.Content onViewportBoxUpdate={null}>
          <div className="overflow-auto">
            <ul>
              {monthList.map((item) => (
                <li
                  key={item.value}
                  onClick={() => {
                    setMonthNumber(item.value)
                    onClose()
                  }}
                  className={`rounded-lg shadow m-4 sm:mx-1 ${
                    monthNumber === item.value
                      ? 'bg-emerald-300 dark:bg-emerald-700 text-emerald-900 dark:text-white'
                      : 'bg-white text-gray-800 dark:bg-gray-600 dark:text-white'
                  }`}
                >
                  <div className="p-3 flex items-center justify-between">
                    <span>{item.name}</span>
                    {item.value === dayjs().format('MM') && (
                      <span
                        className={`py-1 px-2 text-sm rounded tracking-wide ${
                          monthNumber === item.value
                            ? 'bg-white text-emerald-700'
                            : 'bg-emerald-300 dark:bg-emerald-700 text-emerald-900 dark:text-white'
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

      <Sheet.Backdrop onTap={onClose} onViewportBoxUpdate={null} />
    </Sheet>
  )
}
