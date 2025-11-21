import {
  createContext,
  useContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from 'react'
import * as SQLite from 'expo-sqlite'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { captureException } from '@sentry/react-native'

// SQLite Queries
import { queries } from './sqlite.mobile'

// Constants
import { apiUrl } from '../../../../utils/rn-constants'

// Types
import type { DownloadedDataLengthType, GetBibleDataArgs } from '../types'
import type { BibleDataResponse, VerseData } from '../../../../types'

type LocalBibleResponse = {
  id: string
  abbr: string
  book: string
  chapter: string
  version: string
  verses: string
}

type DownloadableBibleResponse = {
  id: string
  abbr: string
  book: string
  chapter: string
  version: string
  verses: VerseData[]
}

type ReadLocalDatabaseNativeContextType = {
  downloadedData: DownloadedDataLengthType

  // Methods
  insertBibleData: (_data: DownloadableBibleResponse[]) => Promise<void>
  getBibleData: (
    _data: GetBibleDataArgs,
  ) => Promise<BibleDataResponse | undefined>
  removeBibleData: (_version: string) => Promise<void>
  dropTable: () => Promise<void>
}

const ReadLocalDatabaseNativeContext =
  createContext<ReadLocalDatabaseNativeContextType>({
    downloadedData: {},

    // Methods
    insertBibleData: async () => {},
    getBibleData: async () => undefined,
    removeBibleData: async () => {},
    dropTable: async () => {},
  })

/**
 * Native only! (iOS + Android)
 *
 * This implemenation uses expo-sqlite that is only available on native.
 * Web uses dexie.js to implement the local database (see `../web/index.web.tsx`)
 */
export function ReadLocalDatabaseMobileProvider({
  children,
}: PropsWithChildren) {
  // States
  const [db, setDB] = useState<SQLite.SQLiteDatabase | null>(null)
  const [downloadedDataLength, setDownloadedDataLength] =
    useState<DownloadedDataLengthType>({})

  // Methods
  const initDB = async () => {
    try {
      const dbOpened = await SQLite.openDatabaseAsync('bibles.db')

      if (dbOpened) {
        // Init Table
        await dbOpened.execAsync(queries.TABLE_INIT)

        // Check if data is exists in table
        const storedDownloadedData = await dbOpened.getAllAsync(
          queries.TABLE_LENGTH,
        )

        // Save db & downloaded data length
        setDB(dbOpened)
        setDownloadedDataLength(
          storedDownloadedData[0] as DownloadedDataLengthType,
        )
      }
    } catch (e) {
      console.log('error from initTable (local-db-native)', e)
      captureException(e, {
        tags: {
          reactContext: 'read-local-database-native',
          method: 'initDB',
        },
      })
    }
  }

  const insertBibleData = async (data: DownloadableBibleResponse[]) => {
    if (db) {
      try {
        const formattedData = data.reduce<string[]>((prevValues, item) => {
          for (const key in item) {
            if (key === 'verses') {
              prevValues.push(JSON.stringify(item[key]))
            } else {
              prevValues.push(item[key as 'abbr']) // dummy typecasting to fix TS error.
            }
          }

          return prevValues
        }, [])

        const insertResult = await db.runAsync(
          queries.BIBLE_INSERT({ dataLength: data.length }),
          formattedData,
        )

        if (insertResult.changes === 1189) {
          const storedDownloadedData = await db.getAllAsync(
            queries.TABLE_LENGTH,
          )

          setDownloadedDataLength(
            storedDownloadedData[0] as DownloadedDataLengthType,
          )
        }
      } catch (e) {
        console.log('error from insertBibleData (local-db-native)', e)
        captureException(e, {
          tags: {
            reactContext: 'read-local-database-native',
            method: 'insertBibleData',
          },
        })
      }
    }
  }

  const getBibleData = async ({ passage, version }: GetBibleDataArgs) => {
    if (db && passage) {
      try {
        const [abbr, chapter] = passage.split('-')

        const bibleData = await db.getAllAsync<LocalBibleResponse>(
          queries.BIBLE_FIND_BY_CHAPTER,
          [abbr, chapter, version],
        )

        if (bibleData) {
          const formattedBibleData: BibleDataResponse = {
            book: bibleData[0].book,
            chapter: Number(bibleData[0].chapter),
            version: bibleData[0].version,
            data: JSON.parse(bibleData[0].verses),
          }

          return formattedBibleData
        }
      } catch (e) {
        console.log('error from getBibleData (local-db-native)', e)
        captureException(e, {
          tags: {
            reactContext: 'read-local-database-native',
            method: 'getBibleData',
          },
        })
        throw e
      }
    }
  }

  const removeBibleData = async (version: string) => {
    if (db) {
      try {
        await db.runAsync(queries.BIBLE_REMOVE, [version])
      } catch (e) {
        console.log('error from removeBibleData (local-db-native)', e)
        captureException(e, {
          tags: {
            reactContext: 'read-local-database-native',
            method: 'dropTable',
          },
        })
      }
    }
  }

  const dropTable = async () => {
    if (db) {
      try {
        await db.execAsync(`
          ${queries.TABLE_DROP}
          ${queries.TABLE_INIT}
        `)
      } catch (e) {
        console.log('error from dropTable (local-db-native)', e)
        captureException(e, {
          tags: {
            reactContext: 'read-local-database-native',
            method: 'dropTable',
          },
        })
      }
    }
  }

  // Effects
  useEffect(() => {
    if (!db) {
      initDB()
    }
  }, [db])

  return (
    <ReadLocalDatabaseNativeContext.Provider
      value={{
        downloadedData: downloadedDataLength,

        // Methods
        insertBibleData,
        getBibleData,
        removeBibleData,
        dropTable,
      }}
    >
      {children}
    </ReadLocalDatabaseNativeContext.Provider>
  )
}

/**
 * Native only! (iOS + Android)
 */
export function useReadLocalDatabaseMobile() {
  const value = useContext(ReadLocalDatabaseNativeContext)

  if (!value) {
    throw new Error(
      'useReadLocalDatabaseMobile must be used within a ReadLocalDatabaseMobileProvider',
    )
  }

  return value
}

/**
 * Native only! (iOS + Android)
 */
export function useReadLocalDatabaseMutationMobile({
  onSuccess,
}: {
  onSuccess: () => void
}) {
  const { downloadedData, insertBibleData, removeBibleData } =
    useReadLocalDatabaseMobile()

  return useMutation({
    mutationFn: async (version: string) => {
      if (downloadedData[version] > 0 && downloadedData[version] < 1189) {
        await removeBibleData(version)
      }

      // Get the bible JSON file URL first
      const {
        data: { data: publicUrl },
      } = await axios.get(`${apiUrl}/api/bible/file?version=${version}`)

      // Download the JSON
      const { data } = await axios.get<DownloadableBibleResponse[]>(publicUrl)

      // Add JSON to SQLite Table
      if (data) {
        insertBibleData(data)
      }
    },

    // Other options
    onSuccess,
  })
}
