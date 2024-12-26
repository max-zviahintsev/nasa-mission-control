import { Outlet } from 'react-router'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import { Wrapper } from './StyledComponents'

export default function App() {
  return (
    <Wrapper>
      <Header />
      <Outlet />
      <Footer />
    </Wrapper>
  )
}
