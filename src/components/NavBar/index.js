import "./index.css";
import { useHistory, Link } from "react-router-dom";

const NavBar = () => {
  const history = useHistory();
  const goHome = () => {
    history.push("/home");
  };

  const goToJobs = () => {
    history.push("/jobs");
  };

  const logoutHandler = () => {
    history.push("/login");
  };

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
        <Link to="/home" className="anchor__elm">
          <p className="home__para">Home</p>
        </Link>
        <Link to="/jobs" className="anchor__elm">
          <p className="home__para">Jobs</p>
        </Link>
      </li>

      <li>
        <Link to="/login">
          <button className="logout" onClick={logoutHandler}>
            Log-Out
          </button>
        </Link>
      </li>
    </ul>
  );
};

export default NavBar;
