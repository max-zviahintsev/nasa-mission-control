import { FastifyReply, FastifyRequest } from 'fastify'
import {
  getLaunches,
  addLaunch,
  launchWithIdExists,
  abortLaunch,
} from '../../models/launches.model'
import {
  SubmitLaunchBody,
  AbortLaunchParams,
} from '../../../../client/src/api/types'
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
async function httpAbortLaunch(
  request: FastifyRequest<{ Params: AbortLaunchParams }>,
  reply: FastifyReply
) {
  const id = Number(request.params.id)
  if (!launchWithIdExists(id)) {
    return reply.code(404).send({ message: 'Launch not found' })
  }
  const aborted = abortLaunch(id)
  reply.code(204)
  return aborted
}

export { httpGetLaunches, httpAddLaunch, httpAbortLaunch }
