import './index.css'
import {useHistory, Link} from 'react-router-dom'

const Cookies = require('js-cookie')

const NavBar = () => {
  const history = useHistory()
  const goHome = () => {
    history.replace('/home')
  }

  const goToJobs = () => {
    history.push('/jobs')
  }

  const logoutHandler = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <ul className="navBar__div">
      <li className="logo__div">
        <Link to="/home">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="image__navBar"
          />
        </Link>
      </li>

      <li className="center__div">
        <Link to="/home">
          <p className="home__para">Home</p>
        </Link>
        <Link to="/jobs">
          <p className="home__para">Jobs</p>
        </Link>
      </li>

      <li>
        <Link to="/login">
          <button className="logout" onClick={logoutHandler}>
            Logout
          </button>
        </Link>
      </li>
    </ul>
  )
}

export default NavBar
