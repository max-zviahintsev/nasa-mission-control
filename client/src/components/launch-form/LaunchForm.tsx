import { useForm, SubmitHandler } from 'react-hook-form'
import { FormElement, Label, Button } from './StyledComponents'

interface FormInput {
  launchDay: string
  missionName: string
  rocketName: string
  planetsSelector: string
}

export default function LaunchForm() {
  const today = new Date().toISOString().split('T')[0]

  const { register, handleSubmit } = useForm<FormInput>({
    defaultValues: {
      launchDay: today,
      rocketName: 'Explorer IS1',
    },
  })
  const onSubmit: SubmitHandler<FormInput> = (data) => console.log(data)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormElement>
        <Label htmlFor="launch-day">Launch Date</Label>
        <input
          type="date"
          {...(register('launchDay'), { min: today, max: '2040-12-31' })}
        />
      </FormElement>

      <FormElement>
        <Label htmlFor="mission-name">Mission Name</Label>
        <input type="text" {...register('missionName')} />
      </FormElement>

      <FormElement>
        <Label htmlFor="rocket-name">Rocket Type</Label>
        <input type="text" {...register('rocketName')} />
      </FormElement>

      <FormElement>
        <Label htmlFor="planets-selector">Destination Exoplanet</Label>
        <select {...register('planetsSelector')}>
          <option value="Earth">Earth</option>
          <option value="Mars">Mars</option>
        </select>
      </FormElement>
      <Button type="submit">Launch Mission ✔</Button>
    </form>
  )
}
