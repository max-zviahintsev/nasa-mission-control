import styled from '@emotion/styled'
import { Link } from 'react-router'

export const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 4px var(--main) solid;
`
export const Logo = styled.img`
  margin: 5px 10px;
`
export const H1 = styled.h1`
  margin: 10px;
  font-size: 28px;
  font-weight: bold;
  color: var(--main);
`
export const Nav = styled.nav`
  display: flex;
  font-size: 21px;
`
export const StyledLink = styled(Link)`
  margin: 10px;
  color: var(--bright);
  text-decoration: none;
`
