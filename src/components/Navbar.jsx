import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaYoutube, FaLinkedinIn, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { IoLanguage } from "react-icons/io5";
import { useLanguage } from "../context/LanguageContext";
import logo from "../assets/logo.png";
import arabicLogo from "../assets/arabic_logo.png";
import "./Navbar.css";

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [activeSubmenu, setActiveSubmenu] = useState(null);
    const { language, toggleLanguage, t } = useLanguage();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const closeMenu = () => {
        setIsOpen(false);
        setActiveSubmenu(null);
    };

    const toggleSubmenu = (menuName, e) => {
        e.preventDefault();
        e.stopPropagation();
        setActiveSubmenu(prev => prev === menuName ? null : menuName);
    };

    return (
        <nav className="navbar navbar-expand-xl custom-navbar fixed-top">
            <div className="container-fluid px-4 position-relative">

                {/* Brand Section */}
                <Link className="navbar-brand d-flex align-items-center" to="/" onClick={closeMenu}>
                    <img
                        src={language === 'ar' ? arabicLogo : logo}
                        alt="Iman Islamic Center Logo"
                        className="navbar-logo"
                    />
                </Link>

                {/* Language Toggle - Positioned Top Center */}
                <button
                    className="btn btn-link text-decoration-none fw-bold language-toggle-top"
                    onClick={toggleLanguage}
                    style={{
                        position: 'absolute',
                        top: '15px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        color: '#000',
                        fontSize: '0.95rem',
                        border: '2px solid #000',
                        borderRadius: '8px',
                        padding: '4px 12px',
                        minWidth: '160px',
                        textAlign: 'center',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 1100
                    }}
                >
                    <span>English</span>
                    <span className="mx-2" style={{ opacity: 0.5 }}>|</span>
                    <span>العربية</span>
                </button>

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
                    <ul className="navbar-nav mx-auto align-items-center">
                        <li className="nav-item dropdown">
                            <a href="#" className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false" onClick={(e) => e.preventDefault()}>
                                {t('navbar.home')}
                            </a>
                            <ul className="dropdown-menu">
                                <li><Link className="dropdown-item" to="/" onClick={closeMenu}>{t('navbar.mainPage')}</Link></li>
                                <li><Link className="dropdown-item" to="/contact" onClick={closeMenu}>{t('navbar.contactUs')}</Link></li>
                            </ul>
                        </li>

                        <li className="nav-item dropdown">
                            <a href="#" className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false" onClick={(e) => e.preventDefault()}>
                                {t('navbar.events')}
                            </a>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="#upcoming" onClick={closeMenu}>{t('navbar.upcoming')}</a></li>
                                <li><a className="dropdown-item" href="#past" onClick={closeMenu}>{t('navbar.past')}</a></li>
                            </ul>
                        </li>

                        <li className="nav-item dropdown">
                            <a href="#" className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false" onClick={(e) => e.preventDefault()}>
                                {t('navbar.prayerTimes')}
                            </a>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="#fajr" onClick={closeMenu}>{t('navbar.dailyPrayers')}</a></li>
                                <li><a className="dropdown-item" href="#jummah" onClick={closeMenu}>{t('navbar.jummahPrayers')}</a></li>
                            </ul>
                        </li>

                        <li className="nav-item">
                            <a href="/forms/Constitution and bylaws.docx" className="nav-link" download onClick={closeMenu}>
                                {t('navbar.constitution')}
                            </a>
                        </li>

                        <li className="nav-item dropdown">
                            <a href="#" className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false" onClick={(e) => e.preventDefault()}>
                                {t('navbar.services')}
                            </a>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="#services" onClick={closeMenu}>{t('navbar.quranSessions')}</a></li>
                                <li><a className="dropdown-item" href="#services" onClick={closeMenu}>{t('navbar.daycareServices')}</a></li>
                                <li><a className="dropdown-item" href="#services" onClick={closeMenu}>{t('navbar.eduPrograms')}</a></li>

                                {/* Marriage Contracts Submenu */}
                                <li className="dropdown-submenu">
                                    <a
                                        className={`dropdown-item dropdown-toggle ${activeSubmenu === 'marriage' ? 'show' : ''}`}
                                        href="#"
                                        onClick={(e) => toggleSubmenu('marriage', e)}
                                    >
                                        {t('navbar.marriageContracts')}
                                    </a>
                                    <ul className={`dropdown-menu ${activeSubmenu === 'marriage' ? 'show' : ''}`}>
                                        <li><Link className="dropdown-item" to="/marriage-certificate" onClick={closeMenu}>{t('navbar.applyOnlineForm')}</Link></li>
                                        <li><a className="dropdown-item" href="#" download onClick={closeMenu}>{t('navbar.downloadForm')}</a></li>
                                    </ul>
                                </li>

                                <li><a className="dropdown-item" href="#services" onClick={closeMenu}>{t('navbar.coupleReconciliation')}</a></li>
                                <li><a className="dropdown-item" href="#services" onClick={closeMenu}>{t('navbar.divorceFormalization')}</a></li>
                                <li><a className="dropdown-item" href="#services" onClick={closeMenu}>{t('navbar.certifiedTranslation')}</a></li>
                                <li><a className="dropdown-item" href="#services" onClick={closeMenu}>{t('navbar.funeralServices')}</a></li>
                            </ul>
                        </li>

                        <li className="nav-item dropdown">
                            <a href="#" className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false" onClick={(e) => e.preventDefault()}>
                                {t('navbar.forms')}
                            </a>
                            <ul className="dropdown-menu">
                                {/* Membership Forms Submenu */}
                                <li className="dropdown-submenu">
                                    <a
                                        className={`dropdown-item dropdown-toggle ${activeSubmenu === 'membership' ? 'show' : ''}`}
                                        href="#"
                                        onClick={(e) => toggleSubmenu('membership', e)}
                                    >
                                        {t('navbar.membershipForms')}
                                    </a>
                                    <ul className={`dropdown-menu ${activeSubmenu === 'membership' ? 'show' : ''}`}>
                                        <li><a className="dropdown-item" href="/forms/Islamic_Center_Monthly_Commitment_Form.docx" download onClick={closeMenu}>{t('downloadForms.commitmentTitle')}</a></li>
                                        <li><a className="dropdown-item" href="/forms/ELC Member work form.docx" download onClick={closeMenu}>{t('downloadForms.elcTitle')}</a></li>
                                    </ul>
                                </li>

                                {/* Donation Forms Submenu */}
                                <li className="dropdown-submenu">
                                    <a
                                        className={`dropdown-item dropdown-toggle ${activeSubmenu === 'donation' ? 'show' : ''}`}
                                        href="#"
                                        onClick={(e) => toggleSubmenu('donation', e)}
                                    >
                                        {t('navbar.donationForms')}
                                    </a>
                                    <ul className={`dropdown-menu ${activeSubmenu === 'donation' ? 'show' : ''}`}>
                                        <li><a className="dropdown-item" href="/forms/board of directors member work form.docx" download onClick={closeMenu}>{t('downloadForms.boardTitle')}</a></li>
                                        <li><a className="dropdown-item" href="/forms/Sponsor_Quran_Student.docx" download onClick={closeMenu}>{t('downloadForms.sponsorTitle')}</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </li>

                        <li className="nav-item">
                            <a href="#donate" className="btn btn-donate ms-lg-2 my-2 my-lg-0" onClick={closeMenu}>{t('navbar.donate')}</a>
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
                                <span>{t('navbar.contactUs')}</span>
                            </Link>
                        </div>
                    </div>

                    <div className="d-flex align-items-center mt-3 mt-lg-0 ms-lg-3">
                        <ul className="navbar-nav navbar-right-items align-items-center d-flex flex-row">
                            <li className="nav-item me-1"><a href="https://facebook.com" target="_blank" className="social-icon facebook"><FaFacebookF /></a></li>
                            <li className="nav-item me-1"><a href="https://twitter.com" target="_blank" className="social-icon twitter"><FaTwitter /></a></li>
                            <li className="nav-item me-1"><a href="https://youtube.com" target="_blank" className="social-icon youtube"><FaYoutube /></a></li>
                            <li className="nav-item"><a href="https://linkedin.com" target="_blank" className="social-icon linkedin"><FaLinkedinIn /></a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
