import HomeCard from '../Card/HomeCard'

const FeedbackBox = (): JSX.Element => (
  <HomeCard
    top="6"
    className="bg-gradient-to-r from-yellow-800 via-yellow-600 to-yellow-400"
  >
    <div className="px-4 py-3 text-white">
      <p className="font-semibold tracking-wide">
        Beri Kami Saran &amp; Masukan!
      </p>
      <p className="text-sm mt-2">
        Saran dan masukan Anda sangat berarti untuk kami. Sentuh atau klik
        tombol dibawah ini untuk memberikan masukan.
      </p>
    </div>

    <div
      className="flex items-center justify-end w-full px-4 py-2 rounded-b-lg"
      style={{
        backdropFilter: 'saturate(70%) blur(80px)',
        WebkitBackdropFilter: 'saturate(70%) blur(80px)',
      }}
    >
      <button
        aria-label="Kirim Masukan"
        className="w-full h-10 bg-white bg-opacity-20 text-sm text-white py-1 uppercase rounded-full font-bold transition duration-300 tracking-wider sm:text-md sm:w-60 focus:outline-none hover:bg-opacity-30"
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

export default FeedbackBox
