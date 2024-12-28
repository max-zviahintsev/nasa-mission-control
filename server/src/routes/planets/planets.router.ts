import { FastifyInstance } from 'fastify'
import { getAllPlanets } from './planets.controller'
export default async function planets(fastify: FastifyInstance) {
  fastify.route({
    method: 'GET',
    url: '/planets',
    schema: {
      response: {
        200: {
          type: 'object',
          properties: {
            planet: { type: 'string' },
          },
        },
      },
    },
    handler: getAllPlanets,
  })
}
