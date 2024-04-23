import React, { useState } from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../header/Header';
import "./validation.scss"
function Validation() {
  const navigate=useNavigate();
  const [certificateId,setCertificateId]=useState("");
  const [msg,setMsg]=useState("")
  useEffect(() => {
    const token = localStorage.getItem("token");
  
    if(!token)
    {
      navigate("/login");
    }
  }, []);
  const handleChange=(e)=>{
    setCertificateId(e.target.value)
  }
  const handleSubmit=async(e)=>{
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3001/checkhash/${certificateId}`, {
          method: "GET",
          headers: {
              "Content-Type": "application/json",
          }
      });
      const data = await response.json();
      if (data.success && data.isPresent) {
        setMsg("Certificate is Verified");
      } else {
        setMsg("Certificate is fake");
      } 
    } catch (error) {
      console.error("Error during verification:", error);
      setMsg("Error during verification. Please try again later")
    }
  }
  return (
    <div className="Validation">
    <Header></Header>
    <form onSubmit={handleSubmit}>
    <input type="text" name="certificateId" placeholder="Enter Certificate Id" value={certificateId} onChange={handleChange}></input>
    <input type="submit"></input>
    </form>
    <div className="message">
          {msg}
    </div>
    </div>
  )
}

export default Validation
