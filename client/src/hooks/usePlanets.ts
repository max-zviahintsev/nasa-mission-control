import { useEffect, useState } from 'react'
import { httpGetPlanets } from '../api/requests'
import { Planets } from '../api/types'

export default function usePlanets() {
  const [planets, setPlanets] = useState<Planets>([])

  const getPlanets = async () => {
    const reply = await httpGetPlanets()
    setPlanets(reply)
  }

  useEffect(() => {
    getPlanets()
  }, [])
  return planets
}
