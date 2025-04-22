import mongoose from 'mongoose'
const { Schema, model } = mongoose
import { Planet } from '../../../client/src/api/types.ts'

const planetSchema = new Schema<Planet>({
  planetName: {
    type: String,
    required: true,
  },
})

const PlanetModel = model<Planet>('Planet', planetSchema, 'planets')

export default PlanetModel
