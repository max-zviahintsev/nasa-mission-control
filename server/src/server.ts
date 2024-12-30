import fastify, { FastifyInstance } from 'fastify'
import cors from '@fastify/cors'
import { Server, IncomingMessage, ServerResponse } from 'node:http'

const server: FastifyInstance<Server, IncomingMessage, ServerResponse> =
  fastify({
    logger: {
      transport: {
        target: '@fastify/one-line-logger',
      },
    },
  })

await server.register(cors, {
  origin: 'http://localhost:5173',
})

server.get('/ping', async () => {
  return 'pong\n'
})

// ROUTES
await server.register(import('./routes/planets/planets.router.ts'))
server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})
