import { Collection } from 'mongodb'
import connectToDatabase from './connection'
import { GuideInterface } from './models/guide.model'
import { BibleInterface } from './models/bible.model'

export type { GuideInterface, BibleInterface }

export interface Database {
  GuideModel: Collection<any>
  TBBibleModel: Collection<any>
  BISBibleModel: Collection<any>
  FAYHBibleModel: Collection<any>
  MSGBibleModel: Collection<any>
  NKJVBibleModel: Collection<any>
}

export async function getDatabase(): Promise<Database> {
  const { db1, db2 } = await connectToDatabase()

  const GuideModel = await db1.collection('guideclasses')
  const TBBibleModel = await db2.collection('tb_bibles')
  const BISBibleModel = await db2.collection('bis_bibles')
  const FAYHBibleModel = await db2.collection('fayh_bibles')
  const MSGBibleModel = await db2.collection('msg_bibles')
  const NKJVBibleModel = await db2.collection('nkjv_bibles')

  return {
    GuideModel,
    TBBibleModel,
    BISBibleModel,
    FAYHBibleModel,
    MSGBibleModel,
    NKJVBibleModel,
  }
}
