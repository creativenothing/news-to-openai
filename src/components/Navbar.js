import { Link, NavLink } from 'react-router-dom'

const Navbar = props => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">
            <h4>situ.ation.ist</h4>
          </Link>
        </li>
      </ul>
      <ul>
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
