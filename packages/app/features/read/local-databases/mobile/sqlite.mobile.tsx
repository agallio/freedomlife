export const availableVersions = [
  'tb',
  'bis',
  'fayh',
  'vmd',
  'msg',
  'nkjv',
  'amp',
  'niv',
]

const TABLE_DROP = `DROP TABLE IF EXISTS bibles_table;`

const TABLE_INIT = `
  PRAGMA journal_mode = WAL;
  CREATE TABLE IF NOT EXISTS "bibles_table" (
    "id" TEXT NOT NULL UNIQUE,
    "abbr" TEXT NOT NULL,
    "book" TEXT NOT NULL,
    "chapter" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "verses" TEXT NOT NULL,
    PRIMARY KEY("id")
  );
`

const SINGLE_TABLE_LENGTH = (version: string) =>
  `(SELECT COUNT(*) FROM bibles_table WHERE version = '${version}') AS ${version}`

const TABLE_LENGTH = `
  SELECT
    ${availableVersions
      .map(
        (version, idx) =>
          `${SINGLE_TABLE_LENGTH(version)}${idx === availableVersions.length - 1 ? '' : ','}`,
      )
      .join('\n')};
`

const BIBLE_FIND_BY_CHAPTER = `
  SELECT *
  FROM bibles_table
  WHERE
    abbr = ?
    AND chapter = ?
    AND version = ?
`

const BIBLE_INSERT = ({ dataLength }: { dataLength: number }) => `
  INSERT INTO "bibles_table" (id, abbr, book, chapter, version, verses)
  VALUES ${Array.from({ length: dataLength }, () => `(?, ?, ?, ?, ?, ?)`)}
`

const BIBLE_REMOVE = `
  DELETE FROM bibles_table WHERE version = ?
`

// Commented for future use.
// const TB_BIBLE_FIND_CHAPTER = `
//   SELECT
//     verses
//   FROM tb_bible
//   JOIN json_each(tb_bible.verses) AS extracted
//   WHERE
//     extracted.value IS NOT NULL
//     AND extracted.value LIKE '%"content":"a"%';
// `;

export const queries = {
  TABLE_INIT,
  TABLE_DROP,
  TABLE_LENGTH,

  BIBLE_FIND_BY_CHAPTER,
  BIBLE_INSERT,
  BIBLE_REMOVE,
}
