import { SubmitLaunchBody } from './../../../client/src/api/types'

let latestFlightNumber = 100

const launch = {
  flightNumber: 100,
  mission: 'Kepler Exploration X',
  rocket: 'Explorer IS1',
  launchDate: new Date('December 27, 2030'),
  destination: 'Kepler-442 b',
  customer: ['ZTM', 'NASA'],
  upcoming: true,
  success: true,
}

const launches = new Map().set(launch.flightNumber, launch)

function getLaunches() {
  const array = Array.from(launches.values())
  return array.sort((a, b) => a.flightNumber - b.flightNumber)
}

function addLaunch(launch: SubmitLaunchBody) {
  latestFlightNumber++

  launches.set(
    latestFlightNumber,
    Object.assign(launch, {
      flightNumber: latestFlightNumber,
      success: true,
      upcoming: true,
      customers: ['Max', 'Horo'],
    })
  )
}

export { getLaunches, addLaunch }
