import axios from 'axios'
import { SubmitLaunchBody, Launch } from './../../../client/src/api/types.ts'
import { LaunchFilter } from './types.ts'
import LaunchModel from './launches.mongo.ts'

const SPACEX_API_URL = 'https://api.spacexdata.com/v4/launches/query'

async function findLaunch(filter: LaunchFilter) {
  return await LaunchModel.findOne(filter)
}

async function saveLaunch(launch: Launch) {
  try {
    await LaunchModel.updateOne(
      {
        flightNumber: launch.flightNumber,
      },
      launch,
      {
        upsert: true,
      }
    )
  } catch (err) {
    console.error(err)
  }
}

async function populateLaunches() {
  try {
    const { data } = await axios.post(SPACEX_API_URL, {
      query: {},
      options: {
        pagination: false,
        populate: [
          {
            path: 'rocket',
            select: {
              name: 1,
            },
          },
          {
            path: 'payloads',
            select: {
              customers: 1,
            },
          },
        ],
      },
    })

    const { docs } = data
    for (const doc of docs) {
      const payloads = doc['payloads']
      const customers = payloads.flatMap((payload: any) => {
        return payload['customers']
      })

      const launch = {
        flightNumber: doc['flight_number'],
        mission: doc['name'],
        rocket: doc['rocket']['name'],
        launchDate: doc['date_local'],
        upcoming: doc['upcoming'],
        success: doc['success'],
        customers,
      }
      await saveLaunch(launch)
    }
  } catch (error) {
    console.error(error)
  }
}

async function loadLaunches() {
  const firstLaunch = await findLaunch({
    flightNumber: 1,
    rocket: 'Falcon 1',
    mission: 'FalconSat',
  })
  if (firstLaunch) {
    console.log('Launch data already loaded')
    return
  }

  await populateLaunches()
}

const DEFAULT_FLIGHT_NUMBER = 1
async function getLatestFlightNumber() {
  const latestLaunch = await LaunchModel.findOne().sort('-flightNumber')

  if (!latestLaunch) {
    return DEFAULT_FLIGHT_NUMBER
  }
  return latestLaunch.flightNumber
}

async function getLaunches(skip: number, limit: number) {
  return await await LaunchModel.find({}, { _id: 0, __v: 0 })
    .sort({
      flightNumber: 1,
    })
    .skip(skip)
    .limit(limit)
}

async function launchWithIdExists(id: number) {
  return await LaunchModel.findOne({
    flightNumber: id,
  })
}

async function abortLaunch(id: number) {
  const { matchedCount, modifiedCount } = await LaunchModel.updateOne(
    {
      flightNumber: id,
    },
    {
      upcoming: false,
      success: false,
    }
  )

  return matchedCount === 1 && modifiedCount === 1
}

async function scheduleLaunch(launch: SubmitLaunchBody) {
  const newFlightNumber = (await getLatestFlightNumber()) + 1

  const newLaunch = Object.assign(launch, {
    flightNumber: newFlightNumber,
    customers: ['Max', 'Horo'],
    success: true,
    upcoming: true,
  })

  await saveLaunch(newLaunch)
}

export {
  loadLaunches,
  getLaunches,
  scheduleLaunch,
  abortLaunch,
  launchWithIdExists,
}
