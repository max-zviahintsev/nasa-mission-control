import { FastifyReply, FastifyRequest } from 'fastify'
import { planets } from '../../models/planets.model.ts'
async function httpGetPlanets(request: FastifyRequest, reply: FastifyReply) {
  const planetsProcessed = planets.map((planet) => {
    return { planetName: planet.kepler_name }
  })
  return reply.send(planetsProcessed)
}

export { httpGetPlanets }
