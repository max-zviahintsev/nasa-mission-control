import { FastifyReply, FastifyRequest } from 'fastify'
import {
  getLaunches,
  scheduleLaunch,
  abortLaunch,
  launchWithIdExists,
} from '../../models/launches.model.ts'
import {
  SubmitLaunchBody,
  AbortLaunchParams,
} from '../../../../client/src/api/types.ts'

async function httpGetLaunches(request: FastifyRequest, reply: FastifyReply) {
  return reply.send(await getLaunches())
}

async function httpAddLaunch(
  request: FastifyRequest<{ Body: SubmitLaunchBody }>,
  reply: FastifyReply
) {
  const launch = request.body
  launch.launchDate = new Date(launch.launchDate)

  await scheduleLaunch(launch)

  reply.code(201)
  return request.body
}

async function httpAbortLaunch(
  request: FastifyRequest<{ Params: AbortLaunchParams }>,
  reply: FastifyReply
) {
  const id = Number(request.params.id)
  const isLaunchExists = await launchWithIdExists(id)

  if (!isLaunchExists) {
    return reply.code(404).send({ message: 'Launch not found' })
  }

  const isLaunchAborted = await abortLaunch(id)
  if (!isLaunchAborted) {
    return reply.code(400).send({ message: 'Failed to abort launch' })
  }

  return reply.code(200).send({ message: `Launch aborted` })
}

export { httpGetLaunches, httpAddLaunch, httpAbortLaunch }
