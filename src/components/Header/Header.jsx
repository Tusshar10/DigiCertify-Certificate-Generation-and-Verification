import React from 'react'
import { Link } from 'react-router-dom'
import styles from "./Header.module.css";
function Header() {
  return (
    <div className="styles.headerdiv">
    <Link to="/"><i>DigiCertify</i></Link>
    </div>
  )
}

export default Header