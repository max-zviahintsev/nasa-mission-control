import { FastifyReply, FastifyRequest } from 'fastify'
import { getLaunches } from '../../models/launches.model'
async function httpGetLaunches(request: FastifyRequest, reply: FastifyReply) {
  return reply.send(getLaunches())
}

export { httpGetLaunches }
