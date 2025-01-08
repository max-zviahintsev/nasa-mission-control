import fastify, { FastifyInstance } from 'fastify'
import cors from '@fastify/cors'
import { Server, IncomingMessage, ServerResponse } from 'node:http'
import {
  getLaunchesRoute,
  addLaunchRoute,
  abortLaunchRoute,
} from './routes/launches/launches.router.ts'

const app: FastifyInstance<Server, IncomingMessage, ServerResponse> = fastify({
  logger: {
    transport: {
      target: '@fastify/one-line-logger',
    },
  },
})
app.register(cors, {
  origin: 'http://localhost:5173',
})
app.get('/ping', async () => {
  return 'pong\n'
})

// ROUTES
await app.register(import('./routes/planets/planets.router.ts'))
await app.register(getLaunchesRoute)
await app.register(addLaunchRoute)
await app.register(abortLaunchRoute)

export default app
