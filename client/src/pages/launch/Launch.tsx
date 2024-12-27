import { Wrapper, Paragraph, List } from './StyledComponents'
import LaunchForm from '../../components/launch-form/LaunchForm'
export default function Launch() {
  return (
    <div>
      <Wrapper>
        <Paragraph>
          Schedule a mission launch for interstellar travel to one of the Kepler
          Exoplanets.
        </Paragraph>

        <Paragraph>
          Only confirmed planets matching the following criteria are available
          for the earliest scheduled missions:
        </Paragraph>

        <List>
          <li>Planetary radius less than 1.6 times Earth's radius</li>
          <li>
            Effective stellar flux more than 0.36 times Earth's value and less
            than 1.11 times Earth's value
          </li>
        </List>

        <LaunchForm />
      </Wrapper>
    </div>
  )
}
