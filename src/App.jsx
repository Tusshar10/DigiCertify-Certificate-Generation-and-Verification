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
    <div>
      <div style={{ backgroundColor: "#333", padding: "0.7rem", color: "white" }}>
        <div className="container d-flex justify-content-between align-items-center">
          <div style={{ fontSize: "2rem", fontWeight: "bold" }}>
            <i>DigiCertify</i>
          </div>
          <div>
            {loggedIn ? (
              <button
                type="button"
                className="btn btn-danger"
                style={{ fontSize: "1.2rem", fontWeight: "bold", marginRight: "1vw" }}
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
                    style={{ fontSize: "1.2rem", fontWeight: "bold", marginRight: "1vw" }}
                  >
                    Login
                  </button>
                </Link>

                <Link to="/signup">
                  <button
                    type="button"
                    className="btn btn-primary signup"
                    style={{ fontSize: "1.2rem", fontWeight: "bold", marginRight: "1vw" }}
                  >
                    Sign Up
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="container d-flex flex-column align-items-center justify-content-center" style={{ minHeight: "90vh" }}>
        <button type="button" style={{ fontSize: '2rem', padding: '1rem 1rem', margin: '1rem',width:'35%'}} className="btn btn-primary btn-lg genbtn" onClick={generate}>
          Generate Certificate
        </button>
        <button type="button" style={{ fontSize: '2rem', padding: '1rem 1rem', margin: '1rem' ,width:'35%'}} className="btn btn-secondary btn-lg verbtn" onClick={validation}>
          Validate Certificate
        </button>
      </div>
    </div>
  );
}

export default App;
