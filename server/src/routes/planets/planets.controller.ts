import { FastifyReply, FastifyRequest } from 'fastify'
import { getAllPlanets } from '../../models/planets.model.ts'
async function httpGetPlanets(request: FastifyRequest, reply: FastifyReply) {
  const planets = await getAllPlanets()
  return reply.send(planets)
}

export { httpGetPlanets }
