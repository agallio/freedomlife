import { Schema, Document } from 'mongoose'

export interface GuideInterface extends Document {
  month: string
  month_name: string
  year: string
  date: string
  pl: string
  pb: string
  alt: string
  pl_name: string
  pb_name: string
  alt_name: string
}

const guideSchema: Schema = new Schema({
  month: String,
  month_name: String,
  year: String,
  date: String,
  pl: String,
  pb: String,
  alt: String,
  pl_name: String,
  pb_name: String,
  alt_name: String,
})

export default guideSchema
