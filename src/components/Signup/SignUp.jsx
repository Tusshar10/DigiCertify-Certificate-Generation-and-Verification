import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../Header/Header";

function Signup() {
  const [organizationName, setOrganizationName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [gst, setGST] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log("Form submitted:", { organizationName, email, phoneNo, gst, password });
  };

  return (
    <>
    <Header></Header>
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
        <label htmlFor="password">Password</label>
        <input
          type="password"
          className="form-control"
          id="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
    </>
  );
}

export default Signup;
