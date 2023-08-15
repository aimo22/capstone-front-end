import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = ({ isAuthenticated, setIsAuthenticated }) => {
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const REACT_APP_BACKEND = process.env.REACT_APP_BACKEND;



    const handleSignup = async (e) => {
        e.preventDefault();

        if (username.length < 5 || password.length < 5) {
            setError("Username and password must be at least 5 characters long.");
            return;
        }

        if (name.length < 1) {
            setError("Please include a name.");
            return;
        }

        axios
            .post(`${REACT_APP_BACKEND}/signup`, {
                name,
                username,
                password,
            })
            .then(() => {
                return axios.post(`${REACT_APP_BACKEND}/login`, {
                    username,
                    password,
                });
            })
            .then((res) => {
                const { access_token } = res.data;
                localStorage.setItem("access_token", access_token);
                setIsAuthenticated(true);
                navigate("/account");
            })
            .catch((err) => {
                if (err.response && err.response.status === 409) {
                    setError(
                        "Username already exists. Please choose a different username."
                    );
                } else {
                    setError("Error signing up. Please try again.");
                }
                console.log(err);
            });
    };

    if (isAuthenticated) {
        navigate("/account");
        return null;
    }

    return (
        <div className="Signup-Page">
            <h2>Signup Page</h2>
            {error && <p>{error}</p>}
            <form onSubmit={handleSignup}>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
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
                <button type="submit">Sign Up</button>
            </form>
            <p>
                Already have an account? <Link to={'/login'}>Login</Link>
            </p>
        </div>
    );
};

export default Signup;
