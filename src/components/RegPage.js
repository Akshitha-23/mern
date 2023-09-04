import React, { useState } from 'react';
import './RegPage.css';

function RegPage() {
  const [firstname, setFirstName] = useState('');
  const [secondname, setSecondName] = useState('');
  const [rollnumber, setRollNumber] = useState('');
  // const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobile, setMobile] = useState('');

  const handleRollNumberChange = (event) => {
    setRollNumber(event.target.value);
  };

  const handleFirstNameChange = (event) => {
    const inputValue = event.target.value;
  
    // Regular expression pattern to match alphabetic characters (letters)
    const alphabeticPattern = /^[A-Za-z]+$/;
  
    if (inputValue.match(alphabeticPattern) || inputValue === '') {
      // Valid input (only alphabetic characters or empty input)
      setFirstName(inputValue);
    } else {
      // Invalid input, you can show an error message or handle it as needed
      alert('First Name should contain only alphabetic characters.');
    }
  };
  
  const handleSecondNameChange = (event) => {
    const inputValue = event.target.value;
  
    // Regular expression pattern to match alphabetic characters (letters)
    const alphabeticPattern = /^[A-Za-z]+$/;
  
    if (inputValue.match(alphabeticPattern) || inputValue === '') {
      // Valid input (only alphabetic characters or empty input)
      setSecondName(inputValue);
    } else {
      // Invalid input, you can show an error message or handle it as needed
      alert('Second Name should contain only alphabetic characters.');
    }
  };
  
  // const handleEmailChange = (event) => {
  //   setEmail(event.target.value);
  // };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleMobileChange = (event) => {
    setMobile(event.target.value);
  };

  async function registerUser(event) {
    event.preventDefault();

    // Check if required fields are empty
    if (!firstname || !secondname) {
      alert('Please enter both First Name and Second Name.');
      return;
    }

    // Check email format
    // const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    // if (!email.match(emailRegex)) {
    //   alert('Please enter a valid email address.');
    //   return;
    // }

    // Check password constraints
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!password.match(passwordRegex)) {
      alert('Password should be at least 8 character long and must include at least one alphabet, digit, and a special character.');
      return;
    }

    // Check phone number format (10 digits)
    if (!/^\d{10}$/.test(mobile)) {
      alert('Phone number must be  of exactly 10 digits.');
      return;
    }

    const response = await fetch('http://localhost:5000/user/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstname,
        secondname,
        rollnumber,
        password,
        mobile,
      }),
    });

    const checkStudentExists = async (rollnumber) => {
      try {
        const response = await fetch(`http://localhost:5000/students/${rollnumber}`);
        if (response.ok) {
          const data = await response.json();
          if(data===null)
          {
            return false;
          }
          return true; // Assuming your server returns an object with a "exists" property.
        } else {
          return false; // Handle other error cases here
        }
      } catch (error) {
        console.error('Error checking student:', error);
        return false;
      }
    };
    
    const studentExists = await checkStudentExists(rollnumber);

    if (!studentExists) {
      alert('Only valid students can register.');
      setRollNumber('');
      setPassword('');
      setFirstName('');
      setSecondName('');
      // setEmail('');
      setMobile('');
      return;
    }

    const data = await response.json();
    console.log(data);

    if (data.status === 'ok') {
      alert('Registration successful');
      window.location.href = '/profile-page?roll=' + rollnumber;
    } else {
      alert("The student has registered already!"); // Display the error message from the server
      window.location.href = '/login?roll=' + rollnumber;
    }

    setRollNumber('');
    setPassword('');
    setFirstName('');
    setSecondName('');
    setMobile('');
  }

  return (
   <div className="registration-container">
    <div className="registration-page">
      <h1>Register now</h1>
      <form onSubmit={registerUser}>
        <div>
          <label>Roll Number:</label>
          <input type="text" value={rollnumber} onChange={handleRollNumberChange} />
        </div>
        <div>
          <label>First Name:</label>
          <input type="text" value={firstname} onChange={handleFirstNameChange} />
        </div>
        <div>
          <label>Second Name:</label>
          <input type="text" value={secondname} onChange={handleSecondNameChange} />
        </div>
        {/* <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={handleEmailChange} />
        </div> */}
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={handlePasswordChange} />
        </div>
        <div>
          <label>Phone no.:</label>
          <input type="number" value={mobile} onChange={handleMobileChange} />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
   </div>
  );
}

export default RegPage;
