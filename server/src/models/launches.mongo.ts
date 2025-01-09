import mongoose from 'mongoose'
const { Schema, model } = mongoose
import { Launch } from '../../../client/src/api/types.ts'

const launchSchema = new Schema<Launch>({
  flightNumber: {
    type: Number,
    required: true,
  },
  launchDate: {
    type: Date,
    required: true,
  },
  mission: {
    type: String,
    required: true,
  },
  rocket: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
  },
  customers: [String],
  upcoming: {
    type: Boolean,
    required: true,
  },
  success: {
    type: Boolean,
    required: true,
    default: true,
  },
})

const LaunchModel = model<Launch>('Launch', launchSchema)

export default LaunchModel
