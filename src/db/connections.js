import { createConnection } from 'mongoose';

export default async () => {
  const db1 = await createConnection(process.env.DB_FL_URI, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
  });
  const db2 = await createConnection(process.env.DB_BIBLE_URI, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
  });
  return {
    db1,
    db2
  };
};
