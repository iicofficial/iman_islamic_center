import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import "./Footer.css";

function Footer() {
    const { language, t } = useLanguage();

    // Helper to get language-prefixed paths
    const getPath = (path) => {
        if (language === 'ar') {
            return path === '/' ? '/ar' : `/ar${path}`;
        }
        return path;
    };

    return (
        <footer className="footer-section py-4" id="footer">
            <div className="container-fluid px-3">
                <div className="row">
                    {/* Mission */}
                    <div className="col-md-4 mb-3">
                        <h5 className="text-white">{t('navbar.brandName')}</h5>
                        <p className="text-light">
                            {t('footer.mission')}
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="col-md-4 mb-3">
                        <h5 className="text-white">{t('footer.quickLinks')}</h5>
                        <ul className="list-unstyled">
                            <li><Link to={getPath("/")} className="footer-link">{t('navbar.home')}</Link></li>
                            <li><Link to={getPath("/#prayer")} className="footer-link">{t('navbar.prayerTimes')}</Link></li>
                            <li><Link to={getPath("/#events")} className="footer-link">{t('navbar.events')}</Link></li>
                            <li><Link to={getPath("/contact")} className="footer-link">{t('navbar.contactUs')}</Link></li>
                            <li><a href="/forms/Constitution and bylaws.docx" className="footer-link" download>{t('navbar.constitution')}</a></li>
                            <li><Link to={getPath("/policies")} className="footer-link">{t('navbar.programPolicies')}</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="col-md-4 mb-3">
                        <h5 className="text-white">{t('footer.contactUs')}</h5>
                        <p className="text-white mb-1">Email: <a href="mailto:dev@iman-islam.org" className="text-white text-decoration-none">dev@iman-islam.org</a></p>
                        <p className="text-white mb-1">Phone: (402) 730-3883</p>
                        <p className="text-white">Address: 901 w dawes avenue, Lincoln, NE</p>
                        <div className="social-links d-flex align-items-center mt-3">
                            <a href="https://facebook.com/IICOfficial" target="_blank" rel="noopener noreferrer" className="social-icon facebook me-2" aria-label="Facebook">
                                <FaFacebookF />
                            </a>
                            <a href="https://x.com/ImanC15593" target="_blank" rel="noopener noreferrer" className="social-icon twitter me-2" aria-label="X">
                                <FaXTwitter />
                            </a>
                            <a href="#" target="_blank" rel="noopener noreferrer" className="social-icon youtube me-2" aria-label="YouTube">
                                <FaYoutube />
                            </a>
                            <a href="https://instagram.com/iicofficial.lincoln" target="_blank" rel="noopener noreferrer" className="social-icon instagram" aria-label="Instagram">
                                <FaInstagram />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="text-center mt-3 text-white">
                    &copy; {new Date().getFullYear()} {t('footer.rights')}
                </div>
            </div>
        </footer>
    );
}

export default Footer;
