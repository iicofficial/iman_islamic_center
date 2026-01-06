import React, { useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import Contact from "./Contact";
import "./ContactPage.css";

function ContactPage() {
    const { t } = useLanguage();
    // Scroll to top when the page loads
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="contact-page-wrapper">
            {/* Minimalist Header for the dedicated page */}
            <div className="contact-page-header">
                <div className="container">
                    <h1>{t('contact.title')}</h1>
                    <p>{t('contact.text')}</p>
                </div>
            </div>

            <div className="contact-page-content">
                <Contact />
            </div>
        </div>
    );
}

export default ContactPage;
