// Components
import HomeCard from './HomeCard'

export default function NoticeBox() {
  return (
    <HomeCard className="bg-gradient-to-l from-purple-400 via-pink-500 to-red-500">
      <div className="px-4 py-3 text-white">
        <p className="mb-1.5 text-sm">
          Untuk meningkatkan kualitas layanan, freedomlife akan melakukan
          maintenance pada tanggal:
        </p>
        <p className="text-sm">
          <b>31 Desember 2022 22.00</b>
        </p>
        <p className="text-sm mt-1.5">
          freedomlife akan segera kembali online setelah proses selesai. Terima
          kasih atas pengertian Anda.
        </p>
      </div>
    </HomeCard>
  )
}
