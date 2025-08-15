import { schemaMigrations } from '@nozbe/watermelondb/Schema/migrations'

export default schemaMigrations({
  migrations: [
    // Future migrations will be added here
    // Example for version 2:
    // {
    //   toVersion: 2,
    //   steps: [
    //     addColumns({
    //       table: 'saved_verses',
    //       columns: [{ name: 'notes', type: 'string' }],
    //     }),
    //   ],
    // },
  ],
})
