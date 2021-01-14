import { Db, MongoClient } from 'mongodb'

let cached = (global as any).mongo

if (!cached) {
  cached = (global as any).mongo = { conn: null, promise: null }
}

export default async function connectToDatabase(): Promise<{
  client: MongoClient
  db1: Db
  db2: Db
}> {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }

    cached.promise = MongoClient.connect(
      process.env.DB_FL_URI as string,
      opts
    ).then((client) => {
      return { client, db1: client.db('freedomlife'), db2: client.db('bible') }
    })
  }

  cached.conn = await cached.promise

  return cached.conn
}
