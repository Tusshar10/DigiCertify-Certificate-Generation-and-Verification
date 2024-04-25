import { useState } from "react";
import "./Login/login.css";
import { Link, useNavigate } from "react-router-dom";
import Header from "./header/Header";

const Sign = () => {
  const [organizationName, setOrganizationName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [gst, setGST] = useState("");
  const [password, setPassword] = useState("");
  const [errmsg, setErrmsg] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      name: organizationName,
      email: email,
      password: password,
      contact: phoneNo,
      gstno: gst,
    };
    try {
      const response = await fetch("http://localhost:3001/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Signup successful, you can redirect or handle accordingly
        const { token } = await response.json();
        console.log("Signup successful");
        localStorage.setItem("token", token);
        navigate("/");
      } else {
        // Signup failed, handle the error
        console.error("Signup failed");
        setErrmsg("Please Enter Correct Details");
      }
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  return (
    <>
      <Header></Header>
      <div className="loginpage">
        <div className="wrapper fadeInDown">
          <div id="formContent">
            <div className="fadeIn first mt-3">
              <h3 style={{ textAlign: "center" }}>Sign Up</h3>
            </div>

            <form>
              <input
                type="text"
                id="Organization Name"
                className="fadeIn second"
                onChange={(e) => setOrganizationName(e.target.value)}
                value={organizationName}
                name="Organization Name"
                placeholder="Organization Name"
              />
              <input
                type="text"
                id="Email"
                className="fadeIn third"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                name="Email"
                placeholder="Email"
              />
              <input
                type="number"
                id="Contact"
                className="fadeIn fourth"
                onChange={(e) => setPhoneNo(e.target.value)}
                value={phoneNo}
                name="Contact"
                placeholder="Contact"
              />
              <input
                type="text"
                id="gst"
                className="fadeIn fifth"
                onChange={(e) => setGST(e.target.value)}
                value={gst}
                name="gst"
                placeholder="GST"
              />
              <input
                type="password"
                id="password"
                className="fadeIn sixth"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                name="Password"
                placeholder="Password"
              />
              <br></br>
              <input
                type="submit"
                onClick={handleSubmit}
                className="fadeIn seventh"
                value="Sign Up"
              />
            </form>

            <div id="formFooter" className="d-flex justify-content-between">
              {/* <Link
                className="underlineHover"
                to="/"
                style={{ textDecoration: "none" }}
              >
                Forgot Password?
              </Link> */}
              <Link
                className="underlineHover"
                to="/login"
                style={{ textDecoration: "none" }}
              >
                Registered User?
              </Link>
            </div>
          </div>
        </div>
        <div style={{ color: "red", textAlign: "center", fontSize: "3vh" }}>
          {errmsg}
        </div>
      </div>
    </>
  );
};

export default Sign;
