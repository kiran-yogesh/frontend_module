import React, { useState } from 'react';
import { API_URL } from '../../data/Apipath';

const Login = ({ showWelcomehandle }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const loginHandle = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Clear any previous errors

    try {
      // Login API call
      const response = await fetch(`${API_URL}/vendor/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data.error || 'Login failed. Please try again.');
        return;
      }

      // Successful login
      console.log(data);
      const { token, vendorId } = data;
      localStorage.setItem('logintoken', token);
      setEmail('');
      setPassword('');
      alert('Vendor login success');
      showWelcomehandle();
      

      // Fetch vendor details
      if (vendorId) {
        const vendorResponse = await fetch(`${API_URL}/vendor/single-vendor/${vendorId}`, {
          headers: {
            'Authorization': `Bearer ${token}`, // Pass token if required by the backend
          },
        });

        const vendorData = await vendorResponse.json();

        if (vendorResponse.ok) {
          const vendorFirmid = vendorData.vendorFirmid;
          console.log('Vendor Firm ID:', vendorFirmid);
          localStorage.setItem('firmIds', vendorFirmid);
          
          // Navigate to another page or update UI instead of reloading
        } else {
          setErrorMessage(vendorData.message || 'Failed to fetch vendor details.');
        }
      } else {
        setErrorMessage('Vendor ID not found.');
      }
    } catch (error) {
      console.error('Login failed:', error);
      setErrorMessage('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <div className="loginsection">
      <form className="logform" onSubmit={loginHandle}>
        <h2>Vendor Login</h2>

        {errorMessage && <div className="error-message">{errorMessage}</div>}

        <label>Email</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />
        <br />

        <label>Password</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          required
        />
        <br />

        <div className="sublog">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
