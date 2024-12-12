import React from 'react';
import './Header.css'; // Import the CSS file
import logo from './assets/images/image.png';

const Header = () => {
  return (
    <header className="header">
      <div className="logo" >
      <img src={logo} alt="MyRoom Logo" className="logo-img" />
      <h2 className="text">Ceylon speaks</h2>
      </div>
      <nav className="navbar">
        <ul className="nav-links">
          <li><a href="/">Home</a></li>
          <li><a href="/bookmarkdetails">BookMark</a></li>
          <li><a href="/quizintro">Quiz</a></li>
          <li><a href="/notedetails">Notes</a></li>
          <li><a href="/login">Admin</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
