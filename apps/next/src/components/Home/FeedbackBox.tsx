import HomeCard from './HomeCard'

export default function FeedbackBox() {
  return (
    <HomeCard
      top="6"
      className="bg-gradient-to-r from-yellow-800 via-yellow-600 to-yellow-400"
    >
      <div className="px-4 py-3 text-white">
        <p className="font-semibold tracking-wide">
          Beri Kami Saran &amp; Masukan!
        </p>
        <p className="mt-2 text-sm">
          Saran dan masukan Anda sangat berarti untuk kami. Sentuh atau klik
          tombol dibawah ini untuk memberikan masukan.
        </p>
      </div>

      <div
        className="flex w-full items-center justify-end rounded-b-lg px-4 py-2"
        style={{
          backdropFilter: 'saturate(70%) blur(80px)',
          WebkitBackdropFilter: 'saturate(70%) blur(80px)',
        }}
      >
        <button
          aria-label="Kirim Masukan"
          className="sm:text-md h-10 w-full rounded-full bg-white bg-opacity-20 py-1 text-sm font-bold uppercase tracking-wider text-white transition duration-300 hover:bg-opacity-30 focus:outline-none sm:w-60"
          style={{
            backdropFilter: 'saturate(100%) blur(20px)',
            WebkitBackdropFilter: 'saturate(100%) blur(20px)',
          }}
        >
          Kirim Saran &amp; Masukan
        </button>
      </div>
    </HomeCard>
  )
}
