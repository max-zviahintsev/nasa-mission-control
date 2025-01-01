import { FastifyReply, FastifyRequest } from 'fastify'
import { launches } from '../../models/launches.model'
async function getAllLaunches(request: FastifyRequest, reply: FastifyReply) {
  return reply.send(Array.from(launches.values()))
}

export { getAllLaunches }
