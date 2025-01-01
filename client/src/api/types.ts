export type Planet = {
  planetName: string
}

export type Launch = {
  flightNumber: number
  mission: string
  rocket: string
  launchDate: string
  destination: string
  customer: string[]
  upcoming: boolean
  success: boolean
}
