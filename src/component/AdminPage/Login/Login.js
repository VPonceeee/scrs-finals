// Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './authentication'; 

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();


  const handleLogin = () => {
    if (username === 'Admin' && password === 'Admin') {
      login(); 
      navigate('/Sucasaadminpage'); 
    } else {
      alert('Invalid username or password'); 
    }
  };

  return (
    <div id='AdminMainDiv' className='container-fluid'>
      <div id='LoginMainDiv' className='container'>
        <div className='AdminTitle'>
          <h1>Admin Login</h1>
        </div>
        <div className='AdminForm'>
          <div id='Admintxtbox' className="form-floating mb-3">
            <input type="email" className="form-control" id="Username" placeholder="name@example.com" value={username}
              onChange={(e) => setUsername(e.target.value)} />
            <label htmlFor="floatingInput">Username</label>
          </div>
          <div id='Admintxtbox' className="form-floating">
            <input type="password" className="form-control" id="Password" placeholder="Password" value={password}
              onChange={(e) => setPassword(e.target.value)} />
            <label htmlFor="floatingPassword">Password</label>
          </div>
          <button type="button" id="LoginBtn" className="btn btn-lg" onClick={handleLogin}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
