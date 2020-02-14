import mongoose from 'mongoose';
const { Schema } = mongoose;

const wartaSchema = new Schema({
  month: String,
  year: String,
  month_data: [
    {
      date: String,
      url: String
    }
  ]
});

export default wartaSchema;
