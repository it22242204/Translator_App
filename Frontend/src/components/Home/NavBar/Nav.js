import React from 'react';
import Logo from "../img/logo.jpg";
import { useNavigate } from 'react-router-dom';
import './nav.css';

function Nav() {
  const navigate = useNavigate();

  return (
    <div>
      <div>
        <div className="nav_con_user">
          <div>
            <img src = {Logo} alt = "logo_nav" className="nav_logo_user" /> 
          </div>
          <div className="app_topic">
            <h1>Ceylon speaks</h1>
          </div>
            <div className="nav_item_user">
              <h3 
              className='navitem' 
              onClick={() => navigate("/")}
              >
                Home
              </h3>
              <h3 
              className='navitem' 
              onClick={() => navigate("/bookmarkdetails")}
              >
                BookMark
              </h3>
              <h3 
              className='navitem' 
              onClick={() => navigate("/notedetails")}
              >
                Notes
              </h3>
              <h3 
              className='navitem' 
              onClick={() => navigate("/quizintro")}
              >
                Quiz
              </h3>
              <h3 
              className='navitem' 
              onClick={() => navigate("/login")}
              >
                Admin
              </h3>
            </div>

        </div>
      </div>

    </div>
  );
}

export default Nav;