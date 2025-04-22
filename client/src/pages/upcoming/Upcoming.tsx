import UpcomingTable from '../../components/upcoming-table/UpcomingTable'
import { Wrapper, Paragraph } from './StyledComponents'
export default function Upcoming() {
  return (
    <div>
      <Wrapper>
        <Paragraph>
          Upcoming missions including both SpaceX launches and newly scheduled
          Zero to Mastery rockets.
        </Paragraph>

        <Paragraph>Warning! Clicking on the ✖ aborts the mission.</Paragraph>
        <UpcomingTable />
      </Wrapper>
    </div>
  )
}
