import React, { useState } from 'react';
import { validateEmail, validatePassword } from '../scripts';

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <form>
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
            <button type="submit" onClick={(e) => {
                console.log('e from button', e);
                e.preventDefault();
                console.log({ email: validateEmail(email), password: validatePassword(password) });
            }}>Login</button>
        </form>
    );
}

export default Login;