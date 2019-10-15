import mongoose from 'mongoose';
const { Schema } = mongoose;

const bibleSchema = new Schema({
  book: String,
  abbr: String,
  chapter: String,
  verses: Array
});

export default bibleSchema;
