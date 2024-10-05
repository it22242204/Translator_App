import React from 'react';
// import { Link } from 'react-router-dom';
import './Nav.css'
import Logo from "./images/logo.jpeg";

function Nav() {
  
  return (
    
    // <div>
    //    <ul className="navbar bg-dark border-bottom border-body" data-bs-theme="dark">
    //   {/* <img  src={logo} alt='logo'></img> */}
    //     <li className="home-li">
    //         <Link to="/mainhome" className="activehome-a">
    //         <h1>Home</h1></Link>
    //     </li>
        
    //     <li className="home-li">
    //     <Link to="/addnote" className="activehome-a">
    //         <h1>Add Note</h1></Link>
    //     </li>
    //     <li className="home-li">
    //     <Link to="/notedetails" className="activehome-a">
    //         <h1>Note details</h1></Link>
    //     </li>
    //     </ul>
    // </div>
    <div>
    <div className="nav_con_user">
      <div>
        <img src={Logo} alt="logo_nav" className="nav_logo_user" /> 
      </div>
      <div className="nav_item_user">
        <h3 className="navitem" onClick={() => (window.location.href = "/")}>Home</h3>
        <h3 className="navitem" onClick={() => (window.location.href = "/addnote")}>Add note</h3>
        <h3 className="navitem" onClick={() => (window.location.href = "/notedetails")}>Note details</h3>
        <button
          className="nav_btn_log"
          onClick={() => (window.location.href = "/login")}
        >
          Login
        </button>
        <button
          className="nav_btn_regi"
          onClick={() => (window.location.href = "/userregister")}
        >
          Register
        </button>
      </div>
    </div>
  </div>
  );
}


export default Nav;
