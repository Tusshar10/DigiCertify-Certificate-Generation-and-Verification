import React from 'react';
import { Link } from 'react-router-dom';
import "./Header.scss";

function Header() {
  return (
    <div className="header-container" style={{ backgroundColor: "#333", padding: "1rem 0", color: "white" }}>
      <Link to="/" className="header-link" style={{ fontSize: "2rem", fontWeight: "bold" }}><i>DigiCertify</i></Link>
    </div>
  );
}

export default Header;
