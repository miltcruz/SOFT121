import React, { useState } from 'react';
import { validateEmail, validatePassword } from '../scripts';

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    async function handleSubmit(e) {
         console.log('e from button', e);
         // Prevent default form submission behavior
         e.preventDefault();
         console.log({ email: validateEmail(email), password: validatePassword(password) });

         // Clear message on new submit
         setMessage('');
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
                    onChange={(e) => { console.log('e from Password', e); setPassword(e.target.value); }}
                    required
                />
            </div>
            <button type="submit">Login</button>
            {message && <div>{message}</div>}
        </form>
    );
}

export default Login;
