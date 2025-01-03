import { useCallback, useEffect, useState } from 'react'
import { httpGetLaunches, httpSubmitLaunch } from '../api/requests'
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

  async function submitLaunch(body: SubmitLaunchBody) {
    setPendingLaunch(true)
    await httpSubmitLaunch(body).then((status) => {
      if (status == 201) {
        getLaunches()
        setPendingLaunch(false)
      }
    })
  }

  return {
    launches,
    submitLaunch,
    isPendingLaunch,
  }
}

export default useLaunches
