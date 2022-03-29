import { Link } from 'react-router-dom'

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
          <Link to="/">home</Link>
        </li>
        <li>
          <Link to="/headlines">headlines</Link>
        </li>
        <li>
          <Link to="/results">results</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
