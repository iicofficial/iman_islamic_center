import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import "./Contact.css";
import jsPDF from "jspdf";
import logo from "../assets/logo.png";
import { generateArabicPdf, buildPdfTemplate } from "../utils/pdfGenerator";
import StatusModal from "./StatusModal";
import { sendEmail } from "../utils/emailService";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaPaperPlane } from "react-icons/fa";

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

    const generatePDF = async () => {
        const title = t('contact.formTitle') || "Message Details";
        const sections = [
            {
                title: "Information",
                fields: [
                    { label: t('contact.nameLabel'), value: formData.name },
                    { label: t('contact.emailLabel'), value: formData.email },
                    { label: t('contact.phoneLabel'), value: formData.phone },
                    { label: t('contact.messageLabel'), value: formData.message },
                ]
            }
        ];

        const template = buildPdfTemplate(title, sections, language, t('navbar.brandName'));
        await generateArabicPdf(template, `IIC_Contact_${formData.name.replace(/\s+/g, '_')}.pdf`);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ type: 'info', message: 'Sending message...' });

        try {
            const templateParams = {
                form_title: "General Contact Inquiry",
                user_name: formData.name,
                sender_name: "Iman Islamic Center (IIC)",
                from_name: "Iman Islamic Center (IIC)",
                user_email: formData.email,
                to_email: "dev@iman-islam.org", // Organization email
                reply_to: formData.email,
                date: new Date().toLocaleDateString(),
                location: "Online Inquiry",
                phone: formData.phone || "Not provided",
                message: formData.message,
                formType: 'contact'
            };

            await sendEmail(templateParams);

            setStatus({
                type: 'success',
                message: `Thank you, ${formData.name}. Your message has been sent to IIC and a confirmation was sent to ${formData.email}.`
            });

            // Handle PDF separately to prevent it from crashing the success state
            try {
                await generatePDF();
            } catch (pdfError) {
                console.error("PDF generation failed:", pdfError);
            }

            setFormData({ name: "", email: "", phone: "", message: "" });
        } catch (error) {
            console.error(error);
            setStatus({ type: 'error', message: 'Failed to send message. Please check your internet connection and try again.' });
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
                                            <p>dev@iman-islam.org</p>
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
                                        <button
                                            type="submit"
                                            className="btn btn-modern-submit"
                                            disabled={status.type === 'info'}
                                        >
                                            <span>{status.type === 'info' ? t('contact.sending') || 'Sending...' : t('contact.send')}</span>
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
