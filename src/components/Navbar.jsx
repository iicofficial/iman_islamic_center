import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
    FaRing, FaHandsHelping, FaFileContract, FaLanguage, FaHandHoldingHeart,
    FaMale, FaFemale, FaWpforms, FaFileDownload, FaUserPlus, FaHandHoldingUsd,
    FaFileAlt, FaInstagram, FaFacebookF, FaYoutube, FaPhoneAlt, FaEnvelope,
    FaChevronDown, FaHome, FaCalendarAlt, FaHistory, FaClock, FaMosque,
    FaBookOpen, FaAngleRight, FaChild, FaUserGraduate, FaUsers, FaSignInAlt, FaLock
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { IoLanguage } from "react-icons/io5";
import { useLanguage } from "../context/LanguageContext";
import logo from "../assets/logo.png";
import arabicLogo from "../assets/arabic_logo.png";
import "./Navbar.css";

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeSubmenu, setActiveSubmenu] = useState(null);
    const { language, toggleLanguage, t } = useLanguage();
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Prevent background scrolling when mobile menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
        };
    }, [isOpen]);

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
        <nav className={`navbar navbar-expand-xl custom-navbar fixed-top ${isScrolled ? "scrolled" : ""} `}>
            <div className="container-fluid px-4 position-relative">

                {/* Brand Section */}
                <Link className="navbar-brand d-flex align-items-center" to={getPath("/")} onClick={closeMenu}>
                    <img
                        src={language === 'ar' ? arabicLogo : logo}
                        alt="Iman Islamic Center Logo"
                        className="navbar-logo"
                    />
                </Link>

                {/* Centered Top Wrapper: Holds Language and Socials separately */}
                <div className="centered-top-wrapper d-none d-xl-flex align-items-center">
                    {/* Language Frame */}
                    <div className="language-pill me-2">
                        <button
                            className={`lang-btn ${language === 'en' ? 'active' : ''} `}
                            onClick={() => language !== 'en' && toggleLanguage()}
                        >
                            English
                        </button>
                        <span className="lang-divider">|</span>
                        <button
                            className={`lang-btn ${language === 'ar' ? 'active' : ''} `}
                            onClick={() => language !== 'ar' && toggleLanguage()}
                        >
                            العربية
                        </button>
                    </div>

                    {/* Member Login Button */}
                    <Link
                        to="/announcements"
                        className="member-login-btn me-2"
                        title={t('navbar.memberLogin')}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <FaLock className="me-2" />
                        <span>{t('navbar.memberLogin')}</span>
                    </Link>

                    {/* Social Frame */}
                    <div className="social-pill">
                        <a href="https://facebook.com/IICOfficial" target="_blank" rel="noopener noreferrer" className="social-icon facebook me-1" aria-label="Facebook"><FaFacebookF /></a>
                        <a href="https://x.com/ImanC15593" target="_blank" rel="noopener noreferrer" className="social-icon twitter me-1" aria-label="X"><FaXTwitter /></a>
                        <a href="#" target="_blank" rel="noopener noreferrer" className="social-icon youtube me-1" aria-label="YouTube"><FaYoutube /></a>
                        <a href="https://instagram.com/iicofficial.lincoln" target="_blank" rel="noopener noreferrer" className="social-icon instagram" aria-label="Instagram"><FaInstagram /></a>
                    </div>
                </div>

                {/* Mobile Language Toggle (Kept simple for smaller screens) */}
                <div className="language-toggle-container language-toggle-top d-xl-none">
                    <button
                        className={`lang-btn ${language === 'en' ? 'active' : ''} `}
                        onClick={() => language !== 'en' && toggleLanguage()}
                    >
                        English
                    </button>
                    <span className="lang-divider">|</span>
                    <button
                        className={`lang-btn ${language === 'ar' ? 'active' : ''} `}
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
                <div className={`collapse navbar-collapse ${isOpen ? "show" : ""} `} id="navbarNav">
                    <ul className="navbar-nav mx-auto align-items-center">
                        <li className="nav-item dropdown">
                            <a href="#" className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false" onClick={(e) => e.preventDefault()}>
                                {t('navbar.home')} <FaChevronDown className="ms-1 nav-arrow" />
                            </a>
                            <ul className="dropdown-menu">
                                <li><Link className={`dropdown-item ${isItemActive('/') ? 'active-item' : ''} `} to={getPath("/")} onClick={closeMenu}><FaHome className="me-2 menu-icon" />{t('navbar.mainPage')}</Link></li>
                                <li><Link className={`dropdown-item ${isItemActive('/contact') ? 'active-item' : ''} `} to={getPath("/contact")} onClick={closeMenu}><FaEnvelope className="me-2 menu-icon" />{t('navbar.contactUs')}</Link></li>
                            </ul>
                        </li>

                        <li className="nav-item dropdown">
                            <a href="#" className={`nav-link dropdown-toggle ${location.pathname.includes('/event') ? 'active' : ''} `} role="button" data-bs-toggle="dropdown" aria-expanded="false" onClick={(e) => e.preventDefault()}>
                                {t('navbar.events')} <FaChevronDown className="ms-1 nav-arrow" />
                            </a>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="#upcoming" onClick={closeMenu}><FaCalendarAlt className="me-2 menu-icon" />{t('navbar.upcoming')}</a></li>
                                <li><a className="dropdown-item" href="#past" onClick={closeMenu}><FaHistory className="me-2 menu-icon" />{t('navbar.past')}</a></li>
                            </ul>
                        </li>



                        <li className="nav-item">
                            <a href="/forms/Constitution and bylaws.pdf" className="nav-link" download onClick={closeMenu}>
                                {t('navbar.constitution')}
                            </a>
                        </li>

                        <li className="nav-item dropdown">
                            <a href="#" className={`nav-link dropdown-toggle ${location.pathname.includes('/forms/') ? 'active' : ''} `} role="button" data-bs-toggle="dropdown" aria-expanded="false" onClick={(e) => e.preventDefault()}>
                                {t('navbar.forms')} <FaChevronDown className="ms-1 nav-arrow" />
                            </a>
                            <ul className="dropdown-menu">
                                {/* Quran Memorization Forms Submenu */}
                                <li className="dropdown-submenu">
                                    <a
                                        className={`dropdown-item dropdown-toggle ${activeSubmenu === 'quranForms' ? 'show' : ''} `}
                                        href="#"
                                        onClick={(e) => toggleSubmenu('quranForms', e)}
                                    >
                                        <FaBookOpen className="me-2 menu-icon" />
                                        {t('navbar.quranMemorizationForms')}
                                        <FaAngleRight className="submenu-arrow" />
                                    </a>
                                    <ul className={`dropdown-menu ${activeSubmenu === 'quranForms' ? 'show' : ''} `}>
                                        <li><a className="dropdown-item" href="/forms/boys quran applicaiton form.pdf" download onClick={closeMenu}><FaMale className="me-2 menu-icon" />{t('navbar.quranBoysForm')}</a></li>
                                        <li><a className="dropdown-item" href="/forms/girls quran applicaiton form.pdf" download onClick={closeMenu}><FaFemale className="me-2 menu-icon" />{t('navbar.quranGirlsForm')}</a></li>
                                    </ul>
                                </li>

                                {/* Membership Forms Submenu */}
                                <li className="dropdown-submenu">
                                    <a
                                        className={`dropdown-item dropdown-toggle ${activeSubmenu === 'membership' ? 'show' : ''} `}
                                        href="#"
                                        onClick={(e) => toggleSubmenu('membership', e)}
                                    >
                                        <FaUserPlus className="me-2 menu-icon" />
                                        {t('navbar.membershipForms')}
                                        <FaAngleRight className="submenu-arrow" />
                                    </a>
                                    <ul className={`dropdown-menu ${activeSubmenu === 'membership' ? 'show' : ''} `}>
                                        <li><a className="dropdown-item" href="/forms/board of directors member work form.pdf" download onClick={closeMenu}><FaFileAlt className="me-2 menu-icon" />{t('downloadForms.commitmentTitle')}</a></li>
                                        <li><a className="dropdown-item" href="/forms/ELC Member work form.pdf" download onClick={closeMenu}><FaWpforms className="me-2 menu-icon" />{t('downloadForms.elcTitle')}</a></li>
                                    </ul>
                                </li>

                                {/* Donation Forms Submenu */}
                                <li className="dropdown-submenu">
                                    <a
                                        className={`dropdown-item dropdown-toggle ${activeSubmenu === 'donation' ? 'show' : ''} `}
                                        href="#"
                                        onClick={(e) => toggleSubmenu('donation', e)}
                                    >
                                        <FaHandHoldingUsd className="me-2 menu-icon" />
                                        {t('navbar.donationForms')}
                                        <FaAngleRight className="submenu-arrow" />
                                    </a>
                                    <ul className={`dropdown-menu ${activeSubmenu === 'donation' ? 'show' : ''} `}>
                                        <li><a className="dropdown-item" href="/forms/Islamic_Center_Monthly_Commitment_Form.pdf" download onClick={closeMenu}><FaFileAlt className="me-2 menu-icon" />{t('downloadForms.boardTitle')}</a></li>
                                        <li><a className="dropdown-item" href="/forms/Sponsor_Quran_Student.pdf" download onClick={closeMenu}><FaHandHoldingUsd className="me-2 menu-icon" />{t('downloadForms.sponsorTitle')}</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </li>

                        <li className="nav-item dropdown">
                            <a href="#"
                                className={`nav-link dropdown-toggle ${location.pathname.includes('/quran') ||
                                    location.pathname.includes('/marriage')
                                    ? 'active' : ''
                                    } `}
                                role="button" data-bs-toggle="dropdown" aria-expanded="false" onClick={(e) => e.preventDefault()}>
                                {t('navbar.services')} <FaChevronDown className="ms-1 nav-arrow" />
                            </a>
                            <ul className="dropdown-menu">
                                {/* Quran Memorization Submenu */}
                                <li className="dropdown-submenu">
                                    <a
                                        className={`dropdown-item dropdown-toggle ${activeSubmenu === 'quran' || location.pathname.includes('/quran') ? 'show active-item' : ''} `}
                                        href="#"
                                        onClick={(e) => toggleSubmenu('quran', e)}
                                    >
                                        <FaBookOpen className="me-2 menu-icon" />
                                        {t('navbar.quranSessions')}
                                        <FaAngleRight className="submenu-arrow" />
                                    </a>
                                    <ul className={`dropdown-menu ${activeSubmenu === 'quran' ? 'show' : ''} `}>
                                        <li><Link className={`dropdown-item ${isItemActive('/quran-boys-application') ? 'active-item' : ''} `} to={getPath("/quran-boys-application")} onClick={closeMenu}><FaMale className="me-2 menu-icon" />{t('navbar.quranBoys')}</Link></li>
                                        <li><Link className={`dropdown-item ${isItemActive('/quran-girls-application') ? 'active-item' : ''} `} to={getPath("/quran-girls-application")} onClick={closeMenu}><FaFemale className="me-2 menu-icon" />{t('navbar.quranGirls')}</Link></li>
                                    </ul>
                                </li>

                                <li><a className="dropdown-item" href="#services" onClick={closeMenu}><FaChild className="me-2 menu-icon" />{t('navbar.daycareServices')}</a></li>
                                <li><a className="dropdown-item" href="#services" onClick={closeMenu}><FaUserGraduate className="me-2 menu-icon" />{t('navbar.eduPrograms')}</a></li>

                                {/* Marriage Services Submenu */}
                                <li className="dropdown-submenu">
                                    <a
                                        className={`dropdown-item dropdown-toggle ${activeSubmenu === 'marriage' || location.pathname.includes('/marriage') ? 'show active-item' : ''} `}
                                        href="#"
                                        onClick={(e) => toggleSubmenu('marriage', e)}
                                    >
                                        <FaRing className="me-2 menu-icon" />
                                        {t('navbar.marriageServices')}
                                        <FaAngleRight className="submenu-arrow" />
                                    </a>
                                    <ul className={`dropdown-menu ${activeSubmenu === 'marriage' ? 'show' : ''} `}>
                                        <li><Link className={`dropdown-item ${isItemActive('/marriage-certificate') ? 'active-item' : ''} `} to={getPath("/marriage-certificate")} onClick={closeMenu}><FaWpforms className="me-2 menu-icon" />{t('navbar.applyOnlineForm')}</Link></li>
                                        <li><a className="dropdown-item" href="/forms/Marriage Contract Form.pdf" download onClick={closeMenu}><FaFileDownload className="me-2 menu-icon" />{t('navbar.downloadForm')}</a></li>
                                    </ul>
                                </li>

                                <li><Link className={`dropdown-item ${isItemActive('/couple-reconciliation') ? 'active-item' : ''} `} to={getPath("/couple-reconciliation")} onClick={closeMenu}><FaHandsHelping className="me-2 menu-icon" />{t('navbar.coupleReconciliation')}</Link></li>
                                <li><Link className={`dropdown-item ${isItemActive('/divorce-formalization') ? 'active-item' : ''} `} to={getPath("/divorce-formalization")} onClick={closeMenu}><FaFileContract className="me-2 menu-icon" />{t('navbar.divorceFormalization')}</Link></li>
                                <li><a className="dropdown-item" href="#services" onClick={closeMenu}><FaLanguage className="me-2 menu-icon" />{t('navbar.certifiedTranslation')}</a></li>
                                <li><a className="dropdown-item" href="#services" onClick={closeMenu}><FaHandHoldingHeart className="me-2 menu-icon" />{t('navbar.funeralServices')}</a></li>
                            </ul>
                        </li>

                        <li className="nav-item dropdown">
                            <a href="#" className={`nav-link dropdown-toggle ${isItemActive('/policies') ? 'active' : ''} `} role="button" data-bs-toggle="dropdown" aria-expanded="false" onClick={(e) => e.preventDefault()}>
                                {t('navbar.aboutUs')} <FaChevronDown className="ms-1 nav-arrow" />
                            </a>
                            <ul className="dropdown-menu">
                                <li><Link className={`dropdown-item ${isItemActive('/staff') ? 'active-item' : ''} `} to={getPath("/staff")} onClick={closeMenu}><FaUsers className="me-2 menu-icon" />{t('navbar.staff')}</Link></li>
                                <li><Link className={`dropdown-item ${isItemActive('/policies') ? 'active-item' : ''} `} to={getPath("/policies")} onClick={closeMenu}><FaFileContract className="me-2 menu-icon" />{t('navbar.programPolicies')}</Link></li>
                            </ul>
                        </li>

                        <li className="nav-item d-xl-none">
                            <Link
                                to="/announcements"
                                className="member-login-btn my-2"
                                onClick={closeMenu}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ width: 'fit-content' }}
                            >
                                <FaLock className="me-2" />
                                <span>{t('navbar.memberLogin')}</span>
                            </Link>
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

                    <div className="d-flex align-items-center mt-3 mt-lg-0 ms-lg-3 d-xl-none">
                        <ul className="navbar-nav navbar-right-items align-items-center d-flex flex-row">
                            <li className="nav-item me-1"><a href="https://facebook.com/IICOfficial" target="_blank" rel="noopener noreferrer" className="social-icon facebook" aria-label="Facebook"><FaFacebookF /></a></li>
                            <li className="nav-item me-1"><a href="https://x.com/ImanC15593" target="_blank" rel="noopener noreferrer" className="social-icon twitter" aria-label="X"><FaXTwitter /></a></li>
                            <li className="nav-item me-1"><a href="#" target="_blank" rel="noopener noreferrer" className="social-icon youtube" aria-label="YouTube"><FaYoutube /></a></li>
                            <li className="nav-item"><a href="https://instagram.com/iicofficial.lincoln" target="_blank" rel="noopener noreferrer" className="social-icon instagram" aria-label="Instagram"><FaInstagram /></a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
