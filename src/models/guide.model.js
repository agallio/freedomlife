import mongoose from 'mongoose';
const { Schema } = mongoose;

const guideSchema = new Schema({
  day: String,
  month: String,
  month_name: String,
  year: String,
  date: String,
  pl: String,
  pb1: String,
  pb2: String,
  pl_name: String,
  pb1_name: String,
  pb2_name: String
});

export default guideSchema;
