import fastify, { FastifyInstance } from 'fastify'
import autoLoad from '@fastify/autoload'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { Server, IncomingMessage, ServerResponse } from 'node:http'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const server: FastifyInstance<Server, IncomingMessage, ServerResponse> =
  fastify({
    logger: true,
  })

server.get('/ping', async () => {
  return 'pong\n'
})

server.register(autoLoad, {
  dir: join(__dirname, 'routes'),
  dirNameRoutePrefix: false,
})
server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})
