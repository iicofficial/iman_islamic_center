import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaYoutube, FaLinkedinIn, FaPhoneAlt } from "react-icons/fa";
import logo from "../assets/logo.png";
import "./Navbar.css";

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg custom-navbar fixed-top py-3">
            <div className="container d-flex align-items-center justify-content-between">

                {/* Logo + Phone */}
                <div className="d-flex align-items-center">
                    <Link className="navbar-brand d-flex align-items-center me-4" to="/">
                        <img src={logo} alt="Iman Islamic Center Logo" className="navbar-logo me-2" />
                        <span className="navbar-brand-text">Iman Islamic Center</span>
                    </Link>

                    {/* Phone next to logo */}
                    <div className="phone-wrapper">
                        <a href="tel:4027303883" className="social-icon phone-icon">
                            <FaPhoneAlt />
                        </a>
                        <span className="phone-number">402-730-3883</span>
                    </div>
                </div>

                {/* Hamburger button */}
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Navbar Links + Donate + Socials */}
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto align-items-center">
                        {/* Home Dropdown */}
                        <li className="nav-item dropdown">
                            <Link to="/" className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Home
                            </Link>
                            <ul className="dropdown-menu">
                                <li><Link className="dropdown-item" to="/">Main Page</Link></li>
                                <li><a className="dropdown-item" href="#contact">Contact Us</a></li>
                            </ul>
                        </li>

                        {/* Prayer Times Dropdown */}
                        <li className="nav-item dropdown">
                            <a href="#prayer" className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Prayer Times
                            </a>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="#test1">test1</a></li>
                                <li><a className="dropdown-item" href="#test2">test2</a></li>
                                <li><a className="dropdown-item" href="#test3">test3</a></li>
                            </ul>
                        </li>

                        {/* Events Dropdown */}
                        <li className="nav-item dropdown">
                            <a href="#events" className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Events
                            </a>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="#test1">test1</a></li>
                                <li><a className="dropdown-item" href="#test2">test2</a></li>
                                <li><a className="dropdown-item" href="#test3">test3</a></li>
                            </ul>
                        </li>

                        <li className="nav-item"><a href="#donate" className="btn btn-donate ms-3">Donate</a></li>
                    </ul>

                    <ul className="navbar-nav ms-lg-3 mt-3 mt-lg-0 navbar-right-items align-items-center">
                        <li className="nav-item me-2">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon facebook">
                                <FaFacebookF />
                            </a>
                        </li>
                        <li className="nav-item me-2">
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon twitter">
                                <FaTwitter />
                            </a>
                        </li>
                        <li className="nav-item me-2">
                            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="social-icon youtube">
                                <FaYoutube />
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon linkedin">
                                <FaLinkedinIn />
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
