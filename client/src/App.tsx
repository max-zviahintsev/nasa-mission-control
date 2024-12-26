import { Outlet } from 'react-router'
import Header from './components/header/Header'
import { Wrapper } from './StyledComponents'

export default function App() {
  return (
    <Wrapper>
      <Header />
      <Outlet />
    </Wrapper>
  )
}
