import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <ul className="nav">
            <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                    Main
                </Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/Login">
                    Login
                </Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/Users">
                    Users
                </Link>
            </li>
        </ul>
    );
};

export default Navbar;
