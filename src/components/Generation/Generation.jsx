import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';


function Generation() {
  const navigate=useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
  
    if(!token)
    {
      navigate("/login");
    }
  }, []);
  return (
    <div>Generation</div>
  )
}

export default Generation