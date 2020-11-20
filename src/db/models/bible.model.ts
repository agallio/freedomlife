import { Schema, Document } from 'mongoose'

type Verse = {
  content: string
  type: string
  verse: number
}

export interface BibleInterface extends Document {
  book: string
  abbr: string
  chapter: string
  verses: Verse[]
}

const bibleSchema: Schema = new Schema({
  book: String,
  abbr: String,
  chapter: String,
  verses: Array,
})

export default bibleSchema
