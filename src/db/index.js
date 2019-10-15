import createConnections from './connections';
import GuideSchema from '../models/guide.model';
import BibleSchema from '../models/bible.model';

let db;

export const getDatabase = () => {
  if (db) return Promise.resolve(db);
  return createDatabases();
};

const createDatabases = async () => {
  const { db1, db2 } = await createConnections();
  const GuideModel = db1.model('Guides', GuideSchema);
  const BibleModel = db2.model('TB_Bible', BibleSchema);

  db = {
    GuideModel,
    BibleModel,
    connections: {
      db1,
      db2
    }
  };

  return db;
};
