import "./index.css";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import NavBar from "../NavBar/index";
import PrintJob from "../PrintJobs";
import LoaderComp from "../Loader/index";

const employmentTypesList = [
  {
    label: "Full Time",
    employmentTypeId: "FULLTIME",
  },
  {
    label: "Part Time",
    employmentTypeId: "PARTTIME",
  },
  {
    label: "Freelance",
    employmentTypeId: "FREELANCE",
  },
  {
    label: "Internship",
    employmentTypeId: "INTERNSHIP",
  },
];

const salaryRangesList = [
  {
    salaryRangeId: "1000000",
    label: "10 LPA and above",
  },
  {
    salaryRangeId: "2000000",
    label: "20 LPA and above",
  },
  {
    salaryRangeId: "3000000",
    label: "30 LPA and above",
  },
  {
    salaryRangeId: "4000000",
    label: "40 LPA and above",
  },
];

const Jobs = () => {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [queryParams, setQueryParam] = useState({
    empType: [],
    salary: "",
    search: "",
  });
  const [profileDetails, setProfileDetails] = useState({
    profile_details: {
      name: "Rahul Attuluri",
      profile_image_url:
        "https://assets.ccbp.in/frontend/react-js/male-avatar-img.png",
      short_bio: "Lead Software Developer and AI-ML expert",
    },
  });
  const [jobs, setJobs] = useState([
    {
      company_logo_url:
        "https://assets.ccbp.in/frontend/react-js/jobby-app/facebook-img.png",
      employment_type: "Full Time",
      id: "d6019453-f864-4a2f-8230-6a9642a59466",
      job_description:
        "We’re in search of a Back-End Software Engineer that specializes in server-side components. In this role, you’ll primarily work in NodeJs, SQL Lite, Python, AWS and GO and will bring a depth of knowledge on basic algorithms and data structures. As a Back-End Engineer, you might be architecting new features for our customers.",
      location: "Bangalore",
      package_per_annum: "21 LPA",
      rating: 4,
      title: "Backend Engineer",
    },
    {
      company_logo_url:
        "https://assets.ccbp.in/frontend/react-js/jobby-app/facebook-img.png",
      employment_type: "Full Time",
      id: "d6019453-f864-4a2f-8230-6a9642a59466",
      job_description:
        "We’re in search of a Back-End Software Engineer that specializes in server-side components. In this role, you’ll primarily work in NodeJs, SQL Lite, Python, AWS and GO and will bring a depth of knowledge on basic algorithms and data structures. As a Back-End Engineer, you might be architecting new features for our customers.",
      location: "Bangalore",
      package_per_annum: "21 LPA",
      rating: 4,
      title: "Backend Engineer",
    },
  ]);

  const requestOptions = {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
  };
  useEffect(() => {
    setIsLoading(true);

    const getJobs = async () => {
      const response = await fetch(
        `https://apis.ccbp.in/jobs?employment_type=${queryParams.empType.join(
          ","
        )}&minimum_package=${queryParams.salary}&search=${queryParams.search}`,
        requestOptions
      );

      const data = await response.json();
      setJobs(data);
    };
    getJobs();
    setIsLoading(false);
  }, [queryParams]);

  useEffect(() => {
    const getProfile = async () => {
      const response = await fetch("https://apis.ccbp.in/profile", {
        method: "GET",
        headers: {
          authorization:
            '"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJhaHVsIiwicm9sZSI6IlBSSU1FX1VTRVIiLCJpYXQiOjE2MTk2Mjg2MTN9. nZDlFsnSWArLKKeF0QbmdVfLgzUbx1BGJsqa2kc_21Y',
        },
      });
      const data = await response.json();
      setProfileDetails(data);
    };
    // getProfile()
    setIsLoading(false);
  }, []);

  const jobHandler = (id) => {
    history.push(`/jobs/${id}`);
  };

  const jobSearchHandler = (value, field) => {
    switch (field) {
      case "empType":
        setQueryParam((prev) => ({
          ...prev,
          empType: [...prev.empType, value],
        }));
        break;
      case "salary":
        setQueryParam((prev) => ({ ...prev, salary: value }));
        break;
      case "search":
        setQueryParam((prev) => ({ ...prev, search: value }));
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <NavBar />
      <div className="jobs__div">
        <div className="sideBar__div">
          <div className="profile__div">
            <img
              src={profileDetails.profile_details.profile_image_url}
              alt=""
              className="profile__icon"
            />
            <p className="name">{profileDetails.profile_details.name}</p>
            <p className="role">{profileDetails.profile_details.short_bio}</p>
          </div>

          <div className="job__type__div">
            <p>Type of Employment</p>
            {employmentTypesList.map((job) => (
              <li key={job.employmentTypeId} className="job__li">
                <input
                  type="checkBox"
                  className="checkBox"
                  id="jobType"
                  onChange={() =>
                    jobSearchHandler(job.employmentTypeId, "empType")
                  }
                />
                <label htmlFor="jobType" className="checkBox__label">
                  {job.label}
                </label>
              </li>
            ))}
          </div>

          <div className="salary__div">
            <p>Salary Range</p>
            {salaryRangesList.map((salary) => (
              <li key={salary.salaryRangeId} className="salary__li">
                <input
                  type="radio"
                  className="checkBox"
                  id="salary"
                  name="salary"
                  onChange={() =>
                    jobSearchHandler(salary.salaryRangeId, "salary")
                  }
                />
                <label htmlFor="salary" className="radio__label">
                  {salary.label}
                </label>
              </li>
            ))}
          </div>
        </div>

        <div className="jobs__main__div">
          <div className="search">
            <input
              type="search"
              className="input__search"
              placeholder="Find Jobs"
              onChange={(e) => jobSearchHandler(e.target.value, "search")}
            />
          </div>

          {!isLoading && (
            <div className="jobs__list__div">
              {jobs.map((job) => (
                <li
                  className="job__li__item"
                  key={job.id}
                  onClick={() => jobHandler(job.id)}
                >
                  <PrintJob job={job} />
                </li>
              ))}
            </div>
          )}

          {isLoading && <LoaderComp />}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
