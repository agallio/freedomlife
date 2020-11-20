import { Connection, createConnection } from 'mongoose'

const connection = async (): Promise<{ db1: Connection; db2: Connection }> => {
  const db1 = await createConnection(process.env.DB_FL_URI as string, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  const db2 = await createConnection(process.env.DB_BIBLE_URI as string, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })

  return {
    db1,
    db2,
  }
}

export default connection
