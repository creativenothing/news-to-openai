import { NavLink } from 'react-router-dom'

const Navbar = props => {
  return (
    <nav>
      <ul>
        <li>
          <h4>inhabit ai</h4>
        </li>
      </ul>
      <ul>
        <li>
          <NavLink to="/">home</NavLink>
        </li>
        <li>
          <NavLink to="/headlines">headlines</NavLink>
        </li>
        <li>
          <NavLink to="/results">results</NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
