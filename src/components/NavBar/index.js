import './index.css'
import {useHistory} from 'react-router-dom'

const NavBar = () => {
  const history = useHistory()
  const goHome = () => {
    history.push('/home')
  }

  const goToJobs = () => {
    history.push('/jobs')
  }

  const logoutHandler = () => {
    history.push('/login')
  }

  return (
    <div className="navBar__div">
      <div className="logo__div">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="image__navBar"
          onClick={goHome}
        />
      </div>

      <div className="center__div">
        <p className="home__para" onClick={goHome}>
          Home
        </p>
        <p className="home__para" onClick={goToJobs}>
          Jobs
        </p>
      </div>

      <button className="logout" onClick={logoutHandler}>
        Log-Out
      </button>
    </div>
  )
}

export default NavBar
