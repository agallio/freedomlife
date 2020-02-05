import mongoose from 'mongoose';
const { Schema } = mongoose;

const guideSchema = new Schema({
  month: String,
  month_name: String,
  year: String,
  date: String,
  pl: String,
  pb: String,
  alt: String,
  pl_name: String,
  pb_name: String,
  alt_name: String
});

export default guideSchema;
