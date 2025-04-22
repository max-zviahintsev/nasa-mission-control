export type Planet = {
  planetName: string
}

export type SubmitLaunchBody = {
  mission: string
  rocket: string
  launchDate: Date | string
  destination: string
}

export type AbortLaunchParams = {
  id: string
}

export type GetLaunchesQueryParams = {
  page: number
  pageSize: number
}

export type Launch = {
  flightNumber: number
  mission: string
  rocket: string
  launchDate: Date | string
  destination?: string
  customers: string[]
  upcoming: boolean
  success: boolean
}
