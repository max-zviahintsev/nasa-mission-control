import { StyledHeader, Logo, H1, Nav, StyledLink } from './StyledComponents'
export default function Header() {
  return (
    <StyledHeader>
      <Logo src="/images/logo.png" alt="NASA logo" />
      <H1>NASA Mission Control</H1>
      <Nav>
        <StyledLink to="/launch">Launch</StyledLink>
        <StyledLink to="/upcoming">Upcoming</StyledLink>
        <StyledLink to="/history">History</StyledLink>
      </Nav>
    </StyledHeader>
  )
}
