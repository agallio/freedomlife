import Router from 'next/router'

// Components
import HomeCard from './HomeCard'

export default function DownloadableBibleBox() {
  return (
    <HomeCard
      className="bg-gradient-to-l from-purple-400 via-pink-500 to-red-500"
      footer={
        <button
          aria-label="Buka Halaman Panduan Penggunaan"
          className="h-10 w-full rounded-full bg-pink-800 bg-opacity-80 py-1 text-sm font-bold uppercase tracking-wider text-white transition duration-300 hover:bg-opacity-30 focus:outline-none dark:bg-white dark:bg-opacity-20 dark:hover:bg-opacity-30 sm:w-40"
          style={{
            backdropFilter: 'saturate(100%) blur(20px)',
            WebkitBackdropFilter: 'saturate(100%) blur(20px)',
          }}
          onClick={() => {
            // @ts-ignore
            if (window.umami) {
              // @ts-ignore
              window.umami.track('learn-downloadable-bible')
            }

            Router.push('/learn#mengunduh-versi-alkitab')
          }}
        >
          Lihat caranya
        </button>
      }
    >
      <div className="px-4 py-3 text-white">
        <p className="text-sm sm:text-base">
          Sekarang Anda dapat mengunduh versi Alkitab saat membaca tanpa
          panduan! <span aria-label="party emoji">🎉</span>
        </p>
      </div>
    </HomeCard>
  )
}
