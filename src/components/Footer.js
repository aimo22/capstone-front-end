import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="App-footer">
            <Link to={'/About'}>
                <button className="Footer-about">About</button>
            </Link>
            <Link to={'/Contact'}>
                <button className="Footer-contact">Contact</button>
            </Link>
            <p>&copy; 2023 Ad🐾ptable</p>
        </footer>
    );
};

export default Footer;