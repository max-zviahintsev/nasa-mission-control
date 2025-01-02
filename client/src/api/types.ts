export type Planet = {
  planetName: string
}

export type Launch = {
  flightNumber: number
  mission: string
  rocket: string
  launchDate: Date
  destination: string
  customer: string[]
  upcoming: boolean
  success: boolean
}

export type AddLaunchBody = {
  mission: string
  rocket: string
  launchDate: Date
  destination: string
}
