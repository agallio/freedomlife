import Dexie, { type Table } from 'dexie'

export type BibleModel = {
  id?: number
  abbr: string
  book: string
  chapter: string
  version: string
  verses: { content: string; type: string; verse: number }[]
}

class FLBibleIDB extends Dexie {
  tb_bible!: Table<BibleModel>
  bis_bible!: Table<BibleModel>
  fayh_bible!: Table<BibleModel>
  vmd_bible!: Table<BibleModel>
  msg_bible!: Table<BibleModel>
  nkjv_bible!: Table<BibleModel>
  amp_bible!: Table<BibleModel>
  niv_bible!: Table<BibleModel>

  constructor() {
    super('FLBibleIDB')
    this.version(1).stores({
      tb_bible: '++id, abbr, book, chapter, version, verses',
      bis_bible: '++id, abbr, book, chapter, version, verses',
      fayh_bible: '++id, abbr, book, chapter, version, verses',
      vmd_bible: '++id, abbr, book, chapter, version, verses',
      msg_bible: '++id, abbr, book, chapter, version, verses',
      nkjv_bible: '++id, abbr, book, chapter, version, verses',
      amp_bible: '++id, abbr, book, chapter, version, verses',
      niv_bible: '++id, abbr, book, chapter, version, verses',
    })
  }
}

export const db = new FLBibleIDB()

export const localDatabaseTables = {
  tb: db.tb_bible,
  bis: db.bis_bible,
  fayh: db.fayh_bible,
  vmd: db.vmd_bible,
  msg: db.msg_bible,
  nkjv: db.nkjv_bible,
  amp: db.amp_bible,
  niv: db.niv_bible,
} as const
