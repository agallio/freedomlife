import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import ReactConfetti from 'react-confetti'

import useElementSize from '~/utils/hooks/useElementSize'

import FreedomlifeIcon from '../Icons/FreedomlifeIcon'

interface BirthdayDialogProps {
  isOpen: boolean
  handleClose: () => void
}

export default function BirthdayDialog({
  isOpen,
  handleClose,
}: BirthdayDialogProps) {
  const [squareRef, { width, height }] = useElementSize()

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog
        onClose={() => null}
        className="fixed z-10 inset-0 overflow-y-auto"
      >
        <div className="flex items-center justify-center min-h-screen">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-40" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="relative bg-gray-50 rounded-lg max-w-[21rem] sm:max-w-md dark:bg-gray-800">
              <div
                ref={squareRef}
                className="flex flex-col items-center p-12 bg-gray-200 rounded-t-lg dark:bg-gray-700"
              >
                <ReactConfetti
                  numberOfPieces={60}
                  opacity={60}
                  width={width}
                  height={height}
                />
                <h1 className="text-sm font-medium sm:text-base">
                  Hari ini adalah hari ulang tahun,
                </h1>
                <div className="flex items-center justify-center">
                  <FreedomlifeIcon className="w-[40px] sm:w-[50px]" />
                  <h1 className="ml-[5px] text-4xl font-logo text-gray-800 dark:text-white sm:text-5xl">
                    freedomlife
                  </h1>
                </div>
              </div>

              <div className="p-4 pb-2 text-center">
                <p className="text-sm tracking-wide mb-2 sm:text-base sm:mb-4">
                  Terima kasih atas dukungan yang Anda berikan selama ini. Kami
                  tidak akan sampai di titik ini jika tanpa bantuan dan dukungan
                  Anda.
                </p>
                <p className="text-sm tracking-wide mb-2 sm:text-base sm:mb-4">
                  Semoga tahun-tahun yang akan datang, penyertaan Tuhan semakin
                  nyata, membawa sukacita, damai sejahtera, juga pengharapan di
                  dalam Yesus Kristus!
                </p>
                <p className="text-sm tracking-wide sm:text-base">
                  Tuhan Yesus memberkati!
                </p>
              </div>

              <div className="p-4 pb-6">
                <button
                  aria-label="Beri Hadiah"
                  className="text-sm w-full py-1 rounded-full uppercase font-bold tracking-widest shadow-md transition transform duration-300 bg-gradient-to-r from-[#A48EC6] via-[#D96C5C] to-[#D4B458] text-white sm:text-base sm:py-2 umami--click--to-birthday-present"
                  onClick={() =>
                    window.open('https://saweria.co/agallio', '_blank')
                  }
                >
                  Beri Hadiah!
                </button>
                <button
                  aria-label="Tutup"
                  className="text-sm w-full py-1 mt-3 rounded-full uppercase font-bold tracking-widest shadow-md transition transform duration-300 bg-gray-200 text-gray-700 hover:bg-gray-300 sm:text-base sm:py-2 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500 umami--click--to-birthday-close"
                  onClick={handleClose}
                >
                  Tutup
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
}
