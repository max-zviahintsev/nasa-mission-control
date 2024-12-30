import axios from 'axios'
import { LOCAL_URL } from './constants'
import { Planets } from './types'
async function httpGetPlanets(): Promise<Planets> {
  try {
    const response: Planets = await axios.get(`${LOCAL_URL}/planets`)
    console.log(response)
    return response
  } catch (error) {
    console.error(error)
    return []
  }
}

export { httpGetPlanets }
