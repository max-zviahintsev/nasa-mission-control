import { SubmitLaunchBody } from './../../../client/src/api/types.ts'
import LaunchModel from './launches.mongo.ts'
import PlanetModel from './planets.mongo.ts'
import { Launch } from './../../../client/src/api/types.ts'

const DEFAULT_FLIGHT_NUMBER = 1
async function getLatestFlightNumber() {
  const latestLaunch = await LaunchModel.findOne().sort('-flightNumber')

  if (!latestLaunch) {
    return DEFAULT_FLIGHT_NUMBER
  }
  return latestLaunch.flightNumber
}

function getLaunches() {
  LaunchModel.find({}, { _id: 0, __v: 0 })
}
function abortLaunch(id: number) {}
async function saveLaunch(launch: Launch) {
  const planet = await PlanetModel.findOne({
    planetName: launch.destination,
  })

  if (!planet) {
    throw new Error('no matching planet found')
  }
  console.log('launch', launch)
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

export { getLaunches, scheduleLaunch, abortLaunch }
