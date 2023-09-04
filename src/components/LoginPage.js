import React, { useState } from 'react';
import './LoginPage.css'; // Import the CSS file for styling
import { useHistory } from 'react-router-dom';

const LoginPage = ({onLogin } ) => {
  const history = useHistory();
  const [rollnumber, setRollNumber] = useState('');
  const [password, setPassword] = useState('');

  const handleRollNumberChange = (event) => {
    setRollNumber(event.target.value);
    
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  async function loginUser(event) {
 
    event.preventDefault();
    const response = await fetch('http://localhost:5000/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        rollnumber,
        password,
      }),
    });

    const data = await response.json();
    console.log(data);


    if (data.user) {
      console.log(rollnumber);
      localStorage.setItem('userData',(rollnumber));
      onLogin(rollnumber);
      //window.location.href = '/profile-page?roll=' + rollnumber;
    } else {
      onLogin(null);
      alert('Please check your username and password');
    }

    setRollNumber('');
    setPassword('');
  }

  return (
    <div className="login-container">
      <div className="login-content">
        <h1>Login to Dashboard</h1>
        <form onSubmit={loginUser}>
          <div>
            <label>Roll Number:</label>
            <input type="text" value={rollnumber} onChange={handleRollNumberChange} />
          </div>
          <div>
            <label>Password:</label>
            <input type="password" value={password} onChange={handlePasswordChange} />
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
          <br />
          <button
            type="button"
            className="register-button"
            onClick={() => history.push('/registration-page')}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
