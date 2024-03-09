import { Link } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <>
      <div className="container d-flex flex-column">
        <div className="d-flex justify-content-between">
          <div style={{fontSize:"5vh",color:"#92badd",fontWeight:"bold"}}><i>DigiCertify</i></div>
        <div className="d-flex justify-content-end mt-2">
          <Link to="/login">
          <button type="button" className="btn btn-primary" style={{"marginRight":"1vw"}}>
            Login
          </button>
          </Link>
          <Link to="/signup">
          <button type="button" className="btn btn-primary">
            Sign Up
          </button>
          </Link>
        </div>
        </div>
        <div className="main-content d-flex flex-column">
          <button type="button" className="btn btn-primary btn-lg genbtn">
            Generate Certificate
          </button>
          <br></br>
          <button type="button" className="btn btn-secondary btn-lg verbtn">
            Validate Certificate
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
