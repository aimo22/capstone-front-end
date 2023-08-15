import React from "react";
import { Link } from "react-router-dom";

const Header = ({ isAuthenticated }) => {
    console.log('isAuthenticated:', isAuthenticated);

    return (
        <header className="App-header">
            <Link to={'/'}>
                <span className="Header-Title">Ad🐾ptable</span>
            </Link>
            <div className="Header-Buttons">
                <Link to={'/'}>
                    <button className="Header-home">Home</button>
                </Link>
                <Link to={'/favorites'}>
                    <button className="Header-favorites">Favorites</button>
                </Link>
                {isAuthenticated ? (
                    <Link to={'/account'}>
                        <button className="Header-account">View Account</button>
                    </Link>
                ) : (
                    <Link to={'/login'}>
                        <button className="Header-login">Login</button>
                    </Link>
                )}
            </div>
        </header>
    );
};

export default Header;

