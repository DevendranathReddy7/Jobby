import './index.css'
import {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import NavBar from '../NavBar/index'
import PrintJob from '../PrintJobs'
import LoaderComp from '../Loader/index'

const Cookies = require('js-cookie')

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const Jobs = () => {
  const history = useHistory()
  const [isLoading, setIsLoading] = useState(true)
  const [searchValue, setSearchValue] = useState('')
  const [queryParams, setQueryParam] = useState({
    empType: [],
    salary: '',
    search: '',
  })
  const [respStatus, setRespStatus] = useState(false)
  const [isRetryClicked, setIsRetry] = useState(false)
  const [profileDetails, setProfileDetails] = useState()
  const [jobs, setJobs] = useState([])

  useEffect(() => {
    const getJobs = async () => {
      const response = await fetch(
        `https://apis.ccbp.in/jobs?employment_type=${queryParams.empType.join(
          ',',
        )}&minimum_package=${queryParams.salary}&search=${queryParams.search}`,
        {
          method: 'GET',
          headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${Cookies.get('jwt_token')}`,
          },
        },
      )
      if (response.ok) {
        setRespStatus(false)
        const data = await response.json()
        setJobs(data.jobs)
      } else {
        setRespStatus(true)
        setRespStatus(false)
      }
    }
    getJobs()
  }, [queryParams, isRetryClicked])

  useEffect(() => {
    const getProfile = async () => {
      const response = await fetch('https://apis.ccbp.in/profile', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${Cookies.get('jwt_token')}`,
        },
      })
      const data = await response.json()
      setProfileDetails(data.profile_details)
    }
    getProfile()
    setIsLoading(false)
  }, [])

  const jobHandler = id => {
    history.replace(`/jobs/${id}`)
  }

  const jobSearchHandler = (value, field) => {
    switch (field) {
      case 'empType':
        setQueryParam(prev => ({...prev, empType: [...prev.empType, value]}))
        break
      case 'salary':
        setQueryParam(prev => ({...prev, salary: value}))
        break
      case 'search':
        setQueryParam(prev => ({...prev, search: value}))
        break
      default:
        break
    }
  }

  const searchHandle = value => {
    setSearchValue(value)
  }
  return (
    <div>
      <ul>
        <NavBar />
      </ul>
      <div className="jobs__div">
        <div className="sideBar__div">
          {profileDetails ? (
            <div className="profile__div">
              <img
                src={profileDetails.profile_image_url}
                alt="profile"
                className="profile__icon"
              />
              <h1 className="name">{profileDetails.name}</h1>
              <p className="role">{profileDetails.short_bio}</p>
            </div>
          ) : (
            <div>Loading...</div>
          )}

          <ul className="job__type__div">
            <h1>Type of Employment</h1>
            {employmentTypesList.map(job => (
              <li key={job.employmentTypeId} className="job__li">
                <input
                  type="checkbox"
                  className="checkBox"
                  id={job.employmentTypeId}
                  onChange={() =>
                    jobSearchHandler(job.employmentTypeId, 'empType')
                  }
                />
                <label
                  htmlFor={job.employmentTypeId}
                  className="checkBox__label"
                >
                  {job.label}
                </label>
              </li>
            ))}
          </ul>

          <ul className="salary__div">
            <h1>Salary Range</h1>
            {salaryRangesList.map(salary => (
              <li key={salary.salaryRangeId} className="salary__li">
                <input
                  type="radio"
                  className="checkBox"
                  id={salary.salaryRangeId}
                  name="salary"
                  onChange={() =>
                    jobSearchHandler(salary.salaryRangeId, 'salary')
                  }
                />
                <label htmlFor={salary.salaryRangeId} className="radio__label">
                  {salary.label}
                </label>
              </li>
            ))}
          </ul>
        </div>

        <div className="jobs__main__div">
          <div className="search">
            <input
              type="search"
              className="input__search"
              placeholder="Find Jobs"
              onChange={e => searchHandle(e.target.value)}
            />
            <button
              data-testid="searchButton"
              onClick={() => jobSearchHandler(searchValue, 'search')}
            >
              Search
            </button>
          </div>

          {!isLoading && jobs.length > 0 && (
            <ul className="jobs__list__div">
              {jobs.map(job => (
                <li
                  className="job__li__item"
                  key={job.id}
                  onClick={() => jobHandler(job.id)}
                >
                  <PrintJob job={job} altValue="company logo" />
                </li>
              ))}
            </ul>
          )}

          {!isLoading && jobs.length === 0 && (
            <div className="jobs__list__div">
              <img
                src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
                alt="no jobs"
              />
              <h1>No Jobs Found</h1>
              <p>We could not find any jobs. Try other filters</p>
            </div>
          )}

          {respStatus && (
            <div className="jobs__list__div">
              <img
                src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
                alt="failure view"
              />
              <h1>Oops! Something Went Wrong</h1>
              <p>We cannot seem to find the page you are looking for</p>
              <button onClick={setIsRetry(true)}>Retry</button>
            </div>
          )}

          {isLoading && <LoaderComp />}
        </div>
      </div>
    </div>
  )
}

export default Jobs
