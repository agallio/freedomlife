import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import toast from 'react-hot-toast'

// Database
import { db, type BibleModel, localDatabaseTables } from '~/database/dexie'

// Utils
import { checkTheme } from './useDynamicTheme'
import { supabase } from '../supabase'

export function useBibleLocalMutation({
  version,
  versionTranslation,
}: {
  version: string
  versionTranslation: string
}) {
  const theme = checkTheme()

  // Constants
  const bibleTable =
    localDatabaseTables[version as keyof typeof localDatabaseTables]

  // Methods
  const bibleTableReset = async () => {
    const bibleData = await bibleTable.toArray()

    if (bibleData.length === 1189 || bibleData.length > 1189) return true

    await bibleTable.clear()

    return true
  }

  const bibleFetcher = async () => {
    const filename = `${version}_bible.json`

    const {
      data: { publicUrl },
    } = supabase.storage.from('bibles').getPublicUrl(filename)

    const { data } = await axios.get(publicUrl)

    return data as BibleModel[]
  }

  const bibleTableInsert = (data: BibleModel[]) => {
    bibleTable.bulkAdd(data)
  }

  return useMutation({
    mutationFn: async () => {
      const resetted = await bibleTableReset()

      if (resetted) {
        const data = await bibleFetcher()

        if (data && db.isOpen()) {
          bibleTableInsert(data)
        }
      }
    },
    onSuccess: () => {
      toast.success(`Alkitab ${versionTranslation} berhasil diunduh!`, {
        duration: 3000,
        style:
          theme === 'dark' ? { background: '#111827', color: '#ffffff' } : {},
      })
    },
  })
}
