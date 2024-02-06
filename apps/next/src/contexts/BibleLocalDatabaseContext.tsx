import { type PropsWithChildren, createContext, useContext } from 'react'
import { useLiveQuery } from 'dexie-react-hooks'

import { db, localDatabaseTables } from '~/database/dexie'

interface BibleLocalDatabaseContextType {
  isDBOpen: boolean
  downloadedData: { [key: string]: boolean }
}

const BibleLocalDatabaseContext = createContext<BibleLocalDatabaseContextType>({
  isDBOpen: false,
  downloadedData: {},
})

export function BibleLocalDatabaseProvider({ children }: PropsWithChildren) {
  // Queries
  const bibleTBLength =
    useLiveQuery(() => localDatabaseTables.tb?.toArray())?.length || []
  const bibleBISLength =
    useLiveQuery(() => localDatabaseTables.bis?.toArray())?.length || []
  const bibleFAYHLength =
    useLiveQuery(() => localDatabaseTables.fayh?.toArray())?.length || []
  const bibleVMDLength =
    useLiveQuery(() => localDatabaseTables.vmd?.toArray())?.length || []
  const bibleMSGLength =
    useLiveQuery(() => localDatabaseTables.msg?.toArray())?.length || []
  const bibleNKJVLength =
    useLiveQuery(() => localDatabaseTables.nkjv?.toArray())?.length || []
  const bibleAMPLength =
    useLiveQuery(() => localDatabaseTables.amp?.toArray())?.length || []
  const bibleNIVLength =
    useLiveQuery(() => localDatabaseTables.niv?.toArray())?.length || []

  // Constants
  const isDBOpen = db.isOpen()

  const downloadedData = {
    tb: isDBOpen && bibleTBLength === 1189,
    bis: isDBOpen && bibleBISLength === 1189,
    fayh: isDBOpen && bibleFAYHLength === 1189,
    vmd: isDBOpen && bibleVMDLength === 1189,
    msg: isDBOpen && bibleMSGLength === 1189,
    nkjv: isDBOpen && bibleNKJVLength === 1189,
    amp: isDBOpen && bibleAMPLength === 1189,
    niv: isDBOpen && bibleNIVLength === 1189,
  }

  return (
    <BibleLocalDatabaseContext.Provider value={{ isDBOpen, downloadedData }}>
      {children}
    </BibleLocalDatabaseContext.Provider>
  )
}

export function useBibleLocalDatabase() {
  const context = useContext(BibleLocalDatabaseContext)
  if (!context) {
    throw new Error(
      'useBibleLocalDatabase must be used within a BibleLocalDatabaseProvider',
    )
  }
  return context
}
