import "./index.css";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import NavBar from "../NavBar/index";
import PrintJob from "../PrintJobs";
import LoaderComp from "../Loader/index";

const Cookies = require("js-cookie");

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
  const [profileDetails, setProfileDetails] = useState();
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    setIsLoading(true);

    const getJobs = async () => {
      const response = await fetch(
        `https://apis.ccbp.in/jobs?employment_type=${queryParams.empType.join(
          ","
        )}&minimum_package=${queryParams.salary}&search=${queryParams.search}`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${Cookies.get("jwt_token")}`,
          },
        }
      );

      const data = await response.json();
      console.log(data);
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
          Authorization: `Bearer ${Cookies.get("jwt_token")}`,
        },
      });
      const data = await response.json();
      setProfileDetails(data);
    };
    getProfile();
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
              src={profileDetails?.profile_details?.profile_image_url}
              alt=""
              className="profile__icon"
            />
            <p className="name">{profileDetails?.profile_details.name}</p>
            <p className="role">{profileDetails?.profile_details.short_bio}</p>
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
