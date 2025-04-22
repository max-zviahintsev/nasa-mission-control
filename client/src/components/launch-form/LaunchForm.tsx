import { useMemo } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import usePlanets from '../../hooks/usePlanets'
import {
  FormElement,
  Label,
  Button,
  StyledInput,
  StyledSelect,
} from './StyledComponents'
import { SubmitLaunchBody } from '../../api/types'
import useLaunches from '../../hooks/useLaunches'

export default function LaunchForm() {
  const { submitLaunch, isPendingLaunch } = useLaunches()
  const today = new Date().toISOString().split('T')[0]

  const { register, handleSubmit } = useForm<SubmitLaunchBody>({
    defaultValues: {
      launchDate: today,
      rocket: 'Explorer IS1',
      destination: 'Kepler-1410 b',
    },
  })
  const planets = usePlanets()

  const options = useMemo(() => {
    return planets.map((planet) => (
      <option value={planet.planetName} key={planet.planetName}>
        {planet.planetName}
      </option>
    ))
  }, [planets])

  const onSubmit: SubmitHandler<SubmitLaunchBody> = (body) => submitLaunch(body)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormElement>
        <Label htmlFor="launchDate">Launch Date</Label>
        <StyledInput
          type="date"
          id="launchDate"
          {...(register('launchDate'), { min: today, max: '2040-12-31' })}
        />
      </FormElement>

      <FormElement>
        <Label htmlFor="mission">Mission Name</Label>
        <StyledInput type="text" id="mission" {...register('mission')} />
      </FormElement>

      <FormElement>
        <Label htmlFor="rocket">Rocket Type</Label>
        <StyledInput type="text" id="rocket" {...register('rocket')} />
      </FormElement>

      <FormElement>
        <Label htmlFor="destination">Destination Exoplanet</Label>
        <StyledSelect id="destination" {...register('destination')}>
          {options}
        </StyledSelect>
      </FormElement>
      <Button type="submit" disabled={isPendingLaunch}>
        Launch Mission ✔
      </Button>
    </form>
  )
}
