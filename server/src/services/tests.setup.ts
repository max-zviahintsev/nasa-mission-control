import { beforeAll, afterAll } from 'vitest'
import { mongoConnect, gracefulShutdown } from './mongo.ts'

beforeAll(async () => {
  await mongoConnect()
})

afterAll(async () => {
  await gracefulShutdown()
})
