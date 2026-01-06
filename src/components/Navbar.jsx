import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaYoutube, FaLinkedinIn, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import logo from "../assets/logo.png";
import "./Navbar.css";

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const closeMenu = () => {
        setIsOpen(false);
    };

    return (
        <nav className="navbar navbar-expand-xl custom-navbar fixed-top py-2">
            <div className="container-fluid ps-2 pe-4 pe-lg-5">

                {/* Brand Section */}
                <Link className="navbar-brand d-flex align-items-center" to="/" onClick={closeMenu}>
                    <img src={logo} alt="Iman Islamic Center Logo" className="navbar-logo" />
                    <div className="brand-text-wrapper d-flex flex-column">
                        <span className="navbar-brand-text">Iman Islamic Center</span>
                        <span className="navbar-brand-location">Lincoln, NE</span>
                    </div>
                </Link>

                {/* Hamburger Toggler */}
                <button
                    className="navbar-toggler"
                    type="button"
                    onClick={toggleMenu}
                    aria-controls="navbarNav"
                    aria-expanded={isOpen}
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Collapsible Content */}
                <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`} id="navbarNav">
                    <ul className="navbar-nav ms-auto align-items-center">
                        <li className="nav-item dropdown">
                            {/* Removed closeMenu from header so it can open sublinks on mobile */}
                            <a href="#" className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false" onClick={(e) => e.preventDefault()}>
                                Home
                            </a>
                            <ul className="dropdown-menu">
                                <li><Link className="dropdown-item" to="/" onClick={closeMenu}>Main Page</Link></li>
                                <li><Link className="dropdown-item" to="/contact" onClick={closeMenu}>Contact Us</Link></li>
                            </ul>
                        </li>

                        <li className="nav-item dropdown">
                            <a href="#" className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false" onClick={(e) => e.preventDefault()}>
                                Events
                            </a>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="#upcoming" onClick={closeMenu}>Upcoming Events</a></li>
                                <li><a className="dropdown-item" href="#past" onClick={closeMenu}>Past Events</a></li>
                            </ul>
                        </li>

                        <li className="nav-item dropdown">
                            <a href="#" className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false" onClick={(e) => e.preventDefault()}>
                                Prayer Times
                            </a>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="#fajr" onClick={closeMenu}>Daily Prayers</a></li>
                                <li><a className="dropdown-item" href="#jummah" onClick={closeMenu}>Jummah Prayers</a></li>
                            </ul>
                        </li>

                        <li className="nav-item dropdown">
                            <a href="#" className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false" onClick={(e) => e.preventDefault()}>
                                Forms
                            </a>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="/forms/Constitution and bylaws.docx" download onClick={closeMenu}>Constitution and Bylaws</a></li>
                                <li><a className="dropdown-item" href="/forms/Islamic_Center_Monthly_Commitment_Form.docx" download onClick={closeMenu}>Monthly Commitment Form</a></li>
                                <li><a className="dropdown-item" href="/forms/ELC Member work form.docx" download onClick={closeMenu}>ELC Member Work Form</a></li>
                                <li><a className="dropdown-item" href="/forms/board of directors member work form.docx" download onClick={closeMenu}>Board of Directors Work Form</a></li>

                            </ul>
                        </li>

                        <li className="nav-item">
                            <a href="#donate" className="btn btn-donate ms-lg-2 my-2 my-lg-0" onClick={closeMenu}>Donate</a>
                        </li>
                    </ul>

                    {/* Actions Pod */}
                    <div className="phone-wrapper middle-phone-modern mt-3 mt-lg-0 ms-lg-2">
                        <div className="pod-item me-3">
                            <a href="tel:4027303883" className="social-icon phone-icon">
                                <FaPhoneAlt />
                            </a>
                            <span className="phone-number">402-730-3883</span>
                        </div>
                        <div className="pod-divider d-none d-lg-block"></div>
                        <div className="pod-item ms-lg-3 mt-2 mt-lg-0">
                            <Link to="/contact" className="contact-link-modern" onClick={closeMenu}>
                                <FaEnvelope className="me-2" />
                                <span>Contact Us</span>
                            </Link>
                        </div>
                    </div>

                    {/* Social Icons */}
                    <ul className="navbar-nav ms-lg-1 mt-3 mt-lg-0 navbar-right-items align-items-center">
                        <li className="nav-item me-1"><a href="https://facebook.com" target="_blank" className="social-icon facebook"><FaFacebookF /></a></li>
                        <li className="nav-item me-1"><a href="https://twitter.com" target="_blank" className="social-icon twitter"><FaTwitter /></a></li>
                        <li className="nav-item me-1"><a href="https://youtube.com" target="_blank" className="social-icon youtube"><FaYoutube /></a></li>
                        <li className="nav-item"><a href="https://linkedin.com" target="_blank" className="social-icon linkedin"><FaLinkedinIn /></a></li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
