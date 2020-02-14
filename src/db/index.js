import createConnections from './connections';
import GuideSchema from '../models/guide.model';
import Guide2020Schema from '../models/guide_2020.model';
import BibleSchema from '../models/bible.model';
import WartaSchema from '../models/warta.model';

let db;

export const getDatabase = () => {
  if (db) return Promise.resolve(db);
  return createDatabases();
};

const createDatabases = async () => {
  const { db1, db2, db1_2020 } = await createConnections();
  const GuideModel = db1.model('Guides', GuideSchema);
  const GuideModel2020 = db1_2020.model('Guides_2020', Guide2020Schema);
  const TBBibleModel = db2.model('TB_Bible', BibleSchema);
  const BISBibleModel = db2.model('BIS_Bible', BibleSchema);
  const FAYHBibleModel = db2.model('FAYH_Bible', BibleSchema);
  const MSGBibleModel = db2.model('MSG_Bible', BibleSchema);
  const NKJVBibleModel = db2.model('NKJV_Bible', BibleSchema);
  const WartaModel = db1_2020.model('Warta', WartaSchema);

  db = {
    GuideModel,
    GuideModel2020,
    TBBibleModel,
    BISBibleModel,
    FAYHBibleModel,
    MSGBibleModel,
    NKJVBibleModel,
    WartaModel,
    connections: {
      db1,
      db2,
      db1_2020
    }
  };

  return db;
};
