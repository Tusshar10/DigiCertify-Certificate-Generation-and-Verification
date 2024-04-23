import React from 'react';
import { Link } from 'react-router-dom';
import "./Header.scss";

function Header() {
  return (
    <div className="header-container">
      <Link to="/" className="header-link"><i>DigiCertify</i></Link>
    </div>
  );
}

export default Header;
