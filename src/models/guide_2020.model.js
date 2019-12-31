import mongoose from 'mongoose';
const { Schema } = mongoose;

const guideSchema = new Schema({
  day: String,
  month: String,
  month_name: String,
  year: String,
  date: String,
  pl: String,
  pb: String,
  pl_name: String,
  pb_name: String
});

export default guideSchema;
