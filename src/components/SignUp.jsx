import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";

function Signup() {
  const [organizationName, setOrganizationName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [gst, setGST] = useState("");
  const [password, setPassword] = useState("");
  const [errmsg,setErrmsg]=useState("");
  const navigate=useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
    const formData = {
      "name": organizationName,
      "email": email,
      "password": password,
      "contact": phoneNo,
      "gstno": gst,
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
        localStorage.setItem('token', token);
        navigate("/");
      } else {
        // Signup failed, handle the error
        console.error("Signup failed");
        setErrmsg("Please Enter Correct Details")
      }
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  return (
    <>
    <Header></Header>
    <div className="siguppage d-flex" style={{justifyContent:"space-between",alignItems:"center",flexDirection:"column"}}>
    <form onSubmit={handleSubmit}>
      <h1 style={{textAlign:"center"}}>Sign Up</h1>
      <div className="form-group">
        <label htmlFor="organization_name">Organization Name</label><br/>
        <input
          type="text"
          className="form-control"
          id="organization_name"
          placeholder="Enter Name"
          value={organizationName}
          onChange={(e) => setOrganizationName(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email address</label>
        <input
          type="email"
          className="form-control"
          id="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="phoneno">Contact No</label>
        <input
          type="number"
          className="form-control"
          id="phoneno"
          placeholder="Enter phone number "
          value={phoneNo}
          onChange={(e) => setPhoneNo(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="gst">GST No</label><br/>
        <input
          type="text"
          className="form-control"
          id="gst"
          placeholder="Enter GST number "
          value={gst}
          onChange={(e) => setGST(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label><br></br>
        <input
          type="password"
          className="form-control"
          id="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="d-flex justify-content-center">
      <button type="submit" className="btn btn-primary">Submit</button>
      </div>
    </form>
    <div style={{"color":"red",textAlign:"center"}}>{errmsg}</div>
    </div>
    </>
  );
}

export default Signup;
