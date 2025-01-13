import axios from 'axios'
import { SubmitLaunchBody } from './../../../client/src/api/types.ts'
import LaunchModel from './launches.mongo.ts'
import PlanetModel from './planets.mongo.ts'
import { Launch } from './../../../client/src/api/types.ts'

const SPACEX_API_URL = 'https://api.spacexdata.com/v4/launches/query'
async function loadLaunches() {
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
      //await saveLaunch(launch)
    }
  } catch (error) {
    console.error(error)
  }
}

const DEFAULT_FLIGHT_NUMBER = 1
async function getLatestFlightNumber() {
  const latestLaunch = await LaunchModel.findOne().sort('-flightNumber')

  if (!latestLaunch) {
    return DEFAULT_FLIGHT_NUMBER
  }
  return latestLaunch.flightNumber
}

async function getLaunches() {
  return await LaunchModel.find({}, { _id: 0, __v: 0 })
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

async function saveLaunch(launch: Launch) {
  const planet = await PlanetModel.findOne({
    //planetName: launch.destination,
  })

  if (!planet) {
    throw new Error('no matching planet found')
  }

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
    console.error(`Could not save planet ${err}`)
  }
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
