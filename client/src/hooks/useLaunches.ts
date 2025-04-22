import { useCallback, useEffect, useState, useMemo } from 'react'
import {
  httpGetLaunches,
  httpSubmitLaunch,
  httpAbortLaunch,
} from '../api/requests'
import { Launch, SubmitLaunchBody } from '../api/types'

function useLaunches() {
  const [launches, saveLaunches] = useState<Launch[]>([])
  const [isPendingLaunch, setPendingLaunch] = useState(false)

  const getLaunches = useCallback(async () => {
    const fetchedLaunches = await httpGetLaunches()
    saveLaunches(fetchedLaunches)
  }, [])

  useEffect(() => {
    getLaunches()
  }, [getLaunches])

  const upcomingLaunches = useMemo(() => {
    return launches?.filter((launch) => launch.upcoming)
  }, [launches])

  const historyLaunches = useMemo(() => {
    return launches?.filter((launch) => !launch.upcoming)
  }, [launches])

  async function submitLaunch(body: SubmitLaunchBody) {
    setPendingLaunch(true)

    await httpSubmitLaunch(body).then((status) => {
      if (status == 201) {
        getLaunches()
        setPendingLaunch(false)
      }
    })
  }

  async function abortLaunch(id: number) {
    setPendingLaunch(true)

    await httpAbortLaunch(id).then((status) => {
      if (status == 204) {
        getLaunches()
        setPendingLaunch(false)
      }
    })
  }

  return {
    upcomingLaunches,
    historyLaunches,
    submitLaunch,
    isPendingLaunch,
    abortLaunch,
  }
}

export default useLaunches
