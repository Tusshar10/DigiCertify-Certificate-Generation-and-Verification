import React, { useState } from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../header/Header';
import "./validation.scss"

function Validation() {
  const navigate=useNavigate();
  const [certificateHash,setCertificateHash]=useState("");
  const [msg,setMsg]=useState("")
  const [show,setShow]=useState(false)
  const [certificateId,setCertificateId]=useState("");
  const [certificateDetails, setCertificateDetails] = useState(null);
  const [animationClass, setAnimationClass] = useState("");
  const [messageType, setMessageType] = useState("");

    useEffect(() => {
        // Trigger the animation when certificateDetails change
        setAnimationClass("slide-in");
        const timer = setTimeout(() => setAnimationClass(""), 500); // Reset after animation ends

        return () => clearTimeout(timer); // Cleanup timer
    }, [certificateDetails]);

  useEffect(() => {
    const token = localStorage.getItem("token");
  
    if(!token)
    {
      navigate("/login");
    }
  }, []);
  const handleChange=(e)=>{
    setCertificateHash(e.target.value)
  }
  const handleSubmit=async(e)=>{
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3001/checkhash/${certificateHash}`, {
          method: "GET",
          headers: {
              "Content-Type": "application/json",
          }
      });
      const data = await response.json();
      if (data.success && data.isPresent) {
        setMsg("Certificate is Verified");
        setShow(true);
        setMessageType("success"); 
    } else {
        setMsg("Certificate is fake");
        setShow(false);
        setMessageType("error"); 
    }
    } catch (error) {
      console.error("Error during verification:", error);
      setMsg("Error during verification. Please try again later")
    }
  }
  const fetchCertificateDetails = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(`http://localhost:3001/getCertificateDetails/${certificateId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (data.success && data.details) {
        setCertificateDetails(data.details); // Update the state with fetched details
      } else {
        setMsg("Invalid Certificate ID");
        setCertificateDetails(null);
      }
    } catch (error) {
      console.error("Error fetching certificate details:", error);
      setMsg("Error fetching certificate details. Please try again later.");
      setMessageType("error"); 
    }
  };
  return (
    <div className="Validation">
      <Header />
      <div style={{ marginTop: '2rem' }}>
        <form onSubmit={handleSubmit}>
          <input type="text" name="certificateHash" placeholder="Enter Certificate Hash Value" value={certificateHash} onChange={handleChange} />
          <input type="submit" />
        </form>
        <div className={`message ${messageType}`}>
          {msg}
        </div>
        {show ? (
          <div className="cert_id">
            <form onSubmit={fetchCertificateDetails}>
              <label><h1>Enter Certificate Id to get more details:</h1></label>
              <input
                type="text"
                name="certificateId"
                placeholder="Enter Certificate Id"
                value={certificateId}
                onChange={(e) => setCertificateId(e.target.value)}
              />
              <input type="submit" value="Fetch Details" />
            </form>
          </div>
        ) : null}
        {certificateDetails && (
          <div className={`certificate-details ${animationClass}`}>
          <h3>Certificate Details</h3>
          <p><span class="detail-label">Name:</span> John Doe</p>
          <p><span class="detail-label">Organization:</span> {certificateDetails.organization}</p>
          <p><span class="detail-label">Type:</span> {certificateDetails.type}</p>
          <p><span class="detail-label">Issued Date:</span> 2023-12-24</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Validation