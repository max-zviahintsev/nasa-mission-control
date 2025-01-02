import { FastifyInstance } from 'fastify'
import { httpGetLaunches, httpAddLaunch } from './launches.controller'
export async function getLaunchesRoute(fastify: FastifyInstance) {
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
export async function addLaunchRoute(fastify: FastifyInstance) {
  const opts = {
    schema: {
      body: {
        type: 'object',
        required: ['mission', 'rocket', 'launchDate', 'destination'],
        additionalProperties: false,
        properties: {
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
        },
      },
      response: {
        201: {
          type: 'object',
          properties: {
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
          },
        },
      },
    },
  }

  fastify.post('/launches', opts, httpAddLaunch)
}
