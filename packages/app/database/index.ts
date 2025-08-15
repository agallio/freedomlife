import 'react-native-get-random-values'

import { Platform } from 'react-native'
import { Database } from '@nozbe/watermelondb'
import { setGenerator } from '@nozbe/watermelondb/utils/common/randomId'
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite'
import { v4 as uuidv4 } from 'uuid'

// WDB Config
import schema from './schema'
import migrations from './migrations'

// Models
import SavedVerseModel from './models/saved-verse.model'

const adapter = new SQLiteAdapter({
  schema,
  migrations,
  dbName: 'freedomlife_sync',
  jsi: Platform.OS === 'ios',
  onSetUpError: (error) => {
    if (process.env.NODE_ENV === 'development') {
      console.log('WatermelonDB setup error:', error)
    }
    // Handle database setup errors gracefully
    console.error('Database failed to initialize:', error)
  },
})

const database = new Database({
  adapter,
  modelClasses: [SavedVerseModel],
})

// Change ID generator to UUID for future sync compatibility
setGenerator(() => uuidv4())

export default database
