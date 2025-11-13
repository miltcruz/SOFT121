import React, { useState } from 'react';
import { validateEmail, validatePassword } from '../scripts';
import { useNavigate } from 'react-router';
import Button from './Button';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(e) {
    // Prevent default form submission behavior
    e.preventDefault();

    // Clear message on new submit
    setMessage('');

    // Validate email
    if (!validateEmail(email)) {
      setMessage('Invalid email format.');
      return;
    }

    // Validate password
    if (!validatePassword(password)) {
      setMessage('Invalid password format.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5156/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();

        if (data.isAuthenticated) {
          // Set props in localStorage
          localStorage.setItem('isAuthenticated', 'true');
          localStorage.setItem('user', JSON.stringify(data.user));

          setMessage('Login successful!');

          // redirect to weather page
          navigate('/weather');
        }
      }

      // clear fields and prompt user to try again
      setMessage('Login failed. Please try again.');
      setEmail('');
      setPassword('');
    } catch (error) {
      setMessage('Login failed. Please try again.');
    }
  }

  return (
    // onSubmit calls handleSubmit function
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <Button type="submit" bg="blue" color="white">
        Login
      </Button>
      {message && <div>{message}</div>}
    </form>
  );
}

export default Login;
