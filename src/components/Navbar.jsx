import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
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
    const location = useLocation();

    // Helper to check if a regular link is active
    const isActiveLink = (path) => {
        // Handle generic root path matching
        if (path === '/') {
            return location.pathname === '/' || location.pathname === '/ar';
        }
        // Check if pathname ends with the path (to handle /ar prefix automatically)
        // or exact match for non-prefixed
        return location.pathname === path || location.pathname === `/ar${path}` || location.pathname.includes(path);
    };

    // Helper to check if a specific dropdown item is active (exact match preferred)
    const isItemActive = (path) => {
        const fullPath = language === 'ar' ? `/ar${path}` : path;
        // For hash links, we might just ignore or check simple inclusion if generic
        if (path.startsWith('/#')) return false;
        return location.pathname === fullPath;
    };

    const getPath = (path) => {
        // If Arabic is active, prefix with /ar to load the Arabic version of the page.
        // Otherwise return the default (English) path.
        if (language === 'ar') {
            // For home page, return /ar instead of /ar/
            return path === '/' ? '/ar' : `/ar${path}`;
        }
        return path;
    };


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
                <Link className="navbar-brand d-flex align-items-center" to={getPath("/")} onClick={closeMenu}>
                    <img
                        src={language === 'ar' ? arabicLogo : logo}
                        alt="Iman Islamic Center Logo"
                        className="navbar-logo"
                    />
                </Link>

                {/* Language Toggle - Positioned Top Center */}
                <div className="language-toggle-container language-toggle-top">
                    <button
                        className={`lang-btn ${language === 'en' ? 'active' : ''}`}
                        onClick={() => language !== 'en' && toggleLanguage()}
                    >
                        English
                    </button>
                    <span className="lang-divider">|</span>
                    <button
                        className={`lang-btn ${language === 'ar' ? 'active' : ''}`}
                        onClick={() => language !== 'ar' && toggleLanguage()}
                    >
                        العربية
                    </button>
                </div>

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
                                <li><Link className={`dropdown-item ${isItemActive('/') ? 'active-item' : ''}`} to={getPath("/")} onClick={closeMenu}>{t('navbar.mainPage')}</Link></li>
                                <li><Link className={`dropdown-item ${isItemActive('/contact') ? 'active-item' : ''}`} to={getPath("/contact")} onClick={closeMenu}>{t('navbar.contactUs')}</Link></li>
                            </ul>
                        </li>

                        <li className="nav-item dropdown">
                            <a href="#" className={`nav-link dropdown-toggle ${location.pathname.includes('/event') ? 'active' : ''}`} role="button" data-bs-toggle="dropdown" aria-expanded="false" onClick={(e) => e.preventDefault()}>
                                {t('navbar.events')}
                            </a>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="#upcoming" onClick={closeMenu}>{t('navbar.upcoming')}</a></li>
                                <li><a className="dropdown-item" href="#past" onClick={closeMenu}>{t('navbar.past')}</a></li>
                            </ul>
                        </li>

                        <li className="nav-item dropdown">
                            <a href="#" className={`nav-link dropdown-toggle ${isItemActive('/#fajr') || isItemActive('/#jummah') ? 'active' : ''}`} role="button" data-bs-toggle="dropdown" aria-expanded="false" onClick={(e) => e.preventDefault()}>
                                {t('navbar.prayerTimes')}
                            </a>
                            <ul className="dropdown-menu">
                                <li><Link className={`dropdown-item ${isItemActive('/#fajr') ? 'active-item' : ''}`} to={getPath("/#fajr")} onClick={closeMenu}>{t('navbar.dailyPrayers')}</Link></li>
                                <li><Link className={`dropdown-item ${isItemActive('/#jummah') ? 'active-item' : ''}`} to={getPath("/#jummah")} onClick={closeMenu}>{t('navbar.jummahPrayers')}</Link></li>
                            </ul>
                        </li>

                        <li className="nav-item">
                            <a href="/forms/Constitution and bylaws.docx" className="nav-link" download onClick={closeMenu}>
                                {t('navbar.constitution')}
                            </a>
                        </li>




                        <li className="nav-item">
                            <Link className={`nav-link ${isItemActive('/policies') ? 'active-item' : ''}`} to={getPath("/policies")} onClick={closeMenu}>
                                {t('navbar.programPolicies')}
                            </Link>
                        </li>

                        <li className="nav-item dropdown">
                            <a href="#"
                                className={`nav-link dropdown-toggle ${location.pathname.includes('/quran') ||
                                    location.pathname.includes('/marriage')
                                    ? 'active' : ''}`}
                                role="button" data-bs-toggle="dropdown" aria-expanded="false" onClick={(e) => e.preventDefault()}>
                                {t('navbar.services')}
                            </a>
                            <ul className="dropdown-menu">
                                {/* Quran Memorization Submenu */}
                                <li className="dropdown-submenu">
                                    <a
                                        className={`dropdown-item dropdown-toggle ${activeSubmenu === 'quran' || location.pathname.includes('/quran') ? 'show active-item' : ''}`}
                                        href="#"
                                        onClick={(e) => toggleSubmenu('quran', e)}
                                    >
                                        {t('navbar.quranSessions')}
                                    </a>
                                    <ul className={`dropdown-menu ${activeSubmenu === 'quran' ? 'show' : ''}`}>
                                        <li><Link className={`dropdown-item ${isItemActive('/quran-boys-application') ? 'active-item' : ''}`} to={getPath("/quran-boys-application")} onClick={closeMenu}>{t('navbar.quranBoys')}</Link></li>
                                        <li><Link className={`dropdown-item ${isItemActive('/quran-girls-application') ? 'active-item' : ''}`} to={getPath("/quran-girls-application")} onClick={closeMenu}>{t('navbar.quranGirls')}</Link></li>
                                    </ul>
                                </li>

                                <li><a className="dropdown-item" href="#services" onClick={closeMenu}>{t('navbar.daycareServices')}</a></li>
                                <li><a className="dropdown-item" href="#services" onClick={closeMenu}>{t('navbar.eduPrograms')}</a></li>

                                {/* Marriage Services Submenu */}
                                <li className="dropdown-submenu">
                                    <a
                                        className={`dropdown-item dropdown-toggle ${activeSubmenu === 'marriage' || location.pathname.includes('/marriage') ? 'show active-item' : ''}`}
                                        href="#"
                                        onClick={(e) => toggleSubmenu('marriage', e)}
                                    >
                                        {t('navbar.marriageServices')}
                                    </a>
                                    <ul className={`dropdown-menu ${activeSubmenu === 'marriage' ? 'show' : ''}`}>
                                        <li><Link className={`dropdown-item ${isItemActive('/marriage-certificate') ? 'active-item' : ''}`} to={getPath("/marriage-certificate")} onClick={closeMenu}>{t('navbar.applyOnlineForm')}</Link></li>
                                        <li><a className="dropdown-item" href="/forms/Marriage Contract Form.pdf" download onClick={closeMenu}>{t('navbar.downloadForm')}</a></li>
                                    </ul>
                                </li>

                                <li><a className="dropdown-item" href="#services" onClick={closeMenu}>{t('navbar.coupleReconciliation')}</a></li>
                                <li><a className="dropdown-item" href="#services" onClick={closeMenu}>{t('navbar.divorceFormalization')}</a></li>
                                <li><a className="dropdown-item" href="#services" onClick={closeMenu}>{t('navbar.certifiedTranslation')}</a></li>
                                <li><a className="dropdown-item" href="#services" onClick={closeMenu}>{t('navbar.funeralServices')}</a></li>
                            </ul>
                        </li>

                        <li className="nav-item dropdown">
                            <a href="#" className={`nav-link dropdown-toggle ${location.pathname.includes('/forms/') ? 'active' : ''}`} role="button" data-bs-toggle="dropdown" aria-expanded="false" onClick={(e) => e.preventDefault()}>
                                {t('navbar.forms')}
                            </a>
                            <ul className="dropdown-menu">
                                {/* Quran Memorization Forms Submenu */}
                                <li className="dropdown-submenu">
                                    <a
                                        className={`dropdown-item dropdown-toggle ${activeSubmenu === 'quranForms' ? 'show' : ''}`}
                                        href="#"
                                        onClick={(e) => toggleSubmenu('quranForms', e)}
                                    >
                                        {t('navbar.quranMemorizationForms')}
                                    </a>
                                    <ul className={`dropdown-menu ${activeSubmenu === 'quranForms' ? 'show' : ''}`}>
                                        <li><a className="dropdown-item" href="/forms/boys quran applicaiton form.docx" download onClick={closeMenu}>{t('navbar.quranBoysForm')}</a></li>
                                        <li><a className="dropdown-item" href="/forms/girls quran applicaiton form.docx" download onClick={closeMenu}>{t('navbar.quranGirlsForm')}</a></li>
                                    </ul>
                                </li>

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
