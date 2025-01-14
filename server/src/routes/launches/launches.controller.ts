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
  GetLaunchesQueryParams,
} from '../../../../client/src/api/types.ts'
import { getPagination } from '../../services/query.ts'

async function httpGetLaunches(
  request: FastifyRequest<{
    Querystring: GetLaunchesQueryParams
  }>,
  reply: FastifyReply
) {
  const { page, pageSize } = request.query
  const { skip, limit } = await getPagination(page, pageSize)

  return reply.send(await getLaunches(skip, limit))
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
