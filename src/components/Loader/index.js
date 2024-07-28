import "./index.css";
import Loader from "react-loader-spinner";

const LoaderComp = () => (
  <center className="spinner">
    <div data-testid="loader">
      <Loader type="Puff" color="#fbbf24" height="50px" />
    </div>
  </center>
);

export default LoaderComp;
