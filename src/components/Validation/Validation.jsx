import React from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
    <div>Validation</div>
  )
}

export default Validation