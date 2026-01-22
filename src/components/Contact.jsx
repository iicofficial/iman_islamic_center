import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import "./Contact.css";
import StatusModal from "./StatusModal";
import emailjs from '@emailjs/browser';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaUser, FaPaperPlane } from "react-icons/fa";
import jsPDF from "jspdf";
import logo from "../assets/logo.png";

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

    const generatePDF = () => {
        try {
            const doc = new jsPDF();
            const pageWidth = doc.internal.pageSize.width;

            // Header
            doc.setFillColor(245, 245, 245);
            doc.rect(0, 0, pageWidth, 40, 'F');
            if (logo) {
                doc.addImage(logo, 'PNG', 15, 5, 30, 30);
            }

            doc.setTextColor(39, 86, 155);
            doc.setFontSize(22);
            doc.setFont("helvetica", "bold");
            doc.text("IMAN ISLAMIC CENTER", 55, 18);
            doc.setFontSize(14);
            doc.setFont("helvetica", "normal");
            doc.text("General Inquiry Form", 55, 28);

            let yPos = 55;
            doc.setTextColor(0, 0, 0);
            doc.setFontSize(12);

            // Details
            doc.setFont("helvetica", "bold");
            doc.text("Name:", 20, yPos);
            doc.setFont("helvetica", "normal");
            doc.text(formData.name, 50, yPos);
            yPos += 10;

            doc.setFont("helvetica", "bold");
            doc.text("Email:", 20, yPos);
            doc.setFont("helvetica", "normal");
            doc.text(formData.email, 50, yPos);
            yPos += 10;

            doc.setFont("helvetica", "bold");
            doc.text("Phone:", 20, yPos);
            doc.setFont("helvetica", "normal");
            doc.text(formData.phone || "Not provided", 50, yPos);
            yPos += 15;

            // Message
            doc.setFont("helvetica", "bold");
            doc.text("Message:", 20, yPos);
            yPos += 7;
            doc.setFont("helvetica", "normal");
            const splitMessage = doc.splitTextToSize(formData.message, 170);
            doc.text(splitMessage, 20, yPos);

            // Footer
            const dateStr = new Date().toLocaleString();
            doc.setFontSize(10);
            doc.setTextColor(150);
            doc.text(`Submitted on: ${dateStr}`, 20, 280);

            doc.save(`IIC_Contact_${formData.name.replace(/\s+/g, '_')}.pdf`);
        } catch (error) {
            console.error("PDF generation failed:", error);
        }
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
                    user_email: formData.email,
                    to_email: formData.email,
                    reply_to: formData.email,
                    date: new Date().toLocaleDateString(),
                    location: "Online Inquiry",
                    phone: formData.phone || "Not provided",
                    message: formData.message
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

            setStatus({ type: 'success', message: 'Message sent successfully! Downloading copy...' });
            generatePDF();
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
