import axios from 'axios'
import { LOCAL_URL } from './constants'
import { Planet, Launch } from './types'
async function httpGetPlanets(): Promise<Planet[]> {
  try {
    const response = await axios.get(`${LOCAL_URL}/planets`)
    const { data } = response
    return data
  } catch (error) {
    console.error(error)
    return []
  }
}
async function httpGetLaunches(): Promise<Launch[]> {
  try {
    const response = await axios.get(`${LOCAL_URL}/launches`)
    const { data } = response
    return data
  } catch (error) {
    console.error(error)
    return []
  }
}

export { httpGetPlanets, httpGetLaunches }
