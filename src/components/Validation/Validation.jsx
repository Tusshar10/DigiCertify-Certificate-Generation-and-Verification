import React from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
<<<<<<< Updated upstream
=======
import Header from '../header/Header';
import "./validation.scss"

>>>>>>> Stashed changes
function Validation() {
  const navigate=useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
  
    if(!token)
    {
      navigate("/login");
    }
  }, []);
  return (
<<<<<<< Updated upstream
    <div>Validation</div>
=======
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
>>>>>>> Stashed changes
  )
}

export default Validation
