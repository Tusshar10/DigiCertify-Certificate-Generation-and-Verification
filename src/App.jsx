import { Link, useNavigate } from "react-router-dom";
import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, []);
  const generate = () => {
    navigate("/generate")
  }
  const validation = () => {
    navigate("/validation")
  }
  const handleLogout = () => {
    // Clear the token from localStorage on logout
    localStorage.removeItem("token");
    setLoggedIn(false);
    // Redirect to the login page or another route
    navigate("/login");
  };
  return (
    <>

      <div className="container d-flex flex-column">
        <div className="d-flex justify-content-between">
          <div
            style={{ fontSize: "5vh", fontWeight: "bold" ,marginRight: "1vw" }}
          >
            <i>DigiCertify</i>
          </div>
          <div className="d-flex justify-content-end mt-2">
            {loggedIn ? (
              <button
                type="button"
                className="btn btn-danger"
                style={{ marginRight: "1vw" }}
                onClick={handleLogout}
              >
                Logout
              </button>
            ) : (
              <>
                <Link to="/login">
                  <button
                    type="button"
                    className="btn btn-primary login"
                  >
                    Login
                  </button>
                </Link>

                <Link to="/signup">
                  <button
                    type="button"
                    className="btn btn-primary signup"
                  >
                    Sign Up
                  </button>
                </Link>

              </>
            )}
          </div>
        </div>
        <div className="main-content d-flex flex-column">
          <button type="button" className="btn btn-primary btn-lg genbtn" onClick={generate}>
            Generate Certificate
          </button>
          <br></br>
          <button type="button" className="btn btn-secondary btn-lg verbtn" onClick={validation}>
            Validate Certificate
          </button>
        </div>
      </div >
    </>
  );
}

export default App;
