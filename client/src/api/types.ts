export type Planet = {
  planetName: string
}

export type Launch = {
  flightNumber: number
  mission: string
  rocket: string
  launchDate: Date
  destination: string
  customers: string[]
  upcoming: boolean
  success: boolean
}

export type SubmitLaunchBody = {
  mission: string
  rocket: string
  launchDate: Date | string
  destination: string
}
