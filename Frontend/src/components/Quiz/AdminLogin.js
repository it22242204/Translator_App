import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import'./quizstyle/AdminLogin.css';
import Nav from '../Home/NavBar/Nav';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin123') {
      sessionStorage.setItem('isAdmin', true);
      navigate('/admin');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div>
      <Nav/>
        <div className='bkimg'>
        <h2 className='adminheading'>Admin Login</h2>
        <div className='admincontainer'> 
      {error && <p>{error}</p>}
      <form onSubmit={handleLogin}>
        <label>Username</label>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        
        <label>Password</label>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="btn" type="submit">Login</button>
      </form>

        </div>

        </div>
        
    </div>
  );
};

export default AdminLogin;
