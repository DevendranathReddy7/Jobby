import './index.css'

const PrintJob = ({job, jobDetails, skills, lifeAtCmpny, similarJobs}) => {
  const getLocation = jobLocation => {
    const {location, employment_type: employmentType} = jobLocation
    return (
      <div className="innerLoc__div">
        <p className="loc">{location}</p>
        <p className="eType">{employmentType}</p>
      </div>
    )
  }

  return (
    <div className="jobs__container">
      <div className="job__title__div">
        <div className="job__image__div">
          <img src={job.company_logo_url} alt="" className="job__image" />
        </div>
        <div className="details">
          <p className="job__role">{job.title}</p>
          <p className="rating">⭐ {job.rating}</p>
        </div>
      </div>

      {!similarJobs && (
        <div className="location__container">
          {getLocation(job)}
          <div className="ctc">{job.package_per_annum}</div>
        </div>
      )}

      <hr />

      <div className="description__container">
        <div className="visit">
          <h1>Description</h1>
          {jobDetails && (
            <a
              className="visit_link"
              href={job.company_website_url}
              target="_blank"
              rel="noreferrer"
            >
              Visit
            </a>
          )}
        </div>
        <p>{job.job_description}</p>
      </div>

      {jobDetails && (
        <div>
          <h1>Skills</h1>
          <div className="skills__container">
            {skills.map(skill => (
              <li className="skill__li">
                <img src={skill.image_url} alt="" className="skill__image" />
                <p>{skill.name}</p>
              </li>
            ))}
          </div>
        </div>
      )}

      {jobDetails && (
        <div>
          <h1>Life at Company</h1>

          <div className="life_at_cmpny">
            <p className="desc">{lifeAtCmpny.description}</p>
            <img src={lifeAtCmpny.image_url} alt="" className="cmpny_img" />
          </div>
        </div>
      )}

      {similarJobs && (
        <div className="location__container">{getLocation(job)}</div>
      )}
    </div>
  )
}

export default PrintJob
