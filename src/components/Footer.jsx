import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
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
                        <p className="text-white mb-1">Email: info@imanislamic.org</p>
                        <p className="text-white mb-1">Phone: (402) 730-3883</p>
                        <p className="text-white">Address: 901 w dawes avenue, Lincoln, NE</p>
                        <div className="social-links mt-2">
                            <a href="#" className="footer-link me-2">Facebook</a>
                            <a href="#" className="footer-link me-2">Twitter</a>
                            <a href="#" className="footer-link">Instagram</a>
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
