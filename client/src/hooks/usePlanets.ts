import { useEffect, useState } from 'react'
import { httpGetPlanets } from '../api/requests'
import { Planet } from '../api/types'

export default function usePlanets() {
  const [planets, setPlanets] = useState<Planet[]>([])

  const getPlanets = async () => {
    const reply = await httpGetPlanets()
    setPlanets(reply)
  }

  useEffect(() => {
    getPlanets()
  }, [])
  return planets
}
