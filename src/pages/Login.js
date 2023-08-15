import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = ({ isAuthenticated, setIsAuthenticated }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const REACT_APP_BACKEND = process.env.REACT_APP_BACKEND;

    const handleLogin = (e) => {
        e.preventDefault();

        axios
            .post(`${REACT_APP_BACKEND}/login`, {
                username,
                password
            })
            .then((res) => {
                const { access_token } = res.data;
                localStorage.setItem('access_token', access_token);
                setIsAuthenticated(true);
                const queryParams = new URLSearchParams(window.location.search);
                const redirectPath = queryParams.get('redirect');

                if (redirectPath) {
                    navigate(redirectPath);
                    console.log(isAuthenticated);
                } else {
                    navigate('/account');
                }
            })
            .catch((err) => {
                setError('Invalid username or password');
                console.log(err);
            });
    };

    return (
        <div className="Login-Page">
            <h2>Login Page</h2>
            {error && <p>{error}</p>}
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Login</button>
            </form>
            <p>
                Don't have an account? <Link to={'/signup'}>Sign Up</Link>
            </p>
        </div>
    );
};

export default Login;
