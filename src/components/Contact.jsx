import React from "react";
import { useLanguage } from "../context/LanguageContext";
import "./Contact.css";

import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaUser, FaPaperPlane } from "react-icons/fa";

function Contact() {
    const { t } = useLanguage();

    return (
        
        <section className="contact-section" id="contact">
            <div className="container">
                <div className="contact-container">
                    <div className="row g-4 g-lg-5 align-items-stretch">
                        {/* Left Side: Info */}
                        <div className="col-lg-5">
                            <div className="contact-info-card">
                                <h2 className="info-title">{t('contact.title')}</h2>
                                <p className="info-text">
                                    {t('contact.text')}
                                </p>

                                <div className="info-details">
                                    <div className="info-item">
                                        <div className="icon-box">
                                            <FaPhoneAlt />
                                        </div>
                                        <div>
                                            <label>{t('contact.callUs')}</label>
                                            <p>402-730-3883</p>
                                        </div>
                                    </div>
                                    <div className="info-item">
                                        <div className="icon-box">
                                            <FaEnvelope />
                                        </div>
                                        <div>
                                            <label>{t('contact.emailUs')}</label>
                                            <p>info@imanislamiccenter.org</p>
                                        </div>
                                    </div>
                                    <div className="info-item">
                                        <div className="icon-box">
                                            <FaMapMarkerAlt />
                                        </div>
                                        <div>
                                            <label>{t('contact.visitUs')}</label>
                                            <p>Lincoln, Nebraska, USA</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Side: Form */}
                        <div className="col-lg-7">
                            <div className="contact-form-card">
                                <form className="contact-form">
                                    <h3 className="form-title">{t('contact.formTitle')}</h3>
                                    <div className="row">
                                        <div className="col-md-6 mb-4">
                                            <div className="form-floating">
                                                <input type="text" className="form-control" id="name" placeholder={t('contact.nameLabel')} required />
                                                <label htmlFor="name">{t('contact.nameLabel')}</label>
                                            </div>
                                        </div>
                                        <div className="col-md-6 mb-4">
                                            <div className="form-floating">
                                                <input type="email" className="form-control" id="email" placeholder={t('contact.emailLabel')} required />
                                                <label htmlFor="email">{t('contact.emailLabel')}</label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <div className="form-floating">
                                            <input type="tel" className="form-control" id="phone" placeholder={t('contact.phoneLabel')} />
                                            <label htmlFor="phone">{t('contact.phoneLabel')}</label>
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <div className="form-floating">
                                            <textarea className="form-control" id="message" placeholder={t('contact.messageLabel')} style={{ height: "150px" }} required></textarea>
                                            <label htmlFor="message">{t('contact.messageLabel')}</label>
                                        </div>
                                    </div>

                                    <div className="mt-4">
                                        <button type="submit" className="btn btn-modern-submit">
                                            <span>{t('contact.send')}</span>
                                            <FaPaperPlane className="ms-2" />
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Contact;
