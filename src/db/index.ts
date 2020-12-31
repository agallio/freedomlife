import { Model, Connection } from 'mongoose'
import createConnections from './connection'
import GuideSchema, { GuideInterface } from './models/guide.model'
import BibleSchema, { BibleInterface } from './models/bible.model'

export type { GuideInterface, BibleInterface }

type Connections = {
  db1: Connection
  db2: Connection
}

export interface Database {
  // @ts-ignore
  GuideModel: Model<GuideInterface, unknown>
  // @ts-ignore
  TBBibleModel: Model<BibleInterface, unknown>
  // @ts-ignore
  BISBibleModel: Model<BibleInterface, unknown>
  // @ts-ignore
  FAYHBibleModel: Model<BibleInterface, unknown>
  // @ts-ignore
  MSGBibleModel: Model<BibleInterface, unknown>
  // @ts-ignore
  NKJVBibleModel: Model<BibleInterface, unknown>
  connections: Connections
}

let db: Database

export const getDatabase = (): Promise<Database> => {
  if (db) return Promise.resolve(db)
  return createDatabases()
}

const createDatabases = async (): Promise<Database> => {
  const { db1, db2 } = await createConnections()

  const GuideModel = db1.model<GuideInterface>('GuideClasses', GuideSchema)
  const TBBibleModel = db2.model<BibleInterface>('TB_Bible', BibleSchema)
  const BISBibleModel = db2.model<BibleInterface>('BIS_Bible', BibleSchema)
  const FAYHBibleModel = db2.model<BibleInterface>('FAYH_Bible', BibleSchema)
  const MSGBibleModel = db2.model<BibleInterface>('MSG_Bible', BibleSchema)
  const NKJVBibleModel = db2.model<BibleInterface>('NKJV_Bible', BibleSchema)

  db = {
    GuideModel,
    TBBibleModel,
    BISBibleModel,
    FAYHBibleModel,
    MSGBibleModel,
    NKJVBibleModel,
    connections: {
      db1,
      db2,
    },
  }

  return db
}
