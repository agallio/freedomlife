const NewTranslationBox = (): JSX.Element => (
  <div className="mt-2 rounded-lg shadow-md px-4 py-3 text-white bg-gradient-to-l from-purple-400 via-pink-500 to-red-500">
    <p className="mb-1">
      <b>
        Tersedia 2 Terjemahan Baru!{' '}
        <span role="img" aria-label="confetti" className="ml-1">
          🎉
        </span>
      </b>
    </p>
    <div className="text-sm">
      <p>→ Versi Mudah Dibaca (VMD)</p>
      <p>→ Amplified Bible (AMP)</p>
    </div>
  </div>
)

export default NewTranslationBox
