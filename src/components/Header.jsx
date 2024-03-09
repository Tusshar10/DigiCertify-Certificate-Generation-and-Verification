import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <div style={{textAlign:"center",fontSize:"5vh",fontWeight:"bold"}}>
    <Link to="/" style={{textDecoration: 'none',color:"#92badd"}}><i>DigiCertify</i></Link>
    </div>
  )
}

export default Header