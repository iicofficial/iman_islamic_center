import React from "react";
import "./Footer.css";

function Footer() {
    return (
        <footer className="footer-section py-4" id="footer">
            <div className="container-fluid px-3">
                <div className="row">
                    {/* Mission */}
                    <div className="col-md-4 mb-3">
                        <h5 className="text-white">Iman Islamic Center</h5>
                        <p className="text-light">
                            Serving the Lincoln, NE community with religious guidance, education, and community programs.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="col-md-4 mb-3">
                        <h5 className="text-white">Quick Links</h5>
                        <ul className="list-unstyled">
                            <li><a href="/" className="footer-link">Home</a></li>
                            <li><a href="#prayer" className="footer-link">Prayer Times</a></li>
                            <li><a href="#events" className="footer-link">Events</a></li>
                            <li><a href="#footer" className="footer-link">Contact</a></li>
                            <li><a href="/forms/Constitution and bylaws.docx" className="footer-link" download>Constitution & Bylaws</a></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="col-md-4 mb-3">
                        <h5 className="text-white">Contact Us</h5>
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
                    &copy; {new Date().getFullYear()} Iman Islamic Center. All Rights Reserved.
                </div>
            </div>
        </footer>
    );
}

export default Footer;
