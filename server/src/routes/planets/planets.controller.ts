import { FastifyReply, FastifyRequest } from 'fastify'
import { planets } from '../../models/planets.model'
async function getAllPlanets(request: FastifyRequest, reply: FastifyReply) {
  console.log(planets)
  const planetsProcessed = planets.map((planet) => {
    return { planetName: planet.kepler_name }
  })
  return reply.send(planetsProcessed)
}

export { getAllPlanets }
