import { createContext, useContext, type PropsWithChildren } from 'react'
import { useLiveQuery } from 'dexie-react-hooks'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

// IndexedDB Utils
import { db, localDatabaseTables } from './dexie.web'

// Types
import type { GetBibleDataArgs } from '../types'
import type { BibleDataResponse } from '../../../../types'

interface ReadLocalDatabaseWebContextType {
  isDBOpen: boolean
  downloadedData: { [key: string]: boolean }

  // Methods
  getBibleData: (
    _data: GetBibleDataArgs,
  ) => Promise<BibleDataResponse | undefined>
}

const ReadLocalDatabaseWebContext =
  createContext<ReadLocalDatabaseWebContextType>({
    isDBOpen: false,
    downloadedData: {},

    // Methods
    getBibleData: async () => undefined,
  })

/**
 * Web only!
 *
 * This implemenation uses dexie.js to store the bible data into IndexedDB database.
 * Native uses expo-sqlite to implement the local database (see `../native/index.native.tsx`)
 */
export function ReadLocalDatabaseWebProvider({ children }: PropsWithChildren) {
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

  // Methods
  const getBibleData = async ({ passage, version }: GetBibleDataArgs) => {
    try {
      const [abbr, chapter] = passage.split('-')

      const bibleTable =
        localDatabaseTables[version as keyof typeof localDatabaseTables]

      if (bibleTable) {
        const bibleDataArray = await bibleTable
          .filter(
            (data) =>
              data.abbr === abbr &&
              data.chapter === chapter &&
              data.version === version,
          )
          .toArray()

        const formattedBibleData: BibleDataResponse = {
          book: bibleDataArray[0].book,
          chapter: Number(bibleDataArray[0].chapter),
          version: bibleDataArray[0].version,
          data: bibleDataArray[0].verses,
        }

        return formattedBibleData
      }

      return undefined
    } catch (e) {
      console.log('error from getBibleData (local-db-web)', e)
      throw e
    }
  }

  return (
    <ReadLocalDatabaseWebContext.Provider
      value={{
        isDBOpen,
        downloadedData,

        // Methods
        getBibleData,
      }}
    >
      {children}
    </ReadLocalDatabaseWebContext.Provider>
  )
}

/**
 * Web only!
 */
export function useReadLocalDatabaseWeb() {
  const value = useContext(ReadLocalDatabaseWebContext)

  if (!value) {
    throw new Error(
      'useReadLocalDatabaseWeb must be used within a ReadLocalDatabaseWebProvider',
    )
  }

  return value
}

/**
 * Web only!
 */
export function useReadLocalDatabaseMutationWeb({
  onSuccess,
}: {
  onSuccess: () => void
}) {
  return useMutation({
    mutationFn: async (version: string) => {
      const bibleTable =
        localDatabaseTables[version as keyof typeof localDatabaseTables]

      // Reset table if the data is incomplete
      const bibleData = await bibleTable.toArray()
      if (bibleData.length < 1189) {
        await bibleTable.clear()
      }

      // Get the bible JSON file URL first
      const {
        data: { data: publicUrl },
      } = await axios.get(`/api/bible/file?version=${version}`)

      // Download the JSON
      const { data } = await axios.get(publicUrl)

      // Add JSON to IndexedDB table (only if DB is open)
      if (data && db.isOpen()) {
        bibleTable.bulkAdd(data)
      }
    },

    // Other options
    onSuccess,
  })
}
