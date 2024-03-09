import { useState } from "react";
import "./login.css"; 
import { Link } from "react-router-dom";
import Header from "../Header";

const LoginForm = () => {
  const [username, setUser] = useState("");
  const [password, setPassword] = useState("");

  const handleUserChange = (e) => {
    setUser(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your login logic or API call here
    console.log("Form submitted - Username:", username, "Password:", password);
    setUser("");
    setPassword("");
  };

  return (
    <>
    <Header></Header>
    <div className="wrapper fadeInDown">
  <div id="formContent">
    <div className="fadeIn first mt-3">
      <h3 style={{textAlign:"center"}}>Login</h3>
    </div>

    
    <form>
      <input type="text" id="Username" className="fadeIn second" onChange={handleUserChange} value={username} name="Username" placeholder="Username"/>
      <input type="password" id="password" className="fadeIn third" onChange={handlePasswordChange} value={password} name="Password" placeholder="Password"/>
      
      <br></br>
      <input type="submit" onClick={handleSubmit} className="fadeIn fourth" value="Log In"/>
    </form>

    
    <div id="formFooter" className="d-flex justify-content-between">
    <Link className="underlineHover" to="/" style={{textDecoration: 'none'}}>Forgot Password?</Link>
      <Link className="underlineHover" to="/signup" style={{textDecoration: 'none'}}>New User?</Link>
    </div>
  </div>
</div>
</>
  );
};

export default LoginForm;
