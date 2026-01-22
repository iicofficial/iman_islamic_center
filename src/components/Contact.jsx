import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import "./Contact.css";
import StatusModal from "./StatusModal";
import emailjs from '@emailjs/browser';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaUser, FaPaperPlane } from "react-icons/fa";

function Contact() {
    const { t, language } = useLanguage();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: ""
    });
    const [status, setStatus] = useState({ type: '', message: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ type: 'info', message: 'Sending message...' });

        try {
            // 1. Send Confirmation Email (Auto-reply)
            const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
            const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
            const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

            if (serviceId && templateId && publicKey) {
                const templateParams = {
                    form_title: "General Contact Inquiry",
                    user_name: formData.name,
                    date: new Date().toLocaleDateString(),
                    location: "Online Inquiry",
                    to_email: formData.email,
                    phone: formData.phone || "Not provided"
                };
                await emailjs.send(serviceId, templateId, templateParams, publicKey);
            }

            // 2. Google Sheets Submission
            const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyBbx7DHeVbKQqNBZPMDUQm6i0b57x67--mTpgBFsNEyQ_do3Q2m0-GAnm3tIlZYKdI4w/exec";

            await fetch(SCRIPT_URL, {
                method: "POST",
                mode: "no-cors",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...formData, formType: 'contact' }),
            });

            setStatus({ type: 'success', message: 'Message sent successfully!' });
            setFormData({ name: "", email: "", phone: "", message: "" });
        } catch (error) {
            console.error(error);
            setStatus({ type: 'error', message: 'Failed to send message. Please try again.' });
        }
    };

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
                                <div className="mt-4 pt-3 border-top border-white border-opacity-25">
                                    <Link to={language === 'ar' ? '/ar' : '/'} className="btn btn-light w-100 fw-bold">
                                        {t('navbar.home')}
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Right Side: Form */}
                        <div className="col-lg-7">
                            <div className="contact-form-card">
                                <form className="contact-form" onSubmit={handleSubmit}>
                                    <h3 className="form-title">{t('contact.formTitle')}</h3>
                                    <div className="row">
                                        <div className="col-md-6 mb-4">
                                            <div className="form-floating">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="name"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    placeholder={t('contact.nameLabel')}
                                                    required
                                                />
                                                <label htmlFor="name">{t('contact.nameLabel')}</label>
                                            </div>
                                        </div>
                                        <div className="col-md-6 mb-4">
                                            <div className="form-floating">
                                                <input
                                                    type="email"
                                                    className="form-control"
                                                    id="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    placeholder={t('contact.emailLabel')}
                                                    required
                                                />
                                                <label htmlFor="email">{t('contact.emailLabel')}</label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <div className="form-floating">
                                            <input
                                                type="tel"
                                                className="form-control"
                                                id="phone"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                placeholder={t('contact.phoneLabel')}
                                            />
                                            <label htmlFor="phone">{t('contact.phoneLabel')}</label>
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <div className="form-floating">
                                            <textarea
                                                className="form-control"
                                                id="message"
                                                name="message"
                                                value={formData.message}
                                                onChange={handleChange}
                                                placeholder={t('contact.messageLabel')}
                                                style={{ height: "150px" }}
                                                required
                                            ></textarea>
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

            <StatusModal
                show={!!status.message}
                status={status}
                onClose={() => setStatus({ type: '', message: '' })}
            />
        </section>
    );
}

export default Contact;
