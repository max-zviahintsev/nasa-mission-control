import { FastifyInstance } from 'fastify'
import { httpGetLaunches } from './launches.controller'
export default async function planets(fastify: FastifyInstance) {
  const opts = {
    schema: {
      response: {
        200: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              flightNumber: {
                type: 'integer',
              },
              mission: {
                type: 'string',
              },
              rocket: {
                type: 'string',
              },
              launchDate: {
                type: 'string',
              },
              destination: {
                type: 'string',
              },
              customer: {
                type: 'array',
                items: {
                  type: 'string',
                },
              },
              upcoming: {
                type: 'boolean',
              },
              success: {
                type: 'boolean',
              },
            },
          },
        },
      },
    },
  }
  fastify.get('/launches', opts, httpGetLaunches)
}
