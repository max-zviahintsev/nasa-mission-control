import { FastifyReply, FastifyRequest } from 'fastify'
import { planets } from '../../models/planets.model'
async function getAllPlanets(request: FastifyRequest, reply: FastifyReply) {
  return reply.send(planets)
}

export { getAllPlanets }
