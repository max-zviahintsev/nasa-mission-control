import axios from 'axios'
import { LOCAL_URL } from './constants'
async function getUser() {
  try {
    const response = await axios.get(`${LOCAL_URL}/planets`)
    console.log(response)
    return response
  } catch (error) {
    console.error(error)
  }
}

export { getUser }
