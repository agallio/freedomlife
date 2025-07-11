import { appSchema, tableSchema } from '@nozbe/watermelondb'

export default appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: 'saved_verses',
      columns: [
        { name: 'user_id', type: 'string' },
        { name: 'book', type: 'string' },
        { name: 'abbr', type: 'string' },
        { name: 'chapter', type: 'string' },
        { name: 'verse', type: 'string' },
        { name: 'version', type: 'string' },
        { name: 'verse_text', type: 'string' }, // actual verse content
        { name: 'kind', type: 'string' }, // 'highlight' | 'bookmark'
        { name: 'color', type: 'string' }, // nullable

        // Special columns for WatermelonDB
        { name: 'created_at', type: 'number' },
        { name: 'updated_at', type: 'number' },
      ],
    }),
  ],
})
