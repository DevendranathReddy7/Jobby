import './index.css'
import {useHistory, Link} from 'react-router-dom'
import NavBar from '../NavBar'

const Home = () => {
  const history = useHistory()

  const jobsHandler = () => {
    history.push('/jobs')
  }
  return (
    <div>
      <NavBar />

      <div className="home__div">
        <div className="content__div">
          <h1 className="heading">Find The Job That Fits Your Life</h1>
          <p className="para">
            Millions of People are searching for Jobs, Salary information,
            company reviews. Find the Job that fits your abilities and
            potential.
          </p>

          <Link to="/jobs">
            <button className="find__jobs" onClick={jobsHandler}>
              Find Jobs
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home
