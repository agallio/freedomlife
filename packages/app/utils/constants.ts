import { Platform } from 'react-native'

export type BibleTranslationItemType = {
  language: string
  versions: { key: string; name: string }[]
}

export const bibleTranslations: BibleTranslationItemType[] = [
  {
    language: 'Bahasa Indonesia',
    versions: [
      {
        key: 'tb',
        name: 'Terjemahan Baru (TB)',
      },
      {
        key: 'bis',
        name: 'Bahasa Indonesia Sehari-Hari (BIS)',
      },
      {
        key: 'fayh',
        name: 'Firman Allah Yang Hidup (FAYH)',
      },
      {
        key: 'vmd',
        name: 'Versi Mudah Dibaca (VMD)',
      },
      {
        key: 'tsi',
        name: 'Terjemahan Sederhana Indonesia (TSI)',
      },
    ],
  },
  {
    language: 'Bahasa Inggris',
    versions: [
      {
        key: 'msg',
        name: 'The Message (MSG)',
      },
      {
        key: 'nkjv',
        name: 'New King James Version (NKJV)',
      },
      {
        key: 'amp',
        name: 'Amplified Bible (AMP)',
      },
      {
        key: 'niv',
        name: 'New International Version (NIV)',
      },
    ],
  },
]

export type PassageDataItemType = {
  name: string
  abbr: string
  passage: number
}

export const passageData: PassageDataItemType[] = [
  { name: 'search', abbr: '', passage: 0 },
  { name: 'Kejadian', abbr: 'kej', passage: 50 },
  { name: 'Keluaran', abbr: 'kel', passage: 40 },
  { name: 'Imamat', abbr: 'ima', passage: 27 },
  { name: 'Bilangan', abbr: 'bil', passage: 36 },
  { name: 'Ulangan', abbr: 'ula', passage: 34 },
  { name: 'Yosua', abbr: 'yos', passage: 24 },
  { name: 'Hakim-Hakim', abbr: 'hak', passage: 21 },
  { name: 'Rut', abbr: 'rut', passage: 4 },
  { name: '1 Samuel', abbr: '1sa', passage: 31 },
  { name: '2 Samuel', abbr: '2sa', passage: 24 },
  { name: '1 Raja-Raja', abbr: '1ra', passage: 22 },
  { name: '2 Raja-Raja', abbr: '2ra', passage: 25 },
  { name: '1 Tawarikh', abbr: '1ta', passage: 29 },
  { name: '2 Tawarikh', abbr: '2ta', passage: 36 },
  { name: 'Ezra', abbr: 'ezr', passage: 10 },
  { name: 'Nehemia', abbr: 'neh', passage: 13 },
  { name: 'Ester', abbr: 'est', passage: 10 },
  { name: 'Ayub', abbr: 'ayb', passage: 42 },
  { name: 'Mazmur', abbr: 'mzm', passage: 150 },
  { name: 'Amsal', abbr: 'ams', passage: 31 },
  { name: 'Pengkhotbah', abbr: 'pkh', passage: 12 },
  { name: 'Kidung Agung', abbr: 'kid', passage: 8 },
  { name: 'Yesaya', abbr: 'yes', passage: 66 },
  { name: 'Yeremia', abbr: 'yer', passage: 52 },
  { name: 'Ratapan', abbr: 'rat', passage: 5 },
  { name: 'Yehezkiel', abbr: 'yeh', passage: 48 },
  { name: 'Daniel', abbr: 'dan', passage: 12 },
  { name: 'Hosea', abbr: 'hos', passage: 14 },
  { name: 'Yoel', abbr: 'yoe', passage: 3 },
  { name: 'Amos', abbr: 'amo', passage: 9 },
  { name: 'Obaja', abbr: 'oba', passage: 1 },
  { name: 'Yunus', abbr: 'yun', passage: 4 },
  { name: 'Mikha', abbr: 'mik', passage: 7 },
  { name: 'Nahum', abbr: 'nah', passage: 3 },
  { name: 'Habakuk', abbr: 'hab', passage: 3 },
  { name: 'Zefanya', abbr: 'zef', passage: 3 },
  { name: 'Hagai', abbr: 'hag', passage: 2 },
  { name: 'Zakharia', abbr: 'zak', passage: 14 },
  { name: 'Maleakhi', abbr: 'mal', passage: 4 },
  { name: 'Matius', abbr: 'mat', passage: 28 },
  { name: 'Markus', abbr: 'mrk', passage: 16 },
  { name: 'Lukas', abbr: 'luk', passage: 24 },
  { name: 'Yohanes', abbr: 'yoh', passage: 21 },
  { name: 'Kisah Para Rasul', abbr: 'kis', passage: 28 },
  { name: 'Roma', abbr: 'rom', passage: 16 },
  { name: '1 Korintus', abbr: '1ko', passage: 16 },
  { name: '2 Korintus', abbr: '2ko', passage: 13 },
  { name: 'Galatia', abbr: 'gal', passage: 6 },
  { name: 'Efesus', abbr: 'efe', passage: 6 },
  { name: 'Filipi', abbr: 'flp', passage: 4 },
  { name: 'Kolose', abbr: 'kol', passage: 4 },
  { name: '1 Tesalonika', abbr: '1te', passage: 5 },
  { name: '2 Tesalonika', abbr: '2te', passage: 3 },
  { name: '1 Timotius', abbr: '1ti', passage: 6 },
  { name: '2 Timotius', abbr: '2ti', passage: 4 },
  { name: 'Titus', abbr: 'tit', passage: 3 },
  { name: 'Filemon', abbr: 'flm', passage: 1 },
  { name: 'Ibrani', abbr: 'ibr', passage: 13 },
  { name: 'Yakobus', abbr: 'yak', passage: 5 },
  { name: '1 Petrus', abbr: '1pt', passage: 5 },
  { name: '2 Petrus', abbr: '2pt', passage: 3 },
  { name: '1 Yohanes', abbr: '1yo', passage: 5 },
  { name: '2 Yohanes', abbr: '2yo', passage: 1 },
  { name: '3 Yohanes', abbr: '3yo', passage: 1 },
  { name: 'Yudas', abbr: 'yud', passage: 1 },
  { name: 'Wahyu', abbr: 'why', passage: 22 },
]

export const tsiExcludeAbbr = [
  '1ta',
  '2ta',
  'ayb',
  'mzm',
  'kid',
  'yes',
  'yer',
  'rat',
  'yeh',
  'dan',
  'hos',
  'yoe',
  'amo',
  'oba',
  'mik',
  'nah',
  'hab',
  'zef',
  'hag',
  'zak',
]

const tsiExcludeAbbrSet = new Set(tsiExcludeAbbr)
export const tsiAbbrs = passageData
  .filter((item) => !tsiExcludeAbbrSet.has(item.abbr))
  .map((item) => item.abbr)

export const apiRateLimit = 50

const apiEnv = process.env.EXPO_PUBLIC_API_ENV || 'production'
export const apiUrl =
  Platform.OS === 'web'
    ? ''
    : apiEnv === 'local'
      ? 'http://192.168.1.5:3000'
      : 'https://freedomlife.id'

export const highlighterColors = {
  kuning: {
    color: 'bg-amber-200 dark:bg-yellow-800',
    textColor: 'text-gray-900 dark:text-white',
    hoverColor: 'hover:bg-amber-300 dark:hover:bg-yellow-900',
    iconColor: {
      light: '#000000',
      dark: '#ffffff',
    },
    accessibility: {
      label: 'Sorot dengan warna kuning',
      hint: 'Tekan untuk menyorot ayat dengan warna kuning',
    },
  },
  biru: {
    color: 'bg-blue-200 dark:bg-sky-800',
    textColor: 'text-gray-900 dark:text-white',
    hoverColor: 'hover:bg-blue-300 dark:hover:bg-sky-900',
    iconColor: {
      light: '#000000',
      dark: '#ffffff',
    },
    accessibility: {
      label: 'Sorot dengan warna biru',
      hint: 'Tekan untuk menyorot ayat dengan warna biru',
    },
  },
  hijau: {
    color: 'bg-emerald-300 dark:bg-emerald-800',
    textColor: 'text-gray-900 dark:text-white',
    hoverColor: 'hover:bg-emerald-400 dark:hover:bg-emerald-700',
    iconColor: {
      light: '#000000',
      dark: '#ffffff',
    },
    accessibility: {
      label: 'Sorot dengan warna hijau',
      hint: 'Tekan untuk menyorot ayat dengan warna hijau',
    },
  },
  netral: {
    color: 'bg-gray-800 dark:bg-gray-200',
    textColor: 'text-white dark:text-gray-900',
    hoverColor: 'hover:bg-gray-700 dark:hover:bg-gray-300',
    iconColor: {
      light: '#ffffff',
      dark: '#000000',
    },
    accessibility: {
      label: 'Sorot dengan warna abu-abu',
      hint: 'Tekan untuk menyorot ayat dengan warna abu-abu',
    },
  },
  bookmark: {
    color:
      'bg-white dark:bg-gray-700 border border-gray-400/50 dark:border-gray-600',
    textColor: 'text-gray-900 dark:text-white',
    hoverColor: 'hover:bg-gray-400 dark:hover:bg-gray-600',
    iconColor: {
      light: '#000000',
      dark: '#ffffff',
    },
    accessibility: {
      label: 'Tandai sebagai bookmark',
      hint: 'Tekan untuk menandai ayat sebagai bookmark',
    },
  },
}
