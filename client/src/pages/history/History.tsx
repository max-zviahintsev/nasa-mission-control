import HistoryTable from '../../components/history-table/HistoryTable'
import { Wrapper, Paragraph } from './StyledComponents'
export default function Upcoming() {
  return (
    <div>
      <Wrapper>
        <Paragraph>
          History of mission launches including SpaceX launches starting from
          the year 2006.
        </Paragraph>
        <HistoryTable />
      </Wrapper>
    </div>
  )
}
