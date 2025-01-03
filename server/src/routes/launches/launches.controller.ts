import { FastifyReply, FastifyRequest } from 'fastify'
import { getLaunches, addLaunch } from '../../models/launches.model'
import { SubmitLaunchBody } from '../../../../client/src/api/types'
async function httpGetLaunches(request: FastifyRequest, reply: FastifyReply) {
  return reply.send(getLaunches())
}
async function httpAddLaunch(
  request: FastifyRequest<{ Body: SubmitLaunchBody }>,
  reply: FastifyReply
) {
  const launch = request.body
  launch.launchDate = new Date(launch.launchDate)

  addLaunch(launch)

  reply.code(201)
  return request.body
}

export { httpGetLaunches, httpAddLaunch }
