import React, { useState } from 'react';
import { validateEmail, validatePassword } from '../scripts';
import Button from './Button';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  async function handleSubmit(e) {
    console.log('e from button', e);
    // Prevent default form submission behavior
    e.preventDefault();
    console.log({
      email: validateEmail(email),
      password: validatePassword(password),
    });

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

      console.log('response', response);

      if (response.ok) {
        const data = await response.json();
        setMessage('Login successful!');
        // Handle successful login (e.g., store token, redirect)
      }
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
          onChange={(e) => {
            console.log('e from Password', e);
            setPassword(e.target.value);
          }}
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
