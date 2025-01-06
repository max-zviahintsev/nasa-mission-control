import { FastifyInstance } from 'fastify'
import { httpGetPlanets } from './planets.controller.ts'
export default async function planets(fastify: FastifyInstance) {
  const opts = {
    schema: {
      response: {
        200: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              planetName: {
                type: 'string',
              },
            },
          },
        },
      },
    },
  }
  fastify.get('/planets', opts, httpGetPlanets)
}
