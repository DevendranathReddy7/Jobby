import './index.css'
import {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'

import NavBar from '../NavBar/index'
import PrintJob from '../PrintJobs'
import LoaderComp from '../Loader'

const Cookies = require('js-cookie')

const JobDetails = ({location}) => {
  const id = location.pathname
  const history = useHistory()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)
  const [job, setJob] = useState({})
  const [isRetryClicked, setIsRetry] = useState(false)

  useEffect(() => {
    if (!Cookies.get('jwt_token')) {
      history.replace(`/login`)
    }
  }, [])

  useEffect(() => {
    setIsLoading(true)
    const getJobs = async () => {
      const response = await fetch(`https://apis.ccbp.in${id}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${Cookies.get('jwt_token')}`,
        },
      })
      if (response.ok) {
        const data = await response.json()
        setJob(data)
        setError(false)
        setIsLoading(false)
      } else {
        setError(true)
        setIsLoading(false)
      }
    }
    getJobs()
  }, [id, isRetryClicked])

  const retryHandler = () => {
    setIsRetry(true)
  }

  return (
    <div>
      <NavBar />

      {!isLoading && (
        <div className="job__details__div">
          <PrintJob
            job={job.job_details}
            jobDetails="True"
            skills={job.job_details.skills}
            lifeAtCmpny={job.job_details.life_at_company}
            altValue="job details company logo"
          />
        </div>
      )}

      {!isLoading && (
        <div>
          <h1 className="similarJob__h1">Similar Jobs</h1>
          <ul className="silimar__jobs">
            {job.similar_jobs.map(similarJob => (
              <li className="similar__Job__li" key={Math.random().toString(36)}>
                <PrintJob
                  job={similarJob}
                  similarJobs={similarJob}
                  altValue="similar job company logo"
                />
              </li>
            ))}
          </ul>
        </div>
      )}

      {error && (
        <div className="jobs__list__div">
          <img
            src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
            alt="failure view"
          />
          <h1>Oops! Something Went Wrong</h1>
          <p>We cannot seem to find the page you are looking for</p>
          <button onClick={retryHandler}>Retry</button>
        </div>
      )}
      {isLoading && <LoaderComp />}
    </div>
  )
}

export default JobDetails
