import { useState } from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import Header from "../Header";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errmsg,setErrmsg]=useState("");
  const navigate = useNavigate();
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      email: email,
      password: password,
    };
    const response = await fetch("http://localhost:3001/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    if (response.ok) {
      // Signup successful, you can redirect or handle accordingly
      console.log("Login successful");
      navigate("/");
    } else {
      // Signup failed, handle the error
      console.error("Login failed");
      setErrmsg("Please Enter Correct Details");
    }
  };

  return (
    <>
      <Header></Header>
      <div className="wrapper fadeInDown">
        <div id="formContent">
          <div className="fadeIn first mt-3">
            <h3 style={{ textAlign: "center" }}>Login</h3>
          </div>

          <form>
            <input
              type="text"
              id="Email"
              className="fadeIn second"
              onChange={handleEmailChange}
              value={email}
              name="Email"
              placeholder="Email"
            />
            <input
              type="password"
              id="password"
              className="fadeIn third"
              onChange={handlePasswordChange}
              value={password}
              name="Password"
              placeholder="Password"
            />

            <br></br>
            <input
              type="submit"
              onClick={handleSubmit}
              className="fadeIn fourth"
              value="Log In"
            />
          </form>

          <div id="formFooter" className="d-flex justify-content-between">
            <Link
              className="underlineHover"
              to="/"
              style={{ textDecoration: "none" }}
            >
              Forgot Password?
            </Link>
            <Link
              className="underlineHover"
              to="/signup"
              style={{ textDecoration: "none" }}
            >
              New User?
            </Link>
          </div>
        </div>
      </div>
      <div style={{color:"red",textAlign:"center",fontSize:"3vh"}}>{errmsg}</div>
    </>
  );
};

export default LoginForm;
